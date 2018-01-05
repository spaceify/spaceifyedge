"use strict";

/**
 * Spaceify core, 2.9.2013 Spaceify Oy
 * 
 * @class Core
 */

var fs = require("fs");
var mkdirp = require("mkdirp");
var fibrous = require("./fibrous");
var RuntimeManager = require("./runtimemanager");
var DHCPDLog = require("./dhcpdlog");
var Iptables = require("./iptables");
var language = require("./language");
var Database = require("./database");
var httpStatus = require("./httpstatus");
var SecurityModel = require("./securitymodel");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyUtility = require("./spaceifyutility");
var SpaceifyNetwork = require("./spaceifynetwork");
var ServiceRegistry = require("./serviceregistry");
var WebSocketRpcServer = require("./websocketrpcserver");

function Core()
{
var self = this;

var dhcpdlog = new DHCPDLog();
var database = new Database();
var iptables = new Iptables();
var errorc = new SpaceifyError();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();
var securityModel = new SecurityModel();
//var logger = new SpaceifyLogger("Core");
var config = SpaceifyConfig.getConfig();
var serviceRegistry = new ServiceRegistry();
var spaceletManager = new RuntimeManager(config.SPACELET, self);
var sandboxedManager = new RuntimeManager(config.SANDBOXED, self);
var sandboxedDebianManager = new RuntimeManager(config.SANDBOXED_DEBIAN, self);
var nativeDebianManager = new RuntimeManager(config.NATIVE_DEBIAN, self);

var coreSettings = null;

var servers = {};
var connections = {};
var key = config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
var crt = config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

	// CONNECTION -- -- -- -- -- -- -- -- -- -- //
self.connect = fibrous( function()
	{
	var webSocketRpcServer;
	var i, types = [{port: config.CORE_PORT, isSecure: false}, {port: config.CORE_PORT_SECURE, isSecure: true}];

	for (i = 0; i < types.length; i++)															// Setup/open the servers
		{
		webSocketRpcServer = new WebSocketRpcServer();

		webSocketRpcServer.setConnectionListener(connectionListener);
		webSocketRpcServer.setDisconnectionListener(disconnectionListener);

		// Expose RPC nethods
		webSocketRpcServer.exposeRpcMethodSync("startSpacelet", self, startSpacelet);
		webSocketRpcServer.exposeRpcMethodSync("getService", self, getService);
		webSocketRpcServer.exposeRpcMethodSync("getServices", self, getServices);
		webSocketRpcServer.exposeRpcMethodSync("getOpenServices", self, getOpenServices);
		webSocketRpcServer.exposeRpcMethodSync("registerService", self, registerService);
		webSocketRpcServer.exposeRpcMethodSync("unregisterService", self, unregisterService);
		webSocketRpcServer.exposeRpcMethodSync("getApplicationStatus", self, getApplicationStatus);
		webSocketRpcServer.exposeRpcMethodSync("isApplicationRunning", self, isApplicationRunning);
		webSocketRpcServer.exposeRpcMethodSync("getApplicationData", self, getApplicationData);
		webSocketRpcServer.exposeRpcMethodSync("getApplicationURL", self, getApplicationURL);
		webSocketRpcServer.exposeRpcMethodSync("getManifest", self, getManifest);
		webSocketRpcServer.exposeRpcMethodSync("setSplashAccepted", self, setSplashAccepted);
		webSocketRpcServer.exposeRpcMethodSync("setEventListeners", self, setEventListeners);

		// THESE ARE EXPOSED ONLY OVER A SECURE CONNECTION!!!
		if (types[i].isSecure)
			{
			webSocketRpcServer.exposeRpcMethodSync("adminLogIn", self, adminLogIn);
			webSocketRpcServer.exposeRpcMethodSync("adminLogOut", self, adminLogOut);
			webSocketRpcServer.exposeRpcMethodSync("isAdminLoggedIn", self, isAdminLoggedIn);
			webSocketRpcServer.exposeRpcMethodSync("startApplication", self, startApplication);
			webSocketRpcServer.exposeRpcMethodSync("stopApplication", self, stopApplication);
			webSocketRpcServer.exposeRpcMethodSync("installApplication", self, installApplication);
			webSocketRpcServer.exposeRpcMethodSync("removeApplication", self, removeApplication);
			webSocketRpcServer.exposeRpcMethodSync("getCoreSettings", self, getCoreSettings);
			webSocketRpcServer.exposeRpcMethodSync("saveCoreSettings", self, saveCoreSettings);
			webSocketRpcServer.exposeRpcMethodSync("getEdgeSettings", self, getEdgeSettings);
			webSocketRpcServer.exposeRpcMethodSync("saveEdgeSettings", self, saveEdgeSettings);
			webSocketRpcServer.exposeRpcMethodSync("getRuntimeServiceStates", self, getRuntimeServiceStates);
			//webSocketRpcServer.exposeRpcMethodSync("saveOptions", self, saveOptions);
			//webSocketRpcServer.exposeRpcMethodSync("loadOptions", self, loadOptions);
			}

		webSocketRpcServer.sync.listen({
										hostname: config.ALL_IPV4_LOCAL, port: types[i].port,
										isSecure: types[i].isSecure, key: key, crt: crt, caCrt: caCrt,
										keepUp: true
										});

		servers[webSocketRpcServer.getId()] = webSocketRpcServer;
		}

	try
		{
		// Get core settings from the database
		coreSettings = database.sync.getCoreSettings();
		securityModel.setCoreSettings(coreSettings);

		// Install (insert) applications to cores lists
		preInstallApplications.sync(config.SPACELET, spaceletManager, false);
		preInstallApplications.sync(config.SANDBOXED, sandboxedManager, true);
		preInstallApplications.sync(config.SANDBOXED_DEBIAN, sandboxedDebianManager, true);
		preInstallApplications.sync(config.NATIVE_DEBIAN, nativeDebian, true);
		}
	catch(err)
		{
		}
	finally
		{
		database.close();
		}
	});

self.close = fibrous( function()
	{
	postRemoveApplications.sync(spaceletManager);
	postRemoveApplications.sync(sandboxedManager);
	postRemoveApplications.sync(sandboxedDebianManager);
	postRemoveApplications.sync(nativeDebianManager);

	for (var i in servers)
		servers[i].close();
	});

var preInstallApplications = fibrous( function(type, manager, doStart)
	{
	var i;
	var application;
	var providesServices;
	var dbApp = database.sync.getApplications([type]);

	for (i = 0; i < dbApp.length; i++)
		{
		application = manager.sync.install(dbApp[i].unique_name, false);

		providesServices = application.manifest.getProvidesServicesWithHttp();

		serviceRegistry.addServices(application.unique_name, application.type, providesServices, application.isDevelop);

		if (doStart)
			manager.sync.start(application.unique_name, false);
		}
	});

var postRemoveApplications = fibrous( function(manager)
	{
	var r, removed;

	removed = manager.sync.removeAll(false);

	for (r = 0; r < removed.length; r++)
		{
		serviceRegistry.applicationRemoved(removed[r]);
		}
	});

var connectionListener = function(connectionId, serverId, isSecure)
	{
	connections[connectionId] = {events: [], serverId: serverId, isSecure: isSecure};
	}

var disconnectionListener = function(connectionId, serverId, isSecure)
	{
	if (connectionId in connections)
		delete connections[connectionId];
	}

	// EXPOSED RPC METHODS -- -- -- -- -- -- -- -- -- -- //
var registerService = fibrous( function(service_name, ports, connObj)
	{ // ALLOW REGISTRATION ONLY FOR APPLICATIONS AND EDGE(=LOCAL IP)
	var isObj;
	var application;
	var service = null;

	// APPLICATION - REGISTRATION ATTEMPT FROM AN APPLICATION RUNNING IN A DOCKER CONTAINER
	if (securityModel.isApplicationIP(connObj.remoteAddress))
		{
		application = get("getApplicationByIp", connObj.remoteAddress);

		if (!application)
			throw language.E_REGISTER_SERVICE_ACCESS_DENIED.preFmt("Core::registerService", {"~address": connObj.remoteAddress});

		ports = null;	// Applications running in docker containers can not register services with custom ports
		}
	// EDGE - REGISTRATION ATTEMPT FROM A NATIVE DEBIAN OR DEVELOP MODE APPLICATION
	else if (securityModel.isLocalIP(connObj.remoteAddress))
		{
		isObj = ports instanceof Object;

		if (!isObj || (isObj && (!("unique_name" in ports) || !("port" in ports) || !("securePort" in ports))))
			throw language.E_REGISTER_SERVICE_PORTS_ARGUMENT.pre("Core::registerService");

		application = get("getApplication", ports.unique_name);

		if (!application)
			throw language.E_REGISTER_SERVICE_UNKNOWN_UNIQUE_NAME.preFmt("Core::registerService", {"~unique_name": ports.unique_name});

		serviceRegistry.setRuntimeService(service_name, ports.unique_name, ports, connObj.remoteAddress);
		}
	else
		throw language.E_REGISTER_SERVICE_ACCESS_DENIED.preFmt("Core::registerService", {"~address": connObj.remoteAddress});

	// APPLICATIONS CAN REGISTER ONLY THEIR OWN SERVICES = SERVICE NAME FOUND IN ITS SERVICES
	service = serviceRegistry.registerService(service_name, application.manifest.getUniqueName(), ports, true);

	if (!service)
		throw language.E_REGISTER_SERVICE_SERVICE_NAME_UNDEFINED.preFmt("Core::registerService", {"~name": service_name});

	return service;
	});

var unregisterService = fibrous( function(service_name, unique_name, connObj)
	{ // ALLOW UNREGISTRATION ONLY FOR APPLICATIONS AND EDGE(=LOCAL IP)
	var application;
	var service = null;

	// APPLICATION - UNREGISTRATION ATTEMPT FROM AN APPLICATION RUNNING IN A DOCKER CONTAINER
	if (securityModel.isApplicationIP(connObj.remoteAddress))
		{
		application = get("getApplicationByIp", connObj.remoteAddress);

		if (!application)
			throw language.E_UNREGISTER_SERVICE_ACCESS_DENIED.pre("Core::unregisterService", {address: connObj.remoteAddress});
		}
	// EDGE - UNREGISTRATION ATTEMPT FROM A NATIVE DEBIAN OR DEVELOP MODE APPLICATION
	else if (securityModel.isLocalIP(connObj.remoteAddress))
		{
		application = get("getApplication", unique_name);

		if (!application)
			throw language.E_UNREGISTER_SERVICE_UNKNOWN_UNIQUE_NAME.preFmt("Core::unregisterService", {"~unique_name": unique_name});
		}
	else
		throw language.E_UNREGISTER_SERVICE_ACCESS_DENIED.pre("Core::unregisterService", {address: connObj.remoteAddress});

	// APPLICATION CAN UNREGISTER ONLY ITS OWN SERVICES = SERVICE NAME FOUND IN THE SERVICES
	service = serviceRegistry.registerService(service_name, application.manifest.getUniqueName(), null, false);

	if (!service)
		throw language.E_UNREGISTER_SERVICE_SERVICE_NAME_UNDEFINED.pre("Core::unregisterService", {name: service_name});

	return service;
	});

var getService = fibrous( function(service_name, unique_name, connObj)
	{ // Get single service either by service name or service name and unique_name. Returns only registered services!!!
	var application;
	var runtimeService;
	var requiresServices;

	if (unique_name)
		{
		application = get("getApplication", unique_name);
		}
	else
		{
		application = get("getApplicationByIp", connObj.remoteAddress);
		}

	requiresServices = (!application ? null : application.manifest.getRequiresServices());

	runtimeService = serviceRegistry.getService(service_name, unique_name, true);

	if (!runtimeService)
		throw language.E_GET_SERVICE_UNKNOWN_SERVICE.preFmt("Core::getService", {"~name": service_name});

	return securityModel.checkServicePermissions(runtimeService, requiresServices, connObj.remoteAddress);
	});

var getServices = fibrous( function(service_name, connObj)
	{ // Get all services with the requested service name. Returns only registered services!!!
	var s;
	var service;
	var application;
	var runtimeServices;
	var requiresServices = null;
	var preparedRuntimeServices = {};

	runtimeServices = serviceRegistry.getServices(service_name, true);

	if (Object.keys(runtimeServices).length == 0)
		throw language.E_GET_SERVICE_UNKNOWN_SERVICE.preFmt("Core::getServices", {"~name": service_name});

	application = get("getApplicationByIp", connObj.remoteAddress);

	requiresServices = (!application ? null : application.manifest.getRequiresServices());

	for (s = 0; s < runtimeServices.length; s++)
		{
		try {
			service = securityModel.checkServicePermissions(runtimeServices[s], requiresServices, connObj.remoteAddress);

			preparedRuntimeServices[runtimeServices[s].unique_name] = service;
			}
		catch(err)
			{}
		}

	return preparedRuntimeServices;
	});

var getOpenServices = fibrous( function(unique_names, getHttp, connObj)
	{ // Get all the open and allowed open_local runtime services from all the unique applications in the list. Include only registered services!!!
	var application;
	var providesServices;
	var runtimeServices = [];

	if (unique_names.length == 0)
		{
		unique_names = unique_names.concat(spaceletManager.getUniqueNames());
		unique_names = unique_names.concat(sandboxedManager.getUniqueNames());
		unique_names = unique_names.concat(sandboxedDebianManager.getUniqueNames());
		unique_names = unique_names.concat(nativeDebianManager.getUniqueNames());
		}

	for (var i = 0; i < unique_names.length; i++)
		{
		application = get("getApplication", unique_names[i]);

		if (!application)
			throw language.E_APPLICATION_IS_NOT_INSTALLED.preFmt("Core::getOpenServices", {"~name": unique_name});

		providesServices = serviceRegistry.getApplicationServices(unique_names[i], true);

		runtimeServices = runtimeServices.concat(
			securityModel.getOpenServices(providesServices, getHttp, connObj.remoteAddress)
			);
		}

	return runtimeServices;
	});

var adminLogIn = fibrous( function(password, connObj)
	{
	return securityModel.sync.adminLogIn(password, connObj.remoteAddress);
	});

var adminLogOut = fibrous( function(sessionId, connObj)
	{
	securityModel.sync.adminLogOut(sessionId, connObj.remoteAddress);

	return true;
	});

var isAdminLoggedIn = fibrous( function(sessionId, connObj)
	{
	securityModel.sync.isAdminSession(connObj.remoteAddress, null, true/*throws*/);

	var session = securityModel.sync.findAdminSession(sessionId);

	return (session ? true : false);
	});

var setSplashAccepted = fibrous( function(connObj)
	{
	try {
		var lease = dhcpdlog.getDHCPLeaseByIP(connObj.remoteAddress);							// Lease must exist for the device

		if (!lease)
			throw language.E_UNKNOWN_MAC.pre("Core::setSplashAccepted");

		if (!iptables.sync.splashAddRule(lease.macOrDuid))										// Add MAC to the iptables rules
			throw language.E_SET_SPLASH_ACCEPTED_FAILED.pre("Core::setSplashAccepted");

		/*	The following line removes connection tracking for the PC. This clears any previous (incorrect) route info for the redirection
			exec("sudo rmtrack ".$_SERVER['REMOTE_ADDR']);
			Create the file /usr/bin/rmtrack and make it executable with the following contents:
				/usr/sbin/conntrack -L \
				|grep $1 \
				|grep ESTAB \
				|grep 'dport=80' \
				|awk \
				"{ system(\"conntrack -D --orig-src $1 --orig-dst \" \
				substr(\$6,5) \" -p tcp --orig-port-src \" substr(\$7,7) \" \
				--orig-port-dst 80\"); }"	*/
		}
	catch(err)
		{
		throw errorc.make(err);
		}

	return true;
	});

var startSpacelet = fibrous( function(unique_name, connObj)
	{
	var application;
	var spacelet = null;
	var startObject = {};
	var providesServices;
	var openRuntimeServices = [];

	try {
		if (securityModel.isApplicationIP(connObj.remoteAddress))
			throw language.E_START_SPACELET_APPLICATIONS_CAN_NOT_START_SPACELETS.pre("Core::startSpacelet");

		application = get("getApplication", unique_name)

		if (!application)
			throw language.E_START_SPACELET_NOT_INSTALLED.preFmt("Core::startSpacelet", {"~unique_name": unique_name});

		if (application.type != config.SPACELET)
			throw language.E_START_SPACELET_IS_NOT_SPACELET.preFmt("Core::startSpacelet", {"~unique_name": unique_name});

		if (!securityModel.checkSameOriginPolicy(application.manifest.getOrigins(), connObj.origin))
			throw language.E_START_SPACELET_FORBIDDEN_ORIGIN.pre("Core::startSpacelet");

		spaceletManager.sync.start(unique_name, true);

		providesServices = serviceRegistry.getApplicationServices(unique_name, true);

		openRuntimeServices = securityModel.getOpenServices(providesServices, false, null);

		// Events
		startObject.manifest = extendManifest(application);
		startObject.openRuntimeServices = openRuntimeServices;

		callEvent(config.EVENT_SPACELET_STARTED, startObject);
		}
	catch(err)
		{
		throw language.E_START_SPACELET_FAILED.pre("Core::startSpacelet", err);
		}

	return openRuntimeServices;
	});

var installApplication = fibrous( function(unique_name, type, sessionId, throws, connObj)
	{ // Install (insert) application or spacelet to cores list of applications or spacelets
	var event;
	var application;
	var providesServices;
	var isInstalled = true;

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		application = getManager(type).sync.install(unique_name, true);

		providesServices = application.manifest.getProvidesServicesWithHttp();

		serviceRegistry.addServices(application.unique_name, application.type, providesServices, application.isDevelop);

		// Events
		if (type == config.SPACELET)
			event = config.EVENT_SPACELET_INSTALLED;
		else if (type == config.SANDBOXED)
			event = config.EVENT_SANDBOXED_INSTALLED;
		else if (type == config.SANDBOXED_DEBIAN)
			event = config.EVENT_SANDBOXED_DEBIAN_INSTALLED;
		else if (type == config.NATIVE_DEBIAN)
			event = config.EVENT_NATIVE_DEBIAN_INSTALLED;

		callEvent(event, { manifest: getManifest.sync(unique_name, true, false, connObj) });
		}
	catch(err)
		{
		isInstalled = false;

		if (throws)
			throw err;
		}

	return isInstalled;
	});

