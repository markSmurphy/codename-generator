#!/usr/bin/env node

const debug = require('debug')('codename-generator');
debug('Entry: [%s]', __filename);

// command line options parser
var argv = require('yargs')
.help(false)
.argv;

// console colours
const chalk = require('chalk');

// Error formatting
const PrettyError = require('pretty-error');
const pe = new PrettyError();

// Define running modes
const runningMode = {
    normal: 0,
    nsw: 1
};

// set default running mode
var mode = runningMode.normal;

function randomRange(minimum, maximum) {
    try {
        var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
        debug('Random Number: %s (in range %s - %s)', randomNumber, minimum, maximum);
        return(randomNumber);
    } catch (error) {
        console.error(pe.render(error));
        return(0);
    }
}

function getRandomWord(wordList) {
    try {
        let randomWordIndex = randomRange(0, wordList.length - 1);
        let randomWord = wordList[randomWordIndex];
        return(randomWord);

    } catch (error) {
        console.error(pe.render(error));
        return('null');
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Main()
try {
    // Check for 'help' command line parameters
    if (argv.help) {
        debug('--help detected.  Showing help screen.');
        // Show help screen
        const help = require('./help');
        help.helpScreen(argv.verbose);
        return;
    }

    // Check for --list-nouns or --list-adjectives
    if (argv.listNouns || argv.listAdjectives) {
        const fs = require('fs');
        var words = '';
        if (argv.listNouns) {
            // Read list of nouns
            debug('--list-nouns detected');
            words = JSON.parse(fs.readFileSync(__dirname + '/nouns.json'));
        } else {
            // Read list of adjectives
            debug('--list-adjectives detected');
            words = JSON.parse(fs.readFileSync(__dirname + '/adjectives.json'));
        }

        // Iterate through word list
        for (let i = 0; i < words.length; i++) {
            let count = (i + 1).toString();
            // Echo current word to the console
            console.log('%s %s', chalk.dim(count.padEnd(4, ' ')), chalk.bold(words[i]));
        }
        // Exit
        return;
    }

    // Check for NSW flag
    if (argv.nsw) {
        // Switch running mode to NSW
        mode = runningMode.nsw;
    }
    // Default number of codewords to generate; The number of displayable rows in the console,
    // minus some room at the end so the console prompt doesn't scroll the first code name
    const consoleRows = process.stdout.rows;
    var iterations = consoleRows - 3;
    debug('Setting default iterations to (%s - 3) = %s', consoleRows, iterations);

    // Check if a specific number was provided
    if (Number.isInteger(Number(process.argv[2]))) {
        // Update iterations
        iterations = Number(process.argv[2]);
        debug('Iterations overridden to %s', iterations);
        console.log(chalk.grey('Generating %d code names...'), iterations);
    }

    const fs = require('fs');
    // Read list of adjectives and nouns
    debug('Reading file: %s', __dirname + '/adjectives.json');
    const adjectives = JSON.parse(fs.readFileSync(__dirname + '/adjectives.json'));
    debug('Reading file: %s', __dirname + '/nouns.json');
    const nouns = JSON.parse(fs.readFileSync(__dirname + '/nouns.json'));
    var adjectivesNSW = {};
    var nounsNSW = {};
    if (mode === runningMode.nsw) {
        // Also read in nsw files
        try {
            debug('NSW: Not Safe for Work mode enabled.');
            debug('Reading file: %s', __dirname + '/adjectives.nsw.json');
            adjectivesNSW = JSON.parse(fs.readFileSync(__dirname + '/adjectives.nsw.json'));
            debug('Reading file: %s', __dirname + '/nouns.nsw.json');
            nounsNSW = JSON.parse(fs.readFileSync(__dirname + '/nouns.nsw.json'));
        } catch (error) {
            debug('An error occurred trying to load nsw content: %O', error);
            // Switch running mode back to normal as nsw content didn't load
            mode = runningMode.normal;
        }
    }

    for (let i = 0; i < iterations; i++) {
        let adjective= '';
        let noun = '';
        debug('Iteration: %s of %s', i + 1, iterations);
        // Get random adjective
        if ((mode === runningMode.nsw) && (getRandomInt(2) === 1)) {
            // NSW mode is enabled and a 50/50 chance of using a profanity came up true
            adjective = getRandomWord(adjectivesNSW);
        } else {
            adjective = getRandomWord(adjectives);
        }
        debug('Adjective: %s', adjective);

        // Get random noun
        if ((mode === runningMode.nsw) && (getRandomInt(2) === 1)) {
            // NSW mode is enabled and a 50/50 chance of using a profanity came up true
            noun = getRandomWord(nounsNSW);
        } else {
            noun = getRandomWord(nouns);
        }
        debug('Noun: %s', noun);

        // Output code name
        console.log(chalk.bold('   %s %s'), adjective, noun);
    }

} catch (error) {
    console.log(pe.render(error));
}
