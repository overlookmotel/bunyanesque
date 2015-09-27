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

        if (obj && obj instanceof Error) obj = {error: obj};

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

        // convert errors to name/message/stack object
        if (obj instanceof Error) obj = {error: obj};

        var errors = {};
        _.forIn(obj, function(val, name) {
            if (val instanceof Error) errors[name] = {name: val.name, message: val.message, stack: val.stack};
        });

        if (Object.keys(errors).length) obj = _.defaults(errors, obj);

        // call bunyan
        if (!msg) bunyanLogger[level](obj);
        return bunyanLogger[level](obj, msg);
    });
};
