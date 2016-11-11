/**
 * ApplicationManager, 9.1.2014 Spaceify Oy
 *
 * @class ApplicationManager
 */

	// INCLUDES -- -- -- -- -- -- -- -- -- -- //
var fs = require("fs");
var url = require("url");
var http = require("http");
var crypto = require("crypto");
var mkdirp = require("mkdirp");
var Github = require("github");
var AdmZip = require("adm-zip");
var Logger = require("./logger");
var fibrous = require("./fibrous");
var language = require("./language");
var Database = require("./database");
var Messaging = require("./messaging");
var httpStatus = require("./httpstatus");
var Application = require("./application");
var DockerImage = require("./dockerimage.js");
var SpaceifyError = require("./spaceifyerror");
var SecurityModel = require("./securitymodel");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");
var DockerContainer = require("./dockercontainer.js");
var WebSocketRpcServer = require("./websocketrpcserver");
var ValidateApplication = require("./validateapplication");
var WebSocketRpcConnection = require("./websocketrpcconnection");

function ApplicationManager()
{
var self = this;

var logger = new Logger();
var database = new Database();
var messaging = new Messaging();
var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var securityModel = new SecurityModel();
var appManServer = new WebSocketRpcServer();
var coreConnection = new WebSocketRpcConnection();

var options = {};
var key = config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
var crt = config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var questionCarbageIntervalId;
var coreDisconnectionTimerId = null;

var answerCallbacks = {};

	// CONSTANT -- -- -- -- -- -- -- -- -- -- //
self.SUCCESS = 1;
self.FAILURE = 2;
self.ROLLEDBACK = 3;

self.INSTALL_SUGGESTED = 1;
self.INSTALL_SUGGESTED_DIFFERENT_PACKAGES = 2;
self.INSTALL_SUGGESTED_SAME_PACKAGES = 3;

self.INSTALL_APPLICATION = 1;

var QUESTION_CARBAGE_INTERVAL = 60000;

	// PUBLIC METHODS / PRIVATE CONNECTION METHODS -- -- -- -- -- -- -- -- -- -- //
self.connect = fibrous( function(opts)
	{
// iptables -A INPUT -p tcp --dport 4949 -m connlimit --connlimit-above 1 --connlimit-mask 0 -j REJECT
// iptables -D INPUT -p tcp --dport 4949 -m connlimit --connlimit-above 1 --connlimit-mask 0 -j REJECT

// iptables -A INPUT -p tcp --dport 4949 -m connlimit --connlimit-above 1 -j REJECT
// iptables -D INPUT -p tcp --dport 4949 -m connlimit --connlimit-above 1 -j REJECT

// /sbin/iptables -A INPUT -p tcp --syn --dport 4949 -m connlimit --connlimit-above 1 -j REJECT
// /sbin/iptables -D INPUT -p tcp --syn --dport 4949 -m connlimit --connlimit-above 1 -j REJECT

// /sbin/iptables -A INPUT -p tcp --syn --dport 4949 -m connlimit --connlimit-above 1 -j REJECT --reject-with tcp-reset
// /sbin/iptables -A INPUT -p tcp --syn --dport 4949 -m connlimit --connlimit-above 1 -j REJECT --reject-with tcp-reset

// iptables -A INPUT -p tcp --syn --dport 4949 -m connlimit --connlimit-upto 1 -j ACCEPT
// iptables -D INPUT -p tcp --syn --dport 4949 -m connlimit --connlimit-upto 1 -j ACCEPT

/*
iptables -A INPUT -p tcp -s localhost --dport 4949 -j ACCEPT
iptables -A INPUT -p tcp --dport 4949 -j DROP

iptables -D INPUT -p tcp -s localhost --dport 4949 -j ACCEPT
iptables -D INPUT -p tcp --dport 4949 -j DROP
*/

		// Expose RPC nethods
	appManServer.exposeRpcMethodSync("installApplication", self, installApplication);
	appManServer.exposeRpcMethodSync("removeApplication", self, removeApplication);
	appManServer.exposeRpcMethodSync("purgeApplication", self, purgeApplication);
	appManServer.exposeRpcMethodSync("startApplication", self, startApplication);
	appManServer.exposeRpcMethodSync("stopApplication", self, stopApplication);
	appManServer.exposeRpcMethodSync("restartApplication", self, restartApplication);
	appManServer.exposeRpcMethodSync("getApplications", self, getApplications);
	appManServer.exposeRpcMethodSync("sourceCode", self, sourceCode);
	appManServer.exposeRpcMethodSync("requestMessageId", self, requestMessageId);
	appManServer.exposeRpcMethodSync("adminLogIn", self, adminLogIn);
	appManServer.exposeRpcMethodSync("adminLogOut", self, adminLogOut);
	appManServer.exposeRpcMethodSync("getServiceRuntimeStates", self, getServiceRuntimeStates);
	appManServer.exposeRpcMethodSync("getCoreSettings", self, getCoreSettings);
	appManServer.exposeRpcMethodSync("saveCoreSettings", self, saveCoreSettings);
	appManServer.exposeRpcMethodSync("getEdgeSettings", self, getEdgeSettings);
	appManServer.exposeRpcMethodSync("saveEdgeSettings", self, saveEdgeSettings);
	appManServer.exposeRpcMethodSync("systemStatus", self, systemStatus);
	//appManServer.exposeRpcMethodSync("publishPackage", self, publishPackage);

		// Listen - secure server only!!!
	appManServer.listen.sync({hostname: config.ALL_IPV4_LOCAL, port: config.APPMAN_PORT_SECURE, isSecure: true, key: key, crt: crt, caCrt: caCrt, keepUp: true, debug: true});

		// Setup messaging server
	messaging.setAnswerListener(answerListener);
	messaging.listen.sync(config.APPMAN_MESSAGE_PORT_SECURE);

		// Setup a connection to the core
	coreConnection.setDisconnectionListener(coreDisconnectionListener);

	connectToCore.sync();

		// Carbage collection
	questionCarbageIntervalId = setInterval(questionCarbageCollection, QUESTION_CARBAGE_INTERVAL);
	});

self.close = fibrous( function()
	{
	coreConnection.close();

	appManServer.close();

	messaging.close();
	});

var connectToCore = fibrous( function()
	{ // Establishes a connection to cores server
	try {
		coreConnection.sync.connect({hostname: config.CONNECTION_HOSTNAME, port: config.CORE_PORT_SECURE, isSecure: true, caCrt: caCrt, debug: true});
		}
	catch(err)
		{
		coreDisconnectionListener(-1);
		}
	});

var coreDisconnectionListener = function(id)
	{ // Disconnection and failed connection listener
	if(coreDisconnectionTimerId != null)
		return;

	coreDisconnectionTimerId = setTimeout(function()
		{
		coreDisconnectionTimerId = null;
		fibrous.run( function() { connectToCore.sync(); }, function(err, data) { } );
		}, config.RECONNECT_WAIT);
	}

var answerListener = function(answer, answerCallbackId)
	{ // Remote answer through RPC to Messaging::answer -> here
	try {
		if(answerCallbackId in answerCallbacks)
			{
			answerCallbacks[answerCallbackId].callback(null, answer.toLowerCase());
			delete answerCallbacks[answerCallbackId];
			}
		}
	catch(err)
		{}
	}

	// EXPOSED JSON-RPC -- -- -- -- -- -- -- -- -- -- //
var installApplication = fibrous( function(applicationPackage, username, password, currentWorkingDirectory, force, develop, sessionId, connObj)
	{
	var start;
	var answer;
	var errors;
	var manifest;
	var existing;
	var validator;
	var suggested;
	var isStarted;
	var information;
	var registry_url;
	var startOrder = [];
	var existing_service;
	var required_service;
	var suggested_version;
	var applicationStatus;
	var isSuggested = false;
	var suggested_unique_name;
	var suggestedApplications = [];
	var installationStatus = config.FAILURE;
	var applicationPackages = [applicationPackage];

	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::installApplication");

		removeTemporaryFiles.sync();

			// Get current release information
		information = database.sync.getInformation();

			// ---------->
			// Iterate all the application packages: the package and the packages it requires (suggested applications)
		while(applicationPackages.length > 0)
			{
			sendMessage.sync(language.RESOLVING_ORIGIN);

				// Get next package
			applicationPackage = applicationPackages.shift();

				// Try to get the package
			registry_url = config.REGISTRY_INSTALL_URL + "?package=" + applicationPackage + "&release=" + information["release_name"] + "&username=" + username + "&password=" + password;
			if(!getPackage.sync(applicationPackage, isSuggested, true, username, password, registry_url, currentWorkingDirectory))
				throw language.E_PROCESS_PACKAGE_FAILED.preFmt("ApplicationManager::installApplication", {"~source": applicationPackage});

				// Validate the package for any errors
			sendMessage.sync("");
			sendMessage.sync(language.PACKAGE_VALIDATING);

			validator = new ValidateApplication();
			manifest = validator.sync.validatePackage(config.WORK_PATH, config.WORK_PATH + config.APPLICATION_DIRECTORY);
			sendMessage.sync("");

				// Only sanboxed applications and spacelets can be installed in develop mode
			if(develop && manifest.type != config.SPACELET && manifest.type != config.SANDBOXED)
				throw language.E_ONLY_SANDBOXED_OR_SPACELET.pre("ApplicationManager::installApplication");

				// Ask can the application or spacelet use the required service. If force is used no questions are asked.
			if(manifest.requires_services && !force)
				{
				sendMessage.sync(utility.replace(language.PACKAGE_ASK_REQUIRED, {"~name": manifest.unique_name, "~type": language.APP_DISPLAY_NAMES[manifest.type]}));

				for(var r = 0; r < manifest.requires_services.length; r++)
					sendMessage.sync("- " + manifest.requires_services[r].service_name);

				answer = askQuestion.sync(utility.replace(language.PACKAGE_ASK_INSTALL_QUESTION, {"~type": language.APP_DISPLAY_NAMES[manifest.type]}), language.PACKAGE_ASK_INSTALL_Y_N, self.INSTALL_APPLICATION);

				if(answer == "n" || answer == "no" || answer == messaging.MESSAGE_TIMED_OUT)
					{
					if(answer != messaging.MESSAGE_TIMED_OUT)
						sendMessage.sync(language.INSTALL_APPLICATION_ABORTED);

					installationStatus = config.ROLLEDBACK;
					break;
					}
				}

				// Stop existing, running application
			applicationStatus = coreConnection.sync.callRpc("getApplicationStatus", [manifest.unique_name], self);

			if(applicationStatus.isRunning)
				{
				sendMessage.sync(utility.replace(language.PACKAGE_STOPPING_EXISTING, {"~type": language.APP_DISPLAY_NAMES[manifest.type], "~name": manifest.unique_name}));
				sendMessage.sync("");
				coreConnection.sync.callRpc("stopApplication", [manifest.unique_name, sessionId, false], self);
				}

				// Install the application
			install.sync(manifest, develop, sessionId);

			develop = false;																	// The debencies are not installed in develop mode

				// Start applications in reverse order they were installed
			startOrder.push({unique_name: manifest.unique_name, type: manifest.type});

				// Check does the package have suggested applications in required_services.
			if(manifest.requires_services)
				{
				isSuggested = true;
				suggestedApplications = [];

				for(var s = 0; s < manifest.requires_services.length; s++)
					{
					required_service = manifest.requires_services[s];
					suggested = required_service.suggested_application.split(config.PACKAGE_DELIMITER);
					suggested_unique_name = suggested[0];
					suggested_version = (suggested[1] ? suggested[1] : language.INSTALL_VERSION_LATEST);

					existing_service = database.sync.getService(required_service.service_name);

						// Service not registered -> try to install the suggested application
					if(!existing_service)
						{
						sendNotify.sync(utility.replace(language.INSTALL_SUGGESTED,
								{
								"~required_service_name": required_service.service_name,
								"~suggested_unique_name": suggested_unique_name,
								"~suggested_version": suggested_version
								}), self.INSTALL_SUGGESTED);

						suggestedApplications.push(required_service.suggested_application);
						}

						// Service is already registered -> don't reinstall even if version would change, because it might make other packages inoperative
					else
						{
						existing = database.sync.getApplication(existing_service.unique_name);

							// ----- Suggested and installed applications are different -> use the installed application
						if(existing.unique_name != suggested_unique_name)
							sendNotify.sync(utility.replace(language.INSTALL_SUGGESTED_DIFFERENT_PACKAGES,
								{
								"~required_service_name": required_service.service_name,
								"~existing_type": language.APP_UPPER_CASE_DISPLAY_NAMES[existing.type],
								"~existing_unique_name": existing.unique_name,
								"~existing_version": existing.version,
								"~suggested_unique_name": suggested_unique_name,
								"~suggested_version": suggested_version,
								}), self.INSTALL_SUGGESTED_DIFFERENT_PACKAGES);

							// ----- Suggested application is same as the installed application -> use the existing application@version
						else
							sendNotify.sync(utility.replace(language.INSTALL_SUGGESTED_SAME_PACKAGES,
								{
								"~installing_type": language.APP_DISPLAY_NAMES[manifest.type],
								"~suggested_unique_name": suggested_unique_name,
								"~suggested_version": suggested_version,
								"~required_service_name": required_service.service_name,
								"~existing_unique_name": existing.unique_name,
								"~existing_version": existing.version,
								}), self.INSTALL_SUGGESTED_SAME_PACKAGES);
						}
					}

				for(var j = 0; j < suggestedApplications.length; j++)									// Install suggested applications.
					{
					if(applicationPackages.indexOf(suggestedApplications[j]) == -1)						// Notice: install only once!
						applicationPackages.push(suggestedApplications[j]);
					}
				}

			}
				// <----------

				// ---------->
				// (Re)start applications and/or build spacelets. Show messages only for applications.
			while(startOrder.length > 0)
				{
				start = startOrder.pop();

				if(	start.type != config.SPACELET && !develop)
					sendMessage.sync(utility.replace(language.PACKAGE_STARTING, {"~type": language.APP_DISPLAY_NAMES[start.type], "~name": start.unique_name}));
				else if(develop)
					sendMessage.sync(utility.replace(language.PACKAGE_DEVELOP, {"~type": language.APP_DISPLAY_NAMES[start.type], "~name": start.unique_name}));

				coreConnection.sync.callRpc("installApplication", [start.unique_name, start.type, sessionId, true], self);

				if(	start.type != config.SPACELET && !develop)
					{
					isStarted = coreConnection.sync.callRpc("startApplication", [start.unique_name, sessionId, false], self);

					sendMessage.sync(utility.replace((isStarted ? language.PACKAGE_STARTED : language.PACKAGE_START_FAILED),
										{"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[start.type]}));
					}
				}
				// <----------

			installationStatus = self.SUCCESS;
		}
	catch(err)
		{
		sendErrors.sync(err);
		}
	finally
		{
		database.close();
		removeTemporaryFiles.sync();
		// ToDo: rollback installations?
		sendEnd.sync();
		}

	return installationStatus;
});

var removeApplication = fibrous( function(unique_name, sessionId, connObj)
	{
	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::removeApplication");

		var dbApp = database.sync.getApplication(unique_name);

		if(!dbApp)
			throw language.E_APPLICATION_NOT_INSTALLED.preFmt("ApplicationManager::removeApplication", {"~name": unique_name});

			// Remove the application
		database.sync.begin();

		remove.sync(dbApp, sessionId, false);

			// Finalize remove
		sendMessage.sync(utility.replace(language.PACKAGE_REMOVED, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[dbApp.type]}));
		}
	catch(err)
		{
		database.sync.rollback();

		sendErrors.sync(err);
		}
	finally
		{
		database.sync.commit();
		database.close();

		sendEnd.sync();
		}

	return true;
	});

var purgeApplication = fibrous( function(unique_name, sessionId, connObj)
	{
	var dbApp;
	var manifest;
	var path = "";
	var unique_directory = unique.makeUniqueDirectory(unique_name);

		// Preconditions for performing this operation
	if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
		{
		sendErrors.sync(language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::purgeApplication"));
		sendEnd.sync();
		return;
		}

		// Purge - purgin also handles incomplete installations
	sendMessage.sync(utility.replace(language.PACKAGE_PURGING, {"~name": unique_name}));

	try {
		dbApp = database.sync.getApplication(unique_name);

		if(dbApp)
			{
				// Stop all the instances of running applications having applications unique_name
			coreConnection.sync.callRpc("removeApplication", [unique_name, sessionId, false], self);

				// Remove database entries
			sendMessage.sync(language.PACKAGE_REMOVE_FROM_DATABASE);

			database.sync.removeApplication(dbApp.unique_name);

				// Remove existing docker image + containers
			if(dbApp.type != config.NATIVE_DEBIAN)
				{
				sendMessage.sync(language.PACKAGE_REMOVING_DOCKER);

				removeImage(dbApp.docker_image_id, dbApp.unique_name);
				}

				// Remove Debian packages
			if(dbApp.type == config.NATIVE_DEBIAN)
				removeAptAndDpkgInstalled.sync(dbApp.unique_name);
			}
		}
	catch(err)
		{
		sendErrors.sync(err);
		}
	finally
		{
		database.close();
		}

		// Remove the application folder completely, including the user data
	if(utility.sync.isLocal(config.SPACELETS_PATH + unique_directory, "directory"))
		path = config.SPACELETS_PATH + unique_directory;
	else if(utility.sync.isLocal(config.SANDBOXED_PATH + unique_directory, "directory"))
		path = config.SANDBOXED_PATH + unique_directory;
	else if(utility.sync.isLocal(config.SANDBOXED_DEBIAN_PATH + unique_directory, "directory"))
		path = config.SANDBOXED_DEBIAN_PATH + unique_directory;
	else if(utility.sync.isLocal(config.NATIVE_DEBIAN_PATH + unique_directory, "directory"))
		path = config.NATIVE_DEBIAN_PATH + unique_directory;

	if(path != "")
		{
		sendMessage.sync(language.PACKAGE_DELETE_FILES);

		utility.sync.deleteDirectory(path);
		}

		// Finalize purge
	if(path == "" && !dbApp)
		sendMessage.sync(language.E_APPLICATION_NOT_INSTALLED.preFmt("", {"~name": unique_name}).message);
	else
		sendMessage.sync(language.PACKAGE_PURGED);

	sendEnd.sync();

	return true;
	});

var startApplication = fibrous( function(unique_name, sessionId, connObj)
	{
	var dbApp;
	var applicationStatus;

	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::startApplication");

		dbApp = database.sync.getApplication(unique_name);
		if(!dbApp)
			throw language.E_APPLICATION_NOT_INSTALLED.preFmt("ApplicationManager::startApplication", {"~name": unique_name});

			// Start the application
		applicationStatus = coreConnection.sync.callRpc("getApplicationStatus", [dbApp.unique_name], self);

		if(applicationStatus.isRunning)
			sendMessage.sync(utility.replace(language.PACKAGE_ALREADY_RUNNING, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));
		else
			{
			sendMessage.sync(utility.replace(language.PACKAGE_STARTING, {"~type": language.APP_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));
			coreConnection.sync.callRpc("startApplication", [dbApp.unique_name, sessionId, true], self);
			sendMessage.sync(utility.replace(language.PACKAGE_STARTED, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[dbApp.type]}));
			}
		}
	catch(err)
		{
		sendErrors.sync(err);
		}
	finally
		{
		database.close();
		sendEnd.sync();
		}

	return true;
	});

var stopApplication = fibrous( function(unique_name, sessionId, connObj)
	{
	var dbApp;
	var applicationStatus;

	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::stopApplication");

		dbApp = database.sync.getApplication(unique_name);
		if(!dbApp)
			throw language.E_APPLICATION_NOT_INSTALLED.preFmt("ApplicationManager::stopApplication", {"~name": unique_name});

			// Stop the application
		applicationStatus = coreConnection.sync.callRpc("getApplicationStatus", [dbApp.unique_name], self);

		if(!applicationStatus.isRunning)
			sendMessage.sync(utility.replace(language.PACKAGE_ALREADY_STOPPED, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));
		else
			{
			sendMessage.sync(utility.replace(language.PACKAGE_STOPPING, {"~type": language.APP_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));
			coreConnection.sync.callRpc("stopApplication", [dbApp.unique_name, sessionId, true], self);
			sendMessage.sync(utility.replace(language.PACKAGE_STOPPED, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[dbApp.type]}));
			}
		}
	catch(err)
		{
		sendErrors.sync(err);
		}
	finally
		{
		database.close();
		sendEnd.sync();
		}
	});

