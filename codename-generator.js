#!/usr/bin/env node

import debugModule from 'debug';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { helpScreen } from './help.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const debug = debugModule('codename-generator');
debug('Entry: [%s]', __filename);

// command line options parser
const argv = yargs(hideBin(process.argv))
.help(false)
.argv;

// Error formatting
const pe = new PrettyError();

// Constants
const DEFAULT_CONSOLE_ROWS = 25;
const CONSOLE_ROWS_MARGIN = 3;
const MAX_ITERATIONS = 1000;
const MIN_ITERATIONS = 1;

// Define running modes
const runningMode = {
    normal: 0,
    nsfw: 1
};

let nsfwSelection = null;
const nsfwSelectionChoices = {
    adjective: 0,
    noun: 1,
    both: 2
};

// set default running mode
let mode = runningMode.normal;

function randomRange(minimum, maximum) {
    try {
        const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
        // debug(`Random Number: ${randomNumber} (in range ${minimum} - ${maximum})`);
        return randomNumber;
    } catch (error) {
        console.error(chalk.red('Error in randomRange:'), error.message);
        debug('randomRange error details: %O', error);
        return minimum;
    }
}

function getRandomWord(wordList) {
    try {
        const randomWordIndex = randomRange(0, wordList.length - 1);
        const randomWord = wordList[randomWordIndex];
        return randomWord;
    } catch (error) {
        console.error(chalk.red('Error in getRandomWord:'), error.message);
        debug('getRandomWord error details: %O', error);
        return 'null';
    }
}

// Main function
function main() {
    try {
        // Check for 'help' command line parameters
        if (argv.help) {
            debug('--help detected.  Showing help screen.');
            // Show help screen
            helpScreen(argv.verbose);
            return 0;
        }

        // Check for --list-nouns or --list-adjectives
        if (argv.listNouns || argv.listAdjectives) {
            let words = '';
            if (argv.listNouns) {
                // Read list of nouns
                debug('--list-nouns detected');
                words = JSON.parse(fs.readFileSync(`${__dirname}/nouns.json`));
            } else {
                // Read list of adjectives
                debug('--list-adjectives detected');
                words = JSON.parse(fs.readFileSync(`${__dirname}/adjectives.json`));
            }

            // Iterate through word list
            for (let i = 0; i < words.length; i++) {
                let count = (i + 1).toString();
                // Echo current word to the console
                console.log('%s %s', chalk.dim(count.padEnd(4, ' ')), chalk.bold(words[i]));
            }
            return 0;
        }

        // Check for NSFW flag
        if ((argv.nsw) || (argv.nsfw)) {
            // Switch running mode to NSFW
            mode = runningMode.nsfw;
        }
        // Default number of codewords to generate; The number of displayable rows in the console,
        // minus some room at the end so the console prompt doesn't scroll the first code name
        const consoleRows = process.stdout?.rows ?? DEFAULT_CONSOLE_ROWS;
        let iterations = consoleRows - CONSOLE_ROWS_MARGIN;
        debug(`Setting default iterations to (${consoleRows} - ${CONSOLE_ROWS_MARGIN}) = ${iterations}`);

        // Check if a specific number was provided
        if (Number.isInteger(Number(process.argv[2]))) {
            const requestedIterations = Number(process.argv[2]);
            // Validate the number is within acceptable range
            if (requestedIterations < MIN_ITERATIONS) {
                console.error(chalk.red(`Error: Number must be greater than or equal to ${MIN_ITERATIONS}`));
                return 1;
            }
            if (requestedIterations > MAX_ITERATIONS) {
                console.error(chalk.red(`Error: Number must be ${MAX_ITERATIONS} or less`));
                return 1;
            }
            // Update iterations
            iterations = requestedIterations;
            debug(`Iterations overridden to ${iterations}`);
            console.log(chalk.grey(`Generating ${iterations} code names...`));
        }

        // Read list of adjectives and nouns
        debug(`Reading file: ${__dirname}/adjectives.json`);
        const adjectives = JSON.parse(fs.readFileSync(`${__dirname}/adjectives.json`));
        debug(`Reading file: ${__dirname}/nouns.json`);
        const nouns = JSON.parse(fs.readFileSync(`${__dirname}/nouns.json`));
        let adjectivesNSFW = {};
        let nounsNSFW = {};
        if (mode === runningMode.nsfw) {
            // Also read in nsfw files
            try {
                debug('NSFW: Not Safe for Work mode enabled.');
                debug(`Reading file: ${__dirname}/adjectives.nsfw.json`);
                adjectivesNSFW = JSON.parse(fs.readFileSync(`${__dirname}/adjectives.nsfw.json`));
                debug(`Reading file: ${__dirname}/nouns.nsfw.json`);
                nounsNSFW = JSON.parse(fs.readFileSync(`${__dirname}/nouns.nsfw.json`));
            } catch (error) {
                debug('An error occurred trying to load nsfw content: %O', error);
                // Switch running mode back to normal as nsfw content didn't load
                mode = runningMode.normal;
            }
        }

        for (let i = 0; i < iterations; i++) {
            let adjective= '';
            let noun = '';
            debug(`Iteration: ${i + 1} of ${iterations}`);

            if (runningMode.nsfw) {
                // We're running in NSFW mode, so choose whether to generate a rude adjective or noun in this iteration
                nsfwSelection = randomRange(0, 1);
            }

            // Get random adjective
            if ((mode === runningMode.nsfw) && (nsfwSelection === nsfwSelectionChoices.adjective)) {
                // NSFW mode is enabled and a 50/50 chance of using a profanity came up true
                adjective = getRandomWord(adjectivesNSFW);
            } else {
                adjective = getRandomWord(adjectives);
            }
            debug(`Adjective: ${adjective}`);

            // Get random noun
            if ((mode === runningMode.nsfw) && (nsfwSelection === nsfwSelectionChoices.noun)) {
                // NSFW mode is enabled and a 50/50 chance of using a profanity came up true
                noun = getRandomWord(nounsNSFW);
            } else {
                noun = getRandomWord(nouns);
            }
            debug(`Noun: ${noun}`);

            // Output code name
            console.log(chalk.bold('   %s %s'), adjective, noun);
        }

        return 0;

    } catch (error) {
        console.log(pe.render(error));
        return 1;
    }
}

// Execute main and exit with the return code
process.exit(main());
