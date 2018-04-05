"use strict";

/**
 * REST, 15.4.2016 Spaceify Oy
 *
 * @class REST
 */

var fibrous = require("./fibrous");
var language = require("./language");
var Manifest = require("./manifest");
var Connection = require("./connection");
var SpaceifyError = require("./spaceifyerror");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyUtility = require("./spaceifyutility");
var WebSocketRpcConnection = require("./websocketrpcconnection.js");

function REST()
{
var self = this;

var errorc = new SpaceifyError();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("REST");

var coreConnection = new Connection();
var appManConnection = new Connection();

var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var apps = {};
var appCount = 0;

self.execute = fibrous( function(_request_, session, isSecure)
	{
	var find = "";
	var unique_name;
	var parameters = {};
	var nothingButUniqueName;
	var pathname = _request_.urlObj.pathname.replace(/^\/|\/$/, "");
	var segments = pathname.split("/");

	var response = { data: null, app: null, doRedirect: false, isResource: false, isREST: false, file: "" }

	if (segments.length == 2 && segments[0] == config.REST_API)										// Core API
		{
		if (typeof _request_.POST["parameters"] != "undefined")
			parameters = utility.parseJSON(_request_.POST["parameters"].body, true);

		if (segments[1] == config.REST_INSTALLAPPLICATION)
			response.data = installApplication.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_REMOVEAPPLICATION)
			response.data = removeApplication.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_PURGEAPPLICATION)
			response.data = purgeApplication.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_STARTAPPLICATION)
			response.data = startApplication.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_STOPAPPLICATION)
			response.data = stopApplication.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_RESTARTAPPLICATION)
			response.data = restartApplication.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_REQUESTMESSAGEID)
			response.data = requestMessageId.sync(session, isSecure);
		else if (segments[1] == config.REST_GETCORESETTINGS)
			response.data = getCoreSettings.sync(session, isSecure);
		else if (segments[1] == config.REST_SAVECORESETTINGS)
			response.data = saveCoreSettings.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_GETEDGESETTINGS)
			response.data = getEdgeSettings.sync(session, isSecure);
		else if (segments[1] == config.REST_SAVEEDGESETTINGS)
			response.data = saveEdgeSettings.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_GETRUNTIMESERVICESTATES)
			response.data = getRuntimeServiceStates.sync(session, isSecure);
		else if (segments[1] == config.REST_LOGIN)
			response.data = logIn.sync(parameters, session, isSecure);
		else if (segments[1] == config.REST_LOGOUT)
			response.data = logOut.sync(session, isSecure);
		else if (segments[1] == config.REST_GETAPPLICATIONS)
			response.data = getApplications.sync(parameters);
		else if (segments[1] == config.REST_ISADMINLOGGEDIN)
			response.data = isAdminLoggedIn.sync(session);
		else if (segments[1] == config.REST_GETOPENSERVICES)
			response.data = getOpenServices.sync();
		else if (segments[1] == config.REST_GETSERVICE)
			response.data = getService.sync(parameters);
		else if (segments[1] == config.REST_GETSERVICES)
			response.data = getServices.sync(parameters);
		else if (segments[1] == config.REST_GETMANIFEST)
			response.data = getManifest.sync(parameters);
		else if (segments[1] == config.REST_ISAPPLICATIONRUNNING)
			response.data = isApplicationRunning.sync(parameters);
		else if (segments[1] == config.REST_GETAPPLICATIONURL)
			response.data = getApplicationURL.sync(parameters);
		else if (segments[1] == config.REST_SETEVENTLISTENERS)
			response.data = setEventListeners.sync(parameters, session);
		else if (segments[1] == config.REST_GETEDGEID)
			response.data = getEdgeID.sync();
		/*else if (segments[1] == config.REST_REGISTERSERVICE)
			response.data = registerService.sync(parameters);
		else if (segments[1] == config.REST_UNREGISTERSERVICE)
			response.data = unregisterService.sync(parameters);
		else if (segments[1] == config.REST_STARTSPACELET)
			response.data = startSpacelet.sync(parameters);*/
		else
			response.data = { error: language.E_REST_UNKNOWN_OPERATION.pre("REST::execute"), data: null };
		}
	else if (segments.length == 1 && segments[0] == config.REST_SERVICES_LEGACY)					// The old "legacy" style service request
		{
		response.data = getOpenServices.sync();
		}
	else																							// Applications
		{ // e.g. https://clientedge.spaceify.net/someapp/api/lights/rbg/lightbulb/1/status
		pathname = pathname.replace(config["REST_" + segments[0].toUpperCase() + "_DIR"] || "", "");						// Remove operation

		for (unique_name in apps)																	// Find longest match
			{
			if (pathname.startsWith(unique_name))
				find = (unique_name.length > find.length ? unique_name : find);
			}

		if (find && (pathname.length == find.length || pathname.charCodeAt(find.length) == 47))		// URL starts with a unique_name
			{
			response.app = apps[find];

			nothingButUniqueName = (pathname.length == find.length);

			if (segments[0] == config.REST_TILE && nothingButUniqueName)
				{ // tile/<unique_name>
				response.doRedirect = true;
				response.file = config.TILE_FILE;
				}
			else if (segments[0] == config.REST_OPEN)
				{ // open/<unique_name>/<path>
				response.doRedirect = true;
				response.file = pathname.replace(find + "/", "");
				}
			else if (segments[0] == config.REST_RESOURCE)
				{ // resource/<unique_name>/<path>
				response.isResource = true;
				response.file = pathname.replace(find + "/", "");
				}
			else if (nothingButUniqueName)
				{ // <unique_name>
				response.doRedirect = true;
				response.file = config.INDEX_FILE;
				}
			else
				{ // ? -> assume <unique_name>/<REST>
				response.isREST = true;
				response.file = pathname.replace(response.app.unique_name, "");
				}
			}
		}

	return response;
	});