var restartApplication = fibrous( function(unique_name, sessionId, connObj)
	{
	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::restartApplication");

		var dbApp = database.sync.getApplication(unique_name);
		if(!dbApp)
			throw language.E_APPLICATION_NOT_INSTALLED.preFmt("ApplicationManager::restartApplication", {"~name": unique_name});

			// Restart the application
		sendMessage.sync(utility.replace(language.PACKAGE_STOPPING, {"~type": language.APP_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));
		coreConnection.sync.callRpc("stopApplication", [dbApp.unique_name, sessionId, true], self);

		sendMessage.sync(utility.replace(language.PACKAGE_STARTING, {"~type": language.APP_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));
		coreConnection.sync.callRpc("startApplication", [dbApp.unique_name, sessionId, true], self);
		sendMessage.sync(utility.replace(language.PACKAGE_RESTARTED, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[dbApp.type]}));
		}
	catch(err)
		{
		sendErrors.sync(err);
		}
	finally
		{
		database.close();
		sendEnd.sync();
		}

	return true;
	});

var getApplications = fibrous( function(types, connObj)
	{
	var applications;
	var applicationStatus;

	try {
			// Get application data
		applications = database.sync.getApplications(types);

		for(var i = 0; i < applications.length; i++)
			{
			applicationStatus = coreConnection.sync.callRpc("getApplicationStatus", [applications[i].unique_name], self);

			applications[i].isRunning = applicationStatus.isRunning;
			applications[i].isDevelop = applicationStatus.isDevelop;
			}
		}
	catch(err)
		{
		throw language.E_GET_APPLICATIONS_FAILED_TO_GET_APPLICATIONS.pre("ApplicationManager::getApplications", err);
		}
	finally
		{
		database.close();
		sendEnd.sync();
		}

	return applications;
	});

