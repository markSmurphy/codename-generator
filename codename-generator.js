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
    var randomNumber =Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
    debug('Random Number: %s (in range %s - %s)', randomNumber, minimum, maximum);
    return(randomNumber);
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
            console.log('%s %s' ,chalk.dim(count.padEnd(4, ' ')) ,chalk.bold(words[i]));
        }
        // Exit
        return;
    }

    // Default number of codewords to generate; The number of displayable rows in the terminal,
    // minus some room at the end so the console prompt doesn't scroll the first code name
    var iterations = process.stdout.rows - 3;
    debug('Setting default iterations to (%s - 3) = %s', process.stdout.rows, iterations);

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
        var adjective = adjectives[randomRange(0, adjectives.length)];
        debug('Adjective: %s', adjective);

        // Get random noun
        var noun = nouns[randomRange(0, nouns.length)];
        debug('Noun: %s', noun);

        // Output code name
        console.log(chalk.bold('   %s %s'), adjective, noun);
    }

} catch (error) {
    console.error(pe.render(error));
}
