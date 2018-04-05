"use strict";

/**
 * Spaceify Http Service, 17.6.2015 Spaceify Oy
 *
 * @class HttpService
 */

var fs = require("fs");
var url = require("url");
var crypto = require("crypto");
var REST = require("./rest");
var fibrous = require("./fibrous");
var language = require("./language");
var WebServer = require("./webserver");
var SecurityManager = require("./securitymanager");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyUtility = require("./spaceifyutility");
var SpaceifyNetwork = require("./spaceifynetwork");
var ValidateApplication = require("./validateapplication");
var WebSocketRpcConnection = require("./websocketrpcconnection");

function HttpService()
{
var self = this;

var logger = new SpaceifyLogger("HttpService"); logger.cloneInstanceToBaseConfiguration();
var httpServer = new WebServer();
var httpsServer = new WebServer();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();
var rest = new REST();
var securityManager = new SecurityManager();
var config = SpaceifyConfig.getConfig();
var coreConnection = new WebSocketRpcConnection();

var edgeSettings = {};
var coreDisconnectionTimerId = null;

var key = config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
var crt = config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var cleanUpIntervalId;																// Make clean up interval less than session interval
var CLEAN_UP_INTERVAL = 600 * 1000;
var SESSION_INTERVAL = 3600 * 24 * 1000;

var sessions = {};

var LOGIN_INDEX = config.APPSTORE + config.LOGIN_FILE;
var SECURITY_INDEX = config.APPSTORE + config.SECURITY_FILE;
var APPSTORE_INDEX = config.APPSTORE + config.INDEX_FILE;

var unsecure_session = { timestamp: 0, token: "", sessionId: "" };

self.start = fibrous( function()
	{
	process.title = "spaceifyhttp";													// Shown in ps aux

	try	{
		// Set listeners
		httpServer.setServerUpListener(serverUpListener);
		httpServer.setServerDownListener(serverDownListener);
		httpsServer.setServerUpListener(serverUpListener);
		httpsServer.setServerDownListener(serverDownListener);

		httpServer.setRequestListener(requestListener);
		httpsServer.setRequestListener(requestListener);

		httpServer.addHeader("Access-Control-Expose-Headers", config.SESSION_TOKEN_NAME);
		httpsServer.addHeader("Access-Control-Expose-Headers", config.SESSION_TOKEN_NAME);

		httpServer.addAccessControlAllowHeaders(config.SESSION_TOKEN_NAME);
		httpsServer.addAccessControlAllowHeaders(config.SESSION_TOKEN_NAME);

		// Connect
		createHttpServer.sync(false);
		createHttpServer.sync(true);

		// Setup a connection to the core
		coreConnection.setDisconnectionListener(coreDisconnectionListener);

		coreConnection.exposeRpcMethodSync(config.EVENT_SPACELET_INSTALLED, self, spaceletInstalled);
		coreConnection.exposeRpcMethodSync(config.EVENT_SPACELET_REMOVED, self, spaceletRemoved);
		//coreConnection.exposeRpcMethodSync(config.EVENT_SPACELET_STARTED, self, spaceletStarted);
		//coreConnection.exposeRpcMethodSync(config.EVENT_SPACELET_STOPPED, self, spaceletStopped);
		coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_INSTALLED, self, sandboxedInstalled);
		coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_REMOVED, self, sandboxedRemoved);
		//coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_STARTED, self, sandboxedStarted);
		//coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_STOPPED, self, sandboxedStopped);
		coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_DEBIAN_INSTALLED, self, sandboxedDebianInstalled);
		coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_DEBIAN_REMOVED, self, sandboxedDebianRemoved);
		//coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_DEBIAN_STARTED, self, sandboxedDebianStarted);
		//coreConnection.exposeRpcMethodSync(config.EVENT_SANDBOXED_DEBIAN_STOPPED, self, sandboxedDebianStopped);
		coreConnection.exposeRpcMethodSync(config.EVENT_NATIVE_DEBIAN_INSTALLED, self, nativeDebianInstalled);
		coreConnection.exposeRpcMethodSync(config.EVENT_NATIVE_DEBIAN_REMOVED, self, nativeDebianRemoved);
		//coreConnection.exposeRpcMethodSync(config.EVENT_NATIVE_DEBIAN_STARTED, self, nativeDebianStarted);
		//coreConnection.exposeRpcMethodSync(config.EVENT_NATIVE_DEBIAN_STOPPED, self, nativeDebianStopped);
		coreConnection.exposeRpcMethodSync(config.EVENT_EDGE_SETTINGS_CHANGED, self, edgeSettingsChanged);

		connectToCore.sync();

		/*var uid = parseInt(process.env.SUDO_UID);									// ToDo: No super user rights
		if (uid)
			process.setuid(uid);*/

		// -- -- -- -- -- -- -- -- -- -- //
		cleanUpIntervalId = setInterval(cleanUp, CLEAN_UP_INTERVAL);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	});