var removeApplication = fibrous( function(unique_name, sessionId, throws, connObj)
	{ // Removes, and when necessary stops, application or spacelet and removes it from cores lists
	var type;
	var event;
	var application;
	var isRemoved = false;

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		// REMOVE APPLICATION
		application = get("getApplication", unique_name)

		if (!application)
			throw language.E_APPLICATION_IS_NOT_INSTALLED.preFmt("Core::removeApplication", {"~name": unique_name});

		type = application.manifest.getType();

		isRemoved = getManager(type).sync.remove(unique_name, true);

		serviceRegistry.applicationRemoved(unique_name);

		// Events
		if (type == config.SPACELET)
			event = config.EVENT_SPACELET_REMOVED;
		else if (type == config.SANDBOXED)
			event = config.EVENT_SANDBOXED_REMOVED;
		else if (type == config.SANDBOXED_DEBIAN)
			event = config.EVENT_SANDBOXED_DEBIAN_REMOVED;
		else if (type == config.NATIVE_DEBIAN)
			event = config.EVENT_NATIVE_DEBIAN_REMOVED;

		callEvent(event, { manifest: extendManifest(application) });
		}
	catch(err)
		{
		isRemoved = false;

		if (throws)
			throw err;
		}

	return isRemoved;
	});

var startApplication = fibrous( function(unique_name, sessionId, throws, connObj)
	{ // Start application or spacelet
	var type;
	var event;
	var application;
	var startObject = {};
	var isStarted = true;
	var providesServices;
	var applicationStatus;

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		// START APPLICATION
		if (!(application = get("getApplication", unique_name)))
			throw language.E_APPLICATION_IS_NOT_INSTALLED.preFmt("Core::startApplication", {"~name": unique_name});

		type = application.manifest.getType();

		if (application.isDevelop)
			throw language.E_PACKAGE_DEVELOP_MODE.preFmt("Core::startApplication", {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[type]});

		//if (getManager(type).sync.isRunning(unique_name))
		//	throw language.E_PACKAGE_ALREADY_RUNNING.preFmt("Core::startApplication", {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[type]});

		getManager(type).sync.start(unique_name, true);

		providesServices = serviceRegistry.getApplicationServices(unique_name, true);

		// Events
		if (type == config.SPACELET)
			event = config.EVENT_SPACELET_STARTED;
		else if (type == config.SANDBOXED)
			event = config.EVENT_SANDBOXED_STARTED;
		else if (type == config.SANDBOXED_DEBIAN)
			event = config.EVENT_SANDBOXED_DEBIAN_STARTED;
		else if (type == config.NATIVE_DEBIAN)
			event = config.EVENT_NATIVE_DEBIAN_STARTED;

		startObject.manifest = getManifest.sync(unique_name, true, false, connObj);
		startObject.openRuntimeServices = securityModel.getOpenServices(providesServices, false, connObj.remoteAddress);

		callEvent(event, startObject);
		}
	catch(err)
		{
		isStarted = false;

		if (throws)
			throw err;
		}

	return isStarted;
	});

