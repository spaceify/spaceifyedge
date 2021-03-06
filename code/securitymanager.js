"use strict";

/**
 * Service model, 20.7.2015 Spaceify Oy
 *
 * @class SecurityManager
 */

var fs = require("fs");
var url = require("url");
var crypto = require("crypto");
var fibrous = require("./fibrous");
var language = require("./language");
var Database = require("./database");
var rangeCheck = require("range_check");
var SpaceifyError = require("./spaceifyerror");
//var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");

function SecurityManager()
{
var self = this;

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SecurityManager");

var adminSessions = {};
var remoteSessions = {};
var coreSettings = null;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var adminLastLogin = null;

	// NETWORK -- -- -- -- -- -- -- -- -- -- //
self.isLocalIP = function(ip)
	{
	/*if (!ip.match(new RegExp(config.IP_REGX)))
		return false;

	var parts = ip.split(".");
	if (parts[0] == "127" || ip == config.EDGE_IP)
		return true;*/

	if (ip == "127.0.0.1" || ip == "::ffff:127.0.0.1" || ip == "::ffff:7f00:1")
		return true;

	return false;
	}

self.isApplicationIP = function(ip)
	{
	return rangeCheck.inRange(ip, config.APPLICATION_SUBNET);
	}

self.getEdgeURL = function()
	{
	return config.EDGE_HOSTNAME;
	}

self.getApplicationURL = function(isSecure)
	{
	return (isSecure ? "http://" : "https://") + config.EDGE_HOSTNAME + ":" + (isSecure ? "80" : "443");
	}

	// ADMIN -- -- -- -- -- -- -- -- -- -- //
self.adminLogIn = fibrous( function(password, remoteAddress)
	{
	checkSessionsTTL();

	var shasum;
	var result;
	var timestamp;
	var edgeSettings;
	var passwordHashed;
	var sessionId = null;
	var database = new Database();

	try {
		self.sync.isAdminSession(remoteAddress, null, true);

		// CHECK THE PASSWORD - UPDATE DATABASE
		edgeSettings = database.sync.getEdgeSettings();

		if (typeof edgeSettings == "undefined")
			throw language.E_GET_EDGE_SETTINGS_FAILED.pre("SecurityManager::adminLogIn");

		adminLastLogin = edgeSettings.admin_last_login;

		shasum = crypto.createHash("sha512");
		shasum.update(password + edgeSettings.admin_salt);
		passwordHashed = shasum.digest("hex").toString();

		if (passwordHashed != edgeSettings.admin_password)
			throw language.E_ADMIN_LOG_IN_FAILED.pre("SecurityManager::adminLogIn");

		timestamp = Date.now();

		database.sync.adminLoggedIn([timestamp]);

		// START A NEW SESSION
		shasum = crypto.createHash("sha512");
		result = utility.bytesToHexString(crypto.randomBytes(32));
		shasum.update(result);
		sessionId = shasum.digest("hex").toString();

		adminSessions[sessionId] = { timestamp: timestamp, remoteAddress: remoteAddress };
		}
	catch(err)
		{
		throw errorc.make(err);
		}
	finally
		{
		database.close();
		}

	return sessionId;
	});

self.adminLogOut = fibrous( function(sessionId, remoteAddress)
	{
	self.sync.isAdminSession(remoteAddress, null, true);

	if (sessionId in adminSessions)
		delete adminSessions[sessionId];

	checkSessionsTTL();
	});

self.getAdminLastLogin = function()
	{
	var edgeSettings;
	var database = new Database();

	try {
		if (!adminLastLogin)
			{
			if ((edgeSettings = database.sync.getEdgeSettings()))
				adminLastLogin = edgeSettings.admin_last_login;
			}
		}
	catch(err)
		{
		}
	finally
		{
		database.close();
		}

	return adminLastLogin;
	}

self.findAdminSession = fibrous( function(sessionId)
	{
	var session;

	// Check temporary session
	if (utility.sync.isFile(config.SPACEIFY_TEMP_SESSIONID))
		{
		session = fs.sync.readFile(config.SPACEIFY_TEMP_SESSIONID, "utf8");

		session = utility.parseJSON(session, true);

		if (session.sessionId == sessionId)
			return session;
		}

	// Check log in adminSessions
	checkSessionsTTL();

	if (sessionId in adminSessions)
		return adminSessions[sessionId];

	return null;
	});

self.createTemporaryAdminSession = fibrous( function(remoteAddress)
	{
	var session	=	{
					remoteAddress: remoteAddress,
					timestamp: Date.now(),
					sessionId: utility.randomString(64, true),
					};

	fs.sync.writeFile(config.SPACEIFY_TEMP_SESSIONID, JSON.stringify(session), "utf8");

	return session.sessionId;
	});

self.destroyTemporaryAdminSession = fibrous( function()
	{
	if (utility.sync.isFile(config.SPACEIFY_TEMP_SESSIONID))
		fs.sync.unlink(config.SPACEIFY_TEMP_SESSIONID);
	});

self.isAdminSession = fibrous( function(remoteAddress, sessionId, throws)
	{
	var isLocSes = false;

	try {
		if (!self.isLocalIP(remoteAddress))
			throw language.E_IS_LOCAL_SESSION_NON_EDGE_CALLER.pre("SecurityManager::isAdminSession");

		if (sessionId && !self.sync.findAdminSession(sessionId))
			throw language.E_ADMIN_NOT_LOGGED_IN.pre("SecurityManager::isAdminSession");

		isLocSes = true;
		}
	catch(err)
		{
		if (throws)
			throw err;
		}

	return isLocSes;
	});

self.refreshAdminLogInSession = function(sessionId)
	{
	if (sessionId in adminSessions)
		adminSessions[sessionId].timestamp = Date.now();
	}

	// REMOTE OPERATING -- -- -- -- -- -- -- -- -- -- //
self.remoteClientLogIn = fibrous( function(password, remoteAddress)
	{
	checkSessionsTTL();

	var shasum;
	var result;
	var timestamp;
	var edgeSettings;
	var passwordHashed;
	var sessionId = null;
	var database = new Database();

	try {
		//self.sync.isAdminSession(remoteAddress, null, true);

		// CHECK THE PASSWORD - UPDATE DATABASE
		edgeSettings = database.sync.getEdgeSettings();

		if (typeof edgeSettings == "undefined")
			throw language.E_GET_EDGE_SETTINGS_FAILED.pre("SecurityManager::remoteLogIn");

		shasum = crypto.createHash("sha512");
		shasum.update(password + edgeSettings.edge_salt);
		passwordHashed = shasum.digest("hex").toString();

		if (passwordHashed != edgeSettings.edge_password)
			throw language.E_REMOTE_LOG_IN_FAILED.pre("SecurityManager::remoteLogIn");

		timestamp = Date.now();

		//database.sync.adminLoggedIn([timestamp]);

		// START A NEW SESSION
		shasum = crypto.createHash("sha512");
		result = utility.bytesToHexString(crypto.randomBytes(32));
		shasum.update(result);
		sessionId = shasum.digest("hex").toString();

		remoteSessions[sessionId] = { timestamp: timestamp, remoteAddress: remoteAddress };
		}
	catch(err)
		{
		throw errorc.make(err);
		}
	finally
		{
		database.close();
		}

	return sessionId;
	});

self.remoteClientLogOut = fibrous( function(sessionId, remoteAddress)
	{
	//self.sync.isAdminSession(remoteAddress, null, true);

	if (sessionId in remoteSessions)
		delete remoteSessions[sessionId];

	checkSessionsTTL();
	});

	// SAME ORIGIN POLICY -- -- -- -- -- -- -- -- -- -- //
self.checkSameOriginPolicy = function(origins, URL)
	{
	var matches = 0;
	var hostname = url.parse(URL).hostname;

	for (var i = 0; i < origins.length; i++)
		{
		if (matchOrigin(origins[i], hostname))
			matches++;
		}

	return (matches > 0 ? true : false);
	}

var matchOrigin = function(origin, hostname)
	{
	var rex;
	var matched;
	var cgs = "";

	// Get origin components, e.g. *.example.* -> [ '*', '.example.', '*', '' ]
	matched = origin.match(/\*|[^\*]*/g);

	// Make a capture grouped regular expression of the components, e.g. *.example.* -> (.*)(\.example\.)(.*)
	for (var i = 0; i < matched.length; i++)
		{
		if (matched[i] == "*")
			cgs	+= "(.*)";
		else if (matched[i] != "")
			cgs	+= "(" + matched[i].replace(/\./g, "\\.") + ")";
		}

	// Match the hostname - the match must be complete (...)
	rex = new RegExp("(" + cgs + ")");
	matched = rex.exec(hostname);

	return (matched && matched[0] == hostname ? true : false);
	}

	// SERVICES -- -- -- -- -- -- -- -- -- -- //
self.getOpenServices = function(services, getHttp, remoteAddress)
	{
	var result = [];

	if (services)
		{
		for (var i = 0; i < services.length; i++)
			{ // Web pages get only OPEN services, applications and spacelets get also OPEN_LOCAL services
			if (services[i].service_type == config.OPEN)
				result.push(makePublicService(services[i]));
			else if (self.isApplicationIP(remoteAddress) && services[i].service_type == config.OPEN_LOCAL)
				result.push(makePublicService(services[i]));
			else if (services[i].service_type == config.HTTP && getHttp)
				result.push(makePublicService(services[i]));
			}
		}

	return result;
	}

self.checkServicePermissions = function(service, requiresServices, remoteAddress)
	{
	var requiresServices;
	var serviceReturn = null;

	if (!service.isRegistered)
		throw language.E_CHECK_SERVICE_PERMISSIONS_UNREGISTERED.preFmt("SecurityManager::checkServicePermissions", {"~name": service.service_name});

	if (service.service_type == config.OPEN || service.service_type == config.HTTP)					// Service is open for all
		{
		serviceReturn = makePublicService(service);
		}
	else if (self.isApplicationIP(remoteAddress))													// Caller is an application or a spacelet
		{
		if (service.service_type == config.OPEN_LOCAL)												// Service is open for all application and spacelets
			{
			serviceReturn = makePublicService(service);
			}
		else																						// Open only if service is listed in the required list
			{
			if (!requiresServices)
				throw language.E_CHECK_SERVICE_PERMISSIONS_REQUIRES_SERVICES_NOT_DEFINED.preFmt("SecurityManager::checkServicePermissions", {"unique_name": service.unique_name});

			for (var i = 0; i < requiresServices.length; i++)
				{
				if (requiresServices[i].service_name == service.service_name)
					{ serviceReturn = makePublicService(service); break; }
				}

			if (!serviceReturn)
				throw language.E_CHECK_SERVICE_PERMISSIONS_FORBIDDEN.preFmt("SecurityManager::checkServicePermissions", {"~name": service.service_name});
			}
		}

	// ToDo: create iptable rule to allow or block traffic.

	return serviceReturn;
	}

var makePublicService = function(service)
	{ // Only some of the service fields are passed to external callers (web pages, applications, spacelets)
	var publicService = {};

	publicService.service_name = service.service_name;
	publicService.service_type = service.service_type;
	publicService.port = service.port;
	publicService.securePort = service.securePort;
	publicService.ip = service.ip;
	publicService.unique_name = service.unique_name;
	publicService.type = service.type;

	return publicService;
	}

	// COMMON -- -- -- -- -- -- -- -- -- -- //
var checkSessionsTTL = function()
	{ // Remove expired sessions (= garbage collection)
	var now = Date.now();

	for (var i in adminSessions)
		{
		if ((now - adminSessions[i].timestamp) > coreSettings.log_in_session_ttl)
			delete adminSessions[i];
		}

	for (var i in remoteSessions)
		{
		if ((now - remoteSessions[i].timestamp) > coreSettings.log_in_session_ttl)
			delete remoteSessions[i];
		}
	}

	// CORE SETTINGS -- -- -- -- -- -- -- -- -- -- //
self.setCoreSettings = function(settings)
	{
	coreSettings = settings;
	}

}

module.exports = SecurityManager;