var createHttpServer = fibrous( function(isSecure)
	{
	var server = (!isSecure ? httpServer : httpsServer);

	server.listen.sync({hostname: config.ALL_IPV4_LOCAL,
						 port: (!isSecure ? config.EDGE_PORT_HTTP : config.EDGE_PORT_HTTPS),
						 isSecure: isSecure,
						 key: key,
						 crt: crt,
						 caCrt: caCrt,
						 indexFile: config.INDEX_FILE,
						 wwwPath: config.SPACEIFY_WWW_PATH,
						 serverName: config.SERVER_NAME,
						 isEdge: true,
						 cookieDomain: config.EDGE_HOSTNAME,
						 cookiePath: "/",
						 cookieSecure: (isSecure ? "Secure" : false),
						 sendLocale: true,
						 locale: config.DEFAULT_LOCALE
						 });
	});

var connectToCore = fibrous( function()
	{ // Establish connection to the core service
	var i;
	var sessionId;
	var applicationData;

	try {
		coreConnection.sync.connect({hostname: config.CONNECTION_HOSTNAME, port: config.CORE_PORT_SECURE, isSecure: true, caCrt: caCrt});

		sessionId = securityManager.sync.createTemporaryAdminSession("127.0.0.1");

		edgeSettings = coreConnection.sync.callRpc("getEdgeSettings", [sessionId], self);

		applicationData = coreConnection.sync.callRpc("getApplicationData", [], self)

		for (i = 0; i < applicationData["spacelet"].length; i++)
			rest.addApp(applicationData["spacelet"][i]);

		for (i = 0; i < applicationData["sandboxed"].length; i++)
			rest.addApp(applicationData["sandboxed"][i]);

		for (i = 0; i < applicationData["sandboxed_debian"].length; i++)
			rest.addApp(applicationData["sandboxed_debian"][i]);

		for (i = 0; i < applicationData["native_debian"].length; i++)
			rest.addApp(applicationData["native_debian"][i]);

		coreConnection.callRpc("setEventListeners",	[ 	[
														config.EVENT_SPACELET_INSTALLED,
														config.EVENT_SPACELET_REMOVED,
														//config.EVENT_SPACELET_STARTED,
														//config.EVENT_SPACELET_STOPPED,
														config.EVENT_SANDBOXED_INSTALLED,
														config.EVENT_SANDBOXED_REMOVED,
														//config.EVENT_SANDBOXED_STARTED,
														//config.EVENT_SANDBOXED_STOPPED,
														config.EVENT_SANDBOXED_DEBIAN_INSTALLED,
														config.EVENT_SANDBOXED_DEBIAN_REMOVED,
														//config.EVENT_SANDBOXED_DEBIAN_STARTED,
														//config.EVENT_SANDBOXED_DEBIAN_STOPPED,
														config.EVENT_NATIVE_DEBIAN_INSTALLED,
														config.EVENT_NATIVE_DEBIAN_REMOVED,
														//config.EVENT_NATIVE_DEBIAN_STARTED,
														//config.EVENT_NATIVE_DEBIAN_STOPPED,
														config.EVENT_EDGE_SETTINGS_CHANGED
														],
														sessionId
													]);
		}
	catch(err)
		{
		coreDisconnectionListener(-1);
		}
	finally
		{
		securityManager.sync.destroyTemporaryAdminSession();
		}
	});

var serverUpListener = function(server)
	{
	}

var serverDownListener = function(server)
	{
	setTimeout(function(isSecure)
		{
		fibrous.run(
			function()
				{
				createHttpServer.sync(isSecure);
				},
			function(err, data)
				{
				});
		}, config.RECONNECT_WAIT, server.isSecure);
	}

var coreDisconnectionListener = function(id)
	{
	if (coreDisconnectionTimerId != null)
		return;

	sessions = {};																	// Did core's server go down or did core shut down?
																					// Either way, the sessions and log ins are revoked.
	coreDisconnectionTimerId = setTimeout(
		function()
			{
			coreDisconnectionTimerId = null;

			fibrous.run(
				function()
					{
					connectToCore.sync();
					},
				function(err, data)
					{
					});
			}, config.RECONNECT_WAIT);
	}

	// EXPOSED METHODS / EVENT LISTENERS -- -- -- -- -- -- -- -- -- -- //