var stopApplication = fibrous( function(unique_name, sessionId, throws, connObj)
	{ // Stops application or spacelet
	var type;
	var event;
	var application;
	var isStopped = true;
	var applicationStatus;

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		// STOP APPLICATION
		if (!(application = get("getApplication", unique_name)))
			throw language.E_APPLICATION_IS_NOT_INSTALLED.preFmt("Core::stopApplication", {"~name": unique_name});

		type = application.manifest.getType();

		if (application.isDevelop)
			throw language.E_PACKAGE_DEVELOP_MODE.preFmt("Core::stopApplication", {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[type]});

		//if (!getManager(type).sync.isRunning(unique_name))
		//	throw language.E_PACKAGE_ALREADY_STOPPED.preFmt("Core::stopApplication", {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[type]});

		getManager(type).sync.stop(unique_name, true);

		serviceRegistry.clearRuntimeServices(unique_name);

		// Events
		if (type == config.SPACELET)
			event = config.EVENT_SPACELET_STOPPED;
		else if (type == config.SANDBOXED)
			event = config.EVENT_SANDBOXED_STOPPED;
		else if (type == config.SANDBOXED_DEBIAN)
			event = config.EVENT_SANDBOXED_DEBIAN_STOPPED;
		else if (type == config.NATIVE_DEBIAN)
			event = config.EVENT_NATIVE_DEBIAN_STOPPED;

		callEvent(event, { manifest: extendManifest(application) });
		}
	catch(err)
		{
		isStopped = false;

		if (throws)
			throw err;
		}

	return isStopped;
	});

