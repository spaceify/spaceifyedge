"use strict";

/**
 * Logger wrapper for Spaceify edge, 5.4.2017 Spaceify Oy
 *
 * @class SpaceifyLogger
 */

function SpaceifyLogger(class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var Logger = null;
var SpaceifyError = null;

if (isNodeJs)
	{
	var apipath = "/var/lib/spaceify/code/";

	try { Logger = require("./logger"); } catch (e) { Logger = require(apipath + "logger"); }
	try { SpaceifyError = require("./spaceifyerror"); } catch (e) { SpaceifyError = require(apipath + "spaceifyerror"); }
	}
else if (typeof window !== "undefined")
	{
	Logger = (window.Logger ? window.Logger : null);
	SpaceifyError = (window.SpaceifyError ? window.SpaceifyError : null);
	}

var errorc = new SpaceifyError();
var logger = Logger.getLogger(class_);

self.log		= function(message) { logger.log(message); }
self.dir		= function(message) { logger.dir(message); }
self.info		= function(message) { logger.info(message); }
self.warn		= function(message) { logger.warn(message); }
self.force		= function(message) { logger.force(message); }
self.stdout		= function(message) { logger.stdout(message); }
self.error		= function(err, path, code, type)
	{
	var message = (errorc ? errorc.errorToString(err, path, code) : err);

	if (type == logger.ERROR)
		logger.error(logger.ERROR, false, [message]);
	else if (type == logger.FORCE)
		logger.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	logger.setOptions(options);
	};

self.clone = function(logger_)
	{
	logger.setOptions(logger_);
	};

self.getEnabled = function()
	{
	return logger.getEnabled();
	};

}

if (typeof exports !== "undefined")
	module.exports = SpaceifyLogger;
