var readline = require('readline');
var chalk = require('chalk');
var fixedWidthString = require('fixed-width-string');

var MAX_LINE_WIDTH = process.stdout.columns || 160;
var BAR_LENGTH = 30;
var BAR_CHAR = process.platform == 'win32' ? '\u25AC' : '\u25FC';
var lines = 0;

function repeatStr(str, len) {
    return new Array(parseInt(len) + 1).join(str);
}

function draw(x, y, str) {
    readline.moveCursor(process.stdout, x, -y);
    readline.clearLine(process.stdout, 1);

    process.stdout.write(str + '\n');

    readline.moveCursor(process.stdout, 0, y ? y - 1 : 0);
}

module.exports = function createProgress(prelude, message, options) {
    function safeStr(str) {
        return String(str).replace(/[\r\n\t]/g, ' ');
    }

    function drawBarLine(complete, str) {
        complete = Math.round(complete * BAR_LENGTH);

        return fixedWidthString(
            chalk.blue(repeatStr(completeFill, complete)) +
            chalk.white(repeatStr(incompleteFill, BAR_LENGTH - complete)) +
            ' ' + safeStr(str || ''),
            maxWidth
        );
    }

    options = options || {};
    prelude = safeStr(prelude ? prelude + ' ' : '');
    message = safeStr(message || '');

    var completeFill = String(options.complete || (chalk.enabled ? BAR_CHAR : '#'));
    var incompleteFill = String(options.incomplete || (chalk.enabled ? BAR_CHAR : '-'));

    var line = lines++;
    var x = prelude.length;
    var maxWidth = MAX_LINE_WIDTH - x - 2;

    draw(0, 0, prelude + message);

    return {
        update: function(progress, message) {
            progress = Math.max(0, Math.min(progress, 1)); // fit to [0..1]
            draw(x, lines - line, drawBarLine(progress, message));
        },
        done: function(message) {
            draw(x, lines - line, fixedWidthString(safeStr(message), maxWidth));
        }
    };
};
