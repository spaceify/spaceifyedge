"use strict";

/**
 * Web Operation, 15.4.2016 Spaceify Oy
 * 
 * @class WebOperation
 */

//var Logger = require("./logger");
var fibrous = require("./fibrous");
var language = require("./language");
var SecurityModel = require("./securitymodel");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUnique = require("./spaceifyunique");
var SpaceifyUtility = require("./spaceifyutility");
var WebSocketRpcConnection = require("./websocketrpcconnection.js");

function WebOperation()
{
var self = this;

var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var unique = new SpaceifyUnique();
var utility = new SpaceifyUtility();
var securityModel = new SecurityModel();
//var logger = new Logger("WebOperation", "selogs");

var secureConnection = null;
var caCrt = config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

var       types =	[	"getApplications", "isAdminLoggedIn"];
var secureTypes =	[	"installApplication", "removeApplication", "purgeApplication", "startApplication", "stopApplication", 
						"restartApplication", "requestMessageId", "getCoreSettings", "saveCoreSettings", "getEdgeSettings", 
						"saveEdgeSettings", "getServiceRuntimeStates", "logIn", "logOut"];

/**
 * getData()
 *
 * @param   operation  the posted parameters; JavaScript Object {name: value, name: value, ...}
 * @param   userData   JavaScript Object {} for user data; the object is preserved between calls
 * @param   isSecure   defines whether the call is from a secure (true) or an insecure (false) web server
 * @return             a JavaScript Object containing the parameters to pass to the caller
 */
self.getData = fibrous( function(operation, userData, isSecure)
	{
	var type;
	var force;
	var dbApps;
	var manifest;
	var username;
	var password;
	var data = null;
	var error = null;
	var isLoggedIn = false;

	try {
		if(!operation.type)
			throw language.E_GET_DATA_OPERATION_NOT_DEFINED.pre("WebOperation::getData");

		if(types.indexOf(operation.type) == -1 && secureTypes.indexOf(operation.type) == -1)
			throw language.E_GET_DATA_UNKNOWN_OPERATION.pre("WebOperation::getData");

		if(secureTypes.indexOf(operation.type) != -1 && !isSecure)
			throw language.E_GET_DATA_OPERATION_DENIED.pre("WebOperation::getData");

		// -- -- -- -- -- -- -- -- -- -- //
		if(operation.type == "installApplication" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);	// throws error if client is not logged in

			if(!operation.package)
				throw language.E_GET_DATA_UNDEFINED_PARAMETERS.pre("WebOperation::getData");

			force = operation.force || "";
			username = operation.username || "";
			password = operation.password || "";

			connect.sync();
			data = secureConnection.sync.callRpc("installApplication", [operation.package, username, password, null, force, false, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "removeApplication" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			if(!operation.unique_name)
				throw language.E_GET_DATA_UNDEFINED_PARAMETERS.pre("WebOperation::getData");

			connect.sync();
			data = secureConnection.sync.callRpc("removeApplication", [operation.unique_name, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "purgeApplication" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			if(!operation.unique_name)
				throw language.E_GET_DATA_UNDEFINED_PARAMETERS.pre("WebOperation::getData");

			connect.sync();
			data = secureConnection.sync.callRpc("purgeApplication", [operation.unique_name, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "startApplication" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			if(!operation.unique_name)
				throw language.E_GET_DATA_UNDEFINED_PARAMETERS.pre("WebOperation::getData");

			connect.sync();
			data = secureConnection.sync.callRpc("startApplication", [operation.unique_name, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "stopApplication" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			if(!operation.unique_name)
				throw language.E_GET_DATA_UNDEFINED_PARAMETERS.pre("WebOperation::getData");

			connect.sync();
			data = secureConnection.sync.callRpc("stopApplication", [operation.unique_name, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "restartApplication" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			if(!operation.unique_name)
				throw language.E_GET_DATA_UNDEFINED_PARAMETERS.pre("WebOperation::getData");

			connect.sync();
			data = secureConnection.sync.callRpc("restartApplication", [operation.unique_name, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "requestMessageId" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			connect.sync();
			data = secureConnection.sync.callRpc("requestMessageId", [userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "getCoreSettings" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			connect.sync();
			data = secureConnection.sync.callRpc("getCoreSettings", [userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "saveCoreSettings" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			connect.sync();
			data = secureConnection.sync.callRpc("saveCoreSettings", [operation.settings || {}, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "getEdgeSettings" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			connect.sync();
			data = secureConnection.sync.callRpc("getEdgeSettings", [userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "saveEdgeSettings" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			connect.sync();
			data = secureConnection.sync.callRpc("saveEdgeSettings", [operation.settings || {}, userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "getServiceRuntimeStates" && userData.sessionId)
			{
			isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, true);

			connect.sync();
			data = secureConnection.sync.callRpc("getServiceRuntimeStates", [userData.sessionId], self);
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "logIn")
			{
			var isAlreadyLoggedIn = false;

			if(userData.sessionId)
				{
				if(!(isAlreadyLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, false)))
					delete userData.sessionId;
				}

			if(!isAlreadyLoggedIn)
				{
				connect.sync();
				userData.sessionId = secureConnection.sync.callRpc("adminLogIn", [operation.password || ""], self);

				data = { isLoggedIn: true };

				isLoggedIn = true;
				}
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "logOut")
			{
			connect.sync();
			secureConnection.sync.callRpc("adminLogOut", [userData.sessionId || ""], self);

			delete userData.sessionId;
			data = { isLoggedIn: false };

			isLoggedIn = false;
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "getApplications")
			{
			connect.sync();

			data = {spacelet: [], sandboxed: [], sandboxed_debian: [], native_debian: []};
			dbApps = secureConnection.sync.callRpc("getApplications", [operation.types || ""], self);

			for(var i = 0; i < dbApps.length; i++)
				{
				manifest = utility.sync.loadJSON(unique.getAppPath(dbApps[i].type, dbApps[i].unique_name, config) + config.MANIFEST, true);
				manifest.isRunning = dbApps[i].isRunning;
				data[dbApps[i].type].push(manifest);
				}
			}
		// -- -- -- -- -- -- -- -- -- -- //
		else if(operation.type == "isAdminLoggedIn")
			{
			if(userData.sessionId)
				{
				isLoggedIn = securityModel.sync.isAdminLoggedIn(userData.sessionId, false);
				data = isLoggedIn;
				}
			}
		}
	catch(err)
		{
		error = err;
		}
	finally
		{
		if(secureConnection)
			secureConnection.close();
		secureConnection = null;
		}

	return { isLoggedIn: isLoggedIn, error: error, data: data };
	});

var connect = fibrous( function()
	{
	secureConnection = new WebSocketRpcConnection();
	secureConnection.sync.connect({hostname: config.CONNECTION_HOSTNAME, port: config.APPMAN_PORT_SECURE, isSecure: true, caCrt: caCrt});
	});

}

module.exports = WebOperation;
