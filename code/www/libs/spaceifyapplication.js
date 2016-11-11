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
var application = null;

var HTTP_PORT = (isRealSpaceify ? 80 : null);
var HTTPS_PORT = (isRealSpaceify ? 443 : null);

self.start = function()
	{
	if(isNodeJs)
		start.apply(self, arguments);
	else
		self.connect.apply(self, arguments);
	}

var start = function(application_, options)
	{
	fibrous.run( function()
		{
		var server;
		var port;
		var securePort;
		var registerHttp;
		var hasWebServers;
		var listenHttp = false;
		var listenHttps = false;
		var listenSecure = true;
		var listenUnsecure = true;

		application = application_;

			// OPTIONS -- -- -- -- -- -- -- -- -- -- //
		options = options || {};

		hasWebServers = (options.webservers || options.webServers ? true : false);

		if(hasWebServers)
			{
			server = options.webservers || options.webServers;
			listenHttp = ("http" in server ? server.http : false);
			listenHttps = ("https" in server ? server.https : false);
			}

		if(options.websocketservers || options.webSocketServers)
			{
			server = options.websocketservers || options.webSocketServers;
			listenSecure = ("secure" in server ? server.secure : false);
			listenUnsecure = ("unsecure" in server ? server.unsecure : false);
			}

			// APPLICATION -- -- -- -- -- -- -- -- -- -- //
		try {
			manifest = utility.sync.loadJSON(config.VOLUME_APPLICATION_PATH + config.MANIFEST, true, true);

				// SERVICES -- -- -- -- -- -- -- -- -- -- //
			if(manifest.provides_services)														// <= SERVERS - PROVIDES SERVICES
				{
				var services = manifest.provides_services;

				for(var i = 0; i < services.length; i++)
					{
					if(services.service_type == config.ALIEN)
						continue;

					port = (isRealSpaceify ? config.FIRST_SERVICE_PORT + i : null);
					securePort = (isRealSpaceify ? config.FIRST_SERVICE_PORT_SECURE + i : null);

					spaceifyService.sync.listen(services[i].service_name, manifest.unique_name, port, securePort, listenUnsecure, listenSecure);
					}
				}

			if(manifest.requires_services)														// <= CLIENTS - REQUIRES SERVICES
				{
				createRequiredServices.sync(manifest.requires_services, 0, false);
				createRequiredServices.sync(manifest.requires_services, 0, true);
				}

				// START APPLICATIONS HTTP AND HTTPS WEB SERVERS -- -- -- -- -- -- -- -- -- -- //
			if(hasWebServers)
				{
				var opts =	{
							hostname: config.ALL_IPV4_LOCAL,
							key: config.VOLUME_TLS_PATH + config.SERVER_KEY,
							crt: config.VOLUME_TLS_PATH + config.SERVER_CRT,
							caCrt: config.API_WWW_PATH + config.SPACEIFY_CRT,
							wwwPath: config.VOLUME_APPLICATION_WWW_PATH,
							indexFile: config.INDEX_HTML,
							serverName: manifest.name + " Server"
							};

				registerHttp = false;

				if(listenHttp && !httpServer.getIsOpen())
					{
					opts.isSecure = false;
					opts.port = HTTP_PORT;
					httpServer.listen.sync(opts);

					HTTP_PORT = httpServer.getPort();											// Get the port because native and develop mode applications
																								// do not have knowledge of port numbers beforehand
					registerHttp = true;
					}

				if(listenHttps && !httpsServer.getIsOpen())
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

			if(application && application.start && typeof application.start == "function")
				application.start();

				// APPLICATION INITIALIALIZED SUCCESSFULLY -- -- -- -- -- -- -- -- -- -- //
			console.log(config.APPLICATION_INITIALIZED, "---", manifest.unique_name);
			}
		catch(err)
			{
			initFail.sync(err);
			}
		}, function(err, data)
			{
			//initFail.sync(err);
			});
	}

self.connect = function(application_, unique_names, options)
	{ // Setup connections to open services of applications and spacelets; open, open_local or both depending from where this method is called
	try {
		application = application_;

		if(unique_names.constructor !== Array)													// getOpenServices takes an array of unique names
			unique_names = [unique_names];

		spaceifyCore.getOpenServices(unique_names, false, function(err, services)
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
		else if(application && application.fail && typeof application.fail == "function")
			application.fail(err);
		}
	}

var connectServices = function(application_, services)
	{ // Connect to services in the array one at a time
	var service = services.shift();

	application = application_;

	if(typeof service === "undefined")
		{
		if(typeof application == "function")
			application(null, true);
		else if(application && application.start && typeof application.start == "function")
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

	stop.sync(err);
	});

var stop = fibrous( function(err)
	{
	httpServer.close();
	httpsServer.close();

	spaceifyService.disconnect();																// Disconnect clients
	spaceifyService.close();																	// Close servers

	spaceifyCore.close();

	if(application && application.fail && typeof application.fail == "function")
		application.fail(err);
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
