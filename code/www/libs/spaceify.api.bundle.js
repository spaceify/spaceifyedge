
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("websocket"), require("adm-zip"), require("child_process"), require("http"), require("https"), require("mkdirp"), require("net"), require("os"), require("path"), require("request"), require("url"));
	else if(typeof define === 'function' && define.amd)
		define("spe", ["fs", "websocket", "adm-zip", "child_process", "http", "https", "mkdirp", "net", "os", "path", "request", "url"], factory);
	else if(typeof exports === 'object')
		exports["spe"] = factory(require("fs"), require("websocket"), require("adm-zip"), require("child_process"), require("http"), require("https"), require("mkdirp"), require("net"), require("os"), require("path"), require("request"), require("url"));
	else
		root["spe"] = factory(root["fs"], root["websocket"], root["adm-zip"], root["child_process"], root["http"], root["https"], root["mkdirp"], root["net"], root["os"], root["path"], root["request"], root["url"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__, __WEBPACK_EXTERNAL_MODULE_55__, __WEBPACK_EXTERNAL_MODULE_56__, __WEBPACK_EXTERNAL_MODULE_57__, __WEBPACK_EXTERNAL_MODULE_58__, __WEBPACK_EXTERNAL_MODULE_59__, __WEBPACK_EXTERNAL_MODULE_60__, __WEBPACK_EXTERNAL_MODULE_61__, __WEBPACK_EXTERNAL_MODULE_62__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 1;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyconfig": 14
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 2;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 3;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * LoggerConfig, 8.2.2017 Spaceify Oy
 *
 * This configuration is used in Spaceify project.
 *
 * Supported console output types:
 *   log, dir, info, error and warn
 *
 * The configuration logic is based on 'enable output' and operates with boolean values:
 *   false = output is disabled
 *    true = output is enabled
 *
 * The individual console output types can be overridden with the 'all' configuration.
 * The override takes three values:
 *   false = all the output types are disabled
 *    true = all the output types are enabled
 *    null = the override is not applied to the output types
 *
 * If the configuration for a class is not found, the default (default_) configuration
 * is used as a fallback. The default configuration operates identically to the individual
 * class configurations.
 *
 * There is a global (global_) override configuration. The global oveverride is applied
 * to all of the corresponding output types of all the individual class configurations.
 * The override takes three values:
 *   false = the output type of all the individual classes are disabled
 *    true = the output type of all the individual classes are enabled
 *    null = the override is not applied to the output type of the class
 *
 * NOTICE: the global_ and default_ configurations are mandatory variables in the loggerconfig.js file!
 *
 * Order of precedence of the configurations
 *   Global configuration takes precedencence of class configurations
 * Order of precedence of the console output types
 *   'all' in a configuration (global or class) takes precedence the output types
 *
 * e.g.
 *      MyClass is unaltered
 *      global_ = { log: null, dir: null, info: null, error: null, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *
 *      MyClass 'all' overrides its output types
 *      global_ = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: null };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true,  all: false };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: false };
 *
 *      Global error is set to false and overrides MyClass error with false
 *      global_ = { log: null, dir: null, info: null, error: false, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true,  warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: false, warn: true, all: null };
 *
 *      Global 'all' is set to false and all the output types of MyClass are overridden with false
 *      global_ = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: false };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true, all: null };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: null };
 *
 * @class LoggerConfig
 */

function LoggerConfig()
{
var self = this;

	// MANDATORY CONFIGURATION - Global configuration overrides the individual class configurations
self.globale =
	{
	log: null,
	dir: null,
	info: null,
	error: null,
	warn: null,
	all: null
	};

	// MANDATORY CONFIGURATION - Default configuration is used if class configuration does not exist
self.default_ =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

	// Class configurations
self.Manifest =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.ApplicationManager =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.AppManService =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.BinaryRpcCommunicator =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Core =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Database =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DHCPDLog =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DockerContainer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DockerHelper =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.DockerImage =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.EdgeSpaceifyNet =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.HttpService =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Iptables =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Main =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Manager =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Messaging =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.PubSub =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.RpcCommunicator =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SecurityModel =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Service =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyApplication =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyApplicationManager =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyConfig =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyCore =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyError =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyMessages =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyNet =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyNetwork =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyService =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SpaceifyUtility =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.Spacelet =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.SPM =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: false
	};

self.ValidateApplication =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebOperation =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebRtcClient =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebRtcConnection =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebServer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketConnection =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketRpcConnection =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketRpcServer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

self.WebSocketServer =
	{
	log: true,
	dir: true,
	info: true,
	error: true,
	warn: true,
	all: null
	};

}

LoggerConfig.getConfig = function()
	{
	return new LoggerConfig();
	};

if(true)
	module.exports = LoggerConfig;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyError, 4.6.2014 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @SpaceifyError
 */

function SpaceifyError(errObj)
{
var self = this;

self.path = (errObj && errObj.path ? errObj.path : "");
self.code = (errObj && errObj.code ? errObj.code : "");
self.message = (errObj && errObj.message ? errObj.message : "");

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
var CODE_SEPARATOR = ", ";
var PATH_SEPARATOR = ", ";
var MESSAGE_SEPARATOR = " ";

	// PUBLIC METHODS -- -- -- -- -- -- -- -- -- -- //
self.set = function(err)
	{
	self.path = err.path || "";
	self.code = err.code || "";
	self.message = err.message || "";
	}

self.getAsObject = function()
	{
	return {code: self.code, codes: [self.code], message: self.message, messages: [self.message], path: self.path, paths: [self.path]};
	}

self.getMessage = function()
	{
	return self.message;
	}

self.getCode = function()
	{
	return self.code;
	}

self.getPath = function()
	{
	return self.path;
	}

self.pre = function(path)
	{
	self.path = path;

	// There might be additional error objects after the path in the arguments: [path, err, err, ...]
	var args = Array.prototype.slice.call(arguments);
	// Pass this error object first (replace path with it) then the additional error objects: [thisError, err, err, ...]
	args[0] = self.getAsObject();

	return self.make.apply(this, args);
	}

self.preFmt = function(path, params)
	{
	self.path = path;

	return self.makeFmt(self.getAsObject(), params);
	}

	// ERRORS -- -- -- -- -- -- -- -- -- -- //
self.make = function()
	{
	var i;
	var path = "", paths = [];
	var code = "", codes = [];
	var message = "", messages = [];

	for(i = 0; i < arguments.length; i++)													// More than one error can be passed in the arguments
		{
		var aobj = arguments[i];

		if(aobj.messages)																	// concat arrays of paths, codes and messages, of the same size, to en existing error array
			{
			paths = paths.concat(aobj.paths);
			codes = codes.concat(aobj.codes);
			messages = messages.concat(aobj.messages);
			}
		else																				// push single error object to error array
			{
			paths.push(aobj.path ? aobj.path : "");
			codes.push(aobj.code ? aobj.code : "");
			messages.push(aobj.message ? aobj.message : aobj.toString());
			}
		}

	for(i = 0; i < messages.length; i++)													// Make single message, code and path strings
		{
		if(codes[i])
			code += (code != "" ? CODE_SEPARATOR : "") + codes[i];

		if(paths[i])
			path += (path != "" ? PATH_SEPARATOR : "") + paths[i];

		message += (message != "" ? MESSAGE_SEPARATOR : "") + messages[i];
		}

	return { code: code, message: message, path: path, codes: codes, paths: paths, messages: messages };
	}

self.makeFmt = function(err, params)
	{ // Make formatted error. This method handles only one error object
	err.message = self.replace(err.message, params);

	if(err.messages && err.messages.length > 0)
		err.messages[0] = err.message;

	return self.make(err);
	}

self.makeErrorObject = function(code, message, path)
	{
	var code_ = (typeof code != "undefined" ? code : "");
	var path_ = (typeof path != "undefined" ? path : "");
	var message_ = (typeof message != "undefined" ? message : "");

	return {code: code_, codes: [code_], message: message_, messages: [message_], path: path_, paths: [path_]};
	}

self.errorFromObject = function(eobj)
	{
	if(typeof eobj == "string")
		eobj = JSON.parse(eobj);

	return self.make(self.makeErrorObject(eobj.code, eobj.message, eobj.path));
	}

self.typeToErrorObject = function(err)
	{
	if(!err)
		err = self.makeErrorObject("###", "###", "###");
	else if(typeof err == "string")
		err = self.makeErrorObject("", err, "");
	else if(!err.codes && !err.messages && !err.paths)
		err = self.make(err);

	return err;
	}

self.errorToString = function(err, printPath, printCode)
	{ // Format an error object to a displayable string
	var errstr = "", code = "", path = "", message = "";

	if(typeof err == "string")
		errstr += err;
	else if(err.message && !err.messages)
		errstr += err.message;
	else if(err.pop)	// err instanceof isArray
		{
		while(err.length > 0)
			errstr += (errstr != "" ? MESSAGE_SEPARATOR : "") + self.errorToString(err.shift());
		}
	else if(err.messages)
		{
		for(var i = 0; i < err.messages.length; i++)							// Make simple error and code strings of the error arrays
			{
			code = (printCode && err.codes[i] ? err.codes[i] : null);
			path = (printPath && err.paths[i] ? err.paths[i] : null);
			message = self.ucfirst(err.messages[i]);
			message = self.endWithDot(message);

			errstr += (errstr != "" ? " " : "");
			errstr += (path ? path : "");
			errstr += (code ? (path ? " - " : "") + code : "");
			errstr += (code || path ? " " : "") + message;
			}
		}

	return errstr;
	}

self.replace = function(str, strs, replaceWith)
	{ // Replace all occurances of named tilde prefixed, alphanumerical parameters (e.g. ~name, ~Name1) supplied in the strs object in the str.
	var rw = (replaceWith ? replaceWith : "");

	for(var i in strs)
		{
		if(typeof strs[i] == "undefined")							// Don't replace parameters with undefined values
			continue;

		str = str.replace(i, strs[i]);
		}
																	// Remove unused parameters to tidy up the string
	str = str.replace(/\s~[a-zA-Z0-9]*\s/g, " " + rw + " ");		// ' ~x ' -> ' y '
	str = str.replace(/~[a-zA-Z0-9]*\s/g, " " + rw + " ");			// '~x '  -> ' y '
	str = str.replace(/\s~[a-zA-Z0-9]*/g, rw);						// ' ~x'  -> 'y'
	str = str.replace(/~[a-zA-Z0-9]+/g, rw);						// '~x'   -> 'y'

	return str;
	}

self.ucfirst = function(str)
	{
	str = str.trim();
	return str.charAt(0).toUpperCase() + str.slice(1);
	}

self.endWithDot = function(str)
	{
	str = str.trim();
	if(str.charAt(str.length - 1) != ".")
		str += ".";

	return str;
	}

}

if(true)
	module.exports = SpaceifyError;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Service, 29.7.2015 Spaceify Oy
 *
 * A class for connecting required services and opening servers for provided services.
 * This class can be used by Node.js applications and web pages.
 *
 * @class SpaceifyService
 */

function SpaceifyService()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
var Service = null;
var SpaceifyCore = null;
var SpaceifyError = null;
var WebSocketRpcServer = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var WebSocketRpcConnection = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	Service = __webpack_require__(45)(lib + "service");
	SpaceifyCore = __webpack_require__(27)(lib + "spaceifycore");
	SpaceifyError = __webpack_require__(28)(lib + "spaceifyerror");
	WebSocketRpcServer = __webpack_require__(49)(lib + "websocketrpcserver");
	SpaceifyConfig = __webpack_require__(2)(lib + "spaceifyconfig");
	SpaceifyNetwork = __webpack_require__(46)(lib + "spaceifynetwork");
	WebSocketRpcConnection = __webpack_require__(29)(lib + "websocketrpcconnection");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//Logger = lib.Logger;
	Service = lib.Service;
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyError = lib.SpaceifyError;
	WebSocketRpcServer = null;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	WebSocketRpcConnection = lib.WebSocketRpcConnection;
	fibrous = function(fn) { return fn; };
	}

var core = new SpaceifyCore();
var errorc = new SpaceifyError();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig("realpaths");
//var logger = Logger.getLogger("SpaceifyService");

var required = {};									// <= Clients (required services)
var requiredSecure = {};

var provided = {};									// <= Servers (provided services)
var providedSecure = {};

var keepServerUp = true;
var keepConnectionUp = true;
var keepConnectionUpTimerIds = {};

var caCrt = config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW;
var key = config.VOLUME_TLS_PATH + config.SERVER_KEY;
var crt = config.VOLUME_TLS_PATH + config.SERVER_CRT;

var errobj = errorc.makeErrorObject("not_open", "Connection is not ready.", "SpaceifyService::connect");

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// CLIENT SIDE - THE REQUIRED SERVICES - NODE.JS / WEB PAGES -- -- -- -- -- -- -- -- -- -- //
self.connect = function(serviceObj, isSecure, callback)
	{ // serviceObj = object (service object) or string (service name)
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if(service_name == config.HTTP)
		return callback(errobj, null);

	if(typeof isSecure === "function")										// From web page or not defined
		{
		callback = isSecure;
		isSecure = (isNodeJs ? false : network.isSecure());
		}
	else																	// Web page always checks the protocol
		{
		isSecure = (isNodeJs ? isSecure : network.isSecure());
		}

	open(serviceObj, (!isSecure ? required : requiredSecure), isSecure, callback);
	}

function open(serviceObj, service, isSecure, callback)
	{
	var port;
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if(!service[service_name])
		{
		service[service_name] = new Service(service_name, false, new WebSocketRpcConnection());
		service[service_name].setConnectionListener(connectionListener);
		service[service_name].setDisconnectionListener(disconnectionListener);
		}

	if(typeof serviceObj === "object")
		{
		port = (!isSecure ? serviceObj.port : serviceObj.securePort);

		connect(service[service_name], port, isSecure, function()
			{
			if(typeof callback === "function")
				callback(null, service[service_name]);
			});
		}
	else
		{
		core.getService(service_name, "", function(err, serviceObj)
			{
			if(!serviceObj || err)
				{
				if(!service[service_name].getIsOpen())											// Let the automaton get the connection up
					disconnectionListener(-1, service_name, isSecure);

				if(typeof callback === "function")
					callback(errobj, null);
				}
			else
				{
				port = (!isSecure ? serviceObj.port : serviceObj.securePort);

				connect(service[service_name], port, isSecure, function()
					{
					if(typeof callback === "function")
						callback(null, service[service_name]);
					});
				}
			});
		}
	}

var connect = function(service, port, isSecure, callback)
	{
	if(service.getIsOpen())																	// Don't reopen connections!
		return callback();

	service.getConnection().connect({ hostname: config.EDGE_HOSTNAME, port: port, isSecure: isSecure, caCrt: caCrt }, callback);
	}

self.disconnect = function(service_names, callback)
	{ // Disconnect one service, listed services or all services
	var keys;

	if(!service_names)																		// All the services
		keys = Object.keys(required);
	else if(service_name.constructor !== Array)												// One service (string)
		keys = [service_names];

	for(var i = 0; i<keys.length; i++)
		{
		if(keys[i] in required)
			required[keys[i]].getConnection().close();

		if(keys[i] in requiredSecure)
			requiredSecure[keys[i]].getConnection().close();
		}
	}

var connectionListener = function(id, service_name, isSecure)
	{
	}

var disconnectionListener = function(id, service_name, isSecure)
	{
	if(!keepConnectionUp)
		return;

	var timerIdName = service_name + (!isSecure ? "F" : "T");								// Services have their own timers and
	if(timerIdName in keepConnectionUpTimerIds)												// only one timer can be running at a time
		return;

	var service = (!isSecure ? required[service_name] : requiredSecure[service_name]);

	keepConnectionUpTimerIds[timerIdName] = setTimeout(waitConnectionAttempt, config.RECONNECT_WAIT, id, service_name, isSecure, timerIdName, service);
	}

var waitConnectionAttempt = function(id, service_name, isSecure, timerIdName, service)
	{
	core.getService(service_name, "", function(err, serviceObj)
		{
		delete keepConnectionUpTimerIds[timerIdName];										// Timer can now be retriggered

		if(serviceObj)
			connect(service, (!isSecure ? serviceObj.port : serviceObj.securePort), isSecure, function() {});
		else
			disconnectionListener(id, service_name, isSecure);
		});
	}

self.getRequiredService = function(service_name)
	{
	return (required[service_name] ? required[service_name] : null);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return (requiredSecure[service_name] ? requiredSecure[service_name] : null);
	}

self.keepConnectionUp = function(val)
	{
	keepConnectionUp = (typeof val == "boolean" ? val : false);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// SERVER SIDE - THE PROVIDED SERVICES - NODE.JS -- -- -- -- -- -- -- -- -- -- //
self.listen = fibrous( function(service_name, unique_name, port, securePort, listenUnsecure, listenSecure)
	{
	if(typeof listenUnsecure == "undefined")
		listenUnsecure = true;

	if(typeof listenSecure == "undefined")
		listenSecure = true;

	if(!provided[service_name])																// Create the connection objects
		provided[service_name] = new Service(service_name, true, new WebSocketRpcServer());

	if(!providedSecure[service_name])
		providedSecure[service_name] = new Service(service_name, true, new WebSocketRpcServer());

	if(listenUnsecure)
		listen.sync(provided[service_name], port, false);

	if(listenSecure)
		listen.sync(providedSecure[service_name], securePort, true);

	if(!port || !securePort)
		{ // If port was null or 0 the real port number is known only after the server is listening
		if(listenUnsecure)
			port = provided[service_name].getServer().getPort();

		if(listenSecure)
			securePort = providedSecure[service_name].getServer().getPort();

		console.log("    LISTEN -----> " + service_name + " - port: " + port + ", secure port: " + securePort);
		}

	core.sync.registerService(service_name, {unique_name: unique_name, port: port, securePort: securePort});
	});

var listen = fibrous( function(service, port, isSecure)
	{
	if(service.getIsOpen())
		return;

	service.getServer().sync.listen({ hostname: null, port: port, isSecure: isSecure, key: key, crt: crt, caCrt: caCrt, keepUp: keepServerUp });
	});

self.close = function(service_name)
	{ // Close one service, listed services or all services
	var keys;

	if(typeof service_names == "undefined")																		// All the services
		keys = Object.keys(provided);
	else if(typeof service_names != "undefined" && service_name.constructor !== Array)							// One service (string)
		keys = [service_names];

	for(var i = 0; i < keys.length; i++)
		{
		if(keys[i] in provided)
			provided[keys[i]].getServer().close();
		if(keys[i] in providedSecure)
			providedSecure[keys[i]].getServer().close();
		}
	}

self.getProvidedService = function(service_name)
	{
	return (provided[service_name] ? provided[service_name] : null);
	}

self.getProvidedServiceSecure = function(service_name)
	{
	return (providedSecure[service_name] ? providedSecure[service_name] : null);
	}

self.keepServerUp = function(val)
	{
	keepServerUp = (typeof val == "boolean" ? val : false);
	}

}

if(true)
	module.exports = SpaceifyService;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyutility": 18
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./binaryrpccommunicator": 19,
	"./rpccommunicator": 21
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 10;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketconnection": 22
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

/**
 * Logger, 18.12.2013 Spaceify Oy
 *
 * @class Logger
 */

function Logger(config)
{
var self = this;

var errorc = null;

var isNodeJs = (typeof window === "undefined" ? true : false);

if(isNodeJs)
	{
	var apipath = "/var/lib/spaceify/code/spaceifyerror";

	if(Logger.ifFileExists("./spaceifyerror.js"))
		errorc = __webpack_require__(6);
	else if(Logger.ifFileExists(apipath))
		errorc = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else if(typeof window !== "undefined")
	{
	errorc = (window.SpaceifyError ? window.SpaceifyError : null);
	}

if(errorc)
	errorc = new errorc();

self.RETURN		= 1;
var LOG			= "log";
var DIR			= "dir";
var INFO		= "info";
self.ERROR		= "error";
var ERROR = self.ERROR;
var WARN		= "warn";
self.FORCE		= "force";
var FORCE = self.FORCE;
var STDOUT		= "stdout";

	// Labels -- -- -- -- -- -- -- -- -- -- //
var labels = {};
labels[LOG]		= "[i] ";
labels[DIR]		= "[d] ";
labels[INFO]	= "[i] ";
labels[ERROR]	= "[e] ";
labels[WARN]	= "[w] ";
labels[FORCE]	= "";
labels[STDOUT]	= "";

	// -- -- -- -- -- -- -- -- -- -- //
var enabled = (config ? config : {});

// Local: enabled = true (default), not enabled = false
enabled[LOG]	= (typeof enabled[LOG] !== "undefined" ? enabled[LOG] : true);
enabled[DIR]	= (typeof enabled[DIR] !== "undefined"  ? enabled[DIR] : true);
enabled[INFO]	= (typeof enabled[INFO] !== "undefined"  ? enabled[INFO] : true);
enabled[ERROR]	= (typeof enabled[ERROR] !== "undefined"  ? enabled[ERROR] : true);
enabled[WARN]	= (typeof enabled[WARN] !== "undefined"  ? enabled[WARN] : true);
enabled[FORCE]	= true;
enabled[STDOUT]	= true;

	// -- -- -- -- -- -- -- -- -- -- //
self.log		= function() { out(LOG, false, arguments); }
self.dir		= function() { out(DIR, false, arguments); }
self.info		= function() { out(INFO, false, arguments); }
self.error		= function() { printErrors.apply(this, arguments); }
self.warn		= function() { out(WARN, false, arguments); }
self.force		= function() { out(FORCE, false, arguments); }
self.stdout		= function() { out(STDOUT, true, arguments); }

	// -- -- -- -- -- -- -- -- -- -- //
var out = function(type, fromStdout)
	{
	if(!enabled[type] && type != FORCE)
		return;

	var str = "", strs = arguments[2], strp;

	if(isNodeJs)
		{
		for(var i = 0; i < strs.length; i++)						// Concatenate strings passed in the arguments, separate strings with space
			{
			strp = (typeof strs[i] == "string" ? strs[i] : JSON.stringify(strs[i]));
			str += (str != "" && str != "\n" && str != "\r" && str != "\r\n" ? " " : "") + strp;
			}

		str = str.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f]/g, "");	// Replace control characters 0-9, 11-12, 14-31

		process.stdout.write(labels[type] + str + (fromStdout ? "" : "\n"));
		}
	else
		{
		if(type == DIR && console.dir)
			console.dir.apply(this, arguments[2]);
		else if(type == ERROR && console.error)
			console.error.apply(this, arguments[2])
		else if(type == INFO && console.info)
			console.info.apply(this, arguments[2]);
		else if(type == WARN && console.warn)
			console.warn.apply(this, arguments[2]);
		else
			console.log.apply(this, arguments[2]);
		}
	}

