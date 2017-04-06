"use strict";

/**
 * Spaceify Application Manager, 8.1.2016 Spaceify Oy
 *
 * For Spaceify's internal use.
 *
 * Messages might arrive after the actual operation is finished. Therefore, both the operation
 * and messaging are waited before returning to the caller
 *
 * @class SpaceifyApplicationManager
 */

function SpaceifyApplicationManager()
{
var self = this;

var lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

var errorc = new lib.SpaceifyError();
var network = new lib.SpaceifyNetwork();
var utility = new lib.SpaceifyUtility();
var config = lib.SpaceifyConfig.getConfig();
var spaceifyMessages = new lib.SpaceifyMessages();
//var logger = new lib.SpaceifyLogger("SpaceifyApplicationManager");

var operation;																	// Queue operation, execute operations in order
var operations = [];

var sequence = 0;
var error = null;
var result = null;

/**
 * @param   package            (1) unique name of a package in the spaceify registry or a URL to a package in the (2) GitHub repository or in the (3) Internet
 * @param   username           optional username/password for loading packages requiring credentials, set to "" (empty string) if not required
 * @param   password
 * @param   handler            custom handlet callback, null if application doesn't have one
 * @param   origin             callbacks for different types of Application manager messages:
 *                             error, warning, failed, message, question, questionTimedOut
 */
self.installApplication = function(applicationPackage, username, password, force, origin, handler)
	{
	setup("installApplication", {package: applicationPackage, username: username, password: password, force: force, }, origin, handler, true);
	}

/**
 * @param   unique_name       unique name of an application to remove/start/stop/restart
 * @param   origin            callbacks for different types of Application manager messages:
 *                            error, warning, failed, message, question, questionTimedOut
 * @param   handler           application defined callback, null if application doesn't have one
 */
self.removeApplication = function(unique_name, origin, handler)
	{
	setup("removeApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.purgeApplication = function(unique_name, origin, handler)
	{
	setup("purgeApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.startApplication = function(unique_name, origin, handler)
	{
	setup("startApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.stopApplication = function(unique_name, origin, handler)
	{
	setup("stopApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.restartApplication = function(unique_name, origin, handler)
	{
	setup("restartApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.logIn = function(password, origin, handler)
	{
	setup("logIn", {password: password}, origin, handler, false);
	}

self.logOut = function(origin, handler)
	{
	setup("logOut", {}, origin, handler, false);
	}

self.isAdminLoggedIn = function(origin, handler)
	{
	setup("isAdminLoggedIn", {}, origin, handler, true);
	}

self.getCoreSettings = function(origin, handler)
	{
	setup("getCoreSettings", {}, origin, handler, true);
	}

self.saveCoreSettings = function(settings, origin, handler)
	{
	setup("saveCoreSettings", {settings: settings}, origin, handler, true);
	}

self.getEdgeSettings = function(origin, handler)
	{
	setup("getEdgeSettings", {}, origin, handler, true);
	}

self.saveEdgeSettings = function(settings, origin, handler)
	{
	setup("saveEdgeSettings", {settings: settings}, origin, handler, true);
	}

self.getServiceRuntimeStates = function(origin, handler)
	{
	setup("getServiceRuntimeStates", {}, origin, handler, true);
	}

/**
 * @param   types   an array of application types: "spacelet", "sandboxed", "sandboxed_debian" and/or "native_debian" or empty for all types,
 *                  e.g. ["spacelet", "sandboxed"]
 * @param   origin  callbacks for different types of Application manager messages:
 *                  error, warning, failed, message, question, questionTimedOut
 * @return          Node.js style error and data objects. data contains manifests of installed applications as JavaScript Objects
 *                  grouped by type {spacelet: [{}, ...], sandboxed: [{}, ...], sandboxed_debian: [{}, ...], native_debian: [{}, ....]}
 */
self.getApplications = function(types, origin, handler)
	{
	setup("getApplications", {types: types}, origin, handler, true);
	}

/**
 * @param   types  an array of application types: "spacelet", "sandboxed", "sandboxed_debian" and/or "native_debian" or empty for all types,
 *          e.g. ["spacelet", "sandboxed"]
 * @return         Node.js style error and data objects. data contains manifests of published packages as JavaScript Objects and MySQL query information
 *                 {spacelet: [{}, ...], sandboxed: [{}, ...], sandboxed_debian: [{}, ...], native_debian: [{}, ....], MySQL}.
 */
self.appStoreGetPackages = function(search, returnCallback)
	{
	var search = JSON.stringify(search);
	var content = 'Content-Disposition: form-data; name="search";\r\nContent-Type: plain\/text; charset=utf-8';

	network.POST_FORM(config.EDGE_APPSTORE_GET_PACKAGES_URL, [{content: content, data: search}], "application/json", function(err, response)
		{
		var err = null;
		var data = null;

		try {
			response = response.replace(/&quot;/g, '"');
			response = response.replace(/\\|^"|"$/g, '');

			data = JSON.parse(response);

			if(data.error)
				{
				err = data.error;
				data = null;
				}
			}
		catch(err_)
			{
			err = errorc.makeErrorObject("JSON", "Failed to get packages: JSON.parse failed", "SpaceifyApplicationManager::appStoreGetPackages");
			}

		returnCallback(err, data);
		});
	}

/**
 *
 */
var setup = function(type, params, origin, handler, getMessages)
	{
	var op = { type: type, params: params, origin: origin, handler: handler, getMessages: getMessages, ms: Date.now(), id: utility.randomString(16, true) };

 	if(operations.length == 0)
 		{
		operation = op;
		connect();
 		}
 	else
		operations.push(op);
	}

var connect = function()
	{
	if(operation.getMessages)											// Set up messaging before doing the operation
		spaceifyMessages.connect(self, operation.origin);
	else																// Connection is already open or do the operation without messaging
		self.connected();
	}

	// -- //
self.connected = function()
	{ // Messaging is now set up (or bypassed), post the operation.
	sequence = 1;

	var post = { type: operation.type };								// One object with operation and custom parameters
	for(var i in operation.params)
		post[i] = operation.params[i];

	network.doOperation(post, function(err, data)
		{
		error = err;
		result = data;

		self.end(1);
		});
	}

self.fail = function(err)
	{ // Failed to set up the messaging.
	error = err;
	result = null;

	self.end(2);
	}

self.end = function(sequence)
	{ // Either operation or messaging finishes first. Wait for both of them to finish before returning.
	sequence += sequence;
	if(sequence != 2)
		return;

	var errors = spaceifyMessages.getErrors();

	if(error || errors.length > 0)
		operation.origin.error(error ? [error] : errors, operation.id, Date.now() - operation.ms);
	else if(typeof operation.handler == "function")
		operation.handler(result, operation.id, Date.now() - operation.ms);

	if(operations.length > 0)
		{
		operation = operations.shift();
		connect();
		}
	}

 /*
 * @param   result             the user selected answer either in the short or long format
 * @param   answerCallBackId   the id given by Application manager in a call to questionsCallback
 */
self.answer = function(result_, answerCallBackId)
	{
	spaceifyMessages.answer(result_, answerCallBackId);
	}

}

if(typeof exports !== "undefined")
	module.exports = SpaceifyApplicationManager;