var getApplicationStatus = fibrous( function(unique_name, connObj)
	{
	var application = get("getApplication", unique_name);

	if (!application)
		return { isRunning: false, isDevelop: false };

	return { isRunning: getManager(application.type).sync.isRunning(application.unique_name),
			isDevelop: application.isDevelop };
	});

var isApplicationRunning = fibrous( function(unique_name, connObj)
	{
	var application = get("getApplication", unique_name);

	return (application ? getManager(application.type).sync.isRunning(application.unique_name) : false);
	});

var getApplicationData = fibrous( function(connObj)
	{ // Get application and spacelet data
	var i;
	var appDir = "";
	var manifest = null;
	var dbSpacelet, dbSandboxed, dbSandboxedDebian, dbNativeDebian;
	var appData = { spacelet: [], sandboxed: [], sandboxed_debian: [], native_debian: [] };

	try { dbSpacelet = database.sync.getApplications([config.SPACELET]); } catch(err) { dbSpacelet = []; }
	try { dbSandboxed = database.sync.getApplications([config.SANDBOXED]); } catch(err) { dbSandboxed = []; }
	try { dbSandboxedDebian = database.sync.getApplications([config.SANDBOXED_DEBIAN]); } catch(err) { dbSandboxedDebian = []; }
	try { dbNativeDebian = database.sync.getApplications([config.NATIVE_DEBIAN]); } catch(err) { dbNativeDebian = []; }
	database.close();

	for (i = 0; i < dbSpacelet.length; i++)
		{
		if ((manifest = getManifest.sync(dbSpacelet[i].unique_name, true, false, connObj)))
			appData.spacelet.push(manifest);
		}

	for (i = 0; i < dbSandboxed.length; i++)
		{
		if ((manifest = getManifest.sync(dbSandboxed[i].unique_name, true, false, connObj)))
			appData.sandboxed.push(manifest);
		}

	for (i = 0; i < dbSandboxedDebian.length; i++)
		{
		if ((manifest = getManifest.sync(dbSandboxedDebian[i].unique_name, true, false, connObj)))
			appData.sandboxed_debian.push(manifest);
		}

	for (i = 0; i < dbNativeDebian.length; i++)
		{
		if ((manifest = getManifest.sync(dbNativeDebian[i].unique_name, true, false, connObj)))
			appData.native_debian.push(manifest);
		}

	return appData;
	});

