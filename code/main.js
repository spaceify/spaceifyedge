"use strict";

/**
 * Spaceify main, 2.9.2013 Spaceify Oy
 *
 * @class Main
 */

var Core = require("./core");
var fibrous = require("./fibrous");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyLogger = require("./spaceifylogger");

function Main()
{
var self = this;

var core = new Core();
var logger = new SpaceifyLogger("Main");
var config = SpaceifyConfig.getConfig();

self.start = fibrous( function()
	{
	process.title = "spaceify";																		// Shown in ps aux

	events();																						// Exit gracefully

	try	{
		// START CORE
		core.sync.start();
		}
	catch(err)
		{
		exit(err);
		}
	});

var events = function()
	{
	process.on("uncaughtException", function(err)
		{
		logger.error(err, true, true, logger.ERROR);
		exit();
		})

	process.on("SIGHUP", function()
		{
		exit();
		})

	process.on("SIGTERM", function()
		{
		exit();
		})

	process.on("SIGINT", function()
		{
		exit();
		})

	process.on("exit", function(code)
		{
		})
	}

var exit = function(err)
	{
	if(err)
		logger.error(err, true, true, logger.ERROR);

	fibrous.run( function(err)
		{
		try {

			core.sync.close();

			process.exit(0);
			}
		catch(err)
			{}
		}, function(err, data) { } );
	}

}

fibrous.run( function()
	{
	var main = new Main();
	main.start.sync();
	}, function(err, data) { } );
