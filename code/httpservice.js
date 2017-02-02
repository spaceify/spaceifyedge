"use strict";

/**
 * Spaceify Http Service, 17.6.2015 Spaceify Oy
 *
 * @class HttpService
 */

var url = require("url");
var crypto = require("crypto");
var Logger = require("./logger");
var fibrous = require("./fibrous");
var language = require("./language");
var WebServer = require("./webserver");
var SecurityModel = require("./securitymodel");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyUtility = require("./spaceifyutility");
var SpaceifyNetwork = require("./spaceifynetwork");
var ValidateApplication = require("./validateapplication");
var WebSocketRpcConnection = require("./websocketrpcconnection");

function HttpService()
{
var self = this;

var logger = new Logger();
var httpServer = new WebServer();
var httpsServer = new WebServer();
var config = new SpaceifyConfig();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();
var securityModel = new SecurityModel();
var coreConnection = new WebSocketRpcConnection();

var edgeSettings = {};
var coreDisconnectionTimerId = null;

var key = config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
var crt = config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var apps = [];																		// Spacelets, sandboxed, sandboxed debian and native debian applications

var cleanUpIntervalId;																// Make clean up interval less than session interval
var CLEAN_UP_INTERVAL = 600 * 1000;
var SESSION_INTERVAL = 3600 * 24 * 1000;

var sessions = {};

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

		httpServer.setSessionManager(manageSessions, config.SESSION_TOKEN_NAME);
		httpsServer.setSessionManager(manageSessions, config.SESSION_TOKEN_NAME);

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
		if(uid)
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
						 locale: config.DEFAULT_LOCALE,
						 localesPath: config.LOCALES_PATH,
						 serverName: config.SERVER_NAME,
						 debug: true,
						 isEdge: true
						 });
	});