var getApplicationURL = fibrous( function(unique_name, connObj)
	{ // Get application or spacelet URL
	var application;
	var port, securePort, url, secureUrl;

	try {
		if (!(application = get("getApplication", unique_name)))
			throw "";

		var type = application.manifest.getType();
		var implementsWebServer = application.manifest.implementsWebServer();
		var httpService = serviceRegistry.getService(config.HTTP, unique_name, true);

		if (implementsWebServer && httpService)											// Use applications internal server
			{
			port = (network.sync.isPortInUse(httpService.port) ? httpService.port : null);
			securePort = (network.sync.isPortInUse(httpService.securePort) ? httpService.securePort : null);
			url = config.EDGE_HOSTNAME + ":" + port;
			secureUrl = config.EDGE_HOSTNAME + ":" + securePort;
			}
		else																			// Use cores web server
			{
			port = null;
			securePort = null;
			url = config.EDGE_HOSTNAME;
			secureUrl = config.EDGE_HOSTNAME;
			}
		}
	catch(err)
		{
		throw language.E_GET_APPLICATION_URL_FAILED.pre("Core::getApplicationURL", err);
		}

	return	{
			url: url, secureUrl: secureUrl, port: port, securePort: securePort,
			implementsWebServer: implementsWebServer, unique_name: unique_name, type: type
			};
	});