var installApplication = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;
	var force, username, password;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::installApplication");

		if (!parameters.package)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::installApplication");

		force = parameters.force || false;
		username = parameters.username || "";
		password = parameters.password || "";

		data = callApplicationManagerRpc.sync("installApplication", [parameters.package, username, password, null, force, false, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var removeApplication = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::removeApplication");

		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::removeApplication");

		data = callApplicationManagerRpc.sync("removeApplication", [parameters.unique_name, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var purgeApplication = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::purgeApplication");

		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::purgeApplication");

		data = callApplicationManagerRpc.sync("purgeApplication", [parameters.unique_name, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var startApplication = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::startApplication");

		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::startApplication");

		data = callApplicationManagerRpc.sync("startApplication", [parameters.unique_name, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var stopApplication = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::stopApplication");

		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::stopApplication");

		data = callApplicationManagerRpc.sync("stopApplication", [parameters.unique_name, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var restartApplication = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::restartApplication");

		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::restartApplication");

		data = callApplicationManagerRpc.sync("restartApplication", [parameters.unique_name, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var requestMessageId = fibrous( function(session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::requestMessageId");

		data = callApplicationManagerRpc.sync("requestMessageId", [session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var getCoreSettings = fibrous( function(session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::getCoreSettings");

		data = callApplicationManagerRpc.sync("getCoreSettings", [session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var saveCoreSettings = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::saveCoreSettings");

		data = callApplicationManagerRpc.sync("saveCoreSettings", [parameters.settings || {}, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var getEdgeSettings = fibrous( function(session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::getEdgeSettings");

		data = callApplicationManagerRpc.sync("getEdgeSettings", [session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var saveEdgeSettings = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::saveEdgeSettings");

		data = callApplicationManagerRpc.sync("saveEdgeSettings", [parameters.settings || {}, session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var getRuntimeServiceStates = fibrous( function(session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!session.sessionId)
			throw null;

		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::getRuntimeServiceStates");

		data = callApplicationManagerRpc.sync("getRuntimeServiceStates", [session.sessionId]);
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var logIn = fibrous( function(parameters, session, isSecure)
	{
	var data = null, error = null, isLoggedIn = false;
	var isAlreadyLoggedIn = false;

	try {
		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::logIn");

		if (session.sessionId)
			{
			isAlreadyLoggedIn = self._isAdminLoggedIn.sync(session);
			}

		if (!isAlreadyLoggedIn)
			{
			session.sessionId = "";

			session.sessionId = callApplicationManagerRpc.sync("adminLogIn", [parameters.password || ""]);

			isLoggedIn = true;
			}
		else
			{
			isLoggedIn = isAlreadyLoggedIn;
			}
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: { isLoggedIn: isLoggedIn } };
	});

var logOut = fibrous( function(session, isSecure)
	{
	var data = null, error = null;

	try {
		if (!isSecure)
			throw language.E_REST_OPERATION_DENIED.pre("REST::logOut");

		callApplicationManagerRpc.sync("adminLogOut", [session.sessionId]);

		session.sessionId = "";
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: { isLoggedIn: false } };
	});

var getApplications = fibrous( function(parameters)
	{
	var data = null, error = null;
	var dbApps, manifest;

	try {
		data = { spacelet: [], sandboxed: [], sandboxed_debian: [], native_debian: [] };
		dbApps = callApplicationManagerRpc.sync("getApplications", [parameters.types || ""]);

		for (var i = 0; i < dbApps.length; i++)
			{
			manifest = Manifest.load(dbApps[i].type, dbApps[i].unique_name);

			manifest = manifest.getManifest();
			manifest.isRunning = dbApps[i].isRunning;
			data[dbApps[i].type].push(manifest);
			}
		}
	catch(err)
		{
		error = err;
		}

	return { error: error, data: data };
	});

var isAdminLoggedIn = fibrous( function(session)
	{
	var data = null, error = null, isLoggedIn = false;

	if (session.sessionId)
		isLoggedIn = self._isAdminLoggedIn.sync(session);

	return { error: null, data: isLoggedIn };
	});

var getOpenServices = fibrous( function()
	{
	var openServices, servicesByServiceName = {};

	try {
		openServices = callCoreRpc.sync("getOpenServices", [[], true], self);

		for (var i = 0; i < openServices.length; i++)
			{
			if (!(openServices[i].service_name in servicesByServiceName))
				servicesByServiceName[openServices[i].service_name] = {};

			servicesByServiceName[openServices[i].service_name][openServices[i].unique_name] = openServices[i];
			}
		}
	catch(err)
		{
		}

	return servicesByServiceName;
	});

var getService = fibrous( function(parameters)
	{
	var service = null;

	try {
		if (!parameters.service_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::getService");

		services = callCoreRpc.sync("getService", [parameters.service_name, parameters.unique_name || ""], self);
		}
	catch(err)
		{
		}

	return service;
	});

var getServices = fibrous( function(parameters)
	{
	var services = null;

	try {
		if (!parameters.service_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::getServices");

		services = callCoreRpc.sync("getServices", [parameters.service_name], self);
		}
	catch(err)
		{
		}

	return services;
	});

var getManifest = fibrous( function(parameters)
	{
	var manifest = null;

	try {
		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::getManifest");

		manifest = callCoreRpc.sync("getManifest", [parameters.unique_name], self);
		}
	catch(err)
		{
		}

	return manifest;
	});

var registerService = fibrous( function(parameters)
	{
	var service = null;

	try {
		if (!parameters.service_name || !parameters.ports)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::registerService");

		service = callCoreRpc.sync("registerService", [parameters.service_name, parameters.ports], self);
		}
	catch(err)
		{
		}

	return service;
	});

var unregisterService = fibrous( function(parameters)
	{
	var service = null;

	try {
		if (!parameters.service_name || !parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::unregisterService");

		service = callCoreRpc.sync("unregisterService", [parameters.service_name, parameters.unique_name], self);
		}
	catch(err)
		{
		}

	return service;
	});

var isApplicationRunning = fibrous( function(parameters)
	{
	var isRunning = false;

	try {
		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::isApplicationRunning");

		isRunning = callCoreRpc.sync("isApplicationRunning", [parameters.unique_name], self);
		}
	catch(err)
		{
		}

	return isRunning;
	});

var getApplicationURL = fibrous( function(parameters)
	{
	var urlObj = null;

	try {
		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::getApplicationURL");

		urlObj = callCoreRpc.sync("getApplicationURL", [parameters.unique_name], self);
		}
	catch(err)
		{
		}

	return urlObj;
	});

var setEventListeners = fibrous( function(parameters, session)
	{
	try {
		if (!parameters.events || !session.sessionId)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::setEventListeners");

		callCoreRpc.sync("setEventListeners", [parameters.events, session.sessionId], self);
		}
	catch(err)
		{
		}

	return true;
	});

var getEdgeID = fibrous( function()
	{
	var edgeId = null;

	try {
		edgeId = callCoreRpc.sync("getEdgeID", [], self);
		}
	catch(err)
		{
		}

	return edgeId;
	});

var startSpacelet = fibrous( function(parameters)
	{
	var openRuntimeServices = null;

	try {
		if (!parameters.unique_name)
			throw language.E_REST_UNDEFINED_PARAMETERS.pre("REST::startSpacelet");

		openRuntimeServices = callCoreRpc.sync("startSpacelet", [parameters.unique_name], self);
		}
	catch(err)
		{
		}

	return openRuntimeServices;
	});

	// -- -- -- -- -- -- -- -- -- -- //
self._isAdminLoggedIn = fibrous( function(session)
	{
	var _isLoggedIn_ = false;

	try {
		_isLoggedIn_ = callCoreRpc.sync("isAdminLoggedIn", [session.sessionId], self);
		}
	catch(err)
		{
		}

	return _isLoggedIn_;
	});

	// -- -- -- -- -- -- -- -- -- -- //
self.addApp = function(manifest)
	{
	apps[manifest.unique_name] =	{
									wwwPath: unique.getWwwPath(manifest.type, manifest.unique_name, config),
									unique_name: manifest.unique_name
									};

	appCount++;
	}

self.remApp = function(unique_name)
	{
	if (apps[unique_name])
		{
		delete apps[unique_name];
		appCount--;
		}
	}

	// -- -- -- -- -- -- -- -- -- -- //
var callApplicationManagerRpc = fibrous( function(method, parameters)
	{
	var data = null;

	try {
		appManConnection.sync.connect({ hostname: config.CONNECTION_HOSTNAME, port: config.APPMAN_PORT_SECURE, isSecure: true, caCrt: caCrt });

		data = appManConnection.sync.callRpc(method, parameters, self);
		}
	catch(err)
		{
		}
	finally
		{
		appManConnection.close();
		}

	return data;
	});

var callCoreRpc = fibrous( function(method, parameters)
	{
	var data = null;

	try {
		coreConnection.connect.sync({ hostname: config.CONNECTION_HOSTNAME, port: config.CORE_PORT_SECURE, isSecure: true, caCrt: caCrt });

		data = coreConnection.sync.callRpc(method, parameters, self);
		}
	catch(err)
		{
		}
	finally
		{
		coreConnection.close();
		}

	return data;
	});

}

module.exports = REST;
