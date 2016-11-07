"use strict";

/**
 * Spaceify core, 29.7.2015 Spaceify Oy
 * 
 * @class SpaceifyCore
 */

function SpaceifyCore()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof exports !== "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);
var apiPath = (isNodeJs && isRealSpaceify ? "/api/" : "/var/lib/spaceify/code/");
var isSpaceifyNetwork = (typeof window !== "undefined" && window.isSpaceifyNetwork ? window.isSpaceifyNetwork : true);

var classes =
	{
	SpaceifyNetwork: (isNodeJs ? function() {} : SpaceifyNetwork),
	SpaceifyConfig: (isNodeJs ? require(apiPath + "spaceifyconfig") : SpaceifyConfig),
	WebSocketRpcConnection: (isNodeJs ? require(apiPath + "websocketrpcconnection") : WebSocketRpcConnection)
	};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var config = new classes.SpaceifyConfig();
var network = new classes.SpaceifyNetwork();

var pipeId = null;
var isConnected = false;
var connection = (isSpaceifyNetwork ? new classes.WebSocketRpcConnection() : piperClient);

var useSecure = (isNodeJs ? true : network.isSecure());
var caCrt = (isNodeJs ? apiPath + config.SPACEIFY_CRT_WWW : "");

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

self.getOpenServices = function(unique_names, callback)
	{
	callRpc("getOpenServices", [unique_names], callback);
	}

self.getManifest = function(unique_name, callback)
	{
	var manifest = (isCache() ? getCache().getManifest(unique_name) : null);

	if(manifest)
		callback(null, manifest, -1, 0);
	else
		callRpc("getManifest", [unique_name, true], function(err, data, id, ms)
			{
			if(!err && isCache())
				getCache().setManifest(unique_name, data);

			callback(err, data, id, ms);
			});
	}

self.isAdminLoggedIn = function(callback)
	{
	network.POST_JSON(config.OPERATION_URL, {type: "isAdminLoggedIn"}, function(err, data, id, ms)
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

self.getServiceRuntimeStates = function(unique_name, callback)
	{
	callRpc("getServiceRuntimeStates", [unique_name], callback);
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
	network.POST_JSON(config.OPERATION_URL, post, callback);
	}

self.loadOptions = function(unique_name, directory, filename, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename};
	network.POST_JSON(config.OPERATION_URL, post, callback);
	}*/

	// CONNECTION -- -- -- -- -- -- -- -- -- -- //
var callRpc = function(method, params, callback)
	{
	if(!isConnected)
		connect(method, params, callback);
	else
		call(method, params, callback);
	}

var call = function(method, params, callback)
	{
	if(isSpaceifyNetwork)
		{
		connection.callRpc(method, params, self, function(err, data, id, ms)
			{
			callback(err, data, id, ms);
			});
		}
	else
		{
		connection.callClientRpc(pipeId, method, params, self, function(err, data)
			{
			callback(err, data);
			});
		}
	}

var connect = function(method, params, callback)
	{
	var hostname;
	var port = (!useSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);
	var protocol = (!useSecure ? "ws" : "wss");

	if(isSpaceifyNetwork)
		{
		if(!isNodeJs)
			hostname = config.EDGE_HOSTNAME;
		else if(isRealSpaceify)
			hostname = config.EDGE_IP;
		else
			hostname = config.CONNECTION_HOSTNAME;

		connection.connect({hostname: hostname, port: port, isSecure: useSecure, caCrt: caCrt}, function(err, data, id, ms)
			{
			if(!err)
				call(method, params, callback);
			else
				{
				isConnected = true;
				callback(err, data, id, ms);
				}
			});
		}
	else
		{
		connection.createWebSocketPipe({host: config.EDGE_HOSTNAME, port: port, protocol: protocol}, null, function(id)
			{
			pipeId = id;
			isConnected = true;
			call(method, params, callback);
			});
		}
	}

self.close = function()
	{
	if(connection && connection.close)
		connection.close();

	connection = null;
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
