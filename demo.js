var chalk = require('chalk');
var multibar = require('.');

function createProgressBar(name, freq) {
    var bar = multibar(name, chalk.gray('awaiting...'));
    var count = 0;
    var timer = setInterval(function() {
        if (count < 100) {
            count += 5;
            bar.update(count / 100, chalk.yellow(count + '%'));
        } else {
            bar.done(chalk.green('OK'));
            clearInterval(timer);
        }
    }, freq);
}

for (var i = 0; i < 3; i++) {
    createProgressBar('#' + (i + 1), parseInt(250 * Math.random()));
}
