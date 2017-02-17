"use strict";

/**
 * Spacelet, 24.1.2016 Spaceify Oy
 *
 * For webpage use.
 *
 * class @Spacelet
 */

function Spacelet()
{
var self = this;

var lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

var core = new lib.SpaceifyCore();
//var logger = lib.Logger.getLogger("Spacelet");
var spaceifyService = new lib.SpaceifyService();
var spaceifyNetwork = new lib.SpaceifyNetwork();

self.start = function(application, unique_name, callback)
	{ // callback takes preference over application context
	try {
		core.startSpacelet(unique_name, function(err, serviceobj)
			{
			if(err)
				{
				if(typeof application == "function")
					application(err, false);
				else if(application && application.fail)
					application.fail(err);
				}
			else
				{
				for(var i = 0; i < serviceobj.serviceNames.length; i++)
					{
					spaceifyService.connect(serviceobj.serviceNames[i], (i + 1 != serviceobj.serviceNames.length ? null : function(err, data)
						{
						if(typeof application == "function")
							application(null, true);
						else if(application && application.start)
							application.start();
						}));
					}
				}
			});
		}
	catch(err)
		{
		if(typeof application == "function")
			application(err, false);
		else if(application && application.fail)
			application.fail(err);
		}
	}

self.getRequiredService = function(service_name)
	{
	return spaceifyService.getRequiredService(service_name);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return spaceifyService.getRequiredServiceSecure(service_name);
	}

self.isSpaceifyNetwork = function(timeout, callback)
	{
	spaceifyNetwork.isSpaceifyNetwork(timeout, callback);
	}

}

if(typeof exports !== "undefined")
	module.exports = Spacelet;