var sourceCode = fibrous( function(applicationPackage, username, password, currentWorkingDirectory, connObj)
	{
	var dest;
	var information;
	var registry_url;

	try {
		removeTemporaryFiles.sync();

			// Get current release information
		information = database.sync.getInformation();

			// Get sources
		registry_url = config.REGISTRY_INSTALL_URL + "?package=" + applicationPackage + "&release=" + information["release_name"] + "&username=" + username + "&password=" + password;
		if(!getPackage.sync(applicationPackage, false, false, username, password, registry_url, currentWorkingDirectory))
			throw language.E_PROCESS_PACKAGE_FAILED.preFmt("ApplicationManager::sourceCode", {"~source": applicationPackage});

		dest = applicationPackage.replace(/[^0-9a-zA-Z-_\/]/g, "_");
		dest = dest.replace(/_{2,}/g, "_");
		dest = dest.replace(/^_*|_*$/g, "");
		dest = currentWorkingDirectory + "/" + config.SOURCES_DIRECTORY + dest;

		utility.sync.deleteDirectory(dest);															// Remove previous files
		utility.sync.copyDirectory(config.WORK_PATH, dest, false, []);								// Copy files to sources directory

		sendMessage.sync("", utility.replace(language.GET_SOURCES_OK, {"~directory": dest}));
		}
	catch(err)
		{
		sendErrors.sync(err);
		}
	finally
		{
		database.close();
		removeTemporaryFiles.sync();
		sendEnd.sync();
		}
	});

