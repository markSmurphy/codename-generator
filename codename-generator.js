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

function randomRange(minimum, maximum) {
    try {
        var randomNumber =Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
        debug('Random Number: %s (in range %s - %s)', randomNumber, minimum, maximum);
        return(randomNumber);
    } catch (error) {
        console.error(pe.render(error));
    }
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

    for (let i = 0; i < iterations; i++) {
        debug('Iteration: %s of %s', i + 1, iterations);
        // Get random adjective
        let randomAdjective = randomRange(0, adjectives.length - 1);
        var adjective = adjectives[randomAdjective];
        debug('Adjective: %s', adjective);

        // Get random noun
        let randomNoun = randomRange(0, nouns.length - 1);
        var noun = nouns[randomNoun];
        debug('Noun: %s', noun);

        if (adjective === undefined) {
            debug('undefined adjective: %s of %s', randomAdjective, adjectives.length);
        }

        if (noun === undefined) {
            console.log('undefined noun: %s of %s', randomNoun, nouns.length);
        }
        // Output code name
        console.log(chalk.bold('   %s %s'), adjective, noun);
    }

} catch (error) {
    console.log(pe.render(error));
}
