"use strict";

/**
 * Application Manager service, 12.5.2015 Spaceify Oy
 * 
 */

var fibrous = require("./fibrous");
var SpaceifyLogger = require("./spaceifylogger");
var ApplicationManager = require("./applicationmanager");

var logger = new SpaceifyLogger("AppManService");

fibrous.run( function()
	{
	process.title = "spaceifyappman";																// Shown in ps aux

	try {
		var applicationManager = new ApplicationManager();

		// SETUP A RPC SERVER FOR APPLICATION MANAGER
		applicationManager.sync.connect();
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	}, function(err, data) { } );