var getManifest = fibrous( function(unique_name, extend, throws, connObj)
	{ // Get application or spacelet manifest, get extended information if it is requested
	var application;
	var manifest = null;

	application = get("getApplication", unique_name);

	if (!application.manifest && throws)
		throw language.E_GET_MANIFEST_FAILED.preFmt("Core::getManifest", {"~name": unique_name});

	if (application.manifest && extend)
		manifest = extendManifest(application);
	else
		manifest = application.manifest.getManifest();

	return manifest;
	});
var extendManifest = function(application)
	{
	var manifest = application.manifest.getManifest();
	manifest.hasTile = application.manifest.hasTile();
	manifest.isRunning = getManager(application.type).sync.isRunning(application.unique_name);

	return manifest;
	}

var getRuntimeServiceStates = fibrous( function(sessionId, connObj)
	{ // Get application or spacelet runtime services
	var status = {spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}};

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		// GET SERVICE RUNTIME STATES
		status.spacelet = serviceRegistry.getRuntimeServiceStates(config.SPACELET);

		status.sandboxed = serviceRegistry.getRuntimeServiceStates(config.SANDBOXED);

		status.sandboxed_debian = serviceRegistry.getRuntimeServiceStates(config.SANDBOXED_DEBIAN);

		status.native_debian = serviceRegistry.getRuntimeServiceStates(config.NATIVE_DEBIAN);
		}
	catch(err)
		{
		throw language.E_GET_SERVICE_RUNTIME_STATES_FAILED.pre("Core::getRuntimeServiceStates", err);
		}

	return status;
	});