var requestMessageId = fibrous( function(sessionId, connObj)
	{ // Only logged in users can connect to the messaging service
	var messageId = null;

	try {
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::requestMessageId");

		messageId = messaging.messageIdRequested();
		}
	catch(err)
		{
		throw err;
		}

	return messageId;
	});

var adminLogIn = fibrous( function(password, connObj)
	{
	var sessionId = null;

	try {
		sessionId = coreConnection.sync.callRpc("adminLogIn", [password], self);
		}
	catch(err)
		{
		throw err;
		}

	return sessionId;
	});

var adminLogOut = fibrous( function(sessionId, connObj)
	{
	try {
		coreConnection.sync.callRpc("adminLogOut", [sessionId], self);
		}
	catch(err)
		{
		throw err;
		}

	return true;
	});

var getServiceRuntimeStates = fibrous( function(sessionId, connObj)
	{
	var status = {};

	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::getServiceRuntimeStates");

		status = coreConnection.sync.callRpc("getServiceRuntimeStates", [sessionId], self);
		}
	catch(err)
		{
		throw err;
		}
	finally
		{
		sendEnd.sync();
		}

	return status;
	});

var getCoreSettings = fibrous( function(sessionId, connObj)
	{
	var coreSettings = {};

	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::getCoreSettings");

		coreSettings = coreConnection.sync.callRpc("getCoreSettings", [sessionId], self);
		}
	catch(err)
		{
		throw err;
		}
	finally
		{
		sendEnd.sync();
		}

	return coreSettings;
	});

var saveCoreSettings = fibrous( function(settings, sessionId, connObj)
	{
	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::saveCoreSettings");

		coreConnection.sync.callRpc("saveCoreSettings", [settings, sessionId], self);

		sendMessage.sync(language.CORE_SETTINGS_SAVED);
		}
	catch(err)
		{
		throw err;
		}
	finally
		{
		sendEnd.sync();
		}

	return true;
	});

var getEdgeSettings = fibrous( function(sessionId, connObj)
	{
	var edgeSettings = {};

	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::getEdgeSettings");

		edgeSettings = coreConnection.sync.callRpc("getEdgeSettings", [sessionId], self);
		}
	catch(err)
		{
		throw err;
		}
	finally
		{
		sendEnd.sync();
		}

	return edgeSettings;
	});

var saveEdgeSettings = fibrous( function(settings, sessionId, connObj)
	{
	try {
			// Preconditions for performing this operation
		if(!checkAuthentication.sync(connObj.remoteAddress, sessionId))
			throw language.E_AUTHENTICATION_FAILED.pre("ApplicationManager::saveEdgeSettings");

		coreConnection.sync.callRpc("saveEdgeSettings", [settings, sessionId], self);

		sendMessage.sync(language.EDGE_SETTINGS_SAVED);
		}
	catch(err)
		{
		throw err;
		}
	finally
		{
		sendEnd.sync();
		}

	return true;
	});

var systemStatus = fibrous( function(connObj)
	{
	var states = {};

	states.core_open = (coreConnection ? coreConnection.getIsOpen() : false);

	return states;
	});

	// THESE METHODS ARE NOT EXPOSED AND ARE AVAILABLE ONLY FROM THE COMMAND LINE TOOL -- -- -- -- -- -- -- -- -- -- //
