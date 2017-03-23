"use strict";

/**
 * Spaceify Service, 29.7.2015 Spaceify Oy
 *
 * A class for wrapping the local and remote connection logic.
 *
 * @class Connection
 */

function Connection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window !== "undefined" && window.isSpaceifyNetwork ? window.isSpaceifyNetwork : false);
var isSpaceletOrigin = (typeof window !== "undefined" && !window.location.hostname.match(/.*spaceify\.net/) ? true : false);

var lib = null;
var LoaderUtil = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var WebSocketRpcConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";
	LoaderUtil = null;
	SpaceifyNetwork = function() {};
	SpaceifyConfig = require(lib + "spaceifyconfig");
	WebSocketRpcConnection = require(lib + "websocketrpcconnection");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	LoaderUtil = (window.WEBPACK_SPL_LIBRARY ? window.WEBPACK_SPL_LIBRARY.LoaderUtil.getLoaderUtil() : {});
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	WebSocketRpcConnection = lib.WebSocketRpcConnection;
	}

var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();

var _connection = (isSpaceifyNetwork || isNodeJs || isSpaceletOrigin ? new WebSocketRpcConnection() : LoaderUtil.getPiperClient());

var tunnelId = null;
var isConnected = false;
var isConnecting = false;

self.connect = function(options, callback)
	{
	isConnecting = true;

	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		_connection.connect(options, function(err, data)
			{
			if(!err)
				{
				isConnected = true;
				isConnecting = false;

				callback(null, true);
				}
			else
				{
				isConnected = false;
				isConnecting = false;

				callback(err, null);
				}
			});
		}
	else
		{
		_connection.createWebSocketTunnel({host: network.getEdgeURL({}), port: options.port, protocol: network.getProtocol(false, null, false)}, null, function(id)
			{
			tunnelId = id;
			isConnected = true;
			isConnecting = false;

			callback(null, true);
			});
		}
	}
self.close = function()
	{
	if(_connection.close)
		_connection.close();

	_connection = null;
	}

self.callRpc = function(/*method, params, callback*/)
	{
	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		_connection.callRpc.apply(self, arguments);
		}
	else
		{
		var args = Array.prototype.slice.call(arguments);
		args.unshift(tunnelId);

		_connection.callClientRpc.apply(self, args);
		}
	}

self.exposeRpcMethod = function(name, object, method)
	{
	_connection.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	if(_connection.exposeRpcMethodSync)
		_connection.exposeRpcMethodSync(name, object, method);
	}

self.isConnected = function()
	{
	return isConnected;
	}

self.isConnecting = function()
	{
	return isConnecting;
	}

self.getPort = function()
	{
	return _connection.getPort ? _connection.getPort() : null;
	}

self.getIsOpen = function()
	{
	return _connection.getIsOpen ? _connection.getIsOpen() : null;
	}

self.getId = function()
	{
	return _connection.getId ? _connection.getId() : null;
	}

self.getIsSecure = function()
	{
	return _connection.getIsSecure ? _connection.getIsSecure() : null;
	}

self.setConnectionListener = function(listener)
	{
	if(_connection.setConnectionListener)
		_connection.setConnectionListener(listener);
	}

self.setDisconnectionListener = function(listener)
	{
	if(_connection.setDisconnectionListener)
		_connection.setDisconnectionListener(listener);
	}

}

if(typeof exports !== "undefined")
	module.exports = Connection;