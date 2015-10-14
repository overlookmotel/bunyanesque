# bunyanesque.js

# bunyan logger with a few tweaks

## Current status

[![NPM version](https://img.shields.io/npm/v/bunyanesque.svg)](https://www.npmjs.com/package/bunyanesque)
[![Build Status](https://img.shields.io/travis/overlookmotel/bunyanesque/master.svg)](http://travis-ci.org/overlookmotel/bunyanesque)
[![Dependency Status](https://img.shields.io/david/overlookmotel/bunyanesque.svg)](https://david-dm.org/overlookmotel/bunyanesque)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/bunyanesque.svg)](https://david-dm.org/overlookmotel/bunyanesque)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/bunyanesque/master.svg)](https://coveralls.io/r/overlookmotel/bunyanesque)

## Usage

A small modification of the [bunyan](https://www.npmjs.com/package/bunyan) logging library.

The differences are:

### Plain `log()` method

`log()` is an alias for `log.info()`.

```js
var log = require('bunyanesque').createLogger();

// These are equivalent:
log('Message');
log.info('Message');
```

### Arguments order

`log(message, object)` is allowable.

```js
// These are equivalent:
log.info('Message', {a: 123});
log.info({a: 123}, 'Message');
```

### Errors

Errors can be passed directly (`log( new Error('It went pear-shaped') )`) rather than under an `err` attribute (`log( { err: new Error('It went pear-shaped') } )`).

Errors (instances of the `Error` constructor) are automatically moved to under an `err` attribute. So they can then be rendered nicely by bunyan's standard serializer.

### Other features

All other `bunyan` features, aside from `.child()` are not supported.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/bunyanesque/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/bunyanesque/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
