// command line options parser
var argv = require('yargs')
.help(false)
.argv;

function randomRange(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

// Main()
try {
    // *** TO DO --> Read command line arguments looking for --version, --help and iterations
    // Check for 'help' command line parameters
    if (argv.help) {
        // Show help screen
        const help = require('./help');
        help.helpScreen(argv.verbose);
        return;
    }

    // Default number of codewords to generate
    var iterations = 1;

    // Check if a specific number was provided
    if (Number.isInteger(Number(process.argv[2]))) {
        // Update iterations
        iterations = Number(process.argv[2]);
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
        console.log('%s %s', adjective, noun);
    }

} catch (error) {
    console.error('An error occurred: %O', error);
}