var spaceletInstalled = fibrous( function(result, connObj) { rest.addApp(result.manifest); });
var spaceletRemoved = fibrous( function(result, connObj) { rest.remApp(result.manifest.unique_name); });
//var spaceletStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var spaceletStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var sandboxedInstalled = fibrous( function(result, connObj) { rest.addApp(result.manifest); });
var sandboxedRemoved = fibrous( function(result, connObj) { rest.remApp(result.manifest.unique_name); });
//var sandboxedStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var sandboxedStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var sandboxedDebianInstalled = fibrous( function(result, connObj) { rest.addApp(result.manifest); });
var sandboxedDebianRemoved = fibrous( function(result, connObj) { rest.remApp(result.manifest.unique_name); });
//var sandboxedDebianStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var sandboxedDebianStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var nativeDebianInstalled = fibrous( function(result, connObj) { rest.addApp(result.manifest); });
var nativeDebianRemoved = fibrous( function(result, connObj) { rest.remApp(result.manifest.unique_name); });
//var nativeDebianStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var nativeDebianStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var edgeSettingsChanged = fibrous( function(settings, connObj) { edgeSettings = settings; });

var requestListener = function(_request_, pathname, callback)
	{
	var accept;
	var result;
	var session;
	var appURL, protocol, location, content, host, sp_port, sp_host, spe_host;

	accept = checkContentType(_request_);

	session = getSession(_request_, accept, true);

	pathname = securityCheck.sync(_request_, pathname, session, accept);

	if (pathname)
		{
		callback(null, { type: "load", wwwPath: null, pathname: pathname });
		}
	else
		{
		result = rest.sync.execute(_request_, session, _request_.isSecure);

		if (result.data)															// Return REST JSON object
			{
			callback(null, { type: "write", content: JSON.stringify(result.data), contentType: "json", responseCode: 200, location: "" });
			}
		else if (result.app && result.doRedirect)
			{ // Path contains nothing but the unique_name => redirect to applications tile / web page
			protocol = (!_request_.isSecure ? "http" : "https");

			host = (_request_.requestHeaders.host ? _request_.requestHeaders.host : config.EDGE_HOSTNAME);

			location = protocol + "://" + host;

			appURL = coreConnection.sync.callRpc("getApplicationURL", [result.app.unique_name], self);

			sp_port = (!_request_.isSecure ? appURL.port : appURL.securePort);

			spe_host = location + "/";

			if (appURL.implementsWebServer && sp_port)
				sp_host = spe_host;
			else
				sp_host = spe_host + "/" + result.app.unique_name + "/";

			_request_.GET.sp_port = sp_port;
			_request_.GET.sp_host = encodeURIComponent(sp_host);
			_request_.GET.spe_host = encodeURIComponent(spe_host);
			_request_.GET.sp_path = encodeURIComponent(result.file);

			location += "/" + config.LOADER_FILE + network.remakeQueryString(_request_.GET, [], {}, "", true);

			content = utility.replace(language.E_MOVED_FOUND.message, { "~location": location, "~serverName": config.SERVER_NAME, "~hostname": "", "~port": sp_port });

			callback(null, { type: "write", content: content, contentType: "html", responseCode: 302, location: location });
			}
		else if (result.app && result.isResource)
			{ // Load applications resource
			callback(null, { type: "load", wwwPath: result.app.wwwPath, pathname: result.file });
			}
		else if (result.app && result.isREST)
			{ // Redirect to applications web server or return 404
			appURL = coreConnection.sync.callRpc("getApplicationURL", [result.app.unique_name], self);

			if (appURL.securePort || appURL.port)
				{
				_request_.urlObj.port = (appURL.securePort ? appURL.securePort : appURL.port);
				_request_.urlObj.protocol = (appURL.securePort ? "https:" : "http:");

				location = httpServer.makeLocation(_request_, _request_.urlObj.pathname);

				content = utility.replace(language.E_MOVED_FOUND.message, { "~location": location, "~serverName": config.SERVER_NAME, "~hostname": "", "~port": _request_.urlObj.port });

				callback(null, { type: "write", content: content, contentType: "html", responseCode: 302, location: location });
				}
			else
				{
				content = fs.sync.readFile(config.ERROR_PATHS["404"].file);
				content = content.toString().replace("%1", httpServer.makeLocation(_request_, _request_.urlObj.pathname));
				callback(null, { type: "write", content: content, contentType: config.ERROR_PATHS["404"].content_type, responseCode: 404, location: "" });
				}
			}
		else
			{ // Continue normally
			callback(null, { type: "" });
			}
		}
	}

	// UTILITY -- -- -- -- -- -- -- -- -- -- //
