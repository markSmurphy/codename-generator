import debugModule from 'debug';
import chalk, { supportsColor } from 'chalk';

const debug = debugModule('codename-generator');
debug('Entry: [%s]', import.meta.url);

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes';
    }
    try {
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    } catch (error) {
        console.error(`Error formatting bytes: ${error.message}`);
        debug('formatBytes error details: %O', error);
        return `${bytes} Bytes`;
    }
}

export function secondsToHms(seconds) {
    if (seconds) {
        try {
            seconds = Number(seconds);

            const h = Math.floor(seconds / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 3600 % 60);

            return `${('0' + h).slice(-2)} hours, ${('0' + m).slice(-2)} minutes, ${('0' + s).slice(-2)} seconds`;
        } catch (error) {
            console.error(`Error converting seconds to HMS: ${error.message}`);
            debug('secondsToHms error details: %O', error);
            return `${seconds} seconds`;
        }
    } else {
        return '<invalid>';
    }
}

export function getColourLevelDesc() {
    const colourLevel = ['Colours Disabled', '16 Colours (Basic)', '256 Colours', '16 Million Colours (True Colour)'];

    // Use chalk to detect colour level support
    let level = supportsColor?.level ?? 0;

    return colourLevel[level];
}
