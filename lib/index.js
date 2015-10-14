// --------------------
// bunyanesque module
// --------------------

// modules
var bunyan = require('bunyan'),
    _ = require('lodash');

// exports

// Logger constructor
var Logger = module.exports = function(handler) {
    var logger = function() {
        return logger.info.apply(logger, arguments);
    };

    logger._handler = handler;

    Object.setPrototypeOf(logger, Logger.prototype);

    return logger;
};

// add handlers to Logger prototype for fatal/error/warn/info/debug/trace
_.forIn(bunyan.levelFromName, function(levelNum, level) { // jshint ignore:line
    Logger.prototype[level] = function(msg, obj) {
        if (typeof msg != 'string') {
            var temp = obj;
            obj = msg;
            msg = temp;
        }

        return this._handler(level, msg, obj);
    };
});

// child method to create new logger with bound fields
Logger.prototype.child = function(addObj) {
    var parent = this;

    return new Logger(function(level, msg, obj) {
        if (typeof msg != 'string') {
            var temp = obj;
            obj = msg;
            msg = temp;
        }

        // if obj is an error, place it under `err` attribute so can be processed with serializer
        if (obj && obj instanceof Error) obj = {err: obj};

        obj = _.extend({}, addObj, obj || {});

        return parent._handler(level, msg, obj);
    });
};

// createLogger method
Logger.createLogger = function(options) {
    // init bunyan
    var bunyanLogger = bunyan.createLogger(options);

    // create custom logger
    return new Logger(function(level, msg, obj) {
        // if no object, call bunyan
        if (!obj) return bunyanLogger[level](msg);

        // if obj is an error, place it under `err` attribute so can be processed with serializer
        if (obj instanceof Error) obj = {err: obj};

        // call bunyan
        if (!msg) bunyanLogger[level](obj);
        return bunyanLogger[level](obj, msg);
    });
};

// export stdSerializers from bunyan
Logger.stdSerializers = bunyan.stdSerializers;