self.publishPackage = fibrous( function(applicationPackage, username, password, github_username, github_password, currentWorkingDirectory)
	{
	var urlObj;
	var result;
	var gitoptions;
	var information;
	var currentWorkingDirectoryPackage;

	try {
		removeTemporaryFiles.sync();

			// Get release information
		information = database.sync.getInformation();

			// Parse package (name|directory|archive|url|github url) string
		urlObj = url.parse(applicationPackage, true);
		urlObj.pathname = urlObj.pathname.replace(/^\/|\/$/g, "");
		gitoptions = urlObj.pathname.split("/");

		currentWorkingDirectoryPackage = currentWorkingDirectory + "/" + applicationPackage;

			// --- 1.1 --- Try local directory <package>
		if(utility.sync.isLocal(applicationPackage, "directory"))
			applicationPackage = getLocalPublishDirectory.sync(applicationPackage);

			// --- 1.2 --- Try local directory <currentWorkingDirectory/package>
		else if(utility.sync.isLocal(currentWorkingDirectoryPackage, "directory"))
			applicationPackage = getLocalPublishDirectory.sync(currentWorkingDirectoryPackage);

			// --- 2.1 --- Try local <package>.zip
		else if(utility.sync.isLocal(applicationPackage, "file") && applicationPackage.search(/\.zip$/i) != -1)
			sendMessage.sync(utility.replace(language.TRYING_TO_PUBLISH, {"~where": language.LOCAL_ARCHIVE, "~package": applicationPackage}));

			// --- 2.2 --- Try local <currentWorkingDirectory/package>.zip
		else if(utility.sync.isLocal(currentWorkingDirectoryPackage, "file") && applicationPackage.search(/\.zip$/i) != -1)
			{
			sendMessage.sync(utility.replace(language.TRYING_TO_PUBLISH, {"~where": language.LOCAL_ARCHIVE, "~package": applicationPackage}));
			applicationPackage = currentWorkingDirectoryPackage;
			}

			// --- 3.1 --- Try GitHub repository <package>
		else if(urlObj.hostname && urlObj.hostname.match(/(github\.com)/i) != null && gitoptions.length == 2)
			{
			sendMessage.sync(utility.replace(language.TRYING_TO_PUBLISH, {"~where": language.GIT_REPOSITORY, "~package": applicationPackage}));

			git.sync(gitoptions, github_username, github_password);

			mkdirp.sync(config.WORK_PATH, 0777);
			utility.sync.zipDirectory(config.WORK_PATH, config.WORK_PATH + config.PUBLISH_ZIP);
			applicationPackage = config.WORK_PATH + config.PUBLISH_ZIP;
			}

			// --- 4.1 --- Try remote <package>.zip (remote url)
		else if(utility.sync.loadRemoteFileToLocalFile(applicationPackage, config.WORK_PATH, config.PUBLISH_ZIP))
			sendMessage.sync(utility.replace(language.TRYING_TO_PUBLISH, {"~where": language.REMOTE_ARCHIVE, "~package": applicationPackage}));

			// --- FAILURE---
		else
			throw language.E_FAILED_TO_RESOLVE_PACKAGE.preFmt("ApplicationManager::publishPackage", {"~package": applicationPackage});

			// Try to publish the package
		result = utility.sync.postPublish(applicationPackage, username, password, information["release_name"]);

		result = utility.parseJSON(result, true);
		if(typeof result != "object")																// Other than 200 OK was received?
			{
			sendMessage.sync(language.PACKAGE_POST_ERROR);
			sendMessage.sync(result + " " + (httpStatus[result] ? httpStatus[result].message : httpStatus["unknown"].message));
			}
		else if(result.err)																			// Errors in the package zip archive and/or manifest?
			{
			sendMessage.sync(language.PACKAGE_POST_ERROR);
			for(var e in result.err)
				sendMessage.sync(e + ": " + result.err[e]);
			}
		else
			sendMessage.sync(language.PACKAGE_POST_OK);
		}
	catch(err)
		{
		sendMessage.sync(logger.error(err, false, false, logger.RETURN));
		}
	finally
		{
		database.close();
		removeTemporaryFiles.sync();
		//sendEnd.sync();
		}

	return true;
	});

	// PRIVATE METHODS -- -- -- -- -- -- -- -- -- -- //
var getPackage = fibrous( function(applicationPackage, isSuggested/*try only registry*/, try_local/*try local directories*/, username, password, registry_url, currentWorkingDirectory)
	{ // Get package by (unique name|directory|archive|url|git url), isSuggested=, try_local=
	var str;
	var urlObj;
	var result;
	var errors;
	var errfile;
	var isGithub;
	var isPackage;
	var gitoptions;
	var currentWorkingDirectoryPackage;

	if(applicationPackage == "")
		applicationPackage = "application";

		// Check whether package is a GitHub URL
	urlObj = url.parse(applicationPackage, true);

	urlObj.pathname = (urlObj.pathname ? urlObj.pathname.replace(/^\/|\/$/g, "") : "");
	gitoptions = urlObj.pathname.split("/");
	isGithub = (urlObj.hostname && urlObj.hostname.match(/(github\.com)/i) != null && gitoptions.length == 2 ? true : false);

	currentWorkingDirectoryPackage = currentWorkingDirectory + "/" + applicationPackage;

		// --- Try local directory <package>
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.LOCAL_DIRECTORY}));
	if(!isSuggested && try_local && utility.sync.isLocal(applicationPackage, "directory"))
		return getLocalInstallDirectory.sync(applicationPackage, false);

		// --- Try local directory <currentWorkingDirectory/package>
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.WORKING_DIRECTORY}));
	if(!isSuggested && try_local && utility.sync.isLocal(currentWorkingDirectoryPackage, "directory"))
		return getLocalInstallDirectory.sync(currentWorkingDirectoryPackage, true);

		// --- Try local <package>.zip
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.LOCAL_ARCHIVE}));
	if(!isSuggested && try_local && utility.sync.isLocal(applicationPackage, "file") && applicationPackage.search(/\.zip$/i) != -1)
		return getLocalInstallZip.sync(applicationPackage, false);

		// --- Try local <currentWorkingDirectory/package>.zip
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.WORKING_DIRECTORY_ARCHIVE}));
	if(!isSuggested && try_local && utility.sync.isLocal(currentWorkingDirectoryPackage, "file") && applicationPackage.search(/\.zip$/i) != -1)
		return getLocalInstallZip.sync(currentWorkingDirectoryPackage, true);

		// --- Try <unique_name>[@<version>] from the registry - suggested applications can be tried from the registry!!!
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.SPACEIFY_REGISTRY}));

	if(!isGithub && utility.sync.loadRemoteFileToLocalFile(registry_url, config.WORK_PATH, config.PACKAGE_ZIP))
		{
		isPackage = utility.unZip(config.WORK_PATH + config.PACKAGE_ZIP, config.WORK_PATH, true);

			// Check for errors before accepting "package"
		if(utility.sync.isLocal(config.WORK_PATH + config.SPM_ERRORS_JSON, "file"))
			{
			errfile = fs.sync.readFile(config.WORK_PATH + config.SPM_ERRORS_JSON, {encoding: "utf8"});

			result = utility.parseJSON(errfile, true);

			errors = [];															// Build error array
			for(var e in result.err)
				{
				str = result.err[e].replace("Manifest: ", "");

				if(e != "EINSTL100")
					errors.push(errorc.makeErrorObject(e, str, ""));
				}

			if(errors.length > 0)
				{
				sendMessage.sync(language.PACKAGE_INSTALL_ERROR);
				throw errors;
				}
			}
		else
			{
			sendMessage.sync(utility.replace(language.PACKAGE_FOUND, {"~where": language.SPACEIFY_REGISTRY, "~package": applicationPackage}));

			return isPackage;
			}
		}

		// --- Try GitHub repository <package>
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.GIT_REPOSITORY}));
	if(!isSuggested && isGithub)
		{
		sendMessage.sync(utility.replace(language.PACKAGE_FOUND, {"~where": language.GIT_REPOSITORY, "~package": applicationPackage}));

		return git.sync(gitoptions, username, password);
		}

		// --- Try remote <package>.zip (remote url)
	sendMessage.sync(utility.replace(language.CHECKING_FROM, {"~where": language.REMOTE_ARCHIVE}));
	if(!isSuggested && utility.sync.loadRemoteFileToLocalFile(applicationPackage, config.WORK_PATH, config.PACKAGE_ZIP))
		{
		sendMessage.sync(utility.replace(language.PACKAGE_FOUND, {"~where": language.REMOTE_ARCHIVE, "~package": applicationPackage}));

		return utility.unZip(config.WORK_PATH + config.PACKAGE_ZIP, config.WORK_PATH, true);
		}

		// --- FAILURE ---
	throw language.E_FAILED_TO_RESOLVE_PACKAGE.preFmt("ApplicationManager::getPackage", {"~package": applicationPackage});
	});

