"use strict";

/**
 * Service, 24.1.2016 Spaceify Oy
 *
 * A single service object. Used for both provided and required services. Only for Spaceify's internal use.
 *
 * @class Service
 */

function Service(service_name, unique_name, isServer, connection)
{
var self = this;

var serverUpListener = null;
var serverDownListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
self.REQUIRED = 0;
self.PROVIDED = 1;

	// PRIVATE METHODS -- -- -- -- -- -- -- -- -- -- //
var listenConnection = function(connectionId, serverId, isSecure)
	{
	for(var i = 0; i < connectionListeners.length; i++)
		connectionListeners[i](connectionId, service_name, self.getIsSecure(), unique_name);
	}

var listenDisconnection = function(connectionId, serverId, isSecure)
	{
	for(var i = 0; i < disconnectionListeners.length; i++)
		disconnectionListeners[i](connectionId, service_name, self.getIsSecure(), unique_name);
	}

var listenServerUp = function(serverId)
	{
	if(serverUpListener)
		serverUpListener(serverId, service_name, self.getIsSecure(), unique_name);
	}

var listenServerDown = function(serverId)
	{
	if(serverDownListener)
		listenServerDown(serverId, service_name, self.getIsSecure(), unique_name);
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

self.getUniqueName = function()
	{
	return unique_name;
	}

self.getType = function()
	{
	return isServer ? self.PROVIDED : self.REQUIRED;
	}

self.getId = function()
	{
	return connection.getId();
	}

self.getConnection = function()
	{
	return connection;
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.connectionExists = function(connectionId)
	{
	return connection.connectionExists(connectionId);
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
