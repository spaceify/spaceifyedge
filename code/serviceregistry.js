"use strict";

/**
 * ServiceRegistry, 9.12.2017 Spaceify Oy
 * 
 * Registry for application service information
 * 
 * @class ServiceRegistry
 */

var SpaceifyConfig = require("./spaceifyconfig");

var config = SpaceifyConfig.getConfig();

function ServiceRegistry()
{
var self = this;

var services = {};
var applications = {};

services[config.HTTP] = [];

	// STATIC SERVICE AND APPLICATION INFORMATION // // // // // // // // // //
self.addServices = function(unique_name, type, provided, isDevelop)
	{
	var provided, serviceIndex;

	applications[unique_name] = { isDevelop: isDevelop, type: type };

	for(serviceIndex = 0; serviceIndex < provided.length; serviceIndex++)
		{
		if (typeof services[provided[serviceIndex].service_name] == "undefined")
			services[provided[serviceIndex].service_name] = [];

		services[provided[serviceIndex].service_name].push({
			service_name: provided[serviceIndex].service_name,
			service_type: provided[serviceIndex].service_type,
			port: null,
			securePort: null,
			containerPort: null,
			secureContainerPort: null,
			ip: null,
			isRegistered: (provided[serviceIndex].service_type != config.HTTP ? false : true),
			unique_name: unique_name,
			type: type
			});
		}
	}

self.applicationRemoved = function(unique_name)
	{
	var serviceName, serviceIndex, key, keys = Object.keys(services);

	if (typeof applications[unique_name] != "undefined")
		delete applications[unique_name];

	for (key = 0; key < keys.length; key++)
		{
		serviceName = keys[key];

		for (serviceIndex = 0; serviceIndex < services[serviceName].length; serviceIndex++)
			{
			if (services[serviceName][serviceIndex].unique_name == unique_name)
				{
				services[serviceName].splice(serviceIndex, 1);
				break;
				}
			}

		if (services[serviceName].length == 0)
			delete services[serviceName];
		}
	}

	// STORAGE // // // // // // // // // //
self.clearRuntimeServices = function(unique_name)
	{ // Clear applications runtime service information
	var serviceName, serviceIndex;

	for (serviceName in services)
		{
		for(serviceIndex = 0; serviceIndex < services[serviceName].length; serviceIndex++)
			{
			if (services[serviceName][serviceIndex].unique_name != unique_name)
				continue;

			services[serviceName][serviceIndex].port = null;
			services[serviceName][serviceIndex].securePort = null;
			services[serviceName][serviceIndex].containerPort = null;
			services[serviceName][serviceIndex].secureContainerPort = null;
			services[serviceName][serviceIndex].ip = null;
			services[serviceName][serviceIndex].isRegistered = (services[serviceName][serviceIndex].service_type != config.HTTP ? false : true);
			}
		}
	}

self.setRuntimeServices = function(unique_name, _services, ip)
	{ // Match their ports and IPs attached to the provided services
	var service, _services_ = self.getApplicationServices(unique_name, false), _services_, serviceIndex;

	while ((service = _services_.pop()))
		{
		for (var serviceIndex = 0; serviceIndex < _services.length; serviceIndex++)
			{
			if (_services[serviceIndex].service_name == service.service_name)
				{
				service.port = _services[serviceIndex].port;
				service.securePort = _services[serviceIndex].securePort;
				service.containerPort = _services[serviceIndex].containerPort;
				service.secureContainerPort = _services[serviceIndex].secureContainerPort;
				service.ip = ip;
				}
			}
		}
	}

self.setRuntimeService = function(service_name, unique_name, ports, ip)
	{ // Set runtimen ports and IP to a develop mode or native debian application
	var service = self.getService(service_name, unique_name, false);

	if (!service)
		return;

	service.port = ports.port;
	service.securePort = ports.securePort;
	service.ip = ip;
	service.isRegistered = (service.service_type != config.HTTP ? false : true);
	}

	// REGISTRATION // // // // // // // // // //
self.registerService = function(service_name, unique_name, ports, state)
	{ // Returns runtime services when successfully registered/unregistered, null if no such service
	var service, serviceIndex;

	if (typeof services[service_name] == "undefined")
		{
		service = null;
		}
	else
		{
		for (serviceIndex = 0; serviceIndex < services[service_name].length; serviceIndex++)
			{
			if (services[service_name][serviceIndex].unique_name != unique_name)
				continue;

			services[service_name][serviceIndex].isRegistered = state;								// false = unregistered, true = registered

			if (ports)																				// develop mode, native debian and sandboxed debian
				{																					// applications can set their own ports
				services[service_name][serviceIndex].port = ports.port;
				services[service_name][serviceIndex].securePort = ports.securePort;
				}

			service = services[service_name][serviceIndex]; break;
			}
		}

	return service;
	}

	// DISCOVERY // // // // // // // // // //
self.getService = function(service_name, unique_name, isRegistered)
	{
	var _services, serviceIndex;

	_services = (typeof services[service_name] != "undefined" ? services[service_name] : []);

	for (serviceIndex = 0; serviceIndex < _services.length; serviceIndex++)
		{
		// 1:	Multiple applications can have the same service name. Return the first matching service
		//		Notice! If unique_name is not checked, the HTTP service of the first application is returned
		// 2:	The service belongs to the requested unique application
		// 3:	Must be running OR ignore state
		if	(
				(
				/*1*/ (!unique_name && service_name != config.HTTP) ||
				/*2*/ (unique_name && unique_name == _services[serviceIndex].unique_name)
				) &&
				(
				/*3*/ (isRegistered && _services[serviceIndex].isRegistered) || !isRegistered
				)
			)
			return _services[serviceIndex];
		}

	return null;
	}

self.getServices = function(service_name, isRegistered)
	{
	var _services, __services = [], serviceIndex;

	_services = (typeof services[service_name] != "undefined" ? services[service_name] : []);

	for (serviceIndex = 0; serviceIndex < _services.length; serviceIndex++)
		{
		if ((isRegistered && _services[serviceIndex].isRegistered) || !isRegistered)					// Must be running OR ignore state
			__services.push(_services[serviceIndex]);
		}

	return __services;
	}

self.getApplicationServices = function(unique_name, isRegistered)
	{
	var _services = [], serviceName, serviceIndex, service;

	for (serviceName in services)
		{
		for (serviceIndex = 0; serviceIndex < services[serviceName].length; serviceIndex++)
			{
			service = services[serviceName][serviceIndex];

			if	(
					service.unique_name == unique_name &&
					( (isRegistered && service.isRegistered) || !isRegistered )
				)
				_services.push(service);
			}
		}

	return _services;
	}

self.getRuntimeServicesCount = function()
	{
	//return services.length;
	}

self.getRuntimeServiceStates = function(type)
	{
	var status = {}, _services, uniqueName;

	for (uniqueName in applications)
		{
		if (applications[uniqueName].type != type)
			continue;

		_services = self.getApplicationServices(uniqueName, false);

		status[uniqueName] = { services: _services, isDevelop: applications[uniqueName].isDevelop };
		}

	return status;
	}

}

module.exports = ServiceRegistry;