var getLocalInstallDirectory = fibrous( function(applicationPackage, isCurrentWorkingDirectory)
	{
	applicationPackage += (applicationPackage.search(/\/$/) == -1 ? "/" : "");

	if(applicationPackage + config.PACKAGE_PATH == config.WORK_PATH)			// Prevent infinite recursion
		return false;

	sendMessage.sync(utility.replace(language.PACKAGE_FOUND, {"~where": (isCurrentWorkingDirectory ? language.WORKING_DIRECTORY : language.LOCAL_DIRECTORY), "~package": applicationPackage}));

	if(applicationPackage.match(/application\/$/))								// Remove application from path to include it to the copy, if installing from a directory containing application/
		applicationPackage = applicationPackage.replace(/application\/$/, "");

	utility.sync.copyDirectory(applicationPackage, config.WORK_PATH, true, [config.WORK_PATH]);

	return true;
	});

var getLocalInstallZip = fibrous( function(applicationPackage, isCurrentWorkingDirectory)
	{
	sendMessage.sync(utility.replace(language.PACKAGE_FOUND, {"~where": (isCurrentWorkingDirectory ? language.WORKING_DIRECTORY_ARCHIVE : language.LOCAL_ARCHIVE), "~package": applicationPackage}));

	return utility.unZip(applicationPackage, config.WORK_PATH, false);
	});

var getLocalPublishDirectory = fibrous( function(applicationPackage)
	{
	sendMessage.sync(utility.replace(language.TRYING_TO_PUBLISH, {"~from": language.LOCAL_DIRECTORY, "~package": applicationPackage}));

	mkdirp.sync(config.WORK_PATH, 0777);
	utility.sync.zipDirectory(applicationPackage, config.WORK_PATH + config.PUBLISH_ZIP);
	return config.WORK_PATH + config.PUBLISH_ZIP;
	});

var install = fibrous( function(manifest, develop, sessionId)
	{
	var image;
	var dbApp;
	var source;
	var appPath;
	var list = "";
	var public_key;
	var volumePath;
	var serviceFile;
	var application;
	var information;
	var dockerContainer;
	var dockerImageName;
	var customDockerImage;
	var docker_image_id = "N/A";
	var dockerImage = new DockerImage();

	try {
		application = new Application(manifest, develop);

		appPath = config.APP_TYPE_PATHS[manifest.type];

		database.sync.begin();																				// global transaction

			// Remove existing Docker image(s) and application files
		dbApp = database.sync.getApplication(manifest.unique_name);

		if(dbApp)
			{
			remove.sync(dbApp, sessionId, false);
			sendMessage.sync("");
			}

		sendMessage.sync(utility.replace(language.INSTALL_APPLICATION, {"~type": language.APP_DISPLAY_NAMES[manifest.type], "~name": manifest.unique_name}));

			// Install application and api files to volume directory
		sendMessage.sync(language.INSTALL_APPLICATION_FILES);
		volumePath = appPath + unique.makeUniqueDirectory(manifest.unique_name) + config.VOLUME_DIRECTORY;
		utility.sync.copyDirectory(config.WORK_PATH, volumePath, false, []);								// Copy application files to volume

			// Generate a Spaceify ca signed certificate for this application
		sendMessage.sync(language.INSTALL_GENERATE_CERTIFICATE);
		createClientCertificate.sync(appPath, manifest);

			// Docker image for spacelets, sandboxed and sandboxed_native applications
		if(manifest.type != config.NATIVE_DEBIAN)
			{
			information = database.sync.getInformation();

			customDockerImage = (typeof manifest.docker_image != "undefined" && manifest.docker_image == true ? true : false);

			if(customDockerImage)
				dockerImageName = config.CUSTOM_DOCKER_IMAGE + manifest.unique_name;
			else if(information.distribution == config.UBUNTU_DISTRO_NAME)
				dockerImageName = config.UBUNTU_DOCKER_IMAGE;
			else if(information.distribution == config.RASPBIAN_DISTRO_NAME)
				dockerImageName = config.RASPBIAN_DOCKER_IMAGE;

				// Create a new Docker image for the application from the default image or custom image
			if(customDockerImage)
				{ // test: docker run -i -t image_name /bin/bash
				sendMessage.sync(utility.replace(language.INSTALL_CREATE_DOCKER_IMAGE, {"~image": dockerImageName}));
				utility.execute.sync("docker", ["build", "--no-cache", "--rm", "-t", dockerImageName, "."], {cwd: appPath + manifest.unique_name + config.VOLUME_APPLICATION_PATH}, null);
				}
			else
				sendMessage.sync(utility.replace(language.INSTALL_CREATE_DOCKER, {"~image": dockerImageName}));

			dockerContainer = new DockerContainer();
			dockerContainer.sync.startContainer(application.getProvidesServicesCount(), dockerImageName);
			image = dockerContainer.sync.installApplication(application);
			docker_image_id = image.Id;

			dockerImage.sync.removeContainers("", dockerImageName, dockerContainer.getStreams());

			// ToDo: Install the .deb pakages for sandboxed_native applications here (apt_repositories, apt_packages, deb_packages)
			}

			// NATIVE APPLICATION
		if(manifest.type == config.NATIVE_DEBIAN && "apt_repositories" in manifest)
			{
				// Debian repositories
			if("apt_repositories" in manifest)
				{
				sendMessage.sync(language.INSTALL_APT_REPOSITORIES);

				removeApplicationRepositoryEntries(manifest, true);

				try { list = fs.readFileSync(config.SPACEIFY_APPLICATION_REPOSITORY_LIST, "utf8"); } catch(err) { list = ""; }

				for(var i = 0; i < manifest.apt_repositories.length; i++)
					{
					source = makeRepositoryLine(manifest.apt_repositories[i]);								// Repository source
					list += source;

					sendMessage.sync(utility.replace(language.INSTALL_APT_REPOSITORIES_SOURCE, { "~source": source}));

					public_key = manifest.apt_repositories[i].public_key;									// Repository GnuPG key
					if(public_key != "")
						{
						sendMessage.sync(utility.replace(language.INSTALL_APT_REPOSITORIES_KEY, { "~key": public_key}));

						if(manifest.apt_repositories[i].isFile)
							public_key = "cat " + public_key + " | apt-key add -";
						else
							public_key = "wget -qO- " + public_key + " | apt-key add -";

						utility.execute.sync("sh", ["-c", public_key], {cwd: volumePath + config.APPLICATION_DIRECTORY}, function(isError, data)
							{
							sendMessageStdout.sync("" + data);
							});
						}
					}

				try { list = fs.writeFileSync(config.SPACEIFY_APPLICATION_REPOSITORY_LIST, list, "utf8"); } catch(err) { }

				sendMessage.sync("", language.APT_REPOSITORIES_UPDATE);

				utility.execute.sync("apt-get", ["update"], {}, function(isError, data)
					{
					sendMessageStdout.sync("" + data);
					});

				sendMessage.sync("");
				}
			
				// apt-get install
			if("apt_packages" in manifest)
				{
				sendMessage.sync(language.INSTALL_APT_PACKAGES);

				for(var i = 0; i < manifest.apt_packages.length; i++)
					{
					utility.execute.sync("apt-get", ["install", "-y", manifest.apt_packages[i].name], {}, function(isError, data)
						{
						sendMessageStdout.sync("" + data);
						});
					}

				sendMessage.sync("");
				}

				// dpkg install
			if("deb_packages" in manifest)
				{
				sendMessage.sync(language.INSTALL_DEB_PACKAGES);

				for(var i = 0; i < manifest.deb_packages.length; i++)
					{
					utility.execute.sync("dpkg", ["-i", volumePath + config.APPLICATION_DIRECTORY + manifest.deb_packages[i].name], {}, function(isError, data)
						{
						sendMessageStdout.sync("" + data);
						});
					}

				sendMessage.sync("");
				}

				/* ToDo: MAYBE SANDBOXED_DEBIAN
				*
				*
				*
				*
				// Copy service file to /lib/systemd/system and ~path replacement
			serviceFile = unique.makeSystemctlServiceName(manifest.unique_name);

			list = fs.readFileSync(volumePath + config.APPLICATION_DIRECTORY + serviceFile, "utf8");
			list = list.replace(/~path/g, volumePath + config.APPLICATION_ROOT);						// ~path replacement

			fs.writeFileSync(config.SYSTEMD_PATH + serviceFile, list, "utf8");

				// The ~path replacement in applications start.sh file if it is present in the application directory
			if(utility.sync.isLocal(volumePath + config.START_SH_FILE, "file"))
				{
				list = fs.readFileSync(volumePath + config.START_SH_FILE, "utf8");
				list = list.replace(/~path/g, volumePath + config.APPLICATION_ROOT);

				fs.writeFileSync(volumePath + config.START_SH_FILE, list, "utf8");
				fs.chmodSync(volumePath + config.START_SH_FILE, 493);
				}
				*
				*
				*
				*
				*/
			}

			// Insert/update application data to database - finalize installation
		sendMessage.sync(language.INSTALL_UPDATE_DATABASE);

		database.sync.insertApplication(manifest, docker_image_id, develop);

		database.sync.commit();

			// Copy package to installed packages directory
		if(!develop)
			utility.sync.zipDirectory(config.WORK_PATH, config.INSTALLED_PATH + docker_image_id + config.EXT_COMPRESSED);

			// Application is now installed successfully
		sendMessage.sync("");
		sendMessage.sync(utility.replace(language.INSTALL_APPLICATION_OK, {"~type": language.APP_UPPER_CASE_DISPLAY_NAMES[manifest.type], "~name": manifest.unique_name, "~version": manifest.version}));
		}
	catch(err)
		{
		database.sync.rollback();

		if(!develop)
			dockerImage.sync.removeImage((docker_image_id != "N/A" ? docker_image_id : ""), manifest.unique_name);

		removeUniqueData.sync(appPath, manifest);

		throw language.E_INSTALL_APPLICATION_FAILED.pre("ApplicationManager::install", err);
		}
	});