var getCoreSettings = fibrous( function(sessionId, connObj)
	{
	var settings = {};

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		settings = database.sync.getCoreSettings();
		}
	catch(err)
		{
		throw language.E_GET_CORE_SETTINGS_FAILED.pre("Core::getCoreSettings", err);
		}
	finally
		{
		database.close();
		}

	return settings;
	});

var saveCoreSettings = fibrous( function(settings, sessionId, connObj)
	{
	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		database.sync.saveCoreSettings(settings);								// Save to database and update to security model
		securityModel.setCoreSettings(settings);

		callEvent(config.EVENT_CORE_SETTINGS_CHANGED, settings);
		}
	catch(err)
		{
		throw language.E_SAVE_CORE_SETTINGS_FAILED.pre("Core::saveCoreSettings", err);
		}
	finally
		{
		database.close();
		}

	return true;
	});

var getEdgeSettings = fibrous( function(sessionId, connObj)
	{
	var settings = {};

	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		settings = database.sync.getEdgeSettings();
		}
	catch(err)
		{
		throw language.E_GET_EDGE_SETTINGS_FAILED.pre("Core::getEdgeSettings", err);
		}
	finally
		{
		database.close();
		}

	return	{
			edge_id: settings.edge_id, edge_name: settings.edge_name, edge_enable_remote: settings.edge_enable_remote,
			edge_require_password: settings.edge_require_password, admin_login_count: settings.admin_login_count,
			admin_last_login: securityModel.getAdminLastLogin()
			};
	});

var saveEdgeSettings = fibrous( function(settings, sessionId, connObj)
	{
	try {
		securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, true/*throws*/);

		securityModel.refreshAdminLogInSession(sessionId);

		delete settings.edge_password;
		delete settings.edge_salt;
		delete settings.admin_password;
		delete settings.admin_salt;
		delete settings.admin_login_count;
		delete settings.admin_last_login;

		var edge_enable_remote = parseInt(settings.edge_enable_remote);
		var edge_require_password = parseInt(settings.edge_require_password);

		if (edge_enable_remote != 0 && edge_enable_remote != 1)
			settings.edge_enable_remote = 0;

		if (edge_require_password != 0 && edge_require_password != 1)
			settings.edge_require_password = 0;

		database.sync.saveEdgeSettings(settings);								// Save to database and update to security model
		//securityModel.setEdgeSettings(settings);

		callEvent(config.EVENT_EDGE_SETTINGS_CHANGED, settings);
		}
	catch(err)
		{
		throw language.E_SAVE_EDGE_SETTINGS_FAILED.pre("Core::saveEdgeSettings", err);
		}
	finally
		{
		database.close();
		}

	return true;
	});

self.registerEdge = fibrous( function()
	{
	var result;
	var parts = [];
	var edgeIdFile;

	try {
		if (utility.sync.isFile(config.SPACEIFY_REGISTRATION_FILE))
			{
			edgeIdFile = fs.sync.readFile(config.SPACEIFY_REGISTRATION_FILE, {encoding: "utf8"});
			parts = edgeIdFile.split(",");

			result = utility.sync.postRegister(parts[0], parts[1]);

			if (typeof result == "number")																// Other than 200 OK was received?
				throw language.E_REGISTER_EDGE_FAILED.preFmt("Core::register", {"~result": result,
					"~httpStatus": "(" + (httpStatus[result] ? httpStatus[result].message : httpStatus["unknown"].message) + ")"});
			else if (result != "")
				throw language.E_REGISTER_EDGE_FAILED.preFmt("Core::register", {"~result": result});
			}
		}
	catch(err)
		{
		throw err;
		}

	return true;
	});

/**
 * Client connections can register themselves as event listeners. Event listeners are implemented as exposed RPC methods on the clients side.
 *
 */
