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

var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var network = new SpaceifyNetwork();
var utility = new SpaceifyUtility();

var id = -1;
var ms = -1;
var locked = false;													// Allow only one operation at a time
var endSequence = 0;
var type = null;
var params = null;
var origin = null;
var endErr = null;
var endData = null;
var operationHandler = null;
var spaceifyMessages = new SpaceifyMessages();

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
		var err = null
		var data = null;

		try {
			data = JSON.parse(response.replace(/&quot;/g,'"'));

			if(data.error)
				{
				err = data.error;
				data = null;
				}
			}
		catch(err)
			{
			err = errorc.makeErrorObject("JSON", "Failed to get packages: JSON.parse failed", "SpaceifyApplicationManager::appStoreGetPackages");
			}

		returnCallback(err, data);
		});
	}

/**
 *
 */
var setup = function(type_, params_, origin_, handler, getMessages)
	{
	type = type_;
	ms = Date.now();
	params = params_;
	origin = origin_;
	operationHandler = handler;
	id = utility.randomString(16, true);

	if(locked)
		origin.error(errorc.makeErrorObject("locked", "Application manager is locked.", "SpaceifyApplicationManager::setup"), null);
	else
		{
		if(getMessages && !spaceifyMessages.isConnected())				// Set up messaging before doing the operation
			spaceifyMessages.connect(self, origin);
		else															// Connection is already open or do the operation without messaging
			self.connected();
		}
	}

self.connected = function()
	{ // Messaging is now set up (or bypassed), post the operation.
	locked = true;
	endSequence = 1;

	var post = {type: type};												// One object with operation and custom parameters
	for(var i in params)
		post[i] = params[i];

	network.POST_JSON(config.OPERATION_URL, post, function(err, data)
		{
		endErr = err;
		endData = data;
		self.end(1);
		});
	}

self.fail = function(err)
	{ // Failed to set up the messaging.
	locked = false;
	endErr = err;
	endData = null;
	self.end(2);
	}

self.end = function(sequence)
	{ // Either operation or messaging finishes first. Wait for both of them to finish before returning.
	endSequence += sequence;
	if(endSequence != 2)
		return;

	locked = false;

	var errors = spaceifyMessages.getErrors();

	if(endErr || errors.length > 0)
		origin.error(endErr ? [endErr] : errors, id, Date.now() - ms);
	else if(typeof operationHandler == "function")
		operationHandler(endData, id, Date.now() - ms);
	}

 /*
 * @param   result             the user selected answer either in the short or long format
 * @param   answerCallBackId   the id given by Application manager in a call to questionsCallback
 */
self.answer = function(result, answerCallBackId)
	{
	spaceifyMessages.answer(result, answerCallBackId);
	}

}