var remove = fibrous( function(dbApp, sessionId, throws)
	{
	var manifest;
	var unique_directory;

		// Stop all the instances of running applications having applications unique_name
	sendMessage.sync(utility.replace(language.PACKAGE_REMOVING, {"~type": language.APP_DISPLAY_NAMES[dbApp.type], "~name": dbApp.unique_name}));

	coreConnection.sync.callRpc("removeApplication", [dbApp.unique_name, sessionId, throws], self);

		// Remove database entries
	sendMessage.sync(language.PACKAGE_REMOVE_FROM_DATABASE);

	database.sync.removeApplication(dbApp.unique_name);

		// Remove existing docker image + containers
	if(dbApp.type != config.NATIVE_DEBIAN)
		{
		sendMessage.sync(language.PACKAGE_REMOVING_DOCKER);

		removeImage(dbApp.docker_image_id, dbApp.unique_name);
		}

		// Remove Debian packages
	if(dbApp.type == config.NATIVE_DEBIAN)
		removeAptAndDpkgInstalled.sync(dbApp.unique_name);

		// Remove application files directory
	sendMessage.sync(language.PACKAGE_DELETE_FILES);

	removeUniqueData.sync(config.APP_TYPE_PATHS[dbApp.type], dbApp);
	});

var removeImage = function(docker_image_id, unique_name)
	{
	var inspected;
	var dockerImage = new DockerImage();

	var inspected = dockerImage.sync.inspect(unique_name);
	if(inspected)																					// Try to remove committed image
		dockerImage.sync.removeImage(docker_image_id, unique_name);

	inspected = dockerImage.sync.inspect(config.CUSTOM_DOCKER_IMAGE + unique_name);					// Try to remove custom image
	if(inspected)
		dockerImage.sync.removeImage(inspected.id, config.CUSTOM_DOCKER_IMAGE + unique_name);
	}

var removeTemporaryFiles = fibrous( function()
	{
	//utility.sync.deleteFile(config.WORK_PATH + config.PUBLISH_ZIP, false);
	//utility.sync.deleteFile(config.WORK_PATH + config.PACKAGE_ZIP, false);
	utility.sync.deleteDirectory(config.WORK_PATH, false);
	});

var removeUniqueData = fibrous( function(path, obj)
	{ // Removes existing application data and leaves users data untouched
	var unique_directory = unique.makeUniqueDirectory(obj.unique_name);
	utility.sync.deleteDirectory(path + unique_directory + config.VOLUME_DIRECTORY + config.APPLICATION_DIRECTORY);
	utility.sync.deleteDirectory(path + unique_directory + config.VOLUME_DIRECTORY + config.TLS_DIRECTORY);

	if(utility.sync.isLocal(config.INSTALLED_PATH + obj.docker_image_id + config.EXT_COMPRESSED, "file"))
		fs.sync.unlink(config.INSTALLED_PATH + obj.docker_image_id + config.EXT_COMPRESSED);
	});

var removeApplicationRepositoryEntries = function(manifest, quiet)
	{
	var source;
	var list = "";

	if(manifest.type != config.NATIVE_DEBIAN)
		return;

	if(!("apt_repositories" in manifest))
		return;

		// Clear entries from the application repository list
	if(!quiet)
		sendMessage.sync(language.PACKAGE_DELETE_REPOSITORY);

	try { list = fs.readFileSync(config.SPACEIFY_APPLICATION_REPOSITORY_LIST, "utf8"); } catch(err) { list = ""; }

	for(var i = 0; i < manifest.apt_repositories.length; i++)
		{
		source = makeRepositoryLine(manifest.apt_repositories[i]);

		list = list.replace(source, "");
		}

	list = list.replace(/\n/g, "");

	try { list = fs.writeFileSync(config.SPACEIFY_APPLICATION_REPOSITORY_LIST, list, "utf8"); } catch(err) { }
	}

