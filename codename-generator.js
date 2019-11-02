// command line options parser
var argv = require('yargs')
.help(false)
.argv;

// console colours
const chalk = require('chalk');

function randomRange(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

// Main()
try {
    // Check for 'help' command line parameters
    if (argv.help) {
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
            words = JSON.parse(fs.readFileSync(__dirname + '/nouns.json'));
        } else {
            // Read list of adjectives
            words = JSON.parse(fs.readFileSync(__dirname + '/adjectives.json'));
        }

        // Iterate through word list
        for (let i = 0; i < words.length; i++) {
            let count = (i + 1).toString();
            // Echo current word to the console
            console.log('%s %s' ,chalk.grey(count.padEnd(4, ' ')) ,chalk.cyan(words[i]));
        }
        // Exit
        return;
    }

    // Default number of codewords to generate; The number of displayable rows in the terminal,
    // minus some room at the end so the console prompt doesn't scroll the first code name
    var iterations = process.stdout.rows - 3;

    // Check if a specific number was provided
    if (Number.isInteger(Number(process.argv[2]))) {
        // Update iterations
        iterations = Number(process.argv[2]);
        console.log(chalk.grey('Generating %d code names...'), iterations);
    }

    const fs = require('fs');
    // Read list of adjectives and nouns
    const adjectives = JSON.parse(fs.readFileSync(__dirname + '/adjectives.json'));
    const nouns = JSON.parse(fs.readFileSync(__dirname + '/nouns.json'));

    for (let i = 0; i < iterations; i++) {
        // Get random adjective
        var adjective = adjectives[randomRange(0, adjectives.length)];
        // Get random nouns
        var noun = nouns[randomRange(0, nouns.length)];

        // Output code name
        console.log(chalk.bold('%s %s'), adjective, noun);
    }

} catch (error) {
    console.error('An error occurred: %O', error);
}
