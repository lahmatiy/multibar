# multibar

[![NPM version](https://img.shields.io/npm/v/multibar.svg)](https://www.npmjs.com/package/multibar)
[![Build Status](https://travis-ci.org/lahmatiy/multibar.svg?branch=master)](https://travis-ci.org/lahmatiy/multibar)

Features:

- Simple and robust
- Multiple progress bar at once
- Supports ANSI coloring in labels (e.g. colored with `chalk`)

## Install

```
npm install multibar
```

## Usage

```js
var chalk = require('chalk');
var multibar = require('multibar');

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
```

Example in action:

![multibar-demo](https://user-images.githubusercontent.com/270491/31435147-592a6e76-ae87-11e7-9fde-61512f5a1dac.gif)

## API

```
multibar(prelude, message, options);
```

All agruments are optional. Returns a bar instance with method:

- `update(progress, message)`

    Update bar progress and message. Parameters:

    * `progress` should be a number in range [0..1]
    * `message` – any string to output on right side of bar

- `done(message)`

    Finalize bar progress (hide progress bar, prelude and message are left).

    * `message` any string

Options:

- `complete`

  Type: `String`  
  Default: depends on platform and `chalk` enabled

  Character for fill a completion progress.

- `incomplete`

  Type: `String`  
  Default: depends on platform and `chalk` enabled

  Character for fill rest of progress.

## License

MIT