var removeAptAndDpkgInstalled = fibrous( function(unique_name)
	{
	var pkgName;
	var serviceFile;
	var packages = [];
	var unique_directory = unique.makeUniqueDirectory(unique_name, true);
	var volumePath = config.NATIVE_DEBIAN_PATH + unique_directory + config.VOLUME_APPLICATION_PATH;
	var manifest = utility.sync.loadJSON(volumePath + config.MANIFEST, true, false);

		// Remove entries from spaceifyapplication.list
	removeApplicationRepositoryEntries(manifest, false);

		// Purge debian packages, update package lists 
	if("apt_packages" in manifest)
		packages = packages.concat(manifest.apt_packages);
	if("deb_packages" in manifest)
		packages = packages.concat(manifest.deb_packages);

	if(packages.length > 0)
		{
		sendMessage.sync(language.PACKAGE_PURGE_DEBIAN_PACKAGES);

		for(var i = 0; i < packages.length; i++)
			{
			pkgName = "";

			utility.execute.sync("/bin/bash", ["-c", "dpkg-deb -I " + volumePath + packages[i].name + " | grep -i package: | awk -F : '{print $2}'"], {}, function(isError, data)
				{
				if(!isError)
					pkgName += "" + data;
				});

			pkgName = (pkgName ? pkgName.replace(/[ \n]/g, "") : packages[i].name);

			utility.execute.sync("apt-get", ["purge", "-y", pkgName], {}, function(isError, data)
				{
				sendMessageStdout.sync("" + data);
				});
			}

		sendMessage.sync("", language.APT_REPOSITORIES_UPDATE);

		utility.execute.sync("apt-get", ["update"], {}, function(isError, data)
			{
			sendMessageStdout.sync("" + data);
			});
		}

		/* ToDo: MAYBE FOR SANDBOXED_DEBIAN
		*
		*
		*
		*
		// Remove service file
	serviceFile = config.SYSTEMD_PATH + unique.makeSystemctlServiceName(manifest.unique_name);
	if(utility.sync.isLocal(serviceFile, "file"))
		fs.unlinkSync(serviceFile);
		*
		*
		*
		*
		*/
	});

var makeRepositoryLine = function(repository)
	{
	return "deb [ arch=" + repository.architectures.join(",") + " ] " + repository.source;
	}

var createClientCertificate = fibrous( function(appPath, manifest)
	{
	var tlsPath = appPath + unique.makeUniqueDirectory(manifest.unique_name) + config.VOLUME_DIRECTORY + config.TLS_DIRECTORY;

	try {
			// Create an unique configuration for every certificate by using/modifying the openssl configurations.
		utility.execute.sync("./makeserver.sh", [tlsPath, manifest.unique_name], {cwd: config.TLS_SCRIPTS_PATH}, null);
		}
	catch(err)
		{
		throw language.E_CREATE_CLIENT_CERTIFICATE_FAILED_TO_CREATE.pre("ApplicationManager::createClientCertificate", err);
		}
	});

var git = fibrous( function(gitoptions, username, password)
	{
	var i;
	var ref;
	var tree;
	var blob;
	var blobs;
	var github;
	var content;
	var blobPos;
	var tmpPath;

	try {
		gitoptions[1] = gitoptions[1].replace(/(.git)$/i, "");
		
		github = new Github({version: "3.0.0"});

		//if(username != "" && password != "")																				// Use authentication when its provided
		//	github.authenticate({type: "basic", username: username, password: password});

		content = github.repos.sync.getContent({owner: gitoptions[0], repo: gitoptions[1], path: ""});

		ref = github.gitdata.sync.getReference({owner: gitoptions[0], repo: gitoptions[1], ref: "heads/master"});

		tree = github.gitdata.sync.getTree({owner: gitoptions[0], repo: gitoptions[1], sha: ref.object.sha, recursive: 1});	// get the whole repository content
		tree = tree.tree;

		blobs = 0;
		blobPos = 1;
		for(i = 0; i < tree.length; i++)																					// get the blob count
			{
			if(tree[i].type == "blob")
				blobs++;
			}

		tmpPath = config.WORK_PATH;
		mkdirp.sync(tmpPath, 0755);
		for(i = 0; i < tree.length; i++)																					// create required directories and get blobs of data
			{
			if(tree[i].type == "tree")
				mkdirp.sync(tmpPath + tree[i].path, 0755);
			else if(tree[i].type == "blob")
				{
				sendMessage.sync(utility.replace(language.DOWNLOADING_GITUHB, {"~pos": blobPos++, "~count": blobs, "~what": tree[i].path, "~bytes": tree[i].size/*, "~where": tree[i].url*/}));

				blob = github.gitdata.sync.getBlob({owner: gitoptions[0], repo: gitoptions[1], sha: tree[i].sha});
				fs.sync.writeFile(tmpPath + tree[i].path, blob.content, {"encoding": blob.encoding.replace("-", "")});		// base64 or utf-8 (utf8 in nodejs)
				}
			}
		}
	catch(err)
		{
		throw language.E_GIT_FAILED_TO_GET_GITHUB_DATA.pre("ApplicationManager::git", err);
		}

	return true;
	});

var checkAuthentication = fibrous( function(ip, sessionId)
	{
	return coreConnection.sync.callRpc("isAdminLoggedIn", [sessionId], self);
	});

var sendMessage = fibrous( function()
	{
	var message = "";

	messaging.sendMessage(Array.prototype.slice.call(arguments));									// Messaging server

	for(var i = 0; i < arguments.length; i++)														// Output to console
		{
		if(typeof arguments[i] == "string")
			message = arguments[i];
		else if(arguments[i].message)
			message = arguments[i].message;
		else if(arguments[i].data)
			message = (arguments[i].data.message ? arguments[i].data.message : "");

		logger.force(message);
		}
	});

var sendMessageStdout = fibrous( function(message)
	{
	sendMessage.sync({type: messaging.MESSAGE_STDOUT, data: [message]});
	});

var sendErrors = fibrous( function(err)
	{
	if(err instanceof Array)																		// These error objects originate from getPackage
		{
		for(var i = 0; i < err.length; i++)
			sendMessage.sync({type: messaging.MESSAGE_ERROR, data: [err[i]]});
		}
	else if(err)																					// "Normal" errors
		{
		err = errorc.typeToErrorObject(err);														// Make sure the error is an error object

		sendMessage.sync({type: messaging.MESSAGE_ERROR, data: [err]});
		}
	});

var sendWarning = fibrous( function(message, code)
	{
	sendMessage.sync({type: messaging.MESSAGE_WARNING, data: [message,  code]});
	});

var sendNotify = fibrous( function(message, code)
	{
	sendMessage.sync({type: messaging.MESSAGE_NOTIFY, data: [message, code]});
	});

var sendEnd = fibrous( function()
	{
	sendMessage.sync({type: messaging.MESSAGE_END, data: [""]});
	});

var sendFail = fibrous( function(err)
	{
	sendMessage.sync({type: messaging.MESSAGE_FAIL, data: [err]});
	});

var askQuestion = function(question, choices, origin, callback)
	{
	var answerCallbackId = utility.randomString(32, true);											// Don't wait forever for the answer

	var questionObj = {type: messaging.MESSAGE_QUESTION, data: [question, choices, origin, answerCallbackId]};

	answerCallbacks[answerCallbackId] = {callback: callback, question: questionObj, timestamp: Date.now()};

	sendMessage.sync(questionObj);
	}

var questionCarbageCollection = function()
	{
	var questionObj;
	var answerCallback, answerCallbackIds = Object.keys(answerCallbacks);

	for(var i = 0; i < answerCallbackIds.length; i++)
		{
		answerCallback = answerCallbacks[answerCallbackIds[i]];

		if((Date.now() - answerCallback.timestamp) >= QUESTION_CARBAGE_INTERVAL)
			{
			questionObj = answerCallback.question;											// Notify external listener (spm/web page)
			questionObj = {type: messaging.MESSAGE_TIMED_OUT, data: [language.INSTALL_APPLICATION_TIMED_OUT, questionObj.data[2], questionObj.data[3]]};
			sendMessage.sync(questionObj);

			answerCallback.callback(null, messaging.MESSAGE_TIMED_OUT);						// Return time out to caller
			delete answerCallbacks[answerCallbackIds[i]];
			}
		}
	}

}

module.exports = ApplicationManager;