var printErrors = function(err, printPath, printCode, printType)
	{
	var message = (errorc ? errorc.errorToString(err, printPath, printCode) : err);

	if(printType == ERROR)
		out.call(self, ERROR, false, [message]);
	else if(printType == FORCE)
		self.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	for(var type in options)
		enabled[type] = options[type];
	}

self.clone = function(logger)
	{
	var enabled_ = logger.getEnabled();

	enabled[LOG]	= enabled_[LOG];
	enabled[DIR]	= enabled_[DIR];
	enabled[INFO]	= enabled_[INFO];
	enabled[ERROR]	= enabled_[ERROR];
	enabled[WARN]	= enabled_[WARN];
	}

self.getEnabled = function()
	{
	return enabled;
	}

}

Logger.ifFileExists = function(path)
	{
	try {
		var fs = __webpack_require__(0);
		fs.accessSync(path, fs.F_OK);
		return true;
		}
	catch(err)
		{
		return false;
		}
	}

Logger.getLogger = function(class_, override_)
	{
	var all_;
	var config;
	var lib = null;
	var logger = null;
	var loggerConfig = null;
	var LoggerConfig = null;

		// Get configuration file -- -- -- -- -- -- -- -- -- -- //
	if(typeof window === "undefined")
		{
		var apipath = "/var/lib/spaceify/code/";

		if(Logger.ifFileExists(__dirname + "/loggerconfig.js"))
			LoggerConfig = __webpack_require__(5);
		else if(Logger.ifFileExists(apipath + "loggerconfig.js"))
			LoggerConfig = __webpack_require__(44)(apipath + "loggerconfig.js");
		}
	else if(typeof window !== "undefined")
		{
		lib = (window.spe ? window.spe : window);

		LoggerConfig = (lib.LoggerConfig ? lib.LoggerConfig : null);
		}

	loggerConfig = (LoggerConfig ? LoggerConfig.getConfig() : null);

		// Process configuration
	if(!loggerConfig)												// Configuration file not found
		{
		config = {};
		}
	else
		{
		if(loggerConfig[class_])									// Class found
			{
			config = loggerConfig[class_];
			}
		else if(loggerConfig["default_"])							// Try default
			{
			config = loggerConfig.default_;
			}
		else														// Fallback
			{
			config = {};
			}

		all_ = (typeof config.all !== "undefined" ? config.all : null);
		if(all_ !== null)											// Class specific override
			{
			for(var g in config)
				config[g] = all_;
			}

		if(loggerConfig["global_"])									// Global override
			{
			all_ = (typeof loggerConfig["global_"].all !== "undefined" ? loggerConfig["global_"].all : null);

			for(var g in loggerConfig.global_)
				{
				if(loggerConfig.global_[g] !== null || all_ !== null)
					config[g] = (all_ ? all_ : loggerConfig.global_[g]);
				}
			}

		if(override_)												// User override
			{
			all_ = (typeof override.all  !== "undefined" ? override.all : null);

			for(var g in override_)
				{
				if(override_[g] !== null || all_ !== null)
					config[g] = (all_ ? all_ : loggerConfig.global_[g]);
				}
			}
		}

	return new Logger(config);
	};

if(true)
	module.exports = Logger;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Service, 24.1.2016 Spaceify Oy
 *
 * A single service object. Used for both provided and required services. Only for Spaceify's internal use.
 *
 * @class Service
 */

function Service(service_name, isServer, connection)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
//var SpaceifyConfig = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyUtility = __webpack_require__(8)(lib + "spaceifyutility");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//Logger = lib.Logger;
	//SpaceifyConfig = lib.SpaceifyConfig;
	var SpaceifyUtility = lib.SpaceifyUtility;
	var fibrous = function(fn) { return fn; };
	}

var utility = new SpaceifyUtility();
//var config = SpaceifyConfig.getConfig();
//var logger = Logger.getLogger("Service");

var serverUpListener = null;
var serverDownListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
self.REQUIRED = 0;
self.PROVIDED = 1;

	// PRIVATE METHODS -- -- -- -- -- -- -- -- -- -- //
var listenConnection = function(id)
	{
	for(var i = 0; i < connectionListeners.length; i++)
		connectionListeners[i](id, service_name, self.getIsSecure());
	}

var listenDisconnection = function(id)
	{
	for(var i = 0; i < disconnectionListeners.length; i++)
		disconnectionListeners[i](id, service_name, self.getIsSecure());
	}

var listenServerUp = function(id)
	{
	if(serverUpListener)
		serverUpListener(id, service_name, self.getIsSecure());
	}

var listenServerDown = function(id)
	{
	if(serverDownListener)
		listenServerDown(id, service_name, self.getIsSecure());
	}

	// PUBLIC METHODS -- -- -- -- -- -- -- -- -- -- //
self.setConnectionListener = function(listener)
	{
	if(typeof listener == "function")
		connectionListeners.push(listener);
	}

self.setDisconnectionListener = function(listener)
	{
	if(typeof listener == "function")
		disconnectionListeners.push(listener);
	}

self.setServerUpListener = function(listener)
	{
	serverUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	serverDownListener = (typeof listener == "function" ? listener : null);
	}

self.getPort = function()
	{
	return connection.getPort();
	}

self.getIsOpen = function()
	{
	return connection.getIsOpen();
	}

self.getServiceName = function()
	{
	return service_name;
	}

self.getType = function()
	{
	return isServer ? self.PROVIDED : self.REQUIRED;
	}

self.getId = function()
	{
	return connection.getId();
	}

self.getServer = function()
	{
	return (isServer ? connection : null);
	}

self.getConnection = function()
	{
	return (!isServer ? connection : null);
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.exposeRpcMethod = function(name, object, method)
	{
	connection.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	connection.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function()
	{
	connection.callRpc.apply(this, arguments);
	}

	// -- -- -- -- -- -- -- -- -- -- //
connection.setConnectionListener(listenConnection);							// Bubble events from connections and servers to this class
connection.setDisconnectionListener(listenDisconnection);
if(isServer)
	{
	connection.setServerUpListener(listenServerUp);
	connection.setServerDownListener(listenServerDown);
	}

}

if(true)
	module.exports = Service;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

/**
 * Spaceify configuration, 28.1.2016 Spaceify Oy
 *
 * @class SpaceifyConfig
 */

function SpaceifyConfig()
{
var self = this;

self.initialize = function(mode_)
	{
	var i, file, configs;
	var mode = (typeof mode_ !== "undefined" ? mode_ : "");

	if(mode == "webpack" || typeof window === "undefined")								// webpack or Node.js
		{
		if(mode == "webpack")
			file = __webpack_require__(0).readFileSync(__dirname + "/config.json", "utf8");
		else
			file = __webpack_require__(0).readFileSync("/var/lib/spaceify/code/config.json", "utf8");

		configs = JSON.parse(file);

		for(i in configs)
			self[i] = configs[i];
		}
	else																				// Webpage
		{
		for(i in window.speconfig)
			self[i] = window.speconfig[i];
		}

	if(mode == "realpaths")																// Node.js and post-processing
		self.makeRealApplicationPaths();

	return self;
	}

self.get = function(c)
	{
	return (c in self ? self[c] : null);
	}

self.toMinifiedJSONString = function()
	{
	var str = "", config = "";

	for(var c in self)
		{
		if(typeof self[c] !== "function" && typeof self[c] !== "object")
			{
			config = self[c];

			if(typeof config === "string")
				config = config.replace(/\\/g, "\\\\");

			str += (str != "" ? "," : "") + '"' + c + '":"' + config + '"';
			}
		}

	return "{" + str + "}";
	}

self.makeRealApplicationPaths = function()
	{ // To make application development easier, the configuration paths are made to point to the real directories on the edge computer.
	  // After running this method the applications outside and inside Spaceify / docker containers is identical.
	if(typeof window !== "undefined")
		return;

	var manifest;
	var pathParts;
	var volumePath;
	var cwd = process.cwd();

	var SpaceifyUnique = __webpack_require__(17);
	var unique = new SpaceifyUnique();

	self["API_PATH"] = self["SPACEIFY_CODE_PATH"];
	self["API_WWW_PATH"] = self["SPACEIFY_WWW_PATH"];
	self["API_NODE_MODULES_DIRECTORY"] = self["SPACEIFY_NODE_MODULES_PATH"];

	pathParts = cwd.split("/");

	if(pathParts[pathParts.length - 1] == self["APPLICATION_ROOT"])
		{
		manifest = getManifest(cwd);

			// Application path with manifest -> cwd is most likely a real application directory
		if(manifest)
			{
			volumePath = cwd.replace("/" + self["APPLICATION_ROOT"], "/");

			self["VOLUME_PATH"] = volumePath;
			self["VOLUME_TLS_PATH"] = volumePath + self["TLS_DIRECTORY"];
			self["VOLUME_APPLICATION_PATH"] = volumePath + self["APPLICATION_DIRECTORY"];
			self["VOLUME_APPLICATION_WWW_PATH"] = volumePath + self["APPLICATION_DIRECTORY"] + self["WWW_DIRECTORY"];
			}
		}
	else
		{
		// Not an application path -> lets handle it as volume directory
		volumePath = cwd + "/";

		manifest = getManifest(cwd);

			// External application such as native application or debug mode application
		if(manifest)
			{
				// Lets assume all the necessary directories are in the current working directory
			self["VOLUME_PATH"] = volumePath;
			self["VOLUME_APPLICATION_PATH"] = volumePath;
			self["VOLUME_APPLICATION_WWW_PATH"] = volumePath + self["WWW_DIRECTORY"];

				// Lets assume there is an installed application and with certificate directory
			self["VOLUME_TLS_PATH"] = unique.getVolPath(manifest.type, manifest.unique_name, self) + self["VOLUME_TLS_PATH"];
			}
		}
	}

var getManifest = function(path)
	{
	var manifest = null;

	try {
		manifest = __webpack_require__(0).readFileSync(path + "/" + self["MANIFEST"], "utf8");

		manifest = JSON.parse(manifest);
		}
	catch(err)
		{
		}

	return manifest;
	}

}

SpaceifyConfig.getConfig = function(mode_)
	{
	var config = new SpaceifyConfig();

	return config.initialize(mode_);
	}

if(true)
	module.exports = SpaceifyConfig;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify core, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyCore
 */

function SpaceifyCore()
{
var self = this;

// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window !== "undefined" && window.isSpaceifyNetwork ? window.isSpaceifyNetwork : false);
var isSpaceletOrigin = (typeof window !== "undefined" && !window.location.hostname.match(/.*spaceify\.net/) ? true : false);

var lib = null;
var spllib = null;
//var Logger = null;
var LoaderUtil = null;
var SpaceifyNetwork = null;
var SpaceifyConfig = null;
var WebSocketRpcConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	LoaderUtil = null;
	SpaceifyNetwork = function() {};
	SpaceifyConfig = __webpack_require__(2)(lib + "spaceifyconfig");
	WebSocketRpcConnection = __webpack_require__(29)(lib + "websocketrpcconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);
	spllib = (window.spl ? window.spl : window);

	//Logger = lib.Logger;
	LoaderUtil = spllib.LoaderUtil.getLoaderUtil();
	SpaceifyNetwork = lib.SpaceifyNetwork;
	SpaceifyConfig = lib.SpaceifyConfig;
	WebSocketRpcConnection = lib.WebSocketRpcConnection;
	}

var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();
//var logger = Logger.getLogger("SpaceifyCore");
var connection = (isSpaceifyNetwork || isNodeJs || isSpaceletOrigin ? new WebSocketRpcConnection() : LoaderUtil.getPiperClient());

var callQueue = [];

var tunnelId = null;
var isConnected = false;
var isConnecting = false;

var useSecure = (isNodeJs ? true : network.isSecure());
var caCrt = (isNodeJs ? config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW : "");

self.startSpacelet = function(unique_name, callback)
	{
	callRpc("startSpacelet", [unique_name], function(err, services, id, ms)
		{
		if(err)
			callback(err, null);
		else
			{
			var serviceNames = [];
			for(var s = 0; s < services.length; s++)							// Make service names array for convenience
				serviceNames.push(services[s].service_name);

			callback(null, {services: services, serviceNames: serviceNames}, id, ms);
			}
		});
	}

self.registerService = function(service_name, ports, callback)
	{
	callRpc("registerService", [service_name, ports], callback);
	}

self.unregisterService = function(service_name, unique_name, callback)
	{
	callRpc("unregisterService", [service_name, unique_name], callback);
	}

self.getService = function(service_name, unique_name, callback)
	{
	callRpc("getService", [service_name, unique_name], callback);
	}

self.getServices = function(service_name, callback)
	{
	callRpc("getServices", [service_name], callback);
	}

self.getOpenServices = function(unique_names, getHttp, callback)
	{
	callRpc("getOpenServices", [unique_names, getHttp], callback);
	}

self.getManifest = function(unique_name, callback)
	{
	var manifest = (isCache() ? getCache().getManifest(unique_name) : null);

	if(manifest)
		callback(null, manifest, -1, 0);
	else
		callRpc("getManifest", [unique_name, true, false], function(err, data, id, ms)
			{
			if(!err && isCache())
				getCache().setManifest(unique_name, data);

			callback(err, data, id, ms);
			});
	}

self.isAdminLoggedIn = function(callback)
	{
	network.doOperation({type: "isAdminLoggedIn"}, function(err, data, id, ms)
		{
		callback((err ? err : null), (err ? false : data), id, ms);
		});
	}

self.getApplicationStatus = function(unique_name, callback)
	{
	callRpc("getApplicationStatus", [unique_name], callback);
	}

self.isApplicationRunning = function(unique_name, callback)
	{
	callRpc("isApplicationRunning", [unique_name], callback);
	}

self.getServiceRuntimeStates = function(sessionId, callback)
	{
	callRpc("getServiceRuntimeStates", [sessionId], callback);
	}

self.getApplicationData = function(callback)
	{
	var i;

	callRpc("getApplicationData", [], function(err, data, id, ms)
		{
		if(!err && isCache())
			{
			for(i = 0; i < data.spacelet.length; i++)
				getCache().setApplication(data.spacelet[i]);

			for(i = 0; i < data.sandboxed.length; i++)
				getCache().setApplication(data.sandboxed[i]);

			for(i = 0; i < data.sandboxed_debian.length; i++)
				getCache().setApplication(data.sandboxed_debian[i]);

			for(i = 0; i < data.native_debian.length; i++)
				getCache().setApplication(data.native_debian[i]);
			}

		callback(err, data, id, ms);
		});
	}

self.getApplicationURL = function(unique_name, callback)
	{
	callRpc("getApplicationURL", [unique_name], callback);
	}

self.setSplashAccepted = function(callback)
	{
	callRpc("setSplashAccepted", [], callback);
	}

self.setEventListeners = function(events, listeners, context, sessionId, callback)
	{
	callRpc("setEventListeners", [events], function(err, data, id, ms)
		{
		if(!err)
			{
			for(var i = 0; i < events.length; i++)
				connection.exposeRpcMethod(events[i], context, listeners[i]);
			}

		callback(err, data, id, ms);
		});
	}

/*self.saveOptions = function(unique_name, directory, filename, data, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename, data: data};
	network.doOperation(post, callback);
	}

self.loadOptions = function(unique_name, directory, filename, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename};
	network.doOperation(post, callback);
	}*/

	// CONNECTION -- -- -- -- -- -- -- -- -- -- //
var callRpc = function(method, params, callback)
	{
	var callObj;

	if(isConnecting)
		{
		callQueue.push({ method: method, params: params, callback: callback });
		}
	else if(!isConnected)
		{
		isConnecting = true;

		callQueue.push({ method: method, params: params, callback: callback });	

		connect(function(err, data)
			{
			if(err)
				{
				while(typeof (callObj = callQueue.shift()) !== "undefined")					// Pass connection failure to all calls
					callObj.callback(err, null, -1, 0);
				}
			else
				{
				nextRpcCall();
				}
			});
		}
	else
		{
		callQueue.push({ method: method, params: params, callback: callback });

		nextRpcCall();
		}
	}

var nextRpcCall = function()
	{
	var callObj = callQueue.shift();

	if(typeof callObj !== "undefined")
		{
		call(callObj.method, callObj.params, function()
			{
			callObj.callback.apply(this, arguments);

			nextRpcCall();
			});
		}
	}

var call = function(method, params, callback)
	{
	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		connection.callRpc(method, params, self, function(err, data, id, ms)
			{
			callback(err, data, id, ms);
			});
		}
	else
		{
		connection.callClientRpc(tunnelId, method, params, self, function(err, data)
			{
			callback(err, data);
			});
		}
	}

var connect = function(callback)
	{
	var host, hostname, protocol;
	var port = (!useSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);

	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		if(!isNodeJs)
			hostname = config.EDGE_HOSTNAME;
		else if(isRealSpaceify)
			hostname = config.EDGE_IP;
		else
			hostname = config.CONNECTION_HOSTNAME;

		connection.connect({hostname: hostname, port: port, isSecure: useSecure, caCrt: caCrt}, function(err, data)
			{
			if(!err)
				{
				isConnected = true;
				isConnecting = false;

				callback(null, true);
				}
			else
				{
				isConnected = false;
				isConnecting = false;

				callback(err, null);
				}
			});
		}
	else
		{
		protocol = (!useSecure ? "http" : "https");
		host = network.getEdgeURL({ forceSecureProtocol: null, ownProtocol: null, port: null, withEndSlash: false });
		//false, null, false

		connection.createWebSocketTunnel({host: host, port: port, protocol: protocol}, null, function(id)
			{
			tunnelId = id;
			isConnected = true;
			isConnecting = false;

			callback(null, true);
			});
		}
	}

self.close = function()
	{
	if(connection && connection.close)
		connection.close();

	connection = null;
	}

	// CACHE -- -- -- -- -- -- -- -- -- -- //
var getCache = function()
	{
	return (!isNodeJs && window && window.spaceifyCache ? window.spaceifyCache : null);
	}

var isCache = function()
	{
	var type = getCache();
	return (type == "undefined" || type == null ? false : true);
	}

}

if(true)
	module.exports = SpaceifyCore;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Network, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyNetwork
 */

function SpaceifyNetwork()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	SpaceifyError = __webpack_require__(28)(lib + "spaceifyerror");
	SpaceifyConfig = __webpack_require__(2)(lib + "spaceifyconfig");
	SpaceifyUtility = __webpack_require__(8)(lib + "spaceifyutility");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//var Logger = lib.Logger;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyUtility = lib.SpaceifyUtility;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = Logger.getLogger("SpaceifyNetwork");

// Get the URL to the Spaceify Edge
self.getEdgeURL = function(options)
	{
	var protocol = self.getProtocol(true, options.ownProtocol, options.forceSecureProtocol);

	var hostname = (typeof window != "undefined" ? window.location.hostname : config.EDGE_HOSTNAME);

	return protocol + hostname + (options.port ? ":" + options.port : "") + (options.withEndSlash ? "/" : "");
	}

// Get URL to applications resource
self.externalResourceURL = function(unique_name, options)
	{
	return self.getEdgeURL(options) + unique_name + "/";
	}

// Get secure or insecure port based on web pages protocol or requested security
self.getPort = function(port, securePort, isSecure)
	{
	return (!self.isSecure() && !isSecure ? port : securePort);
	}

// Returns true if current web page is encrypted
self.isSecure = function()
	{
	var protocol = self.getProtocol(false, null, false);

	return (protocol == "http:" ? false : true);
	}

// Return current protocol
self.getProtocol = function(withScheme, ownProtocol, forceSecureProtocol)
	{
	var url, proto, protocol;

	if(ownProtocol === null && forceSecureProtocol === null)					// No protocol
		{
		protocol = "";
		}
	else if(typeof window == "undefined")										// Node.js!
		{
		if(ownProtocol === null)
			protocol = "";
		else
			{
			protocol = (forceSecureProtocol ? "https:" : ownProtocol);
			}
		}
	else																		// Web page
		{
		protocol = (ownProtocol !== null ? ownProtocol : location.protocol);

		if(protocol == "blob:")
			{
			if(window.parent)
				{
				url = "" + window.parent.location;
				url = url.replace(/^blob:/, "");

				if((proto = url.match(/^http.?:/)) !== null)
					protocol = proto[0];
				else
					protocol = "http:";
				}
			else
				protocol = "http:";
			}

		if(forceSecureProtocol)
			protocol = "https:";
		}

	if(protocol != "" && !protocol.match(/:$/))
		protocol += ":";

	return protocol + (protocol != "" && withScheme ? "//" : "")
	}

