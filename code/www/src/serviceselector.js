"use strict";

/**
 * Service Selector, 27.12.2017 Spaceify Oy
 *
 * This class implements unsercure / secure service selection logic. Only for Spaceify's internal use.
 *
 * @class ServiceSelector
 */

function ServiceSelector()
{
var self = this;

var service = null;
var secureService = null;

self.add = function(service_, isSecure)
	{
	if (!isSecure)
		{
		service = service_;

		service.exposeRpcMethod = exposeRpcMethod;
		service.exposeRpcMethodSync = exposeRpcMethodSync;
		}
	else
		{
		secureService = service_;

		secureService.exposeRpcMethod = exposeRpcMethod;
		secureService.exposeRpcMethodSync = exposeRpcMethodSync;
		}
	}

self.getService = function(isSecure)
	{
	var _service = null;

	if (isSecure === false)
		{
		_service = service;
		}
	else if (isSecure === true)
		{
		_service = secureService;
		}
	else
		{
		if (secureService)
			_service = secureService;
		else if (service)
			_service = service;
		}

	return _service;
	}

self.getServiceById = function(connectionId)
	{
	var _service_ = null;

	if (service && service.connectionExists(connectionId))
		_service_ = service;
	else if (secureService && secureService.connectionExists(connectionId))
		_service_ = secureService;

	return _service_;
	}

self.closeServiceConnection = function(isSecure)
	{
	if (isSecure === false || typeof isSecure == "undefined")
		{
		if (service)
			service.getConnection().close();
		}

	if (isSecure === true || typeof isSecure == "undefined")
		{
		if (secureService)
			secureService.getConnection().close();
		}
	}

	// Expsose both unsecure and secure -- -- -- -- -- -- -- -- -- -- //
var exposeRpcMethod = function(name, object, method)
	{
	if (service)
		service.getConnection().exposeRpcMethod(name, object, method);

	if (secureService)
		secureService.getConnection().exposeRpcMethod(name, object, method);
	}

var exposeRpcMethodSync = function(name, object, method)
	{
	if (service)
		service.getConnection().exposeRpcMethodSync(name, object, method);

	if (secureService)
		secureService.getConnection().exposeRpcMethodSync(name, object, method);
	}

}

if (typeof exports !== "undefined")
	module.exports = ServiceSelector;