var setEventListeners = fibrous( function(events, sessionId, connObj)
	{
	var isAdminSession = securityModel.sync.isAdminSession(connObj.remoteAddress, sessionId, false/*!throws*/);

	for (var i = 0; i < events.length; i++)										// Set the event listeners for the connection
		{
		if (events[i] == config.EVENT_EDGE_SETTINGS_CHANGED && isAdminSession)
			connections[connObj.connectionId].events.push(events[i]);
		else if (events[i] == config.EVENT_CORE_SETTINGS_CHANGED && isAdminSession)
			connections[connObj.connectionId].events.push(events[i]);
		else if (events[i] == config.EVENT_SANDBOXED_INSTALLED ||
				events[i] == config.EVENT_SANDBOXED_REMOVED ||
				events[i] == config.EVENT_SANDBOXED_STARTED ||
				events[i] == config.EVENT_SANDBOXED_STOPPED ||
				events[i] == config.EVENT_SANDBOXED_DEBIAN_INSTALLED ||
				events[i] == config.EVENT_SANDBOXED_DEBIAN_REMOVED ||
				events[i] == config.EVENT_SANDBOXED_DEBIAN_STARTED ||
				events[i] == config.EVENT_SANDBOXED_DEBIAN_STOPPED ||
				events[i] == config.EVENT_SPACELET_INSTALLED ||
				events[i] == config.EVENT_SPACELET_REMOVED ||
				events[i] == config.EVENT_SPACELET_STARTED ||
				events[i] == config.EVENT_SPACELET_STOPPED ||
				events[i] == config.EVENT_NATIVE_DEBIAN_INSTALLED ||
				events[i] == config.EVENT_NATIVE_DEBIAN_REMOVED ||
				events[i] == config.EVENT_NATIVE_DEBIAN_STARTED ||
				events[i] == config.EVENT_NATIVE_DEBIAN_STOPPED)
			connections[connObj.connectionId].events.push(events[i]);
		}

	return true;
	});

/*var saveOptions = fibrous( function(sessionId, unique_name, directory, file, data, connObj)
	{
	var dbApp;
	var volumePath;
	var optionsOk = false;
	var session = securityModel.findAdminSession(sessionId);

	try {
		if (!session || session.ip != connObj.remoteAddress)							// Accept only from the same ip (= logged in device)
			throw language.E_INVALID_SESSION.pre("Core::saveOptions");

		dbApp = database.sync.getApplication(unique_name) || null;						// Get application, path to volume, create directory and save
		if (!dbApp)
			throw language.E_APPLICATION_IS_NOT_INSTALLED.preFmt("Core::saveOptions", {"~name": unique_name});

		volumePath = unique.getVolPath(dbApp.type, unique_name, config);

		if (directory != "")
			{
			directory += (directory.search(/\/$/) != -1 ? "" : "/");
			mkdirp.sync(volumePath + directory, parseInt("0755", 8));
			}

		fs.sync.writeFile(volumePath + directory + file, data);

		optionsOk = true;
		}
	catch(err)
		{
		throw errorc.make(err);
		}
	finally
		{
		database.close();
		}

	return optionsOk;
	});

var loadOptions = fibrous( function(sessionId, unique_name, directory, file, connObj)
	{
	var data;
	var dbApp;
	var volumePath;
	var data = null;
	var session = securityModel.findAdminSession(sessionId);

	try {
		if (!session || session.ip != connObj.remoteAddress)							// Accept only from the same ip (= logged in device)
			throw language.E_INVALID_SESSION.pre("Core::loadOptions");

		dbApp = database.sync.getApplication(unique_name) || null;						// Get application, path to volume and load
		if (!dbApp)
			throw language.E_APPLICATION_IS_NOT_INSTALLED.preFmt("Core::loadOptions", {"~name": unique_name});

		volumePath = unique.getVolPath(dbApp.type, unique_name, config);

		if (directory != "")
			directory += (directory.search(/\/$/) != -1 ? "" : "/");

		data = fs.sync.readFile(volumePath + directory + file, {encoding: "utf8"});
		}
	catch(err)
		{
		throw errorc.make(err);
		}
	finally
		{
		database.close();
		}

	return data;
	});*/

	// PRIVATE -- -- -- -- -- -- -- -- -- -- //
var get = function(method, search)
	{
	var result = spaceletManager[method](search);

	if (result == null)
		result = sandboxedManager[method](search);

	if (result == null)
		result = sandboxedDebianManager[method](search);

	if (result == null)
		result = nativeDebianManager[method](search);

	return result;
	}

var getManager = function(type)
	{
	var runtimemanager = null;

	if (type == config.SPACELET)
		runtimemanager = spaceletManager;
	else if (type == config.SANDBOXED)
		runtimemanager = sandboxedManager;
	else if (type == config.SANDBOXED_DEBIAN)
		runtimemanager = sandboxedDebianManager;
	else if (type == config.NATIVE_DEBIAN)
		runtimemanager = nativeDebianManager;

	return runtimemanager;
	}

/**
 * Call the event listeners exposed by connections (see setEventListeners).
 */
var callEvent = function(event)
	{
	var data = [];

	for (var i = 1; i < arguments.length; i++)
		data.push(arguments[i]);

	for (var id in connections)
		{
		if (connections[id].events.indexOf(event) != -1)
			servers[connections[id].serverId].callRpc(event, data, null, null, id);
		}
	}

/**
 * Bridge ServiceRegistry and RuntimeManager
 */
self.preContainerRun = function(unique_name, provided, IP)
	{
	serviceRegistry.setRuntimeServices(unique_name, provided, IP);
	}

}

module.exports = Core;
