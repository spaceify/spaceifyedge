"use strict";

/**
 * Spaceify core, 29.7.2015 Spaceify Oy
 * 
 * @class SpaceifyCore
 */

function SpaceifyCore()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var apiPath = "/var/lib/spaceify/code/";
var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window !== "undefined" && window.isSpaceifyNetwork ? window.isSpaceifyNetwork : false);
var isSpaceletOrigin = (typeof window !== "undefined" && !window.location.hostname.match(/.*spaceify\.net/) ? true : false);

//var Logger = (isNodeJs ? require(apiPath + "logger") : window.Logger);
var SpaceifyNetwork = (isNodeJs ? function() {} : window.SpaceifyNetwork);
var SpaceifyConfig = (isNodeJs ? require(apiPath + "spaceifyconfig") : window.SpaceifyConfig);
var WebSocketRpcConnection = (isNodeJs ? require(apiPath + "websocketrpcconnection") : window.WebSocketRpcConnection);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var config = new SpaceifyConfig();
var network = new SpaceifyNetwork();
//var logger = new Logger("SpaceifyCore", "selogs");

var tunnelId = null;
var isConnected = false;
var connection = (isSpaceifyNetwork || isNodeJs || isSpaceletOrigin ? new WebSocketRpcConnection() : LoaderUtil.piperClient);

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
		callRpc("getManifest", [unique_name, true], function(err, data, id, ms)
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
	if(!isConnected)
		connect(method, params, callback);
	else
		call(method, params, callback);
	}

var call = function(method, params, callback)
	{
	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		connection.callRpc(method, params, self, function(err, data, id, ms)
			{
			callback(err, data, id, ms);
			});
		}
	else
		{
		connection.callClientRpc(tunnelId, method, params, self, function(err, data)
			{
			callback(err, data);
			});
		}
	}

var connect = function(method, params, callback)
	{
	var host, hostname, protocol;
	var port = (!useSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);

	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
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
				{
				isConnected = true;
				call(method, params, callback);
				}
			else
				{
				isConnected = false;
				callback(err, data, id, ms);
				}
			});
		}
	else
		{
		connection.connect(LoaderUtil.SERVER_ADDRESS.host, LoaderUtil.SERVER_ADDRESS.port, LoaderUtil.SERVER_ADDRESS.isSsl, LoaderUtil.SERVER_ADDRESS.groupId, function()
			{
			protocol = (!useSecure ? "http" : "https");
			host = network.getEdgeURL(false, null, false);

			connection.createWebSocketTunnel({host: host, port: port, protocol: protocol}, null, function(id)
				{
				tunnelId = id;
				isConnected = true;
				call(method, params, callback);
				});
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