// Parse URL query
self.parseQuery = function(url)
	{
	/*var query = {}, parts, pairs;
	var regx = new RegExp("=", "i");

	if((parts = url.split("?")).length != 2)
		return query;

	pairs = parts[1].split("&");

	for(var i = 0; i < pairs.length; i++)
		{
		if(regx.exec(pairs[i]))													// Name and value
			query[RegExp.leftContext] = RegExp.rightContext;
		else																	// Only name
			query[pairs[i]] = null;
		}

	return query;*/

	// Adapted from http://james.padolsey.com/snippets/parsing-urls-with-the-dom/
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	url = url.replace(/#.*$/, "");

	part = url.split("?");

	if(part.length == 1 && url.charAt(0) != "?")
		return parameters;

	part = (part.length < 2 ? part[0] : part[1]);

	pairs = part.split("&");

	for (var i = 0, length = pairs.length; i < length; i++)
		{
		if (!pairs[i])
			continue;

		pair = pairs[i].split("=");
		parameters[pair[0]] = (pair.length == 2 ? pair[1] : null);
		}

	return parameters;
	}

self.remakeQueryString = function(query, exclude, include, path, encode)
	{ // Tip: exclude and include can be used in combination to replace values = first exclude old then include new.
	var i, hash, str, search = "";

	for(i in exclude)
		{
		if(i in query)
			delete query[i];
		}

	for(i in include)
		query[i] = include[i];

	for(i in query)
		{
		if(encode)
			{
			str = decodeURIComponent(query[i])
			str = encodeURIComponent(str);
			}
		else
			str = query[i];

		search += (search != "" ? "&" : "") + i + "=" + str;
		}

	if(path)
		{
		path = decodeURIComponent(path);

		if((hash = path.match(/(?:#.*)/, "")))									// hash part of the path
			hash = hash[0];

		path = path.replace(/\?.*$/, "");										// path without search and hash
		}
	else
		{
		hash = "";
		path = "";
		}

	path = path + (search ? "?" + search : "") + (hash ? hash : "");

	return path;
	}

// Test is client in Spaceify's local network
self.isSpaceifyNetwork = function(timeout, callback)
	{
	var xhr = new window.XMLHttpRequest();

	xhr.open("HEAD", window.location.protocol + "//10.0.0.1/templates/test.txt", true);
	xhr.timeout = timeout;
	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			callback(xhr.status >= 200 && xhr.status < 304 ? true : false);
			}
		};

	xhr.send();
	}

self.parseURL = function(url)
	{
	/*var parser = document.createElement("a");
	parser.href = url;
	return parser;*/

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var	o	=
		{
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:	{
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		},
		m	= o.parser[o.strictMode ? "strict" : "loose"].exec(url),
		uri	= {},
		i	= 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
	}

self.implementsWebServer = function(manifest)
	{
	return (manifest.implements && manifest.implements.indexOf(config.WEB_SERVER) != -1 ? true : false);
	}

self.isPortInUse = function(port, callback)
	{ // Adapted from https://gist.github.com/timoxley/1689041
	if(!port)
		return callback(null, true);

	var net = __webpack_require__(58);
	var server = net.createServer();

	server.once("error", function(err)
		{
		callback(err.code != "EADDRINUSE" ? err : null, true);
		});

	server.once("listening", function()
		{
		server.once("close", function()
			{
			callback(null, false)
			});

		server.close();
		});

	server.listen(port);
	}

	// XMLHttpRequest -- -- -- -- -- -- -- -- -- -- //
self.GET = function(url, callback, responseType)
	{
	var ms = Date.now();
	var id = utility.randomString(16, true);
	var xhr = createXMLHttpRequest();
	xhr.onreadystatechange = function() { onReadyState(xhr, id, ms, callback); };

	xhr.open("GET", url, true);
	xhr.responseType = (responseType ? responseType : "");
	xhr.send();
	}

self.POST_FORM = function(url, post, responseType, callback)
	{
	if(typeof spaceifyLoader !== "undefined")
		{
		spaceifyLoader.postData(url, post, responseType, callback);
		}
	else
		{
		var boundary = "---------------------------" + Date.now().toString(16);

		var body = "";
		for(var i = 0; i < post.length; i++)
			{
			body += "\r\n--" + boundary + "\r\n";

			body += post[i].content;
			body += "\r\n\r\n" + post[i].data + "\r\n";
			}
		body += "\r\n--" + boundary + "--";

		var xhr = createXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.responseType = (responseType ? responseType : "text");
		xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
		xhr.onreadystatechange = function() { onReadyState(xhr, utility.randomString(16, true), Date.now(), callback); };
		xhr.send(body);
		}
	}

self.doOperation = function(jsonData, callback)
	{
	var result;
	var content;
	var error = null;
	var operationUrl;

	try {
		content = "Content-Disposition: form-data; name=operation;\r\nContent-Type: application/json; charset=utf-8";

		operationUrl = self.getEdgeURL({ forceSecureProtocol: true, ownProtocol: null, port: null, withEndSlash: true }) + config.OPERATION;
		//true, null, true

		self.POST_FORM(operationUrl, [{content: content, data: JSON.stringify(jsonData)}], "json", function(err, response, id, ms)
			{
			try {
				if(typeof response !== "string")
					response = JSON.stringify(response);

				response = response.replace(/&quot;/g, '"');
				response = response.replace(/\\|^"|"$/g, '');

				result = JSON.parse(response);
				}
			catch(err)
				{
				result = {err: errorc.makeErrorObject("doOperation1", "Invalid JSON received.", "SpaceifyNetwork::doOperation")};
				}

			if(result.err)
				error = result.err;
			else if(result.error)
				error = result.error;

			callback(error, result.data, id, ms);
			});
		}
	catch(err)
		{
		callback(err, null);
		}
	}

var createXMLHttpRequest = function()
	{
	return (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));		// IE7+, Firefox, Chrome, Opera, Safari : IE5, IE6
	}

var onReadyState = function(xhr, id, ms, callback)
	{
	if(xhr.readyState == 4)
		callback( (xhr.status != 200 ? xhr.status : null), (xhr.status == 200 ? xhr.response : null), id, Date.now() - ms );
	}

	// COOKIES -- -- -- -- -- -- -- -- -- -- //
self.setCookie = function(cname, cvalue, expiration_sec)
	{
	var expires = "";

	if(expiration_sec)
		{
		var dn = Date.now() + (expiration_sec * 1000);
		var dc = new Date(dn);
		expires = "expires=" + dc.toGMTString();
		}

	document.cookie = cname + "=" + cvalue + (expires != "" ? "; " + expires : "");
	}

self.getCookie = function(cname)
	{
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i = 0; i < ca.length; i++)
		{
		var c = ca[i];
		while(c.charAt(0) == " ")
			c = c.substring(1);

		if(c.indexOf(name) != -1)
			return c.substring(name.length, c.length);
		}

	return "";
	}

self.deleteCookie = function(cname)
	{
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

}

if(true)
	module.exports = SpaceifyNetwork;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Unique application, 17.10.2016 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @class SpaceifyUnique
 */

function SpaceifyUnique()
{
var self = this;

self.getUniqueDirectory = function(unique_name, noEndSlash)
	{ // Get a file system safe directory name: lowercase, allowed characters, can't start or end with /.
	unique_name = unique_name.toLowerCase();
	unique_name = unique_name.replace(/[^a-z0-9\/_]/g, "/");
	unique_name = unique_name.replace(/^\/+/, "");
	unique_name += (unique_name.search(/\/$/) != -1 ? "" : "/");

	if(noEndSlash)
		unique_name = unique_name.replace(/\/$/, "");

	return unique_name;
	}

self.getSystemctlServiceName = function(unique_name)
	{
	return unique_name.replace(/_\//g, "") + ".service";
	}

self.getBasePath = function(type, unique_name, config)
	{
	return config.APP_TYPE_PATHS[type];
	}

self.getAppPath = function(type, unique_name, config)
	{
	return config.APP_TYPE_PATHS[type] + self.getUniqueDirectory(unique_name) + config.VOLUME_DIRECTORY + config.APPLICATION_DIRECTORY;
	}

self.getVolPath = function(type, unique_name, config)
	{
	return config.APP_TYPE_PATHS[type] + self.getUniqueDirectory(unique_name) + config.VOLUME_DIRECTORY;
	}

self.getWwwPath = function(type, unique_name, config)
	{
	return self.getAppPath(type, unique_name, config) + config.WWW_DIRECTORY;
	}

}

if(true)
	module.exports = SpaceifyUnique;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Utility + Spaceify Utility, 18.9.2013, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyUtility
 */

function SpaceifyUtility()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var Logger = null;
var Language = null;
var SpaceifyConfig = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = __webpack_require__(26)(lib + "logger");
	Language = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyConfig = __webpack_require__(2)(lib + "spaceifyconfig");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());

	global.os = __webpack_require__(59);
	global.fs = __webpack_require__(0);
	global.path = __webpack_require__(60);
	global.mkdirp = __webpack_require__(57);
	global.AdmZip = __webpack_require__(53);
	global.request = __webpack_require__(61);
	global.spawn = __webpack_require__(54).spawn;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	Language = {};
	SpaceifyConfig = lib.SpaceifyConfig;
	fibrous = function(fn) { return fn; };
	}

var config = SpaceifyConfig.getConfig();
var language = Language;//new Language();
var logger = Logger.getLogger("SpaceifyUtility");

	// FILE SYSTEM -- -- -- -- -- -- -- -- -- -- //
self.loadRemoteFile = fibrous( function(fileUrl)
	{
	var result;

	try	{
		result = request.sync.get(fileUrl, { encoding: null, rejectUnauthorized: false, agent: false });
		}
	catch(err)
		{
		throw language.E_LOAD_REMOTE_FILE_FAILED_TO_INITIATE_HTTP_GET.pre("SpaceifyUtility::loadRemoteFile", err);
		}

	if(result.statusCode != 200)
		throw language.E_LOAD_REMOTE_FILE_FAILED_TO_LOAD_REMOTE_FILE.preFmt("SpaceifyUtility::loadRemoteFile", {"~file": fileUrl, "~code": result.statusCode});

	return result;
	});

self.loadRemoteFileToLocalFile = fibrous( function(fileUrl, targetDir, targetFile, throws)
	{
	try {
		var result = self.sync.loadRemoteFile(fileUrl);

		if(result.statusCode == 200)
			self.sync.writeFile(targetDir, targetFile, result.body);

		return true;
		}
	catch(err)
		{
		if(throws)
			throw language.E_LOAD_REMOTE_FILE_TO_LOCAL_FILE_FAILED.pre("SpaceifyUtility::loadRemoteFileToLocalFile", err);
		}

	return false;
	});

self.isLocal = fibrous( function(path, type)
	{
	try {
		var stats = fs.sync.stat(path);
		if(stats && type == "file" && stats.isFile())
			return true;
		else if(stats && type == "directory" && stats.isDirectory())
			return true;
		}
	catch(err)
		{
		}

	return false;
	});

self.getPathType = fibrous( function(path)
	{
	try {
		var stats = fs.sync.stat(path);
		if(stats && stats.isFile())
			return "file";
		else if(stats && stats.isDirectory())
			return "directory";
		}
	catch(err)
		{
		}

	return "undefined";
	});

self.deleteDirectory = fibrous( function(source, throws)						// Recursively deletes directory and its files and subdirectories
	{
	try {
		var stats = fs.sync.stat(source);
		if(typeof stats != "undefined" && stats.isDirectory())
			{
			fs.sync.readdir(source).forEach(function(file, index)
				{
				var curPath = source + "/" + file;
				if(fs.sync.stat(curPath).isDirectory())
					self.sync.deleteDirectory(curPath, throws);
				else
					fs.sync.unlink(curPath);
				});

			fs.sync.rmdir(source);
			}
		}
	catch(err)
		{
		if(throws)
			throw language.E_DELETE_DIRECTORY_FAILED.pre("SpaceifyUtility::deleteDirectory", err);
		}
	});

self.copyDirectory = fibrous( function(source, target, throws, excludeDirectory)
	{ // Recursively copy source directory content to target directory.
	try {
		source += (source.search(/\/$/) != -1 ? "" : "/");
		target += (target.search(/\/$/) != -1 ? "" : "/");

		var stats = fs.sync.stat(source);
		if(typeof stats == "undefined" || !stats.isDirectory() || excludeDirectory.indexOf(source) != -1)
			return;

		var mode = parseInt("0" + (stats.mode & 511/*0777*/).toString(8), 8);

		mkdirp.sync(target, mode);

		fs.sync.readdir(source).forEach(function(file, index)
			{
			var sourcePath = source + file;
			var targetPath = target + file;

			stats = fs.sync.stat(sourcePath);
			if(stats.isDirectory())
				{
				self.sync.copyDirectory(sourcePath + "/", targetPath + "/", throws, excludeDirectory);
				}
			else
				{
				mode = parseInt("0" + (stats.mode & 511/*0777*/).toString(8), 8);
				var readStream = fs.createReadStream(sourcePath, {"autoClose": true});
				var writeStream = fs.createWriteStream(targetPath, {"mode": mode});
				readStream.pipe(writeStream);
				}
			});
		}
	catch(err)
		{
		if(throws)
			throw language.E_COPY_DIRECTORY_FAILED.pre("SpaceifyUtility::copyDirectory", err);
		}
	});

self.moveDirectory = fibrous( function(source, target, throws)
	{
	try {
		self.sync.copyDirectory(source, target, true, []);
		self.sync.deleteDirectory(source, true);
		}
	catch(err)
		{
		if(throws)
			throw language.E_MOVE_DIRECTORY_FAILED.pre("SpaceifyUtility::moveDirectory", err);
		}
	});

self.deleteFile = fibrous( function(source, throws)
	{
	try {
		var stats = fs.sync.stat(source);
		if(typeof stats != "undefined" && !stats.isDirectory())
			fs.sync.unlink(source);
		}
	catch(err)
		{
		if(throws)
			throw language.E_DELETE_FILE_FAILED.pre("SpaceifyUtility::deleteFile", err);
		}
	});

self.copyFile = fibrous( function(sourceFile, targetFile, throws)
	{
	try {
		var stats = fs.sync.stat(sourceFile);
		if(typeof stats != "undefined" && !stats.isDirectory())
			{
			var mode = parseInt("0" + (stats.mode & 511/*0777*/).toString(8), 8);
			var readStream = fs.createReadStream(sourceFile, {"autoClose": true});
			var writeStream = fs.createWriteStream(targetFile, {"mode": mode});
			readStream.pipe(writeStream);
			}
		}
	catch(err)
		{
		if(throws)
			throw language.E_COPY_FILE_FAILED.pre("SpaceifyUtility::copyFile", err);
		}
	});

self.moveFile = fibrous( function(sourceFile, targetFile, throws)
{
	try {
		self.sync.copyFile(sourceFile, targetFile, true);
		self.sync.deleteFile(sourceFile, true);
		}
	catch(err)
		{
		if(throws)
			throw language.E_MOVE_FILE_FAILED.pre("SpaceifyUtility::moveFile", err);
		}
});

self.zipDirectory = fibrous( function(source, zipfile)				// Craete a zip file from the contents of the source directory
	{
	source = source + (source != "" && source.search(/\/$/) == -1 ? "/" : "");

	try {
		/*var log = console.log;										// Disable console.log for a while, bacuse adm-zip prints directory content
		console.log = function() {};

		var zip = new AdmZip();
		zip.addLocalFolder(source);
		zip.writeZip(zipfile);

		console.log = log;*/

		self.execute.sync("zip", ["-r", "-q", zipfile, ".", "-i", "*"], {cwd: source}, null);
		}
	catch(err)
		{
		throw language.E_ZIP_DIRECTORY_FAILED.pre("SpaceifyUtility::zipDirectory", err);
		}
	});

self.getFileFromZip = function(zipFilename, filename, extractPath, deleteAfter)
	{ // Get a text file from a zip file. Extracts file to the extractPath if path is defined. Deletes archive if requested.
	var regex = new RegExp(filename + "$", "i");
	var zip = new AdmZip(zipFilename);
	var zipEntries = zip.getEntries();
	for(var ze in zipEntries)
		{
		if(zipEntries[ze].entryName.search(regex) != -1)
			{
			if(extractPath)
				zip.extractAllTo(extractPath, true);

			return zip.readAsText(zipEntries[ze].entryName);
			}
		}

	if(deleteAfter)
		self.sync.deleteFile(zipFilename);

	return null;
	}

self.unZip = function(zipFilename, extractPath, deleteAfter)
	{ // Extracts archive to extractPath. Deletes archive if requested.
	var zip = new AdmZip(zipFilename);
	zip.extractAllTo(extractPath, true);

	if(deleteAfter)
		self.sync.deleteFile(zipFilename);

	return true;
	}

self.writeFile = fibrous( function(targetDir, targetFile, data)
	{
	mkdirp.sync(targetDir);

	fs.sync.writeFile(targetDir + targetFile, data);
	});

self.preparePath = function(directory)
	{ // Add / at the end of path, if it is not empty and doesn't have it already
	return directory + (!directory.match(/^$/) && !directory.match(/\/$/) ? "/" : "");	// Not empty, doesn't end with /
	}

	// WWW / NETWORK -- -- -- -- -- -- -- -- -- -- //
self.postForm = fibrous( function(url, form)
	{
	var result;

	try	{
		result = request.sync.post(url, form);
		}
	catch(err)
		{
		throw language.E_POST_FORM_FAILED_TO_INITIATE_HTTP_POST.pre("SpaceifyUtility::postForm", err);
		}

	if(result.statusCode != 200)
		throw language.E_POST_FORM_FAILED_TO_POST_FORM.preFmt("SpaceifyUtility::postForm", {"~url": url, "~code": result.statusCode});

	return result;
	});

self.postPublish = function(applicationPackage, username, password, release_name, callback)
	{
	logger.force(language.PACKAGE_POSTING);

	request({
		url: config.REGISTRY_PUBLISH_URL,
		headers: { "content-type" : "multipart/form-data" },
		method: "POST",
		multipart:
			[
				{ "Content-Disposition" : 'form-data; name="username"', body: username },
				{ "Content-Disposition" : 'form-data; name="password"', body: password },
				{ "Content-Disposition" : 'form-data; name="release"', body: release_name },
				{
				"Content-Disposition" : 'form-data; name="package"; filename="' + config.PUBLISH_ZIP + '"',
				"Content-Type" : "application/zip",
				body: fs.readFileSync(applicationPackage)
				}
			]
		},
		function(err, result, body)
			{
			callback(err ? err : null, err ? null : (result.statusCode != 200 ? result.statusCode : body));
			});
	}

self.postRegister = function(edge_id, edge_name, edge_password, callback)
	{
	//logger.force(language.POSTING_REGISTRATION);

	request["post"]({
		url: config.EDGE_REGISTER_URL,
		headers: { "content-type" : "multipart/form-data" },
		//method: "POST",
		multipart:
			[
				{ "Content-Disposition" : 'form-data; name="edge_id"', body: edge_id },
				{ "Content-Disposition" : 'form-data; name="edge_name"', body: edge_name },
				{ "Content-Disposition" : 'form-data; name="edge_password"', body: edge_password }
			]
		},
		function(err, result, body)
			{
			callback(err ? err : null, err ? null : (result.statusCode != 200 ? result.statusCode : body));
			});
	}

var isMAC = function(MAC)
	{
	return MAC.match(new RegExp(config.MAC_REGX, "i"));
	}

self.parseURLFromURLObject = function(urlObj, host, protocol, port)
	{ // //[edge.spaceify.net:32827]/service/spaceify/bigscreen
	urlObj.hostname = host + (port ? ":" + port : "");
	urlObj.protocol = protocol;

	return urlObj.format(urlObj);
	}

self.parseMultiPartData = function(contentType, body, throws)
	{ // Parse "multipart MIME data streams". Return attributes of the data stream and the body as it is (no decoding done)
	var boundary, partBoundary, endBoundary, dataLine, phase, contentTypeData = {}, bodyData, bodyParts = {};

	try {
		// content-type
		self.parseMultipartLine(contentType, contentTypeData);

		if(!(boundary = contentTypeData["boundary"]))
			throw "";

		partBoundary = "--" + boundary;
		endBoundary =  "--" + boundary + "--";

		// body
		body = body.split("\r\n");

		body.shift();
		while(body.length > 0)
			{
			phase = 0;
			bodyData = {body: ""};
			dataLine = body.shift();
			while(body.length > 0 && dataLine != partBoundary && dataLine != endBoundary)
				{
				if(dataLine == "")
					phase++;
				else if(phase == 0)
					self.parseMultipartLine(dataLine, bodyData);
				else
					bodyData.body += dataLine;

				dataLine = body.shift();
				}

			if(bodyData.name)
				bodyParts[bodyData.name] = bodyData;
			}
		}
	catch(err)
		{
		if(throws)
			throw err;
		}

	return bodyParts;
	}

self.parseMultipartLine = function(line, keyvalues)
	{ // parse multipart lines such as 'multipart/form-data; boundary=abcd' or 'Content-Disposition: form-data; name="data";' as key-value pairs
	var parts = line.split(";");

	for(var i = 0; i < parts.length; i++)
		{
		if(!parts[i])
			continue;

		var matched = parts[i].match(/[:=]/);

		if(!matched)
			keyvalues[parts[i].trim()] = "";
		else
			{
			var key = parts[i].substr(0, matched.index);
			var value = parts[i].substr(matched.index + 1);
			keyvalues[key.trim().toLowerCase()] = value.trim();
			}
		}
	}

	// PARSE / FORMAT -- -- -- -- -- -- -- -- -- -- //
self.loadJSON = fibrous( function(file, bParse, throws)
	{
	var manifest = null;

	try {
		manifest = fs.sync.readFile(file, {encoding: "utf8"});

		if(bParse)
			manifest = self.parseJSON(manifest, throws);
		}
	catch(err)
		{
		manifest = null;

		if(throws)
			throw language.E_LOAD_JSON_FAILED.pre("SpaceifyUtility::loadJSON", err);
		}

	return manifest;
	});

self.saveJSON = fibrous( function(file, json, throws)
	{
	var success = false;

	try {
		var jsondata = JSON.stringify(json, null, 2);

		fs.sync.writeFile(file, jsondata, {encoding: "utf8"});

		success = true;
		}
	catch(err)
		{
		if(throws)
			throw language.E_SAVE_JSON_FAILED.pre("SpaceifyUtility::saveJSON", err);
		}

	return success;
	});

self.parseJSON = function(str, throws)
	{
	var json;

	try {
		json = JSON.parse(str);
		}
	catch(err)
		{
		if(throws)
			throw (isNodeJs ?	language.E_PARSE_JSON_FAILED.pre("SpaceifyUtility::parseJSON", err) :
								self.makeErrorObject("JSON", "Failed to parse JSON.", "SpaceifyUtility::parseJSON"));
		}

	return json;
	}

self.replaces = function(str, strs)
	{ // Replace all occurances of %0, %1, ..., %strs.length - 1 with strings in the strs array. Reverse order so that e.g. %11 gets replaced before %1.
	for(var s = strs.length - 1; s >= 0; s--)
		{
		var regx = new RegExp("%" + s, "g");
		str = str.replace(regx, (typeof strs[s] == "undefined" ? "?" : strs[s]));
		}

	return str;
	}

self.replace = function(str, strs, replaceWith)
	{ // Replace all occurances of named tilde (~) prefixed, alphanumerical parameters (e.g. ~name, ~Name1) supplied in the strs object in the str.
	var r = (replaceWith ? replaceWith : ""), i;

	for(i in strs)
		{
		if(typeof strs[i] == "undefined")							// Don't replace parameters with undefined values
			continue;

		str = str.replace(i, strs[i]);
		}
																	// Remove unused parameters to tidy up the string
	str = str.replace(/\s~[a-zA-Z0-9]*\s/g, " " + r + " ");			// ' ~x ' -> ' ? '
	str = str.replace(/~[a-zA-Z0-9]+\s/g, " " + r + " ");			// '~x '  -> ' ? '
	str = str.replace(/\s~[a-zA-Z0-9]+/g, r);						// ' ~x'  -> '?'
	str = str.replace(/~[a-zA-Z0-9]+/g, r);							// '~x'   -> '?'

	return str;
	}

	// OPERATING SYSTEM -- -- -- -- -- -- -- -- -- -- //
self.execute = function(command, args, options, messageCallback, callback)
	{
	var bExited = false;
	var stdout = "";
	var stderr = "";

	var spawned = spawn(command, args, options);

	spawned.stdout.on("data", function(data)
		{
		if(messageCallback)
			messageCallback(false, data);

		stdout += data;
		});

	spawned.stderr.on("data", function(data)
		{
		if(messageCallback)
			messageCallback(true, data);

		stderr += data;
		});

	spawned.on("error", function(err)
		{
		if(!bExited) {
			callback(err, null); bExited = true; }
		});

	spawned.on("close", function(code)
		{
		if(!bExited) {
			callback(null, {code: code, signal: null, stdout: stdout, stderr: stderr}); bExited = true; }
		});

	spawned.on("exit", function(code, signal)
		{
		if(!bExited) {
			callback(null, {code: code, signal: signal, stdout: stdout, stderr: stderr}); bExited = true; }
		});
	}

	// STRING -- -- -- -- -- -- -- -- -- -- //
self.ucfirst = function(str)
	{
	return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// RANDOM -- -- -- -- -- -- -- -- -- -- //
self.randomString = function(length, useAlpha)
	{ // http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
	var chars = "", i;

	if(useAlpha)
		chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	else
		chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!�$#%&/(){}[]<>|��=+?*,.;:-_";

	var result = "";
	for(i = length; i > 0; --i)
		result += chars[Math.round(Math.random() * (chars.length - 1))];

	return result;
	}

self.generateRandomConnectionId = function(connections)
	{
	var ret;

	while(true)
		{
		ret = Math.floor(Math.random() * 4294967296);	//2 to power 32
		if (!connections.hasOwnProperty(ret))
			break;
		}

	return ret;
	}

self.bytesToHexString = function(bytes)
	{
	for(var hex = [], i = 0; i < bytes.length; i++)
		{
		hex.push((bytes[i] >>> 4).toString(16));
		hex.push((bytes[i] & 0xF).toString(16));
		}

	return hex.join("");
	}

	// DATE -- -- -- -- -- -- -- -- -- -- //
self.getLocalDateTime = function()
	{
	var date;
	date = new Date();
	date = date.getFullYear() + "-" +
	("00" + (date.getMonth()+1)).slice(-2) + "-" +
	("00" + date.getDate()).slice(-2) + " " +
	("00" + date.getHours()).slice(-2) + ":" +
	("00" + date.getMinutes()).slice(-2) + ":" +
	("00" + date.getSeconds()).slice(-2);

	return date;
	}

	// TYPES -- -- -- -- -- -- -- -- -- -- //
self.isObjectEmpty = function(obj)
	{
	return (typeof obj != "object" ? true : (Object.keys(obj).length == 0 ? true : false));
	}

self.assoc = function(_array, _key, _value)
	{ // Imitate associative arrays
	_key in _array ? _array[_key] = [_value] : _array[key].push(_value);

	return _array;
	}

self.toBuffer = function(data)
	{ // Make sure data is an instance of Buffer
	if(data instanceof Buffer)
		return data;
	else if(data instanceof Array || data instanceof Object)
		return new Buffer(JSON.stringify(data), "utf8");
	else if(typeof data == "string")
		return new Buffer(data, "utf8");
	else
		return new Buffer(data.toString(), "utf8");
	}

	// APPLICATION -- -- -- -- -- -- -- -- -- -- //
self.getApplicationIcon = function(manifest, startWithSlash)
	{
	var icon = null;

	if(manifest && manifest.images)
		{
		for(var i = 0; i < manifest.images.length; i++)
			{
			if(manifest.images[i].file.search("/^(icon\.)/i" != -1))
				{
				icon =	(startWithSlash ? "/" : "") + "images/" +
						("directory" in manifest.images[i] ? manifest.images[i].directory + "/" : "") + manifest.images[i].file;
				break;
				}
			}
		}

	return icon;
	}

}

if(true)
	module.exports = SpaceifyUtility;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * BinaryRpcCommunicator, 21.6.2016 Spaceify Oy
 *
 * A class that implements the JSON-RPC 2.0 protocol supporting single, batch and notification requests.
 * Communicates with the outside world with WebSocketConnection or WebRTCConnection objects
 * on the layer below. This is a two-way class that implements both client and server functionality.
 *
 * BinaryRpcCommunicator is a version of the RPCCommunicator class that supports
 * transmitting RPC calls in a binary format over-the-wire. This functionality is
 * turned on if handleBinary contructor parameter is set to "true".
 * The over-the-wire binary format for request is the following:
 *
 * | Message Length | MessageType | ID Length |   ID     | Method length | Method   | Params length | Params
 * | (Uint64)       | (Uint32) =0 | (Uint32)  | (string) | (Uint32)      | (string) | (Uint64)      | (byte[])
 * |----------------|-------------|-----------|----------|---------------|----------|---------------|-------
 * 0                8             12         16
 *
 * The reply format is the following
 *
 * | Message Length | MessageType | ID Length |   ID     | Error length  | Error    | Result length | Result
 * | (Uint64)       | (Uint32) =1 | (Uint32)  |(string)  | (Uint32)      | (string) | (Uint64)      | (byte[])
 * |----------------|-------------|-----------|----------|---------------|----------|---------------|----
 * 0                8            12          16
 *
 * In Javascript, the Params and Result fields are handled as ArrayBuffers, and their interpretation
 * is left to the corresponding RPC methods.
 *
 * class @BinaryRpcCommunicator
 */

function BinaryRpcCommunicator(handleBinary)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var Logger = null;
var SpaceifyError = null;
var CallbackBuffer = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	CallbackBuffer = __webpack_require__(30)(lib + "callbackbuffer");
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	SpaceifyError = lib.SpaceifyError;
	CallbackBuffer = lib.CallbackBuffer;
	SpaceifyUtility = lib.SpaceifyUtility;
	fibrous = function(fn) { return fn; };
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var callbackBuffer = new CallbackBuffer();
var logger = Logger.getLogger("BinaryRpcCommunicator");

var callSequence = 1;
var exposedRpcMethods = {};

var eventListener = null;
var binaryListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

var connections = {};
var latestConnectionId = null;

var EXPOSE_SYNC = 0;
var EXPOSE_TRADITIONAL = 1;
var  REQUEST_STR = "  REQUEST      -> ";
var   NOTIFY_STR = "  NOTIFICATION -> ";
var RESPONSE_STR = "  RETURN VALUE <- ";

//** Upwards interface towards business logic

self.exposeRpcMethod = function(name, object, method)
	{
	try	{
		exposedRpcMethods[name] = {type: EXPOSE_TRADITIONAL, method: method};
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.exposeRpcMethodSync = function(name, object, method)
	{
	try	{
		exposedRpcMethods[name] = {type: EXPOSE_SYNC, method: method};
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setConnectionListener = function(listener)
	{
	if (typeof listener == "function")
		connectionListeners.push(listener);
	};

self.setDisconnectionListener = function(listener)
	{
	if (typeof listener == "function")
		disconnectionListeners.push(listener);
	};

self.setBinaryListener = function(listener)
	{
	binaryListener = (typeof listener == "function" ? listener : null);
	};

self.connectionExists = function(connectionId)
	{
	if (typeof connectionId !== "undefined" && connections.hasOwnProperty(connectionId) )
		return true;
	else if (typeof connectionId === "undefined" && connections.hasOwnProperty(latestConnectionId))
		return true;
	else
		return false;
	};

self.getConnection = function(connectionId)
	{
	return connections[connectionId];
	};

// Outgoing RPC call

self.callRpc = function(methods, params, object, callback, connectionId)
	{
	var callObject;
	var callObjects = [];
	var isBatch = false, currentId;
	var id = (typeof connectionId != "undefined" ? connectionId : latestConnectionId);		// Assume there is only one connection

	logger.log("BinaryRpcCommunicator::callRpc() connectionId: " + connectionId);

	if (!self.connectionExists(connectionId))
		return;

	try	{
		if (!(methods instanceof Array))													// Process single request as "a single batch request"
			{
			isBatch = false;
			params = [params];
			methods = [methods];
			}

		currentId = callSequence;															// Batch requests have only one callback and the id in
																							// the callbackBuffer is the id of the first request
		for(var i=0; i<methods.length; i++)
			{
			if (typeof callback == "function")												// Call: expects a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i], id: callSequence++};
			else																			// Notification: doesn't expect a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i]};

			callObjects.push(callObject);

			//logger.log(NOTIFY_STR + JSON.stringify(callObject));
			}

		if (typeof callback == "function")
			callbackBuffer.pushBack(currentId, object, callback);
		}
	catch(err)
		{
		return (typeof callback == "function" ? callback(errorc.makeErrorObject(-32000, "callRpc failed.", "BinaryRpcCommunicator::callRpc"), null) : false);
		}

	var request = isBatch ? callObjects : callObjects[0];									// Send as batch only if call was originally batch

	sendMessage(request, id);
	};

// Sends a RPC notification to all connections
self.notifyAll = function(method, params)
	{
	try	{
		for (var key in connections)
			{
			logger.log("BinaryRpcCommunicator::notifyAll() sending message to " + key);

			sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": null}, key);
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getBufferedAmount = function(connectionId)
	{
	return connections[connectionId].getBufferedAmount();
	};

self.sendBinary = function(data, connectionId)
	{
	logger.log("BinaryRpcCommunicator::sendBinary() " + data.byteLength);

	try	{
		connections[connectionId].sendBinary(data);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** Private methods

var sendBinaryCall = function(callId, method, params, connectionId)
	{
	var messageBuffer = new ArrayBuffer(8+4+callId.length+4+method.length+8+params.byteLength);
	var view = new DataView(messageBuffer);
	var messageArray = new Uint8Array(messageBuffer);

	view.setUint32(4, messageBuffer.byteLength - 8);
	view.setUint32(8, callId.length);
	view.setUint32(8 + 4 + callId.length, method.length);

	//messageArray.subarray(8 + 4, 8 + 4 + 4 + callId.length).set(params);
	//messageArray.subarray(8 + 4 + callId.length + 4 + method.length + 8, messageBuffer.byteLength).set(params);

	messageArray.subarray(8 + 4 + callId.length + 4 + method.length + 8, messageBuffer.byteLength).set(params);
	};

var sendMessage = function(message, connectionId)
	{
	try	{
		connections[connectionId].send(JSON.stringify(message));
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};
self.sendMessage = sendMessage;	//for testing, remove this later

// Send the return value of the RPC call to the caller
var sendResponse = function(err, result, id, connectionId)
	{
	try	{
		if (err)
			{
			logger.error(["Exception in executing a RPC method.", err], true, true, logger.ERROR);

			sendMessage({"jsonrpc": "2.0", "error": err, "id": id}, connectionId);
			}
		else
			sendMessage({"jsonrpc": "2.0", "result": result, "id": id}, connectionId);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var handleMessage = function(requestsOrResponses, connectionId)
	{
	var isBatch = true;

	try	{
		if (!(requestsOrResponses instanceof Array))									// Process single request/response as "a single batch request/response"
			{ requestsOrResponses = [requestsOrResponses]; isBatch = false; }

		if (requestsOrResponses[0].method)												// Received a RPC Call from outside
			{
			logger.log("RpcCommunicator::handleRpcCall() connectionId: " + connectionId);

			if (isNodeJs && !isRealSpaceify)
				{
				fibrous.run( function()
					{
					handleRPCCall.sync(requestsOrResponses, isBatch, [], true, connectionId);
					}, function(err, data) { } );
				}
			else
				handleRPCCall(requestsOrResponses, isBatch, [], true, connectionId);
			}
		else																			// Received a return value(s) to an RPC call made by us
			handleReturnValue(requestsOrResponses, isBatch);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var handleRPCCall = function(requests, isBatch, responses, onlyNotifications, connectionId)
	{
	var result;
	var request = requests.shift();

	if (!request)
		{
		if (!onlyNotifications && responses.length == 0)
			responses.push({"jsonrpc": "2.0", "error": {"code": -32603, "message": "Internal JSON-RPC error."}, id: null});

		if (responses.length > 0)															// Batch -> [response objects] || Single -> response object
			sendMessage((isBatch ? responses : responses[0]), connectionId);
		}
	else
		{
		var requestId = (request.hasOwnProperty("id") ? request.id : null);
		var rpcParams = (request.hasOwnProperty("params") ? request.params : []);

		if (requestId != null)
			onlyNotifications = false;

		logger.log((requestId ? REQUEST_STR : NOTIFY_STR) + JSON.stringify(request));

		if (!request.jsonrpc || request.jsonrpc != "2.0" || !request.method)				// Invalid JSON-RPC
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32600, "message": "The JSON sent is not a valid Request object."}, "id": null}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		if (rpcParams !== "undefined" && rpcParams.constructor !== Array )
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32602, "message": "Invalid method parameter(s). Parameters must be placed inside an array."}, "id": requestId}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		if (!exposedRpcMethods.hasOwnProperty(request.method))								// Unknown method
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32601, "message": "The method does not exist / is not available: " + request.method + "."}, "id": requestId}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		try	{
			var rpcMethod = exposedRpcMethods[request.method];

			var got = rpcParams.length;														// Check parameter count
			var expected = (rpcMethod.type == EXPOSE_SYNC ? (isRealSpaceify ? rpcMethod.method.length : rpcMethod.method.getLength()) - 1 : rpcMethod.method.length - 2);
																							// Synchronous: ..., connObj
			if (expected < got)																// Traditional: ..., connObj, callback
				rpcParams.splice(expected - got, got - expected);
			else if (expected > got)
				{
				expected = expected - got;
				while(expected--)
					rpcParams.push(null);
				}

			var connObj =	{
							requestId: requestId,
							connectionId: connectionId,
							isSecure: connections[connectionId].getIsSecure()
							};

			if (!isRealSpaceify)
				{
				connObj.origin = connections[connectionId].getOrigin(),
				connObj.remotePort = connections[connectionId].getRemotePort(),
				connObj.remoteAddress = connections[connectionId].getRemoteAddress()
				}

			if (rpcMethod.type == EXPOSE_SYNC && !isRealSpaceify)							// Core methods wrapped in fibrous
				{
				//result = rpcMethod.method.sync(...rpcParams, connObj);

				rpcParams.push(connObj);
				result = rpcMethod.method.sync.apply(rpcMethod.object, rpcParams);

				addResponse(requestId, result, responses);

				handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
				}
			else if (rpcMethod.type == EXPOSE_SYNC && isRealSpaceify)						// Application methods exposed with exposeRpcMethodSync
				{
				//result = rpcMethod.method(...rpcParams, connObj);

				rpcParams.push(connObj);
				result = rpcMethod.method.apply(rpcMethod.object, rpcParams);

				addResponse(requestId, result, responses);

				handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
				}
			else																			// Traditional callback based methods
				{
				if (requestId != null)															// Request
					{
					/*rpcMethod.method(...rpcParams, connObj, function(err, data)
						{
						if (err)
							{
							addError(requestId, err, responses);

							handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
							}
						else
							{
							addResponse(requestId, data, responses);

							handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
							}
						});*/

					rpcParams.push(connObj, function(err, data)
						{
						callbackReturns(err, data, requestId, requests, isBatch, responses, onlyNotifications, connectionId);
						});
					rpcMethod.method.apply(rpcMethod.object, rpcParams);
					}
				else																			// Notification
					{
					//rpcMethod.method(...rpcParams, connObj, null);

					rpcParams.push(connObj);
					rpcMethod.method.apply(rpcMethod.object, rpcParams);

					handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
					}
				}
			}
		catch(err)
			{
			addError(requestId, err, responses);

			handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}
		}
	};

var callbackReturns = function(err, data, requestId, requests, isBatch, responses, onlyNotifications, connectionId)
	{
	if (err)
		{
		addError(requestId, err, responses);

		handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
		}
	else
		{
		addResponse(requestId, data, responses);
		handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
		}
	}

var addResponse = function(requestId, result, responses)
	{
	if (requestId != null)																	// Requests send responses
		{
		result = (typeof result === "undefined" ? null : result);

		logger.log("  RESPONSE <- " + JSON.stringify(result));

		responses.push({jsonrpc: "2.0", result: result, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO RESPONSE SEND");
	}

var addError = function(requestId, err, responses)
	{
	if (requestId != null)																	// Requests send responses
		{
		err = errorc.make(err);																	// Make all errors adhere to the SpaceifyError format

		logger.log("  ERROR RESPONSE <- " + JSON.stringify(err));

		responses.push({jsonrpc: "2.0", error: err, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO ERROR RESPONSE SEND");
	}

// Handle incoming return values for a RPC call that we have made previously
var handleReturnValue = function(responses, isBatch)
	{
	logger.log("BinaryRpcCommunicator::handleReturnValue()");

	var error = null, result = null;

	try	{
		if (isBatch)
			{
			var processed = processBatchResponse(responses);
			callbackBuffer.callMethodAndPop(processed.smallestId, processed.errors, processed.results);
			}
		else
			{
			logger.log(RESPONSE_STR + JSON.stringify(responses[0]));

			if (!responses[0].jsonrpc || responses[0].jsonrpc != "2.0" || !responses[0].id || (responses[0].result && responses[0].error))
				return;

			if (responses[0].hasOwnProperty("error"))
				{
				error = responses[0].error;
				result = null;
				}
			else if (responses[0].hasOwnProperty("result"))
				{
				error = null;
				result = responses[0].result;
				}

			callbackBuffer.callMethodAndPop(responses[0].id, error, result);
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var processBatchResponse = function(responses)
	{ // Process raw JSON-RPC objects returned by batch JSON-RPC call. Returns an array containing
	  // [{error: .., result: ...}, {error: ..., result: ....}, ...] objects.
	var smallestId = -1;
	var errors = {}, results = {}

	for(var r=0; r<responses.length; r++)
		{
		logger.log(RESPONSE_STR + JSON.stringify(responses[r]));

		if (!responses[r].jsonrpc || responses[r].jsonrpc != "2.0" || !responses[r].id || (responses[r].result && responses[r].error))
			continue;

		smallestId = Math.max(smallestId, responses[r].id);

		if (responses[r].hasOwnProperty("error"))
			{
			errors[responses[r].id] = responses[r].error;
			results[responses[r].id] = null;
			}
		else if (responses[r].hasOwnProperty("result"))
			{
			errors[responses[r].id] = null;
			results[responses[r].id] = results[r].result;
			}
		}

	return {smallestId: smallestId, errors: errors, results: results};
	}

var handleBinary = function(data, connectionId)
	{
	var view = new DataView(data);
	var dataArray = new Uint8Array(data);

	var messageSize = view.getUint32(4);
	var messageType = view.getUint32(8);
	var idSize = view.getUint32(12);

	var id = dataArray.subarray(16, 16+idSize);
	var idString = String.fromCharCode.apply(null, id);

	var methodSize = view.getUint32(16+idSize);

	var method = dataArray.subarray(16+idSize+4, 16+idSize+4+methodSize);
	var methodString = String.fromCharCode.apply(null, method);

	var paramsSize = view.getUint32( 16+idSize+4+methodSize+4);
	var params = dataArray.subarray(16+idSize+4+methodSize+4+4, 16+idSize+4+methodSize+4+4+paramsSize);
	}

self.setupPipe = function(firstId, secondId)
	{
	logger.log("BinaryRpcCommunicator::setupPipe() between: " + firstId + " and " + secondId);

	if (!connections.hasOwnProperty(firstId) || !connections.hasOwnProperty(secondId))
		return;

	connections[firstId].setPipedTo(secondId);
	connections[secondId].setPipedTo(firstId);
	};

//** Downwards interface towards a connection

//** MessageListener interface implementation

self.onMessage = function(messageData, connection)
	{
	//logger.log("BinaryRpcCommunicator::onMessage(" + typeof messageData + ") " + messageData);

	try	{
		var pipeTarget = connection.getPipedTo();

		if (pipeTarget != null)
			{
			connections[pipeTarget].send(messageData);

			return;
			}

		if (messageData instanceof ArrayBuffer)
			{
			handleBinary(messageData, connection.getId());

			return;
			}

		// JSON-RPC
		try {
			messageData = JSON.parse(messageData);

			handleMessage(messageData, connection.getId());
			}
		catch (err)
			{
			sendMessage({"jsonrpc": "2.0", "error": {"code": -32700, "message": "Invalid JSON."}, "id": null}, connection.getId());
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** EventListener interface implementation (events originate from server)

self.addConnection = function(conn)
	{
	try	{
		if (!conn.getId())
			conn.setId(utility.generateRandomConnectionId(connections));	// Use random connectionId to make ddos a little more difficult

		connections[conn.getId()] = conn;
		conn.setEventListener(self);

		for(var i=0; i<connectionListeners.length; i++)						// Bubble the event to client
			connectionListeners[i](conn.getId());

		latestConnectionId = conn.getId();
		return conn.getId();
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.onDisconnected = function(connectionId)
	{
	try	{
		self.closeConnection(connectionId);

		for(var i=0; i<disconnectionListeners.length; i++)			// Bubble the event to clients
			disconnectionListeners[i](connectionId);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** ---------------------------------------

self.closeConnection = function(connectionId)
	{
	try	{
		if (connectionId in connections)
			{
			connections[connectionId].close();
			delete connections[connectionId];
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setOptions = function(options)
	{
	if(logger && options.logger)
		logger.clone(options.logger);
	}

}

// Do this only in node.js, not in the browser

if (true)
	module.exports = BinaryRpcCommunicator;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * CallbackBuffer, 12.5.2016 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @class CallbackBuffer
 */

function CallbackBuffer(initialListSize)
{
var self = this;

var callbacks = new Object();

self.pushBack = function(id, object, method)
	{
	callbacks[id] = [object, method, Date.now()];
	};

self.callMethodAndPop = function(id, error, result)
	{
	if (callbacks.hasOwnProperty(id))
		{
		(callbacks[id][1]).call(callbacks[id][0], error, result, id, Date.now() - callbacks[id][2]);
		delete callbacks[id];
		}
	else
		throw {error: "CallbackBuffer::callMethodAndPop(). Callback not found"};
	};
}

if (true)
	module.exports = CallbackBuffer;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * RpcCommunicator, 21.6.2016 Spaceify Oy
 *
 * A class that implements the JSON-RPC 2.0 protocol supporting single, batch and notification requests.
 * Communicates with the outside world with WebSocketConnection or WebRTCConnection objects
 * on the layer below. This is a two-way class that implements both client and server functionality.
 *
 * class @RpcCommunicator
 */

function RpcCommunicator()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var Logger = null;
var SpaceifyError = null;
var CallbackBuffer = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	CallbackBuffer = __webpack_require__(30)(lib + "callbackbuffer");
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	SpaceifyError = lib.SpaceifyError;
	CallbackBuffer = lib.CallbackBuffer;
	SpaceifyUtility = lib.SpaceifyUtility;
	fibrous = function(fn) { return fn; };
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var callbackBuffer = new CallbackBuffer();
var logger = Logger.getLogger("RpcCommunicator");

var callSequence = 1;
var exposedRpcMethods = {};

var eventListener = null;
var binaryListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

var connections = {};
var latestConnectionId = null;

var EXPOSE_SYNC = 0;
var EXPOSE_TRADITIONAL = 1;
var  REQUEST_STR = "  REQUEST      -> ";
var   NOTIFY_STR = "  NOTIFICATION -> ";
var RESPONSE_STR = "  RETURN VALUE <- ";

//** Upwards interface towards business logic

self.exposeRpcMethod = function(name, object, method)
	{
	try	{
		exposedRpcMethods[name] = {type: EXPOSE_TRADITIONAL, method: method};
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.exposeRpcMethodSync = function(name, object, method)
	{
	try	{
		exposedRpcMethods[name] = {type: EXPOSE_SYNC, method: method};
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setConnectionListener = function(listener)
	{
	if (typeof listener == "function")
		connectionListeners.push(listener);
	};

self.setDisconnectionListener = function(listener)
	{
	if (typeof listener == "function")
		disconnectionListeners.push(listener);
	};

self.setBinaryListener = function(listener)
	{
	binaryListener = (typeof listener == "function" ? listener : null);
	};

self.connectionExists = function(connectionId)
	{
	if (typeof connectionId !== "undefined" && connections.hasOwnProperty(connectionId) )
		return true;
	else if (typeof connectionId === "undefined" && connections.hasOwnProperty(latestConnectionId))
		return true;
	else
		return false;
	};

self.getConnection = function(connectionId)
	{
	return connections[connectionId];
	};

// Outgoing RPC call

self.callRpc = function(methods, params, object, callback, connectionId)
	{
	var callObject;
	var callObjects = [];
	var isBatch = false, currentId;
	var id = (typeof connectionId != "undefined" ? connectionId : latestConnectionId);		// Assume there is only one connection

	logger.log("RpcCommunicator::callRpc() connectionId: " + connectionId);

	if (!self.connectionExists(connectionId))
		return;

	try	{
		if (!(methods instanceof Array))													// Process single request as "a single batch request"
			{
			isBatch = false;
			params = [params];
			methods = [methods];
			}

		currentId = callSequence;															// Batch requests have only one callback and the id in
																							// the callbackBuffer is the id of the first request
		for(var i=0; i<methods.length; i++)
			{
			if (typeof callback == "function")												// Call: expects a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i], id: callSequence++};
			else																			// Notification: doesn't expect a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i]};

			callObjects.push(callObject);

			//logger.log(NOTIFY_STR + JSON.stringify(callObject));
			}

		if (typeof callback == "function")
			callbackBuffer.pushBack(currentId, object, callback);
		}
	catch(err)
		{
		return (typeof callback == "function" ? callback(errorc.makeErrorObject(-32000, "callRpc failed.", "RpcCommunicator::callRpc"), null) : false);
		}

	var request = isBatch ? callObjects : callObjects[0];									// Send as batch only if call was originally batch

	sendMessage(request, id);
	};

// Sends a RPC notification to all connections
self.notifyAll = function(method, params)
	{
	try	{
		for (var key in connections)
			{
			logger.log("RpcCommunicator::notifyAll() sending message to " + key);

			sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": null}, key);
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getBufferedAmount = function(connectionId)
	{
	return connections[connectionId].getBufferedAmount();
	};

self.sendBinary = function(data, connectionId)
	{
	logger.log("RPCCommunicator::sendBinary() " + data.byteLength);

	try	{
		connections[connectionId].sendBinary(data);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** Private methods

var sendBinaryCall = function(callId, method, params, connectionId)
	{
	var messageBuffer = new ArrayBuffer(8+4+callId.length+4+method.length+8+params.byteLength);
	var view = new DataView(messageBuffer);
	var messageArray = new Uint8Array(messageBuffer);

	view.setUint32(4, messageBuffer.byteLength - 8);
	view.setUint32(8, callId.length);
	view.setUint32(8 + 4 + callId.length, method.length);

	//messageArray.subarray(8 + 4, 8 + 4 + 4 + callId.length).set(params);
	//messageArray.subarray(8 + 4 + callId.length + 4 + method.length + 8, messageBuffer.byteLength).set(params);

	messageArray.subarray(8 + 4 + callId.length + 4 + method.length + 8, messageBuffer.byteLength).set(params);
	};

var sendMessage = function(message, connectionId)
	{
	try	{
		connections[connectionId].send(JSON.stringify(message));
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};
self.sendMessage = sendMessage;	//for testing, remove this later

// Send the return value of the RPC call to the caller
var sendResponse = function(err, result, id, connectionId)
	{
	try	{
		if (err)
			{
			logger.error(["Exception in executing a RPC method.", err], true, true, logger.ERROR);

			sendMessage({"jsonrpc": "2.0", "error": err, "id": id}, connectionId);
			}
		else
			sendMessage({"jsonrpc": "2.0", "result": result, "id": id}, connectionId);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var handleMessage = function(requestsOrResponses, connectionId)
	{
	var isBatch = true;

	try	{
		if (!(requestsOrResponses instanceof Array))									// Process single request/response as "a single batch request/response"
			{ requestsOrResponses = [requestsOrResponses]; isBatch = false; }

		if (requestsOrResponses[0].method)												// Received a RPC Call from outside
			{
			logger.log("RpcCommunicator::handleRpcCall() connectionId: " + connectionId);

			if (isNodeJs && !isRealSpaceify)
				{
				fibrous.run( function()
					{
					handleRPCCall.sync(requestsOrResponses, isBatch, [], true, connectionId);
					}, function(err, data) { } );
				}
			else
				handleRPCCall(requestsOrResponses, isBatch, [], true, connectionId);
			}
		else																			// Received a return value(s) to an RPC call made by us
			handleReturnValue(requestsOrResponses, isBatch);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var handleRPCCall = function(requests, isBatch, responses, onlyNotifications, connectionId)
	{
	var result;
	var request = requests.shift();

	if (!request)
		{
		if (!onlyNotifications && responses.length == 0)
			responses.push({"jsonrpc": "2.0", "error": {"code": -32603, "message": "Internal JSON-RPC error."}, id: null});

		if (responses.length > 0)															// Batch -> [response objects] || Single -> response object
			sendMessage((isBatch ? responses : responses[0]), connectionId);
		}
	else
		{
		var requestId = (request.hasOwnProperty("id") ? request.id : null);
		var rpcParams = (request.hasOwnProperty("params") ? request.params : []);

		if (requestId != null)
			onlyNotifications = false;

		logger.log((requestId ? REQUEST_STR : NOTIFY_STR) + JSON.stringify(request));

		if (!request.jsonrpc || request.jsonrpc != "2.0" || !request.method)				// Invalid JSON-RPC
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32600, "message": "The JSON sent is not a valid Request object."}, "id": null}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		if (rpcParams !== "undefined" && rpcParams.constructor !== Array )
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32602, "message": "Invalid method parameter(s). Parameters must be placed inside an array."}, "id": requestId}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		if (!exposedRpcMethods.hasOwnProperty(request.method))								// Unknown method
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32601, "message": "The method does not exist / is not available: " + request.method + "."}, "id": requestId}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		try	{
			var rpcMethod = exposedRpcMethods[request.method];

			var got = rpcParams.length;														// Check parameter count
			var expected = (rpcMethod.type == EXPOSE_SYNC ? (isRealSpaceify ? rpcMethod.method.length : rpcMethod.method.getLength()) - 1 : rpcMethod.method.length - 2);
																							// Synchronous: ..., connObj
			if (expected < got)																// Traditional: ..., connObj, callback
				rpcParams.splice(expected - got, got - expected);
			else if (expected > got)
				{
				expected = expected - got;
				while(expected--)
					rpcParams.push(null);
				}

			var connObj =	{
							requestId: requestId,
							connectionId: connectionId,
							isSecure: connections[connectionId].getIsSecure(),
							};

			if (!isRealSpaceify)
				{
				connObj.origin = connections[connectionId].getOrigin(),
				connObj.remotePort = connections[connectionId].getRemotePort(),
				connObj.remoteAddress = connections[connectionId].getRemoteAddress()
				}

			if (rpcMethod.type == EXPOSE_SYNC && !isRealSpaceify)							// Core methods wrapped in fibrous
				{
				//result = rpcMethod.method.sync(...rpcParams, connObj);

				rpcParams.push(connObj);
				result = rpcMethod.method.sync.apply(rpcMethod.object, rpcParams);

				addResponse(requestId, result, responses);

				handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
				}
			else if (rpcMethod.type == EXPOSE_SYNC && isRealSpaceify)						// Application methods exposed with exposeRpcMethodSync
				{
				//result = rpcMethod.method(...rpcParams, connObj);

				rpcParams.push(connObj);
				result = rpcMethod.method.apply(rpcMethod.object, rpcParams);

				addResponse(requestId, result, responses);

				handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
				}
			else																			// Traditional callback based methods
				{
				if (requestId != null)															// Request
					{
					/*rpcMethod.method(...rpcParams, connObj, function(err, data)
						{
						if (err)
							{
							addError(requestId, err, responses);

							handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
							}
						else
							{
							addResponse(requestId, data, responses);

							handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
							}
						});*/

					rpcParams.push(connObj, function(err, data)
						{
						callbackReturns(err, data, requestId, requests, isBatch, responses, onlyNotifications, connectionId);
						});
					rpcMethod.method.apply(rpcMethod.object, rpcParams);
					}
				else																			// Notification
					{
					//rpcMethod.method(...rpcParams, connObj, null);

					rpcParams.push(connObj);
					rpcMethod.method.apply(rpcMethod.object, rpcParams);

					handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
					}
				}
			}
		catch(err)
			{
			addError(requestId, err, responses);

			handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}
		}
	};

var callbackReturns = function(err, data, requestId, requests, isBatch, responses, onlyNotifications, connectionId)
	{
	if (err)
		{
		addError(requestId, err, responses);

		handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
		}
	else
		{
		addResponse(requestId, data, responses);
		handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
		}
	}

var addResponse = function(requestId, result, responses)
	{
	if (requestId != null)																	// Requests send responses
		{
		result = (typeof result === "undefined" ? null : result);

		logger.log("  RESPONSE <- " + JSON.stringify(result));

		responses.push({jsonrpc: "2.0", result: result, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO RESPONSE SEND");
	}

var addError = function(requestId, err, responses)
	{
	if (requestId != null)																	// Requests send responses
		{
		err = errorc.make(err);																	// Make all errors adhere to the SpaceifyError format

		logger.log("  ERROR RESPONSE <- " + JSON.stringify(err));

		responses.push({jsonrpc: "2.0", error: err, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO ERROR RESPONSE SEND");
	}

// Handle incoming return values for a RPC call that we have made previously
var handleReturnValue = function(responses, isBatch)
	{
	logger.log("RpcCommunicator::handleReturnValue()");

	var error = null, result = null;

	try	{
		if (isBatch)
			{
			var processed = processBatchResponse(responses);
			callbackBuffer.callMethodAndPop(processed.smallestId, processed.errors, processed.results);
			}
		else
			{
			logger.log(RESPONSE_STR + JSON.stringify(responses[0]));

			if (!responses[0].jsonrpc || responses[0].jsonrpc != "2.0" || !responses[0].id || (responses[0].result && responses[0].error))
				return;

			if (responses[0].hasOwnProperty("error"))
				{
				error = responses[0].error;
				result = null;
				}
			else if (responses[0].hasOwnProperty("result"))
				{
				error = null;
				result = responses[0].result;
				}

			callbackBuffer.callMethodAndPop(responses[0].id, error, result);
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var processBatchResponse = function(responses)
	{ // Process raw JSON-RPC objects returned by batch JSON-RPC call. Returns an array containing
	  // [{error: .., result: ...}, {error: ..., result: ....}, ...] objects.
	var smallestId = -1;
	var errors = {}, results = {}

	for(var r=0; r<responses.length; r++)
		{
		logger.log(RESPONSE_STR + JSON.stringify(responses[r]));

		if (!responses[r].jsonrpc || responses[r].jsonrpc != "2.0" || !responses[r].id || (responses[r].result && responses[r].error))
			continue;

		smallestId = Math.max(smallestId, responses[r].id);

		if (responses[r].hasOwnProperty("error"))
			{
			errors[responses[r].id] = responses[r].error;
			results[responses[r].id] = null;
			}
		else if (responses[r].hasOwnProperty("result"))
			{
			errors[responses[r].id] = null;
			results[responses[r].id] = results[r].result;
			}
		}

	return {smallestId: smallestId, errors: errors, results: results};
	}

self.setupPipe = function(firstId, secondId)
	{
	logger.log("RpcCommunicator::setupPipe() between: " + firstId + " and " + secondId);

	if (!connections.hasOwnProperty(firstId) || !connections.hasOwnProperty(secondId))
		return;

	connections[firstId].setPipedTo(secondId);
	connections[secondId].setPipedTo(firstId);
	};

//** Downwards interface towards a connection

//** MessageListener interface implementation

self.onMessage = function(messageData, connection)
	{
	//logger.log("RpcCommunicator::onMessage(" + typeof messageData + ") " + messageData);

	try	{
		var pipeTarget = connection.getPipedTo();

		if (pipeTarget != null)
			{
			connections[pipeTarget].send(messageData);

			return;
			}

		if (messageData instanceof ArrayBuffer)
			{
			if (typeof binaryListener == "function")
				binaryListener.onBinary(messageData, connection.getId());

			return;
			}

		// JSON-RPC
		try {
			messageData = JSON.parse(messageData);

			handleMessage(messageData, connection.getId());
			}
		catch (err)
			{
			sendMessage({"jsonrpc": "2.0", "error": {"code": -32700, "message": "Invalid JSON."}, "id": null}, connection.getId());
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** EventListener interface implementation (events originate from server)

self.addConnection = function(conn)
	{
	try	{
		if (!conn.getId())
			conn.setId(utility.generateRandomConnectionId(connections));	// Use random connectionId to make ddos a little more difficult

		connections[conn.getId()] = conn;
		conn.setEventListener(self);

		for(var i=0; i<connectionListeners.length; i++)						// Bubble the event to client
			connectionListeners[i](conn.getId());

		latestConnectionId = conn.getId();
		return conn.getId();
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.onDisconnected = function(connectionId)
	{
	try	{
		self.closeConnection(connectionId);

		for(var i=0; i<disconnectionListeners.length; i++)			// Bubble the event to clients
			disconnectionListeners[i](connectionId);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** ---------------------------------------

self.closeConnection = function(connectionId)
	{
	try	{
		if (connectionId in connections)
			{
			connections[connectionId].close();
			delete connections[connectionId];
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setOptions = function(options)
	{
	if(logger && options.logger)
		logger.clone(options.logger);
	}

}

// Do this only in node.js, not in the browser

if (true)
	module.exports = RpcCommunicator;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketConnection, 12.5.2016 Spaceify Oy
 *
 * @class WebSocketConnection
 */

function WebSocketConnection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var Logger = null;
var SpaceifyError = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());

	global.fs = __webpack_require__(0);
	global.WebSocket = __webpack_require__(32).w3cwebsocket;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	SpaceifyError = lib.SpaceifyError;
	}

var errorc = new SpaceifyError();
var logger = Logger.getLogger("WebSocketConnection");

var url = "";
var id = null;
var port = null;
var socket = null;
var origin = null;
var pipedTo = null;
var isOpen = false;
var isSecure = false;
var remotePort = null;
var remoteAddress = null;
var eventListener = null;

// For client-side use, in both Node.js and the browser

self.connect = function(opts, callback)
	{
	id = opts.id || null;
	port = opts.port || "";
	isSecure = opts.isSecure || false;

	var caCrt = opts.caCrt || "";
	var hostname = opts.hostname || null;
	var protocol = (!isSecure ? "ws" : "wss");
	var subprotocol = opts.subprotocol || "json-rpc";

	if(opts.logger)
		logger.clone(opts.logger);

	try	{
		url = protocol + "://" + hostname + (port ? ":" + port : "") + (id ? "?id=" + id : "");

		var cco = (isNodeJs && isSecure ? { tlsOptions: { ca: [fs.readFileSync(caCrt, "utf8")] } } : null);

		socket = new WebSocket(url, "json-rpc", null, null, null, cco);

		socket.binaryType = "arraybuffer";

		socket.onopen = function()
			{
			logger.log("WebSocketConnection::onOpen() " + url);

			isOpen = true;

			callback(null, true);
			};

		socket.onerror = function(err)
			{
			logger.error("WebSocketConnection::onError() " + url, true, true, logger.ERROR);

			isOpen = false;

			callback(errorc.makeErrorObject("wsc", "Failed to open WebsocketConnection.", "WebSocketConnection::connect"), null);
			}

		socket.onclose = function(reasonCode, description)
			{
			onSocketClosed(reasonCode, description, self);
			};

		socket.onmessage = onMessageEvent;
		}
	catch(err)
		{
		callback(err, null);
		}
	};

// For server-side Node.js use only

self.setSocket = function(val)
	{
	try	{
		socket = val;

		socket.on("message", onMessage);

		socket.on("close", function(reasonCode, description)
			{
			onSocketClosed(reasonCode, description, self);
			});

		isOpen = true;
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setId = function(val)
	{
	id = val;
	};

self.setPipedTo = function(targetId)
	{
	pipedTo = targetId;
	};

self.setRemoteAddress = function(val)
	{
	remoteAddress = val;
	};

self.setRemotePort = function(val)
	{
	remotePort = val;
	};

self.setOrigin = function(val)
	{
	origin = val;
	};

self.setIsSecure = function(val)
	{
	isSecure = val;
	}

self.setEventListener = function(listener)
	{
	eventListener = listener;
	};

self.getId = function()
	{
	return id;
	};

self.getRemoteAddress = function()
	{
	return remoteAddress;
	};

self.getRemotePort = function()
	{
	return remotePort;
	};

self.getOrigin = function()
	{
	return origin;
	};

self.getIsSecure = function()
	{
	return isSecure;
	}

self.getPipedTo = function()
	{
	return pipedTo;
	}

self.getIsOpen = function()
	{
	return isOpen;
	}

self.getPort = function()
	{
	return port;
	}

var onMessage = function(message)
	{
	try	{
		if (eventListener)
			{
			if (message.type == "utf8")
				{
				//logger.log("WebSocketConnection::onMessage(string): " + JSON.stringify(message.utf8Data));

				eventListener.onMessage(message.utf8Data, self);
				}
			if (message.type == "binary")
				{
				//logger.log("WebSocketConnection::onMessage(binary): " + binaryData.length);

				eventListener.onMessage(message.binaryData, self);
				}
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var onMessageEvent = function(event)
	{
	//logger.log("WebSocketConnection::onMessageEvent() " + JSON.stringify(event.data));

	try	{
		if (eventListener)
			eventListener.onMessage(event.data, self);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var onSocketClosed = function(reasonCode, description, obj)
	{
	logger.log("WebSocketConnection::onSocketClosed() " + url);

	try	{
		isOpen = false;

		if (eventListener)
			eventListener.onDisconnected(obj.getId());
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.send = function(message)
	{
	try	{
		socket.send(message);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.sendBinary = self.send;

self.close = function()
	{
	try	{
		socket.close();
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

}

if (true)
	module.exports = WebSocketConnection;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketRpcConnection, 12.5.2016 Spaceify Oy
 *
 * @class WebSocketRpcConnection
 */

function WebSocketRpcConnection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
var SpaceifyError = null;
var SpaceifyUtility = null;
var RpcCommunicator = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	RpcCommunicator = __webpack_require__(9)(lib + "rpccommunicator");
	WebSocketConnection = __webpack_require__(11)(lib + "websocketconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//Logger = lib.Logger;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyUtility = lib.SpaceifyUtility;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var logger = Logger.getLogger("WebSocketRpcConnection");

self.connect = function(options, callback)
	{
	connection.connect(options, function(err, data)
		{
		if(!err)
			{
			communicator.addConnection(connection);

			if(options.logger)
				communicator.setOptions({ logger: options.logger });

			if(callback)
				callback(null, true);
			}
		else
			{
			if(callback)
				callback(errorc.makeErrorObject("wsrpcc", "Failed to open WebsocketRpcConnection.", "WebSocketRpcConnection::connect"), null);
			}
		});
	};

self.close = function()
	{
	};

self.getCommunicator = function()
	{
	return communicator;
	};

self.getConnection = function()
	{
	return connection;
	};

// Inherited methods
self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function(method, params, object, listener)
	{
	return communicator.callRpc(method, params, object, listener, connection.getId());
	}

self.getIsOpen = function()
	{
	return connection.getIsOpen();
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.getPort = function()
	{
	return connection.getPort();
	}

self.getId = function()
	{
	return connection.getId();
	}

// External event listeners
self.setConnectionListener = function(listener)
	{
	communicator.setConnectionListener(listener);
	};

self.setDisconnectionListener = function(listener)
	{
	communicator.setDisconnectionListener(listener);
	};

}

if (true)
	module.exports = WebSocketRpcConnection;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketRpcServer, 21.6.2016 Spaceify Oy
 *
 * @class WebSocketRpcServer
 */

function WebSocketRpcServer()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var Logger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//Logger = require(lib + "logger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = __webpack_require__(9)(lib + "rpccommunicator");
	WebSocketServer = __webpack_require__(52)(lib + "websocketserver");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//Logger = window.Logger;
	//SpaceifyConfig = window.SpaceifyConfig;
	RpcCommunicator = window.RpcCommunicator;
	WebSocketServer = window.WebSocketServer;
	}

//var config = SpaceifyConfig.getConfig();
var communicator = new RpcCommunicator();
var webSocketServer = new WebSocketServer();
//var logger = Logger.getLogger("WebSocketRpcServer");

webSocketServer.setEventListener(communicator);

var connectionListener = null;
var disconnectionListener = null;

self.listen = function(options, callback)
	{
	communicator.setConnectionListener(listenConnections);
	communicator.setDisconnectionListener(listenDisconnections);

	if(options.logger)
		communicator.setOptions({ logger: options.logger });

	try {
		webSocketServer.listen(options, callback);
		}
	catch(err)
		{}
	}

self.close = function()
	{
	webSocketServer.close();
	}

self.getCommunicator = function()
	{
	return communicator;
	}

self.getServer = function()
	{
	return webSocketServer;
	}

// Inherited methods
self.getPort = function()
	{
	return webSocketServer.getPort();
	}

self.getIsOpen = function()
	{
	return webSocketServer.getIsOpen();
	}

self.getIsSecure = function()
	{
	return webSocketServer.getIsSecure();
	}

self.getId = function()
	{
	return webSocketServer.getId();
	}

self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.nofifyAll = function(method, params)
	{
	communicator.nofifyAll(method, params);
	}

self.callRpc = function()
	{ // arguments contains a connection id!
	communicator.callRpc.apply(this, arguments);
	}

self.closeConnection = function(connectionId)
	{
	communicator.closeConnection(connectionId);
	}

self.setConnectionListener = function(listener)
	{
	connectionListener = (typeof listener == "function" ? listener : null);
	}

self.setDisconnectionListener = function(listener)
	{
	disconnectionListener = (typeof listener == "function" ? listener : null);
	}

self.setServerUpListener = function(listener)
	{
	webSocketServer.setServerUpListener(typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	webSocketServer.setServerDownListener(typeof listener == "function" ? listener : null);
	}

	// Call listeners with additional server information
var listenConnections = function(id)
	{
	if(typeof connectionListener == "function")
		connectionListener(id, self.getId(), self.getIsSecure());
	}

var listenDisconnections = function(id)
	{
	if(typeof disconnectionListener == "function")
		disconnectionListener(id, self.getId(), self.getIsSecure());
	}

}

if (true)
	module.exports = WebSocketRpcServer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketServer, 21.6.2016 Spaceify Oy
 *
 * @class WebSocketServer
 */

function WebSocketServer()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var Logger = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyConfig = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	WebSocketConnection = __webpack_require__(11)(lib + "websocketconnection");

	global.fs = __webpack_require__(0);
	global.URL = __webpack_require__(62);
	global.http = __webpack_require__(55);
	global.https = __webpack_require__(56);
	global.WSServer = __webpack_require__(32).server;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = window.Logger;
	SpaceifyConfig = window.SpaceifyConfig;
	SpaceifyUtility = window.SpaceifyUtility;
	WebSocketConnection = window.WebSocketConnection;
	}

var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
var logger = Logger.getLogger("WebSocketServer");

var options = {};
var manuallyClosed = false;
var serverDownTimerId = null;

var wsServer = null;
var webServer = null;

var eventListener = null;
var externalServerUpListener = null;
var externalServerDownListener = null;

self.listen = function(opts, callback)
	{
	try	{
		if(!("id" in options))														// Set only once
			{
			options.hostname = opts.hostname || null;
			options.port = opts.port || 0;
			options.key = opts.key || "";
			options.crt = opts.crt || "";
			options.caCrt = opts.caCrt || "";
			options.isSecure = opts.isSecure || false;
			options.keepUp = opts.keepUp || "";
			options.protocol = (!options.isSecure ? "ws" : "wss");
			options.subprotocol = opts.subprotocol || "json-rpc";
			options.id = opts.id || utility.generateRandomConnectionId({});
			}

		logger.log(utility.replace("WebSocketServer::listen() protocol: ~pr, subprotocol: ~s, hostname: ~h, port: ~po",
									{"~pr": options.protocol, "~s": options.subprotocol, "~h": options.hostname, "~po": options.port}));

		manuallyClosed = false;

			// CREATE HTTP SERVER -- -- -- -- -- -- -- -- -- -- //
		if (!options.isSecure)																// Start a http server
			{
			webServer = http.createServer(function(request, response)
				{
				response.writeHead(501);
				response.end("Not implemented");
				});
			}
		else																				// Start a https server
			{
			var key = fs.readFileSync(options.key);
			var crt = fs.readFileSync(options.crt);
			var caCrt = fs.readFileSync(options.caCrt, "utf8");

			webServer = https.createServer({ key: key, cert: crt, ca: caCrt }, function(request, response)
				{
				response.writeHead(501);
				response.end("Not implemented");
				});
			}

		webServer.listen(options.port, options.hostname, 511, function()
			{
			options.port = webServer.address().port;

			serverUpListener();

			if(typeof callback == "function")
				callback(null, true);
			});

		webServer.on("error", function(err)
			{
			logger.error("WebSocketServer::onError()", true, true, logger.ERROR);

			serverDownListener();

			if(typeof callback == "function")
				callback(err, null);
			});

		webServer.on("close", function()
			{
			serverDownListener();
			});

			// CREATE WEBSOCKET SERVER -- -- -- -- -- -- -- -- -- -- //
		wsServer = new WSServer(
			{
			httpServer: webServer,
			autoAcceptConnections: false,

			keepalive: true,																// Keepalive connections and
			keepaliveInterval: 60000,														// ping them once a minute and
			dropConnectionOnKeepaliveTimeout: true,											// drop a connection if there's no answer
			keepaliveGracePeriod: 10000														// within the grace period.
			});

		// Connection request
		wsServer.on("request", function(request)
			{
			try
				{
				var connection = new WebSocketConnection();
				connection.setSocket(request.accept(options.subprotocol, request.origin));
				connection.setRemoteAddress(request.remoteAddress);
				connection.setRemotePort(request.remotePort);
				connection.setOrigin(request.origin);
				connection.setIsSecure(options.isSecure);

				var query = URL.parse(request.resourceURL, true).query;
				if (query && query.id)
					connection.setId(query.id);

				eventListener.addConnection(connection);

				logger.log(utility.replace("WebSocketServer::request(~lp) protocol: ~p, remoteAddress: ~ra, remotePort: ~rp, origin: ~o, id: ~i",
						{"~lp": options.port, "~p": options.protocol, "~ra": request.remoteAddress, "~rp": request.remotePort, "~o": request.origin, "~i": connection.getId()}, "-"));
				}
			catch(err)
				{
				logger.error(err, true, true, logger.ERROR);
				return;
				}
			});

		// Connection is accepted
		wsServer.on("connect", function(webSocketConnection)
			{
			});

		// Connection closed
		wsServer.on("close", function(webSocketConnection, closeReason, description)
			{
			});
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.close = function()
	{
	try	{
		logger.log(utility.replace("WebSocketServer::close() protocol: :pr, subprotocol: :s, hostname: :h, port: :po",
									{":pr": options.protocol, ":s": options.subprotocol, ":h": options.hostname, ":po": options.port}));

		manuallyClosed = true;

		if(wsServer)
			{
			wsServer.shutDown();
			wsServer = null;
			}

		if(webServer)
			{
			webServer.close();
			webServer = null;
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getPort = function()
	{
	return options.port;
	}

self.getIsOpen = function()
	{
	return (webServer && wsServer ? true : false);
	}

self.getIsSecure = function()
	{
	return options.isSecure;
	}

self.getId = function()
	{
	return options.id;
	}

self.setEventListener = function(listener)
	{
	eventListener = listener;
	};

// INTERNAL SERVER UP AND DOWN LISTENERS AND KEEPUP LOGIC
var serverUpListener = function()
	{
	if(externalServerUpListener)
		externalServerUpListener(options.id);
	}

var serverDownListener = function()
	{
	if(externalServerDownListener)
		externalServerDownListener(options.id);

	if(options.keepUp && serverDownTimerId == null && !manuallyClosed)
		{
		serverDownTimerId = setTimeout(function()
			{
			serverDownTimerId = null;
			self.listen(options, null);
			}, config.RECONNECT_WAIT);
		}
	}

	// EXTERNAL SERVER UP AND DOWN LISTENERS
self.setServerUpListener = function(listener)
	{
	externalServerUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	externalServerDownListener = (typeof listener == "function" ? listener : null);
	}

}

if (true)
	module.exports = WebSocketServer;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./logger": 12
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 26;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifycore": 15
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 27;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyerror": 6
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 28;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./webjsonrpc/websocketrpcconnection": 23
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 29;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./callbackbuffer": 20
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 30;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 31;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify application, 25.1.2016 Spaceify Oy
 *
 * @class SpaceifyApplication
 */

function SpaceifyApplication()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var Logger = null;
var WebServer = null;
var SpaceifyCore = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
var SpaceifyService = null;
var fibrous = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = __webpack_require__(26)(lib + "logger");
	WebServer = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyCore = __webpack_require__(27)(lib + "spaceifycore");
	SpaceifyConfig = __webpack_require__(2)(lib + "spaceifyconfig");
	SpaceifyUtility = __webpack_require__(8)(lib + "spaceifyutility");
	SpaceifyService = __webpack_require__(47)(lib + "spaceifyservice");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	WebServer = function() {};
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyUtility = lib.SpaceifyUtility;
	SpaceifyService = lib.SpaceifyService;
	fibrous = function(fn) { return fn; };
	}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var httpServer = new WebServer();
var httpsServer = new WebServer();
var utility = new SpaceifyUtility();
var spaceifyCore = new SpaceifyCore();
var spaceifyService = new SpaceifyService();
var config = SpaceifyConfig.getConfig("realpaths");
var logger = Logger.getLogger("SpaceifyApplication");

var manifest = null;
var application = null;

var HTTP_PORT = (isRealSpaceify ? 80 : null);
var HTTPS_PORT = (isRealSpaceify ? 443 : null);

self.start = function()
	{
	if(isNodeJs)
		start.apply(self, arguments);
	else
		self.connect.apply(self, arguments);
	}

var start = function(application_, options)
	{
	fibrous.run( function()
		{
		var server;
		var port;
		var securePort;
		var registerHttp;
		var hasWebServers;
		var listenHttp = false;
		var listenHttps = false;
		var listenSecure = true;
		var listenUnsecure = true;

		application = application_;

			// OPTIONS -- -- -- -- -- -- -- -- -- -- //
		options = options || {};

		hasWebServers = (options.webservers || options.webServers ? true : false);

		if(hasWebServers)
			{
			server = options.webservers || options.webServers;
			listenHttp = ("http" in server ? server.http : false);
			listenHttps = ("https" in server ? server.https : false);
			}

		if(options.websocketservers || options.webSocketServers)
			{
			server = options.websocketservers || options.webSocketServers;
			listenSecure = ("secure" in server ? server.secure : false);
			listenUnsecure = ("unsecure" in server ? server.unsecure : false);
			}

			// APPLICATION -- -- -- -- -- -- -- -- -- -- //
		try {
			manifest = utility.sync.loadJSON(config.VOLUME_APPLICATION_PATH + config.MANIFEST, true, true);

				// SERVICES -- -- -- -- -- -- -- -- -- -- //
			if(manifest.provides_services)														// <= SERVERS - PROVIDES SERVICES
				{
				var services = manifest.provides_services;

				for(var i = 0; i < services.length; i++)
					{
					if(services.service_type == config.ALIEN)
						continue;

					port = (isRealSpaceify ? config.FIRST_SERVICE_PORT + i : null);
					securePort = (isRealSpaceify ? config.FIRST_SERVICE_PORT_SECURE + i : null);

					spaceifyService.sync.listen(services[i].service_name, manifest.unique_name, port, securePort, listenUnsecure, listenSecure);
					}
				}

			if(manifest.requires_services)														// <= CLIENTS - REQUIRES SERVICES
				{
				createRequiredServices.sync(manifest.requires_services, 0, false);
				createRequiredServices.sync(manifest.requires_services, 0, true);
				}

				// START APPLICATIONS HTTP AND HTTPS WEB SERVERS -- -- -- -- -- -- -- -- -- -- //
			if(hasWebServers)
				{
				var opts =	{
							hostname: config.ALL_IPV4_LOCAL,
							key: config.VOLUME_TLS_PATH + config.SERVER_KEY,
							crt: config.VOLUME_TLS_PATH + config.SERVER_CRT,
							caCrt: config.API_WWW_PATH + config.SPACEIFY_CRT,
							wwwPath: config.VOLUME_APPLICATION_WWW_PATH,
							indexFile: config.INDEX_FILE,
							serverName: manifest.name + " Server"
							};

				registerHttp = false;

				if(listenHttp && !httpServer.getIsOpen())
					{
					opts.isSecure = false;
					opts.port = HTTP_PORT;
					opts.mappedPort = (isRealSpaceify ? process.env["PORT_80"] : null);
					httpServer.setSessionManager(null, config.SESSION_TOKEN_NAME);
					httpServer.listen.sync(opts);

					HTTP_PORT = httpServer.getPort();											// Get the port because native and develop mode applications
																								// do not have knowledge of port numbers beforehand
					registerHttp = true;
					}

				if(listenHttps && !httpsServer.getIsOpen())
					{
					opts.isSecure = true;
					opts.port = HTTPS_PORT;
					opts.mappedPort = (isRealSpaceify ? process.env["PORT_443"] : null);
					httpsServer.setSessionManager(null, config.SESSION_TOKEN_NAME);
					httpsServer.listen.sync(opts);

					HTTPS_PORT = httpsServer.getPort();

					registerHttp = true;
					}

				if(registerHttp && !isRealSpaceify)
					{
					spaceifyCore.sync.registerService("http", {unique_name: manifest.unique_name, port: HTTP_PORT, securePort: HTTPS_PORT});
					console.log("    LISTEN -----> " + config.HTTP + " - port: " + HTTP_PORT + ", secure port: " + HTTPS_PORT);
					}
				}

			if(application && application.start && typeof application.start == "function")
				application.start();

				// APPLICATION INITIALIALIZED SUCCESSFULLY -- -- -- -- -- -- -- -- -- -- //
			console.log(config.APPLICATION_INITIALIZED, "---", manifest.unique_name);
			}
		catch(err)
			{
			initFail.sync(err);
			}
		}, function(err, data)
			{
			//initFail.sync(err);
			});
	}

self.connect = function(application_, unique_names, options)
	{ // Setup connections to open services of applications and spacelets; open, open_local or both depending from where this method is called
	try {
		application = application_;

		if(unique_names.constructor !== Array)													// getOpenServices takes an array of unique names
			unique_names = [unique_names];

		spaceifyCore.getOpenServices(unique_names, false, function(err, services)
			{
			if(err)
				throw err;
			else
				connectServices(application, services);
			});
		}
	catch(err)
		{
		if(typeof application == "function")
			application(err, false);
		else if(application && application.fail && typeof application.fail == "function")
			application.fail(err);
		}
	}

var connectServices = function(application_, services)
	{ // Connect to services in the array one at a time
	var service = services.shift();

	application = application_;

	if(typeof service === "undefined")
		{
		if(typeof application == "function")
			application(null, true);
		else if(application && application.start && typeof application.start == "function")
			application.start();

		return;
		}

	spaceifyService.connect(service.service_name, function(err, data)
		{
		connectServices(application, services);
		});
	}

var initFail = fibrous( function(err)
	{ // FAILED TO INITIALIALIZE THE APPLICATION. -- -- -- -- -- -- -- -- -- -- //
	logger.error([";;", err, "::"], true, true, logger.ERROR);
	console.log(manifest.unique_name + config.APPLICATION_UNINITIALIZED);						// console.log is used intentionally!!!

	stop.sync(err);
	});

var stop = fibrous( function(err)
	{
	httpServer.close();
	httpsServer.close();

	spaceifyService.disconnect();																// Disconnect clients
	spaceifyService.close();																	// Close servers

	spaceifyCore.close();

	if(application && application.fail && typeof application.fail == "function")
		application.fail(err);
	});

var createRequiredServices = function(services, position, isSecure, callback)
	{
	if(position == services.length)
		callback();
	else
		{
		spaceifyService.connect(services[position++].service_name, isSecure, function(err, data)
			{
			createRequiredServices(services, position, isSecure, callback);
			});
		}
	}

	// METHODS -- -- -- -- -- -- -- -- -- -- //
self.getOwnUrl = function(isSecure)
	{
	if(!isNodeJs)
		return null;

	var ownUrl = (!isSecure ? "http://" : "https://") + config.EDGE_HOSTNAME + ":" + (!isSecure ? HTTP_PORT : HTTPS_PORT);

	return ownUrl;
	}

self.getManifest = function()
	{
	return manifest;
	}

	// REQUIRED (= CLIENT) -- -- -- -- -- -- -- -- -- -- //
self.getRequiredService = function(service_name)
	{
	return spaceifyService.getRequiredService(service_name);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return spaceifyService.getRequiredServiceSecure(service_name);
	}

	// PROVIDED (= SERVICE) -- -- -- -- -- -- -- -- -- -- //
self.getProvidedService = function(service_name)
	{
	return spaceifyService.getProvidedService(service_name);
	}

self.getProvidedServiceSecure = function(service_name)
	{
	return spaceifyService.getProvidedServiceSecure(service_name);
	}

}

if(true)
	module.exports = (typeof window === "undefined" ? new SpaceifyApplication() : SpaceifyApplication);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

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

var lib = (window.spe ? window.spe : window);

var errorc = new lib.SpaceifyError();
var network = new lib.SpaceifyNetwork();
var utility = new lib.SpaceifyUtility();
var config = lib.SpaceifyConfig.getConfig();
var spaceifyMessages = new lib.SpaceifyMessages();
//var logger = lib.Logger.getLogger("SpaceifyApplicationManager");

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

if(true)
	module.exports = SpaceifyApplicationManager;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Cache, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * A cache class to reduce unnecessary RPC calls by storing application data.
 * For Spaceify's internal use.
 *
 * @class SpaceifyCache
 */

function SpaceifyCache()
{
var self = this;

var ready_counter = 0;

var applications = {};
var EXPIRATION_TIME = 60 * 1000;

var config = SpaceifyConfig.getConfig();

self.setApplication = function(application)
	{
	if(!applications[application.unique_name])
		applications[application.unique_name] = {};

	applications[application.unique_name].manifest = application;
	applications[application.unique_name].isRunning = application.isRunning;
	}

self.getApplication = function(unique_name)
	{
	return (unique_name in applications ? applications[unique_name] : null);
	}

	// SERVICES -- -- -- -- -- -- -- -- -- -- //
self.setService = function(service, unique_name)
	{
	if(service.service_type != config.HTTP)
		return;

	if(!applications[unique_name])
		applications[unique_name] = {};

	if(!applications[unique_name].services)
		applications[unique_name].services = [];

	applications[unique_name].services.push(service);
	}

self.getService = function(service_name, unique_name)
	{ // Get service either by service name (when unique_name is not set) or by service name and unique_name.
	for(var UNIQUE_NAME in applications)														// Iterate all applications
		{
		var services = (applications[UNIQUE_NAME].services ? applications[UNIQUE_NAME].services : []);	// Find from the services they have
		for(var s = 0; s < services.length; s++)
			{
			var SERVICE_NAME = services[s].service_name;

			// 1:
			// Multiple applications can have the same service name. Return the first matching service.
			// Without checking the unique_name the HTTP service of the first application would always be returned.
			// 2:
			// The service belongs to the requested unique application
			if( /*1*/ (!unique_name && service_name == SERVICE_NAME && service_name != config.HTTP) ||
			    /*2*/ (unique_name && unique_name == UNIQUE_NAME && service_name == SERVICE_NAME) )
				return services[s];
			}
		}

	return null;
	}

	// MANIFEST -- -- -- -- -- -- -- -- -- -- //
self.setManifest = function(unique_name, manifest)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].manifest = manifest;
	}

self.getManifest = function(unique_name)
	{
	return (applications[unique_name] && applications[unique_name].manifest ? applications[unique_name].manifest : null);
	}

	// RUNNING STATUS -- -- -- -- -- -- -- -- -- -- //
self.setRunning = function(unique_name, isRunning)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].isRunning = isRunning;
	applications[unique_name].isRunningStart = Date.now();
	}

self.isRunning = function(unique_name)
	{
	if(!applications[unique_name] || !applications[unique_name].hasOwnProperty("isRunning"))
		return null;

	var run_time = Date.now() - applications[unique_name].isRunningStart;			// Running status expires after the expiration time
	return (run_time > EXPIRATION_TIME ? null : applications[unique_name].isRunning);
	}

	// APPLICATION URLS -- -- -- -- -- -- -- -- -- -- //
self.setApplicationURL = function(unique_name, urls)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].urls = urls;
	applications[unique_name].urls_start = Date.now();
	}

self.getApplicationURL = function(unique_name)
	{
	if(!applications[unique_name] || !applications[unique_name].hasOwnProperty("urls"))
		return null;

	var urls_time = Date.now() - applications[unique_name].urls_start;				// URLs expire after the expiration time
	return (urls_time > EXPIRATION_TIME ? null : applications[unique_name].urls);
	}

}

if(true)
	module.exports = SpaceifyCache;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Messages, 21.1.2016 Spaceify Oy
 *
 * For Spaceify's internal use. Use only on web pages.
 *
 * @class SpaceifyMessages
 */

function SpaceifyMessages()
{
var self = this;

var lib = (window.spe ? window.spe : window);
var spllib = (window.spl ? window.spl : window);

var errorc = new lib.SpaceifyError();
var utility = new lib.SpaceifyUtility();
var network = new lib.SpaceifyNetwork();
var config = lib.SpaceifyConfig.getConfig();
var LoaderUtil = spllib.LoaderUtil.getLoaderUtil();
//var logger = lib.Logger.getLogger("SpaceifyMessages");

var tunnelId = null;

var messageId;
var errors = [];
var warnings = [];
var callerOrigin = null;
var managerOrigin = null;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window.isSpaceifyNetwork !== "undefined" ? window.isSpaceifyNetwork : false);

var isConnected = false;
var connection = (isSpaceifyNetwork || isNodeJs ? new WebSocketRpcConnection() : LoaderUtil.getPiperClient());

self.connect = function(managerOrigin_, callerOrigin_)
	{
	errors = [];
	warnings = [];
	var protocol, host;
	callerOrigin = callerOrigin_;
	managerOrigin = managerOrigin_;

	if(isConnected)
		return managerOrigin.connected();

	network.doOperation({ type: "requestMessageId" }, function(err, gotId)						// Request a messageId
		{
		if(err)
			return fail(err);

		messageId = gotId;

		connection.exposeRpcMethod("stdout", self, stdout);
		connection.exposeRpcMethod("fail", self, fail);
		connection.exposeRpcMethod("error", self, error);
		connection.exposeRpcMethod("warning", self, warning);
		connection.exposeRpcMethod("notify", self, notify);
		connection.exposeRpcMethod("message", self, message);
		connection.exposeRpcMethod("question", self, question);
		connection.exposeRpcMethod("questionTimedOut", self, questionTimedOut);
		connection.exposeRpcMethod("end", self, end);

		if(isSpaceifyNetwork || isNodeJs)
			{
			connection.connect({hostname: config.EDGE_HOSTNAME, port: config.APPMAN_MESSAGE_PORT_SECURE, isSecure: true}, function(err, data)
				{
				if(err)
					return fail(err);

				isConnected = true;
				connection.callRpc("confirm", [messageId]);
				managerOrigin.connected();
				});
			}
		else
			{
			protocol = network.getProtocol(false, null, false);
			host = network.getEdgeURL({ forceSecureProtocol: null, ownProtocol: null, port: null, withEndSlash: false });
			//false, null, false

			connection.createWebSocketTunnel({host: host, port: port, protocol: protocol}, null, function(id)
				{
				tunnelId = id;
				isConnected = true;

				piperClient.callClientRpc(tunnelId, "confirm", [messageId], this, function(err, data)
					{
					managerOrigin.connected()
					});
				});
			}
		});
	}

self.isConnected = function()
	{
	return isConnected;
	}

self.getErrors = function()
	{
	return errors;
	}

self.getWarnings = function()
	{
	return warnings;
	}

	// Exposed RPC methods -- -- -- -- -- -- -- -- -- -- //
var fail = function(err, connObj, callback)
	{
	isConnected = false;

	if(callerOrigin.fail)
		callerOrigin.fail(err);

	managerOrigin.fail(err);

	if(typeof callback === "function")
		callback(null, true);
	}

var error = function(err, connObj, callback)
	{
	errors.push(err);

	if(typeof callback === "function")
		callback(null, true);
	}

var warning = function(message_, code, connObj, callback)
	{
	warning.push({message: message_, code: code});

	if(callerOrigin.warning)
		callerOrigin.warning(message_, code);

	if(typeof callback === "function")
		callback(null, true);
	}

var notify = function(message_, code, connObj, callback)
	{
	if(callerOrigin.notify)
		callerOrigin.notify(message_, code, connObj, callback);

	if(typeof callback === "function")
		callback(null, true);
	}

var message = function(message_, connObj, callback)
	{
	if(callerOrigin.message)
		callerOrigin.message(message_);

	if(typeof callback === "function")
		callback(null, true);
	}

var stdout = function(message_, connObj, callback)
	{
	if(callerOrigin.stdout)
		callerOrigin.stdout(message_);

	if(typeof callback === "function")
		callback(null, true);
	}

var question = function(message_, choices, origin, answerCallBackId, connObj, callback)
	{
	if(callerOrigin.question)
		callerOrigin.question(message_, choices, origin, answerCallBackId);

	if(typeof callback === "function")
		callback(null, true);
	}

var questionTimedOut = function(message_, origin, answerCallBackId, connObj, callback)
	{
	if(callerOrigin.questionTimedOut)
		callerOrigin.questionTimedOut(message_, origin, answerCallBackId);

	if(typeof callback === "function")
		callback(null, true);
	}

var end = function(message_, connObj, callback)
	{
	managerOrigin.end(1);

	if(typeof callback === "function")
		callback(null, true);
	}

	// Response methods -- -- -- -- -- -- -- -- -- -- //
self.sendAnswer = function(answer, answerCallBackId)
	{
	if (isSpaceifyNetwork || isNodeJs)
		connection.callRpc("answer", [messageId, answer, answerCallBackId]);
	else
		connection.callClientRpc(tunnelId, "answer", [messageId, answer, answerCallBackId]);
	}

}

if(true)
	module.exports = SpaceifyMessages;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyNet, 29.7.2015 Spaceify Oy
 *
 * For Spaceify's internal use. Use only on web pages.
 *
 * @class SpaceifyNet
 */

function SpaceifyNet()
{
var self = this;

var ordinal = 0;
var showLoadingInstances = 0;
var applications = { spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}, spaceletCount: 0, sandboxedCount: 0, sandboxedDebianCount: 0, nativeDebianCount: 0 };

var lib = (window.WEBPACK_LIBRARYNAME ? window.WEBPACK_LIBRARYNAME : window);

var core = new lib.SpaceifyCore();
var utility = new lib.SpaceifyUtility();
var network = new lib.SpaceifyNetwork();
var config = lib.SpaceifyConfig.getConfig();
//var logger = lib.Logger.getLogger("SpaceifyNet");

	// USER INTERFACE -- -- -- -- -- -- -- -- -- -- //
self.showLoading = function(show)
	{
	if(show)
		{
		if(showLoadingInstances == 0)
			$("#loading").show();
		showLoadingInstances++;
		}
	else
		{
		showLoadingInstances = Math.max(0, --showLoadingInstances);
		if(showLoadingInstances == 0)
			$("#loading").hide();
		}
	}

self.showError = function(msgstr) { alerts(msgstr, "error"); }
self.showSuccess = function(msgstr) { alerts(msgstr, "success"); }
var alerts = function(msgstr, type)
	{
	var obj;

	if((obj = $("#alerting")).length > 0)
		obj.remove();

	obj = $('<span class="edgeAlert ' + type + '" id="alerting">' + msgstr + '</span>');
	$(document.body).append(obj);

	obj.css("left", ($(window).width() - obj.width()) / 2);
	obj.css("visibility", "visible");

	window.setTimeout(function() { obj.remove(); }, 5000);
	}

var msgFormat = function(msg)
	{
	var rmsg = "", i;

	if(self.isArray(msg))
		{
		for(i = 0; i < msg.length; i++)
			rmsg += (rmsg != "" ? "<br>" : "") + msg[i];
		}
	else
		rmsg = msg;

	return rmsg;
	}

self.onEnterPress = function(e)
	{
	var key = (typeof e == null ? window.event.keyCode : e.keyCode);
	return (key == 13 || key == 10 ? true : false);
	}

self.isArray = function(obj)
	{
	return Object.prototype.toString.call(obj) === "[object Array]";
	}

var scope = function(id)
	{
	return angular.element(document.getElementById(id)).scope();
	}

	// SPLASH -- -- -- -- -- -- -- -- -- -- //
self.setSplashAccepted = function()
	{
	try {
		core.setSplashAccepted(function(err, data)
			{
			if(data && data == true)
				window.location.reload(true);
			});
		}
	catch(err)
		{
		//logger.error(err, true, true, 0, logger.ERROR);
		}
	}

self.loadCertificate = function()
	{
	document.getElementById("certIframe").src = network.getEdgeURL({ forceSecureProtocol: false, ownProtocol: null, port: null, withEndSlash: true }) + "spaceify.crt";
	//false, false, true
	return true;
	}

	// PAGE BROWSER -- -- -- -- -- -- -- -- -- -- //
self.loadAppstorePage = function()
	{
	var edgeURL = network.getEdgeURL({ forceSecureProtocol: true, ownProtocol: null, port: null, withEndSlash: true });
	//true, null, true
	spaceifyLoader.loadPage(edgeURL + config.APPSTORE_INDEX_FILE, edgeURL + config.APPSTORE, edgeURL);
	}

self.loadLaunchPage = function()
	{
	var edgeURL = network.getEdgeURL({ forceSecureProtocol: true, ownProtocol: null, port: null, withEndSlash: true });
	//true, null, true
	spaceifyLoader.loadPage(edgeURL + config.INDEX_FILE, edgeURL, edgeURL);
	}

	// APPLICATIONS -- -- -- -- -- -- -- -- -- -- //
self.showInstalledApplications = function(callback)
	{
	$("#spacelet").empty();
	$("#sandboxed").empty();
	$("#sandboxedDebian").empty();
	$("#nativeDebian").empty();

	var methods = [], j;

	core.getApplicationData(function(err, apps)
		{
		if(!apps)
			return (typeof callback == "function" ? callback() : false);

		for(j = 0; j < apps.spacelet.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.spacelet[j], null], type: "async"});

		for(j = 0; j < apps.sandboxed.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed[j], null], type: "async"});

		for(j = 0; j < apps.sandboxed_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed_debian[j], null], type: "async"});

		for(j = 0; j < apps.native_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.native_debian[j], null], type: "async"});

		new SpaceifySynchronous().waterFall(methods, function()
			{
			if(typeof callback == "function")
				callback();
			});
		});

	}

self.renderTile = function(manifest, callback)
	{
	var element, query;
	var port, sp_host, spe_host, sp_path, icon, id;

	if(manifest.hasTile)																			// Application supplies its own tile
		{
		core.getApplicationURL(manifest.unique_name, function(err, appURL)
			{
			port = (!network.isSecure() ? appURL.port : appURL.securePort);
			spe_host = network.getEdgeURL({ forceSecureProtocol: false, ownProtocol: null, port: null, withEndSlash: true });
			//false, false, true

			if(appURL.implementsWebServer && port)
				sp_host = network.getEdgeURL({ forceSecureProtocol: false, ownProtocol: null, port: port, withEndSlash: true });
				//false, port, true
			else
				sp_host = network.externalResourceURL(manifest.unique_name, { forceSecureProtocol: false, ownProtocol: null, port: null, withEndSlash: true });

			sp_path = config.TILEFILE;

			id = "apptile_" + manifest.unique_name.replace("/", "_");
			scope("edgeBody").addTile({type: "apptile", container: manifest.type, manifest: manifest, id:id, callback:
				function()
					{
					query = {};
					query.sp_host = encodeURIComponent(sp_host);
					query.sp_path = encodeURIComponent(sp_path);
					query.spe_host = encodeURIComponent(spe_host);

					element = document.getElementById(id);
					element.src = sp_host + sp_path + network.remakeQueryString(query, {}, {}, "", true);

					callback();
					}
				});
			});
		}
	else																							// Spaceify renders default tile
		{
		if((icon = utility.getApplicationIcon(manifest, false)))
			{
			sp_host = network.externalResourceURL(manifest.unique_name, { forceSecureProtocol: false, ownProtocol: null, port: null, withEndSlash: true });
			sp_path = icon;
			}
		else
			{
			sp_host = network.getEdgeURL({ forceSecureProtocol: false, ownProtocol: null, port: null, withEndSlash: true });
			//false, false, true
			sp_path = "images/icon.png";
			}

		id = "iconimage_" + manifest.unique_name.replace("/", "_");
		scope("edgeBody").addTile({type: "tile", container: manifest.type, manifest: manifest, id: id, sp_src: sp_host + sp_path, callback: function()
			{
			spaceifyLoader.loadData(document.getElementById(id), callback);
			} });
		}

	addApplication(manifest);
	}

self.removeTile = function(manifest)
	{
	var i, length = 0, id = manifest.unique_name.replace(/\//, "_");

	$("#" + id).remove();

	removeApplication(manifest);
	}

var addApplication = function(manifest)
	{
	if(manifest.type == config.SPACELET)
		{ applications.spacelet[manifest.unique_name] = manifest; applications.spaceletCount++; }
	else if(manifest.type == config.SANDBOXED)
		{ applications.sandboxed[manifest.unique_name] = manifest; applications.sandboxedCount++; }
	else if(manifest.type == config.SANDBOXED_DEBIAN)
		{ applications.sandboxed_debian[manifest.unique_name] = manifest; applications.sandboxedDebianCount++; }
	else if(manifest.type == config.NATIVE_DEBIAN)
		{ applications.native_debian[manifest.unique_name] = manifest; applications.nativeDebianCount++; }
	}

var removeApplication = function(manifest)
	{
	if(manifest.type == config.SPACELET)
		{ delete applications.spacelet[manifest.unique_name]; applications.spaceletCount--; }
	else if(manifest.type == config.SANDBOXED)
		{ delete applications.sandboxed[manifest.unique_name]; applications.sandboxedCount--; }
	else if(manifest.type == config.SANDBOXED_DEBIAN)
		{ delete applications.sandboxed_debian[manifest.unique_name]; applications.sandboxedDebianCount--; }
	else if(manifest.type == config.NATIVE_DEBIAN)
		{ delete applications.native_debian[manifest.unique_name]; applications.nativeDebianCount--; }
	}

self.getApplications = function()
	{
	return applications;
	}

}

if(true)
	module.exports = SpaceifyNet;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Synchronous, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @class SpaceifySynchronous
 */

function SpaceifySynchronous()
{
var self = this;

var methodId = 0;
var methods = [];
var results = {};
var waiting = null;
var finally_ = null;

// Start traversing functions in the order they are defined. Functions are executed independently and results are not passed to the next function.
// The results of operations are stored in the results object in the same order as the functions were executed.
self.waterFall = function(_methods, callback)
	{
	if((!_methods || _methods.length == 0) && typeof callback == "function")
		callback(results);
	else if(!_methods || _methods.length == 0 || typeof callback != "function")
		return;

	finally_ = callback;

	methods = _methods;

	next();
	}

// Call the methods one after another recursively
var next = function()
	{
	if(methods.length == 0)
		return finally_();

	var calling = methods.shift();

	// Call a method that is asynchronous. Store the original callback and replace it with ours. It's assumed that
	// the original callback is the last parameter. After our callback returns call the original callback, if it is defined (not null).
	if(calling.type == "async")
		{
		waiting = calling.params[calling.params.length - 1];
		calling.params[calling.params.length - 1] = wait;
		calling.method.apply(calling.object, calling.params);
		}
	// Call a method that is synchronous.
	else
		{
		results[++methodId] = calling.method.apply(calling.object, calling.params);
		next();
		}
	}

var wait = function()
	{
	results[++methodId] = Array.prototype.slice.call(arguments);			// Array of return values rather than the arguments object

	if(typeof waiting == "function")
		waiting.apply(this, arguments);

	next();
	}

self.getResult = function(methodId)
	{
	return (results[methodId] ? results[methodId] : null);
	}

self.getResults = function()
	{
	return results;
	}

}

if(true)
	module.exports = SpaceifySynchronous;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spacelet, 24.1.2016 Spaceify Oy
 *
 * For webpage use.
 *
 * class @Spacelet
 */

function Spacelet()
{
var self = this;

var lib = (window.spe ? window.spe : window);

var core = new lib.SpaceifyCore();
//var logger = lib.Logger.getLogger("Spacelet");
var spaceifyService = new lib.SpaceifyService();
var spaceifyNetwork = new lib.SpaceifyNetwork();

self.start = function(application, unique_name, callback)
	{ // callback takes preference over application context
	try {
		core.startSpacelet(unique_name, function(err, serviceobj)
			{
			if(err)
				{
				if(typeof application == "function")
					application(err, false);
				else if(application && application.fail)
					application.fail(err);
				}
			else
				{
				for(var i = 0; i < serviceobj.serviceNames.length; i++)
					{
					spaceifyService.connect(serviceobj.serviceNames[i], (i + 1 != serviceobj.serviceNames.length ? null : function(err, data)
						{
						if(typeof application == "function")
							application(null, true);
						else if(application && application.start)
							application.start();
						}));
					}
				}
			});
		}
	catch(err)
		{
		if(typeof application == "function")
			application(err, false);
		else if(application && application.fail)
			application.fail(err);
		}
	}

self.getRequiredService = function(service_name)
	{
	return spaceifyService.getRequiredService(service_name);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return spaceifyService.getRequiredServiceSecure(service_name);
	}

self.isSpaceifyNetwork = function(timeout, callback)
	{
	spaceifyNetwork.isSpaceifyNetwork(timeout, callback);
	}

}

if(true)
	module.exports = Spacelet;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


navigator.getUserMedia = (	navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);

function WebRtcClient(rtcConfig)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var Logger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = __webpack_require__(9)(lib + "rpccommunicator");
	WebSocketConnection = __webpack_require__(11)(lib + "websocketconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	//SpaceifyConfig = lib.SpaceifyConfig;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var speconfig = SpaceifyConfig.getConfig();
var logger = Logger.getLogger("WebRtcClient");

var ownStream = null;
var connectionListener = null;
var rtcConnections = new Object();

self.setConnectionListener = function(lis)
	{
	connectionListener = lis;
	}

self.onIceCandidate = function(iceCandidate, partnerId)
	{
	logger.log("WebRtcClient::onIceCandidate - Got it, sending it to the other client");

	communicator.callRpc("offerIce", [iceCandidate, partnerId]);
	};

var createConnection = function(partnerId)
	{
	rtcConnections[partnerId] = new WebRtcConnection(rtcConfig);
	rtcConnections[partnerId].setPartnerId(partnerId);

	rtcConnections[partnerId].setIceListener(self);
	rtcConnections[partnerId].setStreamListener(self);
	rtcConnections[partnerId].setConnectionListener(self);
	rtcConnections[partnerId].setDataChannelListener(self);
	}

self.shutdown = function(e)
	{
	logger.log("WebRtcClient::onbeforeunload");

	for (var id in rtcConnections)
		{
		if (rtcConnections.hasOwnProperty(id))
			{
			rtcConnections[id].close();
			delete rtcConnections[id];
			}
		}
	}

// RPC methods

self.handleRtcOffer = function(descriptor, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleRtcOffer descriptor:", descriptor);

	if (!rtcConnections.hasOwnProperty(partnerId))
		{
		createConnection(partnerId);
		}

	rtcConnections[partnerId].onConnectionOfferReceived(descriptor, connectionId, function(answer)
		{
		logger.log("WebRtcClient::handleRtcOffer - onConnectionOfferReceived returned");

		communicator.callRpc("acceptConnectionOffer",[answer, partnerId]);
		});

	};

self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleRtcAnswer");

	rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
	};

self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleIceCandidate");

	if (!rtcConnections.hasOwnProperty(partnerId))
		{
		createConnection(partnerId);
		}

	rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
	};

// Private methods

var connectToCoordinator = function(config, callback)
	{
	logger.log("WebRtcClient::connectToCoordinator", "> Websocket connecting to the coordinator");

	connection.connect(config, function()
		{
		logger.log("WebRtcClient::connectToCoordinator - Websocket Connected to the Coordinator");
		logger.log("> Creating RPCCommunicator for the Websocket");

		communicator.addConnection(connection);
		callback();
		});
	};

self.onDisconnected = function(partnerId)
	{
	logger.log("WebRtcClient::onDisconnected");

	if (rtcConnections.hasOwnProperty(partnerId))
		{
		var connection = rtcConnections[partnerId];
		connectionListener.onDisconnected(connection.getId());

		connection.close();
		delete rtcConnections[partnerId];
		}
	};

self.onDataChannelOpen = function(connection)
	{
	logger.log("WebRtcClient::onDataChannelOpen");

	connectionListener.addConnection(connection);
	};

self.onStream = function(stream, partnerId)
	{
	logger.log("WebRtcClient::onStream");
	};

self.onRemoveStream = function(stream, partnerId)
	{
	logger.log("WebRtcClient::onRemoveStream");

	self.onDisconnected(partnerId);
	};

var connectToPeers = function(announceId, callback)
	{
	logger.log("WebRtcClient::connectToPeers - Announcing to the Coordinator");

	communicator.callRpc("announce", [announceId], self, self.onPeerIdsArrived);
	};

//Callback of the connectToPeers RPC call

self.onPeerIdsArrived = function(err, data, id)
	{
	logger.log("WebRtcClient::onPeerIdsArrived - data.length:", data.length);

	var partnerId = 0;

	for (var i=0; i<data.length; i++)
		{
		partnerId = data[i];

		//Create a WebRTC connection and

		createConnection(partnerId);

		logger.log("WebRtcClient::onPeerIdsArrived - Trying to create offer to client id", partnerId);

		//Creating a connection offer

		rtcConnections[partnerId].createConnectionOffer(function(offer, peerId)
			{
			logger.log("WebRtcClient::onPeerIdsArrived - Offer created, sending it to the other client", peerId);

			communicator.callRpc("offerConnection", [offer, peerId]);
			});
		}

	if (data.length === 0)
		logger.log("> Announce returned 0 client ids, not connecting");
	};

self.run = function(config, callback)
	{
	logger.log("WebRtcClient::run");

	window.onbeforeunload = self.shutdown;

	communicator.exposeRpcMethod("handleRtcOffer", self, self.handleRtcOffer);
	communicator.exposeRpcMethod("handleRtcAnswer", self, self.handleRtcAnswer);
	communicator.exposeRpcMethod("handleIceCandidate", self, self.handleIceCandidate);

	connectToCoordinator(config, function()
		{
		logger.log("WebRtcClient::run - Connected to the coordinator");

		connectToPeers(config.announceId, function()
			{
			logger.log("WebRtcClient::run - connectToPeers returned");
			});

		if (callback)
			callback(communicator);
		});

	};
}

if (true)
	module.exports = WebRtcClient;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
var RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;

function WebRtcConnection(rtcConfig)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var Logger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Logger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Logger = lib.Logger;
	}

var logger = Logger.getLogger("WebRtcConnection");

var id = null;
var ownStream = null;
var partnerId = null;
var iceListener = null;
var streamListener = null;
var listener = null;
var eventListener = null;
var dataChannelListener = null;

var rtcOptions = { "optional": [{"DtlsSrtpKeyAgreement": true}] };

var peerConnection = new RTCPeerConnection(rtcConfig, rtcOptions);

var dataChannel = null;

// If we receive a data channel from somebody else, this gets called

peerConnection.ondatachannel = function(e)
	{
	var temp = e.channel || e; // Chrome sends event, FF sends raw channel

	logger.log("WebRtcConnection::peerConnection.ondatachannel", e);

	dataChannel = temp;
	dataChannel.binaryType = "arraybuffer";
	dataChannel.onopen = self.onDataChannelOpen;
	dataChannel.onmessage = self.onMessage;
	};

var onsignalingstatechange = function(state)
	{
	logger.log("WebRtcConnection::onsignalingstatechange", state);

	//if ( eventListener == "function" && peerConnection.signalingState == "closed")
	//	eventListener.onDisconnected(partnerId);
	}

var oniceconnectionstatechange = function(state)
	{
	logger.log("WebRtcConnection::oniceconnectionstatechange", state);

	if ( eventListener == "function" && (peerConnection.iceConnectionState == "disconnected" || peerConnection.iceConnectionState == "closed"))
		eventListener.onDisconnected(partnerId);
	};

var onicegatheringstatechange = function(state)
	{
	logger.log("WebRtcConnection::onicegatheringstatechange", state);
	};

var onIceCandidate = function(e)
	{
	logger.log("WebRtcConnection::onIceCanditate - partnerId:", partnerId, ", event:", e, "> iceListener was", iceListener);

	// A null ice canditate means that all canditates have been given
	if (e.candidate == null)
		{
		logger.log("> All Ice candidates listed");
		//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
		}
	else
		{
		iceListener.onIceCandidate(e.candidate, partnerId);
		}
	};

peerConnection.onsignalingstatechange = onsignalingstatechange;
peerConnection.oniceconnectionstatechange = oniceconnectionstatechange;
peerConnection.onicegatheringstatechange = onicegatheringstatechange;
peerConnection.onicecandidate = onIceCandidate;

self.close = function()
	{
	logger.log("WebRtcConnection::close");

	//peerConnection.removeStream(ownStream);
	dataChannel.close();
	if (peerConnection.signalingState != "closed")
		peerConnection.close();
	}

self.send = function(message)
	{
	try	{
		if (dataChannel.readyState == "open")
			dataChannel.send(message);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getBufferedAmount = function()
	{
	return dataChannel.bufferedAmount;
	};

self.sendBinary = function(data)
	{
	try	{
		if (dataChannel.readyState == "open")
			dataChannel.send(data);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.onDataChannelClosed = function(e)
	{
	logger.log("WebRtcConnection::onDataChannelClosed", e);

	eventListener.onDisconnected(self);
	}

self.onDataChannelOpen = function(e)
	{
	logger.log("WebRtcConnection::onDataChannelOpen", e);

	dataChannel.binaryType = "arraybuffer";
	dataChannel.onclose = self.onDataChannelClosed;
	dataChannel.onmessage = self.onMessage;
	if (dataChannelListener)
		dataChannelListener.onDataChannelOpen(self);
	}

self.onMessage = function(message)
	{
	//logger.log("WebRtcConnection::onMessage", message.data);

	try	{
		if (listener)
			listener.onMessage(message.data, self);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setId = function(id_)
	{
	id = id_;
	//logger.log("WebRtcConnection::setId", id);
	};

self.getId = function()
	{
	//logger.log("WebRtcConnection::getId", id);

	return id;
	};

self.getPartnerId = function()
	{
	//logger.log("WebRtcConnection::getPartnerId", partnerId);

	return partnerId;
	};

self.setPartnerId = function(id_)
	{
	partnerId = id_;
	};

self.setDataChannelListener = function(lis)
	{
	dataChannelListener = lis;
	};

self.setListener = function(lis)
	{
	listener = lis;
	};

self.setIceListener = function(lis)
	{
	iceListener = lis;
	//peerConnection.onicecandidate = function(cand) {self.onIceCandidate(cand);};

	logger.log("WebRtcConnection::setIceListener", lis);
	};

self.setStreamListener = function(lis)
	{
	streamListener = lis;
	peerConnection.onaddstream = function(e) {self.onStream(e);};
	peerConnection.onremovestream = function(e) {self.onRemoveStream(e);};
	};

self.setEventListener = function(lis)
	{
	eventListener = lis;
	//peerConnection.onaddstream = function(e) {self.onStream(e);};
	};

self.onStream = function(e)
	{
	logger.log("WebRtcConnection::onStream", e);

	streamListener.onStream(e.stream, partnerId);
	}

self.onRemoveStream = function(e)
	{
	logger.log("WebRtcConnection::onStream", e);

	streamListener.onRemoveStream(e.stream, partnerId);
	}

self.addStream = function(stream)
	{
	ownStream = stream;
	peerConnection.addStream(stream);
	}

self.createConnectionOffer = function(callback)
	{
	var localDescription = null;

	dataChannel = peerConnection.createDataChannel("jsonrpcchannel", {reliable: true});
	dataChannel.binaryType = "arraybuffer";
	dataChannel.onopen = self.onDataChannelOpen;
	dataChannel.onmessage = self.onMessage;

	peerConnection.createOffer(function (desc)
		{
		logger.log("WebRtcConnection::peerConnectio.createOffer - Called its callback:", desc);

		localDescription = desc;

		/*
		peerConnection.onicecandidate = function(e)
			{
			logger.log(e.candidate);

			if (e.candidate == null)
				{
				logger.log("> All Ice candidates listed");

				//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
				callback(peerConnection.localDescription, partnerId);
				}
			};
		*/

		peerConnection.setLocalDescription(desc,
			function()
				{
				callback(peerConnection.localDescription, partnerId);
				},
			function(err)
				{ // "WebRtcConnection::createConnectionOffer - setLocalDescription error"
				logger.error(err, true, true, logger.ERROR);
				},
			{});
		},
		function(err)
			{
			logger.error(err, true, true, logger.ERROR);
			});
	};

//Interface for messages coming from the partner ove websocket

self.onConnectionAnswerReceived = function(descriptor)
	{
	logger.log("WebRtcConnection::onConnectionAnswerReceived, descriptor:", descriptor);

	peerConnection.setRemoteDescription(new RTCSessionDescription(descriptor), function()
		{
		logger.log("WebRtcConnection::onConnectionAnswerReceived() - setRemoteDescription returned OK");
		},
		function(err)
			{ // "WebRtcConnection::onConnectionAnswerReceived() setRemoteDescription returned error " + err
			logger.error(err, true, true, logger.ERROR);
			});

	};


self.onConnectionOfferReceived = function(descriptor, connectionId, callback)
	{
	logger.log("WebRtcConnection::onConnectionOfferReceived - Trying to set remote description");

	var desc = new RTCSessionDescription(descriptor);
	peerConnection.setRemoteDescription(desc, function()
		{
		logger.log("WebRtcConnection::onConnectionOfferReceived Remote description set");

		peerConnection.createAnswer(function (answer)
				{
				/*
				peerConnection.onicecandidate = function(e)
					{
					if (e.candidate == null)
						{
						logger.log("> All Ice candidates listed");

						//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
						callback(peerConnection.localDescription);
						}
					};
				*/
				peerConnection.setLocalDescription(answer, function ()
					{
					callback(peerConnection.localDescription);
					//callback(answer);
					},
					function(err)
						{
						logger.error(err, true, true, logger.ERROR);
						}
					);
				},
				function(err)
					{
					logger.error(err, true, true, logger.ERROR);
					});
		},
		function(err)
			{ // "WebRtcConnection::onConnectionOfferReceived setting remote description failed " + err
			logger.error(err, true, true, logger.ERROR);
			});

	};

self.onIceCandidateReceived = function(iceCandidate)
	{
	peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate),
			function()
				{
				logger.log("WebRtcConnection::onIceCandidateReceived - Adding Ice candidate succeeded");
				},
			function(err)
				{ // "WebRtcConnection::onIceCandidateReceived adding Ice candidate failed " + err
				logger.error(err, true, true, logger.ERROR);
				});
	};

// Dummy implementation for websocket compatibility

self.setPipedTo = function(targetId)
	{
	};

self.getPipedTo = function()
	{
	return null;
	};

}

if (true)
	module.exports = WebRtcConnection;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 42;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 43;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./loggerconfig.js": 5
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./service": 13,
	"./spaceifyservice": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 45;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifynetwork": 16
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyservice": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 47;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 48;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./webjsonrpc/websocketrpcserver": 24
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 49;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 50;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 51;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketserver": 25
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 52;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_53__;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_55__;

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_56__;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_57__;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_58__;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_59__;

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_60__;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_61__;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
{
LoggerConfig: __webpack_require__(5),
Logger: __webpack_require__(12),
Service: __webpack_require__(13),
SpaceifyApplication: __webpack_require__(33),
SpaceifyApplicationManager: __webpack_require__(34),
SpaceifyCache: __webpack_require__(35),
SpaceifyConfig: __webpack_require__(14),
SpaceifyCore: __webpack_require__(15),
SpaceifyError: __webpack_require__(6),
SpaceifyMessages: __webpack_require__(36),
SpaceifyNet: __webpack_require__(37),
SpaceifyNetwork: __webpack_require__(16),
SpaceifyService: __webpack_require__(7),
SpaceifySynchronous: __webpack_require__(38),
SpaceifyUnique: __webpack_require__(17),
SpaceifyUtility: __webpack_require__(18),
Spacelet: __webpack_require__(39),
BinaryRpcCommunicator: __webpack_require__(19),
CallbackBuffer: __webpack_require__(20),
RpcCommunicator: __webpack_require__(21),
WebRtcClient: __webpack_require__(40),
WebRtcConnection: __webpack_require__(41),
WebSocketConnection: __webpack_require__(22),
WebSocketRpcConnection: __webpack_require__(23),
WebSocketRpcServer: __webpack_require__(24),
WebSocketServer: __webpack_require__(25)
};



/***/ })
/******/ ]);
});
(function spaceifyConfig(){window.speconfig={"SPACEIFY_PATH":"/var/lib/spaceify/","SPACEIFY_CODE_PATH":"/var/lib/spaceify/code/","SPACEIFY_DATA_PATH":"/var/lib/spaceify/data/","SPACEIFY_WWW_PATH":"/var/lib/spaceify/code/www/","SPACEIFY_NODE_MODULES_PATH":"/var/lib/spaceify/code/node_modules/","SPACEIFY_WWW_ERRORS_PATH":"/var/lib/spaceify/code/www/errors/","SPACEIFY_TLS_PATH":"/var/lib/spaceify/data/tls/","SPACEIFY_DATABASE_FILE":"/var/lib/spaceify/data/db/spaceify.db","SPACEIFY_TEMP_SESSIONID":"/var/lib/spaceify/data/db/session.id","SPACEIFY_REGISTRATION_FILE":"/var/lib/spaceify/data/db/edge.id","SPACEIFY_REGISTRATION_FILE_TMP":"/tmp/edge.id","SPACEIFY_MANIFEST_RULES_FILE":"/var/lib/spaceify/data/manifest/manifest.rules","SPACELETS_PATH":"/var/lib/spaceify/data/spacelets/","SANDBOXED_PATH":"/var/lib/spaceify/data/sandboxed/","SANDBOXED_DEBIAN_PATH":"/var/lib/spaceify/data/sandboxed_debian/","NATIVE_DEBIAN_PATH":"/var/lib/spaceify/data/native_debian/","INSTALLED_PATH":"/var/lib/spaceify/data/installed/","DOCS_PATH":"/var/lib/spaceify/data/docs/","VERSION_FILE":"/var/lib/spaceify/versions","WWW_DIRECTORY":"www/","API_PATH":"/api/","API_WWW_PATH":"/var/lib/spaceify/code/www/","API_NODE_MODULES_DIRECTORY":"/var/lib/spaceify/code/node_modules/","APPLICATION_ROOT":"application","APPLICATION_PATH":"/application/","APPLICATION_DIRECTORY":"application/","VOLUME_PATH":"/volume/","VOLUME_DIRECTORY":"volume/","VOLUME_APPLICATION_PATH":"/volume/application/","VOLUME_APPLICATION_WWW_PATH":"/volume/application/www/","VOLUME_TLS_PATH":"/volume/tls/","SYSTEMD_PATH":"/lib/systemd/system/","START_SH_FILE":"application/start.sh","WORK_PATH":"/tmp/package/","PACKAGE_PATH":"package/","SOURCES_DIRECTORY":"sources/","LOCALES_PATH":"/var/lib/spaceify/code/www/locales/","DEFAULT_LOCALE":"en_US","SPACEIFY_INJECT":"/var/lib/spaceify/code/www/lib/inject/spaceify.csv","LEASES_PATH":"/var/lib/spaceify/data/dhcp-data","IPTABLES_PATH":"/var/lib/spaceify/data/ipt-data","IPTABLES_PIPER":"/var/lib/spaceify/data/dev/iptpiper","IPTABLES_PIPEW":"/var/lib/spaceify/data/dev/iptpipew","TLS_DIRECTORY":"tls/","TLS_SCRIPTS_PATH":"/var/lib/spaceify/data/scripts/","UBUNTU_DISTRO_NAME":"ubuntu","RASPBIAN_DISTRO_NAME":"raspbian","UBUNTU_DOCKER_IMAGE":"spaceifyubuntu","RASPBIAN_DOCKER_IMAGE":"spaceifyraspbian","CUSTOM_DOCKER_IMAGE":"custom_","EDGE_IP":"10.0.0.1","EDGE_HOSTNAME":"edge.spaceify.net","EDGE_SHORT_HOSTNAME":"e.n","EDGE_SUBNET":"10.0.0.0/16","ALL_IPV4_LOCAL":"0.0.0.0","CONNECTION_HOSTNAME":"localhost","APPLICATION_SUBNET":"172.17.0.0/16","EDGE_PORT_HTTP":"80","EDGE_PORT_HTTPS":"443","CORE_PORT":"2947","CORE_PORT_SECURE":"4947","APPMAN_PORT":"2948","APPMAN_PORT_SECURE":"4948","APPMAN_MESSAGE_PORT":"2950","APPMAN_MESSAGE_PORT_SECURE":"4950","OPERATION":"templates/operation.html","APPSTORE":"appstore/","APPSTORE_INDEX_FILE":"appstore/index.html","REGISTRY_HOSTNAME":"spaceify.org","REGISTRY_URL":"https://spaceify.org","REGISTRY_PUBLISH_URL":"https://spaceify.org/ajax/upload.php?type=package&fileid=package","REGISTRY_INSTALL_URL":"https://spaceify.org/install.php","EDGE_APPSTORE_GET_PACKAGES_URL":"https://spaceify.org/appstore/getpackages.php","EDGE_REGISTER_URL":"https://spaceify.net/edge/register.php","EDGE_LOGIN_URL":"https://spaceify.net/edge/login.php","EDGE_GET_RESOURCE_URL":"spaceify.org/appstore/getresource.php?resource=","GITHUB_HOSTNAME":"github.com","MAC_REGX":"^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$","IP_REGX":"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$","JAVASCRIPT":"javascript","CSS":"css","FILE":"file","UTF8":"utf","ASCII":"ascii","BASE64":"base64","ANY":"any","ALL":"all","SPACELET":"spacelet","SANDBOXED":"sandboxed","SANDBOXED_DEBIAN":"sandboxed_debian","NATIVE_DEBIAN":"native_debian","OPEN":"open","OPEN_LOCAL":"open_local","STANDARD":"standard","ALIEN":"alien","HTTP":"http","EXT_COMPRESSED":".zip","PACKAGE_DELIMITER":"@","PX":"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","MANIFEST":"spaceify.manifest","README_MD":"readme.md","PACKAGE_ZIP":"package.zip","PUBLISH_ZIP":"publish.zip","SPM_ERRORS_JSON":"spm_errors.json","SPM_HELP":"spm.help","DOCKERFILE":"Dockerfile","MANIFEST_RULES":"manifest.rules","VERSIONS":"versions","INDEX_FILE":"index.html","SERVER_NAME":"Spaceify Web Server","TILEFILE":"tile.html","WEB_SERVER":"WEB_SERVER","APPLICATION_INITIALIZED":"*** application initialized","APPLICATION_UNINITIALIZED":"*** application uninitialized","IMAGE_DIRECTORY":"www/images/","FIRST_SERVICE_PORT":"2777","FIRST_SERVICE_PORT_SECURE":"3777","SERVER_CRT":"server.crt","SERVER_KEY":"server.key","SPACEIFY_CRT":"spaceify.crt","SPACEIFY_CRT_WWW":"www/spaceify.crt","RECONNECT_WAIT":"10000","SESSION_COOKIE_PUBSUB_PATH":"/var/lib/spaceify/data/db/session_cookies.pub","SPACEIFY_REPOSITORY":"deb [ arch=all,amd64,i386 ] http://spaceify.net/repo stable/spaceify main","SPACEIFY_APPLICATION_REPOSITORY_LIST":"/etc/apt/sources.list.d/spaceifyapplication.list","EVENT_SPACELET_INSTALLED":"spaceletInstalled","EVENT_SPACELET_REMOVED":"spaceletRemoved","EVENT_SPACELET_STARTED":"spaceletStarted","EVENT_SPACELET_STOPPED":"spaceletStopped","EVENT_SANDBOXED_INSTALLED":"sandboxedInstalled","EVENT_SANDBOXED_REMOVED":"sandboxedRemoved","EVENT_SANDBOXED_STARTED":"sandboxedStarted","EVENT_SANDBOXED_STOPPED":"sandboxedStopped","EVENT_SANDBOXED_DEBIAN_INSTALLED":"sandboxedDebianInstalled","EVENT_SANDBOXED_DEBIAN_REMOVED":"sandboxedDebianRemoved","EVENT_SANDBOXED_DEBIAN_STARTED":"sandboxedDebianStarted","EVENT_SANDBOXED_DEBIAN_STOPPED":"sandboxedDebianStopped","EVENT_NATIVE_DEBIAN_INSTALLED":"nativeDebianInstalled","EVENT_NATIVE_DEBIAN_REMOVED":"nativeDebianRemoved","EVENT_NATIVE_DEBIAN_STARTED":"nativeDebianStarted","EVENT_NATIVE_DEBIAN_STOPPED":"nativeDebianStopped","EVENT_EDGE_SETTINGS_CHANGED":"EdgeSettingsChanged","EVENT_CORE_SETTINGS_CHANGED":"CoreSettingsChanged","SESSION_TOKEN_NAME":"x-edge-session","SESSION_TOKEN_NAME_COOKIE":"xedgesession"};})();

(function spaceifyClasses(){
window.Logger = spe.Logger;
window.Service = spe.Service;
window.SpaceifyApplication = spe.SpaceifyApplication;
window.SpaceifyApplicationManager = spe.SpaceifyApplicationManager;
window.SpaceifyCache = spe.SpaceifyCache;
window.SpaceifyConfig = spe.SpaceifyConfig;
window.SpaceifyCore = spe.SpaceifyCore;
window.SpaceifyError = spe.SpaceifyError;
window.SpaceifyMessages = spe.SpaceifyMessages;
window.SpaceifyNet = spe.SpaceifyNet;
window.SpaceifyNetwork = spe.SpaceifyNetwork;
window.SpaceifyService = spe.SpaceifyService;
window.SpaceifySynchronous = spe.SpaceifySynchronous;
window.SpaceifyUnique = spe.SpaceifyUnique;
window.SpaceifyUtility = spe.SpaceifyUtility;
window.Spacelet = spe.Spacelet;
window.BinaryRpcCommunicator = spe.BinaryRpcCommunicator;
window.CallbackBuffer = spe.CallbackBuffer;
window.RpcCommunicator = spe.RpcCommunicator;
window.WebRtcClient = spe.WebRtcClient;
window.WebRtcConnection = spe.WebRtcConnection;
window.WebSocketConnection = spe.WebSocketConnection;
window.WebSocketRpcConnection = spe.WebSocketRpcConnection;
window.WebSocketRpcServer = spe.WebSocketRpcServer;
window.WebSocketServer = spe.WebSocketServer;
window.SpaceifyApp = spe.SpaceifyApp;})();
