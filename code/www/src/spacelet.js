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
//var logger = new lib.SpaceifyLogger("Spacelet");
var serviceInterface = new lib.ServiceInterface();
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
					serviceInterface.connect(serviceobj.serviceNames[i], (i + 1 != serviceobj.serviceNames.length ? null : function(err, data)
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

self.getRequiredService = function(service_name, isSecure)
	{
	return serviceInterface.getRequiredService(service_name, isSecure);
	}

self.isSpaceifyNetwork = function(timeout, callback)
	{
	spaceifyNetwork.isSpaceifyNetwork(timeout, callback);
	}

}

if(typeof exports !== "undefined")
	module.exports = Spacelet;
