import { EOL } from 'os';
import chalk from 'chalk';
import { createRequire } from 'module';
import os from 'os';
import { getColourLevelDesc, secondsToHms, formatBytes } from './utils.js';

// Create require for JSON imports (CommonJS compatibility)
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export function helpScreen(verbose) {
    // Display help screen
    console.log(chalk.blue(packageJson.name));
    console.log(`${chalk.green('Read the docs:')} ${packageJson.homepage}`);
    console.log(`${chalk.magenta('Support & bugs:')} ${packageJson.bugs.url}`);
    console.log(EOL);
    console.log(chalk.grey('DESCRIPTION:'));
    console.log(chalk.italic('   %s'), packageJson.description);
    console.log(EOL);
    console.log(chalk.grey('VERSION:'));
    console.log(`   ${packageJson.version}`);
    console.log(EOL);
    console.log(chalk.grey('USAGE:'));
    console.log('   ' + 'node codename-generator [options]');
    console.log(EOL);
    console.log(chalk.grey('OPTIONS:'));
    console.log('   ' + '                                 ' + chalk.grey('Generate a screen-full of code names'));
    console.log('   ' + '<number>                         ' + chalk.grey('Generate <number> code names'));
    console.log('   ' + '--list-adjectives                ' + chalk.grey('Lists all adjectives in the dictionary'));
    console.log('   ' + '--list-nouns                     ' + chalk.grey('Lists all nouns in the dictionary'));
    console.log('   ' + '--nsfw                           ' + chalk.grey('"Not Safe for Work" mode outputs profanities'));
    console.log('   ' + '--no-color                       ' + chalk.grey('Switches off colour output'));
    console.log('   ' + '--version                        ' + chalk.grey('Display version number'));
    console.log('   ' + '--help                           ' + chalk.grey('Display this help'));
    console.log(EOL);
    console.log(chalk.grey('EXAMPLES:'));
    console.log('   node codename-generator');
    console.log('   node codename-generator 15');
    // Display more information if `verbose` is enabled
    if (verbose) {
        console.log(EOL);
        console.log(chalk.grey('SYSTEM:'));
        console.log(`   Hostname           ${chalk.blue(os.hostname())}`);
        console.log(`   Uptime             ${chalk.blue(secondsToHms(os.uptime()))}`);
        console.log(`   Platform           ${chalk.blue(os.platform())}`);
        console.log(`   O/S                ${chalk.blue(os.type())}`);
        console.log(`   O/S release        ${chalk.blue(os.release())}`);
        console.log(`   CPU architecture   ${chalk.blue(os.arch())}`);
        console.log(`   CPU cores          ${chalk.blue(os.cpus().length)}`);
        console.log(`   CPU model          ${chalk.blue(os.cpus()[0]?.model ?? 'Unknown')}`);
        console.log(`   Free memory        ${chalk.blue(formatBytes(os.freemem()))}`);
        console.log(`   Total memory       ${chalk.blue(formatBytes(os.totalmem()))}`);
        console.log(`   Home directory     ${chalk.blue(os.homedir())}`);
        console.log(`   Temp directory     ${chalk.blue(os.tmpdir())}`);
        console.log(`   Console width      ${chalk.blue(process.stdout.columns)}`);
        console.log(`   Console height     ${chalk.blue(process.stdout.rows)}`);
        console.log(`   Colour support     ${chalk.blue(getColourLevelDesc())}`);
    }
}
