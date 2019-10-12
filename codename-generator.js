
function randomRange(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

// Main()
try {
    // *** TO DO --> Read command line arguments looking for --version, --help and iterations

    // Default number of codewords to generate
    var iterations = 1;

    const fs = require('fs');
    // Read list of adjectives and nouns
    // *** TO DO --> Get absolute file paths via __dirname
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
