"use strict";

/**
 * Spaceify core, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyCore
 */

function SpaceifyCore()
{
var self = this;

// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var Connection = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Connection = require(lib + "connection");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyNetwork = function() {};
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	Connection = lib.Connection;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	//SpaceifyLogger = lib.SpaceifyLogger;
	}

var connection = new Connection();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyCore");

var callQueue = [];

self.startSpacelet = function(unique_name, callback)
	{
	callRpc("startSpacelet", [unique_name], function(err, services, id, ms)
		{
		if(err)
			callback(err, null);
		else
			{
			var serviceNames = [];
			for(var s = 0; s < services.length; s++)							// Make service names array for convenience
				serviceNames.push(services[s].service_name);

			callback(null, {services: services, serviceNames: serviceNames}, id, ms);
			}
		});
	}

self.registerService = function(service_name, ports, callback)
	{
	callRpc("registerService", [service_name, ports], callback);
	}

self.unregisterService = function(service_name, unique_name, callback)
	{
	callRpc("unregisterService", [service_name, unique_name], callback);
	}

self.getService = function(service_name, unique_name, callback)
	{
	callRpc("getService", [service_name, unique_name], callback);
	}

self.getServices = function(service_name, callback)
	{
	callRpc("getServices", [service_name], callback);
	}

self.getOpenServices = function(unique_names, getHttp, callback)
	{
	callRpc("getOpenServices", [unique_names, getHttp], callback);
	}

self.getManifest = function(unique_name, callback)
	{
	var manifest = (isCache() ? getCache().getManifest(unique_name) : null);

	if(manifest)
		callback(null, manifest, -1, 0);
	else
		callRpc("getManifest", [unique_name, true, false], function(err, data, id, ms)
			{
			if(!err && isCache())
				getCache().setManifest(unique_name, data);

			callback(err, data, id, ms);
			});
	}

self.isAdminLoggedIn = function(callback)
	{
	network.doOperation({type: "isAdminLoggedIn"}, function(err, data, id, ms)
		{
		callback((err ? err : null), (err ? false : data), id, ms);
		});
	}

self.getApplicationStatus = function(unique_name, callback)
	{
	callRpc("getApplicationStatus", [unique_name], callback);
	}

self.isApplicationRunning = function(unique_name, callback)
	{
	callRpc("isApplicationRunning", [unique_name], callback);
	}

self.getServiceRuntimeStates = function(sessionId, callback)
	{
	callRpc("getServiceRuntimeStates", [sessionId], callback);
	}

self.getApplicationData = function(callback)
	{
	var i;

	callRpc("getApplicationData", [], function(err, data, id, ms)
		{
		if(!err && isCache())
			{
			for(i = 0; i < data.spacelet.length; i++)
				getCache().setApplication(data.spacelet[i]);

			for(i = 0; i < data.sandboxed.length; i++)
				getCache().setApplication(data.sandboxed[i]);

			for(i = 0; i < data.sandboxed_debian.length; i++)
				getCache().setApplication(data.sandboxed_debian[i]);

			for(i = 0; i < data.native_debian.length; i++)
				getCache().setApplication(data.native_debian[i]);
			}

		callback(err, data, id, ms);
		});
	}

self.getApplicationURL = function(unique_name, callback)
	{
	callRpc("getApplicationURL", [unique_name], callback);
	}

self.setSplashAccepted = function(callback)
	{
	callRpc("setSplashAccepted", [], callback);
	}

self.setEventListeners = function(events, listeners, context, sessionId, callback)
	{
	callRpc("setEventListeners", [events], function(err, data, id, ms)
		{
		if(!err)
			{
			for(var i = 0; i < events.length; i++)
				connection.exposeRpcMethod(events[i], context, listeners[i]);
			}

		callback(err, data, id, ms);
		});
	}

/*self.saveOptions = function(unique_name, directory, filename, data, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename, data: data};
	network.doOperation(post, callback);
	}

self.loadOptions = function(unique_name, directory, filename, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename};
	network.doOperation(post, callback);
	}*/

	// CONNECTION -- -- -- -- -- -- -- -- -- -- //
var callRpc = function(method, params, callback)
	{
	var callObj, isSecure, port, hostname, caCrt;

	if(connection.isConnecting())
		{
		callQueue.push({ method: method, params: params, callback: callback });
		}
	else if(!connection.isConnected())
		{
		callQueue.push({ method: method, params: params, callback: callback });

		isSecure = (isNodeJs ? true : network.isSecure());
		port = (!isSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);
		caCrt = (isNodeJs ? config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW : "");

		if(!isNodeJs)																		// Web page
			hostname = network.getEdgeURL({});
		else if(isRealSpaceify)																// Node.js
			hostname = config.EDGE_IP;
		else																				// Develop mode
			hostname = config.CONNECTION_HOSTNAME;

		connection.connect({ hostname: hostname, port: port, isSecure: isSecure, caCrt: caCrt }, function(err, data)
			{
			if(err)
				{
				while(typeof (callObj = callQueue.shift()) !== "undefined")					// Pass connection failure to all calls
					callObj.callback(err, null, -1, 0);
				}
			else
				{
				nextRpcCall();
				}
			});
		}
	else
		{
		callQueue.push({ method: method, params: params, callback: callback });

		nextRpcCall();
		}
	}

var nextRpcCall = function()
	{
	var callObj = callQueue.shift();

	if(typeof callObj !== "undefined")
		{
		connection.callRpc(callObj.method, callObj.params, self, function()
			{
			callObj.callback.apply(this, arguments);

			nextRpcCall();
			});
		}
	}

self.close = function()
	{
	connection.close();
	}

	// CACHE -- -- -- -- -- -- -- -- -- -- //
var getCache = function()
	{
	return (!isNodeJs && window && window.spaceifyCache ? window.spaceifyCache : null);
	}

var isCache = function()
	{
	var type = getCache();
	return (type == "undefined" || type == null ? false : true);
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyCore;
