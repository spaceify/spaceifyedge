"use strict";

/**
 * Spaceify application, 25.1.2016 Spaceify Oy
 *
 * @class SpaceifyApplication
 */

function SpaceifyApplication()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof exports !== "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);
var apiPath = isNodeJs && isRealSpaceify ? "/api/" : "/var/lib/spaceify/code/";

var classes =
	{
	Logger: (isNodeJs ? require(apiPath + "logger") : Logger),
	WebServer: (isNodeJs ? require(apiPath + "webserver") : function() {}),
	SpaceifyCore: (isNodeJs ? require(apiPath + "spaceifycore") : SpaceifyCore),
	SpaceifyConfig: (isNodeJs ? require(apiPath + "spaceifyconfig") : SpaceifyConfig),
	SpaceifyUtility: (isNodeJs ? require(apiPath + "spaceifyutility") : SpaceifyUtility),
	SpaceifyService: (isNodeJs ? require(apiPath + "spaceifyservice") : SpaceifyService)
	};
var fibrous = (isNodeJs ? require(apiPath + "fibrous") : function(fn) { return fn; });
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var logger = new classes.Logger();
var httpServer = new classes.WebServer();
var httpsServer = new classes.WebServer();
var config = new classes.SpaceifyConfig();
var utility = new classes.SpaceifyUtility();
var spaceifyCore = new classes.SpaceifyCore();
var spaceifyService = new classes.SpaceifyService();

config.makeRealApplicationPaths();

var manifest = null;

var HTTP_PORT = (isRealSpaceify ? 80 : null);
var HTTPS_PORT = (isRealSpaceify ? 443 : null);

self.start = function()
	{
	if(isNodeJs)
		start.apply(self, arguments);
	else
		self.connect.apply(self, arguments);
	}

var start = function(application, options)
	{
	fibrous.run( function()
		{
		var port;
		var securePort;
		var registerHttp;

		try {
			manifest = utility.sync.loadJSON(config.APPLICATION_PATH + config.MANIFEST, true, true);

				// SERVICES -- -- -- -- -- -- -- -- -- -- //
			if(manifest.provides_services)							// <= SERVERS - PROVIDES SERVICES
				{
				var services = manifest.provides_services;

				for(var i = 0; i < services.length; i++)
					{
					port = (isRealSpaceify ? config.FIRST_SERVICE_PORT + i : null);
					securePort = (isRealSpaceify ? config.FIRST_SERVICE_PORT_SECURE + i : null);

					spaceifyService.sync.listen(services[i].service_name, manifest.unique_name, port, securePort);
					}
				}

			if(manifest.requires_services)							// <= CLIENTS - REQUIRES SERVICES
				{
				createRequiredServices.sync(manifest.requires_services, 0, false);
				createRequiredServices.sync(manifest.requires_services, 0, true);
				}

				// START APPLICATIONS HTTP AND HTTPS WEB SERVERS -- -- -- -- -- -- -- -- -- -- //
			if(options && options.webservers)
				{
				var opts =	{
							hostname: config.ALL_IPV4_LOCAL,
							key: config.APPLICATION_TLS_PATH + config.SERVER_KEY,
							crt: config.APPLICATION_TLS_PATH + config.SERVER_CRT,
							caCrt: config.API_WWW_PATH + config.SPACEIFY_CRT,
							wwwPath: config.APPLICATION_WWW_PATH,
							indexFile: config.INDEX_HTML,
							serverName: manifest.name + " Server"
							};

				registerHttp = false;

				if(options.webservers.http && options.webservers.http === true && !httpServer.getIsOpen())
					{
					opts.isSecure = false;
					opts.port = HTTP_PORT;
					httpServer.listen.sync(opts);

					HTTP_PORT = httpServer.getPort();				// Get the port because in develop mode the port is not known beforehand

					registerHttp = true;
					}

				if(options.webservers.https && options.webservers.https === true && !httpsServer.getIsOpen())
					{
					opts.isSecure = true;
					opts.port = HTTPS_PORT;
					httpsServer.listen.sync(opts);

					HTTPS_PORT = httpsServer.getPort();

					registerHttp = true;
					}

				if(registerHttp && !isRealSpaceify)
					{
					spaceifyCore.sync.registerService("http", {unique_name: manifest.unique_name, port: HTTP_PORT, securePort: HTTPS_PORT});
					console.log("    LISTEN -----> " + config.HTTP + " - port: " + HTTP_PORT + ", secure port: " + HTTPS_PORT);
					}
				}

			if(application.start)
				application.start();

				// APPLICATION INITIALIALIZED SUCCESSFULLY -- -- -- -- -- -- -- -- -- -- //
			console.log(config.APPLICATION_INITIALIZED, "---", manifest.unique_name);
			}
		catch(err)
			{
			if(application.fail)
				application.fail(err);

			initFail.sync(err);
			}
		}, function(err, data)
			{
			//initFail.sync(err);
			});
	}

self.connect = function(application, unique_names, options)
	{ // Setup connections to open services of applications and spacelets; open, open_local or both depending from where this method is called
	try {
		if(unique_names.constructor !== Array)													// getOpenServices takes an array of unique names
			unique_names = [unique_names];

		spaceifyCore.getOpenServices(unique_names, function(err, services)
			{
			if(err)
				throw err;
			else
				connectServices(application, services);
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

var connectServices = function(application, services)
	{ // Connect to services in the array one at a time
	var service = services.shift();

	if(typeof service === "undefined")
		{
		if(typeof application == "function")
			application(null, true);
		else if(application && application.start)
			application.start();

		return;
		}

	spaceifyService.connect(service.service_name, function(err, data)
		{
		connectServices(application, services);
		});
	}

var initFail = fibrous( function(err)
	{ // FAILED TO INITIALIALIZE THE APPLICATION. -- -- -- -- -- -- -- -- -- -- //
	logger.error([";;", err, "::"], true, true, logger.ERROR);
	console.log(manifest.unique_name + config.APPLICATION_UNINITIALIZED);

	stop.sync();
	});

var stop = fibrous( function()
	{
	httpServer.sync.close();
	httpsServer.sync.close();

	spaceifyService.disconnect();								// Disconnect all clients
	spaceifyService.close();									// Close all servers

	spaceifyCore.close();
	});

var createRequiredServices = function(services, position, isSecure, callback)
	{
	if(position == services.length)
		callback();
	else
		{
		spaceifyService.connect(services[position++].service_name, isSecure, function(err, data)
			{
			createRequiredServices(services, position, isSecure, callback);
			});
		}
	}

	// METHODS -- -- -- -- -- -- -- -- -- -- //
self.getOwnUrl = function(isSecure)
	{
	if(!isNodeJs)
		return null;

	var ownUrl = (!isSecure ? "http://" : "https://") + config.EDGE_HOSTNAME + ":" + (!isSecure ? HTTP_PORT : HTTPS_PORT);

	return ownUrl;
	}

self.getManifest = function()
	{
	return manifest;
	}

	// REQUIRED (= CLIENT) -- -- -- -- -- -- -- -- -- -- //
self.getRequiredService = function(service_name)
	{
	return spaceifyService.getRequiredService(service_name);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return spaceifyService.getRequiredServiceSecure(service_name);
	}

	// PROVIDED (= SERVICE) -- -- -- -- -- -- -- -- -- -- //
self.getProvidedService = function(service_name)
	{
	return spaceifyService.getProvidedService(service_name);
	}

self.getProvidedServiceSecure = function(service_name)
	{
	return spaceifyService.getProvidedServiceSecure(service_name);
	}

}

if(typeof exports !== "undefined")
	module.exports = new SpaceifyApplication();
