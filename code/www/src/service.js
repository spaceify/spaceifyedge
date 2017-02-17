"use strict";

/**
 * Service, 24.1.2016 Spaceify Oy
 *
 * A single service object. Used for both provided and required services. Only for Spaceify's internal use.
 *
 * @class Service
 */

function Service(service_name, isServer, connection)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
//var SpaceifyConfig = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyUtility = require(lib + "spaceifyutility");
	fibrous = require(lib + "fibrous");
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

	//Logger = lib.Logger;
	//SpaceifyConfig = lib.SpaceifyConfig;
	var SpaceifyUtility = lib.SpaceifyUtility;
	var fibrous = function(fn) { return fn; };
	}

var utility = new SpaceifyUtility();
//var config = SpaceifyConfig.getConfig();
//var logger = Logger.getLogger("Service");

var serverUpListener = null;
var serverDownListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
self.REQUIRED = 0;
self.PROVIDED = 1;

	// PRIVATE METHODS -- -- -- -- -- -- -- -- -- -- //
var listenConnection = function(id)
	{
	for(var i = 0; i < connectionListeners.length; i++)
		connectionListeners[i](id, service_name, self.getIsSecure());
	}

var listenDisconnection = function(id)
	{
	for(var i = 0; i < disconnectionListeners.length; i++)
		disconnectionListeners[i](id, service_name, self.getIsSecure());
	}

var listenServerUp = function(id)
	{
	if(serverUpListener)
		serverUpListener(id, service_name, self.getIsSecure());
	}

var listenServerDown = function(id)
	{
	if(serverDownListener)
		listenServerDown(id, service_name, self.getIsSecure());
	}

	// PUBLIC METHODS -- -- -- -- -- -- -- -- -- -- //
self.setConnectionListener = function(listener)
	{
	if(typeof listener == "function")
		connectionListeners.push(listener);
	}

self.setDisconnectionListener = function(listener)
	{
	if(typeof listener == "function")
		disconnectionListeners.push(listener);
	}

self.setServerUpListener = function(listener)
	{
	serverUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	serverDownListener = (typeof listener == "function" ? listener : null);
	}

self.getPort = function()
	{
	return connection.getPort();
	}

self.getIsOpen = function()
	{
	return connection.getIsOpen();
	}

self.getServiceName = function()
	{
	return service_name;
	}

self.getType = function()
	{
	return isServer ? self.PROVIDED : self.REQUIRED;
	}

self.getId = function()
	{
	return connection.getId();
	}

self.getServer = function()
	{
	return (isServer ? connection : null);
	}

self.getConnection = function()
	{
	return (!isServer ? connection : null);
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.exposeRpcMethod = function(name, object, method)
	{
	connection.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	connection.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function()
	{
	connection.callRpc.apply(this, arguments);
	}

	// -- -- -- -- -- -- -- -- -- -- //
connection.setConnectionListener(listenConnection);							// Bubble events from connections and servers to this class
connection.setDisconnectionListener(listenDisconnection);
if(isServer)
	{
	connection.setServerUpListener(listenServerUp);
	connection.setServerDownListener(listenServerDown);
	}

}

if(typeof exports !== "undefined")
	module.exports = Service;