var connectToCore = fibrous( function()
	{ // Establish connection to the core service
	var i;
	var sessionId;
	var applicationData;

	try {
		coreConnection.sync.connect({hostname: config.CONNECTION_HOSTNAME, port: config.CORE_PORT_SECURE, isSecure: true, caCrt: caCrt, debug: true});

		sessionId = securityModel.sync.createTemporaryAdminSession("127.0.0.1");

		edgeSettings = coreConnection.sync.callRpc("getEdgeSettings", [sessionId], self);

		applicationData = coreConnection.sync.callRpc("getApplicationData", [], self)

		for(i = 0; i < applicationData["spacelet"].length; i++)
			addApp(applicationData["spacelet"][i]);

		for(i = 0; i < applicationData["sandboxed"].length; i++)
			addApp(applicationData["sandboxed"][i]);

		for(i = 0; i < applicationData["sandboxed_debian"].length; i++)
			addApp(applicationData["sandboxed_debian"][i]);

		for(i = 0; i < applicationData["native_debian"].length; i++)
			addApp(applicationData["native_debian"][i]);

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
		securityModel.sync.destroyTemporaryAdminSession();
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
	if(coreDisconnectionTimerId != null)
		return;

	sessions = {};																	// Did core's server go down or did core shut down?
																					// Either way, the log in sessions are revoked.
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
var spaceletInstalled = fibrous( function(result, connObj) { addApp(result.manifest); });
var spaceletRemoved = fibrous( function(result, connObj) { remApp(result.manifest.unique_name); });
//var spaceletStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var spaceletStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var sandboxedInstalled = fibrous( function(result, connObj) { addApp(result.manifest); });
var sandboxedRemoved = fibrous( function(result, connObj) { remApp(result.manifest.unique_name); });
//var sandboxedStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var sandboxedStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var sandboxedDebianInstalled = fibrous( function(result, connObj) { addApp(result.manifest); });
var sandboxedDebianRemoved = fibrous( function(result, connObj) { remApp(result.manifest.unique_name); });
//var sandboxedDebianStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var sandboxedDebianStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var nativeDebianInstalled = fibrous( function(result, connObj) { addApp(result.manifest); });
var nativeDebianRemoved = fibrous( function(result, connObj) { remApp(result.manifest.unique_name); });
//var nativeDebianStarted = fibrous( function(startObject, connObj) { setAppRunningState(startObject.manifest.unique_name, true); });
//var nativeDebianStopped = fibrous( function(result, connObj) { setAppRunningState(result.manifest.unique_name, false); });

var edgeSettingsChanged = fibrous( function(settings, connObj) { edgeSettings = settings; });

//var requestListener = function(request, body, urlObj/*DO NOT MODIFY!!!*/, isSecure, callback)
var requestListener = function(currentRequest, callback)
	{
	var service;
	var openServices;
	var partPos, appPos, uname;
	var startsWithAppName = false;
	var servicesByServiceName = {};
	var pathName = currentRequest.urlObj.pathname.replace(/^\/|\/$/, "");
	var pathNameLength = pathName.length;
	var pathParts = pathName.split("/");
	var firstPart = pathParts.shift() || "";
		pathParts = pathName.split("/");
	var pathPartsLength = pathParts.length;
	var appURL, port, protocol, location, content, spe_host, sp_host, sp_path;

	// Get apps service object -- -- -- -- -- -- -- -- -- -- //
	if(firstPart == "service")
		{
		if(!(service = coreConnection.sync.callRpc("getService", [config.HTTP, pathName.replace("service/", "")], self)))
			return callback(null, {type: "load", wwwPath: "", pathname: ""});

		callback(null, {type: "write", content: JSON.stringify(service), contentType: "json", responseCode: 200, location: ""});
		}
	else if(firstPart == "services")
		{
		if(!(openServices = coreConnection.sync.callRpc("getOpenServices", [[], true], self)))
			return callback(null, {type: "load", wwwPath: "", pathname: ""});

		for(var i = 0; i < openServices.length; i++)
			{
			if(!(openServices[i].service_name in servicesByServiceName))
				servicesByServiceName[openServices[i].service_name] = {};

			servicesByServiceName[openServices[i].service_name][openServices[i].unique_name] = openServices[i];
			}

		callback(null, {type: "write", content: JSON.stringify(servicesByServiceName), contentType: "json", responseCode: 200, location: ""});
		}
	// Path points to apps resource or URL is short url -- -- -- -- -- -- -- -- -- -- //
	else
		{
		for(appPos = 0; appPos < apps.length; appPos++)								// Loop through installed apps
			{ // ToDo: compare a/b/c to [a/b, a/b/c] => always returns a/b
			for(partPos = 0, uname = ""; partPos < pathPartsLength; partPos++)
				{
				uname += (uname != "" ? "/" : "") + pathParts[partPos];

				if(uname == apps[appPos].unique_name)
					{
					startsWithAppName = true;
					break;
					}
				}

			if(startsWithAppName)
				break;
			}

		if(startsWithAppName)
			{
			if(partPos == pathPartsLength - 1)										// Short URL - make redirection
				{
console.log("REDIRECT");
				location = (currentRequest.request.headers.host ? currentRequest.request.headers.host : config.EDGE_HOSTNAME);
				location = (!currentRequest.isSecure ? "http" : "https") + "://" + location;

				protocol = (!currentRequest.isSecure ? "http" : "https");

				appURL = coreConnection.sync.callRpc("getApplicationURL", [apps[appPos].unique_name], self);

				port = (!currentRequest.isSecure ? appURL.port : appURL.securePort);

				spe_host = network.getEdgeURL(protocol, false, true);

				if(appURL.implementsWebServer && port)
					sp_host = network.getEdgeURL(protocol, port, true);
				else
					sp_host = network.externalResourceURL(apps[appPos].unique_name, protocol);

				sp_path = "index.html";

				currentRequest.GET.sp_host = encodeURIComponent(sp_host);
				currentRequest.GET.sp_path = encodeURIComponent(sp_path);
				currentRequest.GET.spe_host = encodeURIComponent(spe_host);

				location += "/remote.html/" + network.remakeQueryString(currentRequest.GET, {}, {}, "", true);

				content = utility.replace(language.E_MOVED_FOUND.message, {"~location": location, "~serverName": config.SERVER_NAME, "~hostname": "", "~port": port});

				callback(null, {type: "write", content: content, contentType: "html", responseCode: 302, location: location});
				}
			else																	// Resource - load
				{
				pathName = currentRequest.urlObj.path.replace(apps[appPos].unique_name, "");
pathName = pathName.replace(/^\/*/, "");
pathName = pathName.split("?");
console.log("--------------------", apps[appPos].wwwPath + pathName[0]);
				callback(null, {type: "load", wwwPath: apps[appPos].wwwPath, pathname: pathName[0]});
				}
			}
		else
			callback(null, {type: ""});
		}
	}

	// UTILITY -- -- -- -- -- -- -- -- -- -- //
var addApp = function(manifest)
	{
	var length = manifest.unique_name.length;
	var wwwPath = unique.getWwwPath(manifest.type, manifest.unique_name, config);

	apps.push({unique_name: manifest.unique_name, length: length, wwwPath: wwwPath});
	}

var remApp = function(unique_name)
	{
	var index;

	if((index = getAppIndex(unique_name)) != -1)
		apps.splice(index, 1);
	}

/*var setAppRunningState = function(unique_name, state)
	{
	}*/

var getAppIndex = function(unique_name)
	{
	for(var i = 0; i < apps.length; i++)
		{
		if(apps[i].unique_name == unique_name)
			return i;
		}

	return -1;
	}

	// SERVER SIDE SESSIONS - IMPLEMENTED USING CUSTOM HTTP HEADER ON WEB SERVER -- -- -- -- -- -- -- -- -- -- //
var manageSessions = function(currentRequest)
	{
//console.log(""); console.log(""); console.log("- INFO", currentRequest.request.method, currentRequest.request.url);
	var sessiontoken = currentRequest.request.headers[config.SESSION_TOKEN_NAME] || null;	// First source is header and backup source is cookie

	if(!sessiontoken && config.SESSION_TOKEN_NAME_COOKIE in currentRequest.cookies)
		sessiontoken = currentRequest.cookies[config.SESSION_TOKEN_NAME_COOKIE].value;
//console.log("- BEFORE", sessiontoken);
	var session = sessions.hasOwnProperty(sessiontoken) ? sessions[sessiontoken] : null;

	if(!session)																	// Create a session if it doesn't exist yet
		sessiontoken = createSession();
	else																			// Update an existing session
		sessions[sessiontoken].timestamp = Date.now();
//console.log("- AFTER", Object.keys(sessions));
	return sessions[sessiontoken];
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

	sessions[sessiontoken] = {userData: {}, timestamp: Date.now(), token: sessiontoken}

	return sessiontoken;
	}

var cleanUp = function()
	{
	var sts = Object.keys(sessions);												// Remove expired sessions
//console.log("------------- cleanUp");
	for(var i = 0; i < sts.length; i++)
		{
		if(Date.now() - sessions[sts[i]].timestamp >= SESSION_INTERVAL)
			{
//console.log("------------- DELETE", sts[i]);
			delete sessions[sts[i]];
			}
		}
	}
}

fibrous.run( function()
	{
	var httpService = new HttpService();
	httpService.start.sync();
	}, function(err, data) { } );