/*var setAppRunningState = function(unique_name, state)
	{
	}*/

	// SERVER SIDE SESSIONS - IMPLEMENTED USING CUSTOM HTTP HEADER ON WEB SERVER -- -- -- -- -- -- -- -- -- -- //
var getSession = function(_request_, accept, updateHeader)
	{
	var sessiontoken, session;

	if (!_request_.isSecure || !accept)														// Only secure connections can have session / return session only for web pages
		{
		session = unsecure_session;
		}
	else
		{
		sessiontoken = _request_.requestHeaders[config.SESSION_TOKEN_NAME] || null;		// Only source for token is header

		if (sessiontoken)
			session = sessions.hasOwnProperty(sessiontoken) ? sessions[sessiontoken] : null;

		if (!session)																		// Create a session if it doesn't exist yet
			{
			sessiontoken = createSession();
			}
		else																				// Update an existing session
			{
			sessions[sessiontoken].timestamp = Date.now();
			}

		if (updateHeader)
			_request_.responseHeaders.push([config.SESSION_TOKEN_NAME, sessiontoken]);

		session = sessions[sessiontoken];
		}

	return session;
	}

var createSession = function()
	{
	var shasum;
	var sessiontoken;

	while(true)
		{
		shasum = crypto.createHash("sha512");
		shasum.update( utility.bytesToHexString(crypto.randomBytes(16)) );
		sessiontoken = shasum.digest("hex").toString();

		if (!sessions.hasOwnProperty(sessiontoken))
			break;
		}

	sessions[sessiontoken] = { timestamp: Date.now(), token: sessiontoken, sessionId: "" };	// https session token is bind to cores / security managers sessionId!!!

	return sessiontoken;
	}

	// SECURE WEB PAGE PROTECTION -- -- -- -- -- -- -- -- -- -- //
var securityCheck = function(_request_, pathname, session, accept, callback)
	{
	var loginIndex;
	var appstoreIndex;
	var protocol = "";
	var isAdminLoggedIn;
	var isHttpsOverHttp;

	if (!accept)
		return callback(null, null);

	loginIndex = pathname.lastIndexOf(LOGIN_INDEX);										// Protect session and certain pages
	appstoreIndex = pathname.lastIndexOf(APPSTORE_INDEX);
	isAdminLoggedIn = rest.sync._isAdminLoggedIn(session);

	if (!_request_.isSecure && loginIndex != -1)
		callback(null, SECURITY_INDEX);
	else if (!_request_.isSecure && appstoreIndex != -1)
		callback(null, SECURITY_INDEX);
	else if (_request_.isSecure && loginIndex != -1 && isAdminLoggedIn)
		callback(null,  APPSTORE_INDEX);
	else if (_request_.isSecure && appstoreIndex != -1 && !isAdminLoggedIn)
		callback(null,  LOGIN_INDEX);
	else
		callback(null, null);
	}

var cleanUp = function()
	{
	var sts = Object.keys(sessions);														// Remove expired sessions

	for (var i = 0; i < sts.length; i++)
		{
		if (Date.now() - sessions[sts[i]].timestamp >= SESSION_INTERVAL)
			{
			delete sessions[sts[i]];
			}
		}
	}

var checkContentType = function(_request_)
	{
	var typeOk = false;
	var accept = (_request_.requestHeaders.accept || "");

	if (accept.indexOf("text/html") != -1 ||
		_request_.urlObj.pathname.endsWith(".html") ||
		_request_.urlObj.pathname.lastIndexOf(".") == -1 /*||
		accept.indexOf("application/xhtml+xml") != -1 ||
		accept.indexOf("application/xml") != -1*/)
		{
		typeOk = true;
		}

	return typeOk;
	}

}

fibrous.run( function()
	{
	var httpService = new HttpService();
	httpService.start.sync();
	}, function(err, data) { } );

/*
protocol = _request_.requestHeaders.origin || _request_.requestHeaders.referer || null;
protocol = (protocol ? protocol.split(":")[0] : "");									// Use CORS to detect the unsecure 'https over http' connections

isHttpsOverHttp = (!_request_.isSecure || (_request_.isSecure && (protocol == "http" || protocol == "https")) ? true : false);
*/