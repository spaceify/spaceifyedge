
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"), require("websocket"), require("adm-zip"), require("child_process"), require("http"), require("https"), require("mkdirp"), require("net"), require("os"), require("request"), require("url"));
	else if(typeof define === 'function' && define.amd)
		define("spe", ["fs", "path", "websocket", "adm-zip", "child_process", "http", "https", "mkdirp", "net", "os", "request", "url"], factory);
	else if(typeof exports === 'object')
		exports["spe"] = factory(require("fs"), require("path"), require("websocket"), require("adm-zip"), require("child_process"), require("http"), require("https"), require("mkdirp"), require("net"), require("os"), require("request"), require("url"));
	else
		root["spe"] = factory(root["fs"], root["path"], root["websocket"], root["adm-zip"], root["child_process"], root["http"], root["https"], root["mkdirp"], root["net"], root["os"], root["request"], root["url"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_36__, __WEBPACK_EXTERNAL_MODULE_37__, __WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_66__, __WEBPACK_EXTERNAL_MODULE_67__, __WEBPACK_EXTERNAL_MODULE_68__, __WEBPACK_EXTERNAL_MODULE_69__, __WEBPACK_EXTERNAL_MODULE_70__, __WEBPACK_EXTERNAL_MODULE_71__, __WEBPACK_EXTERNAL_MODULE_72__, __WEBPACK_EXTERNAL_MODULE_73__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyconfig": 3
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
webpackContext.id = 1;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 2;


/***/ }),
/* 3 */
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

	var SpaceifyUnique = __webpack_require__(22);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/**
 * Config, 2.3.2017 Spaceify Oy
 *
 * @class Config
 */

function Config()
{
var self = this;

//console.log("in Config::Config()");

var baseConfig = null;
var overridingConfig = null;
var config = null;
var path = null;

// Hack to use real require in webpack
var doRequire = function(module)
	{
	return eval("require")(module);
	};

// Load the default speconfig.js file and apply overrides in the order:
// 1. make base config global
// 2. module.parent.speconfig
// 3. "speconfig.js"
// 4. process.cwd()/speconfig.js

var globalObj = (typeof(window) === "undefined" ? global : window);

if (typeof globalObj.speBaseConfig_)
	{
	baseConfig = globalObj.speBaseConfig_;
	}

if (typeof window === "undefined") //in node.js
	{
	path = __webpack_require__(36);

	if (!baseConfig)
		{
		try	{
			var apipath = "/var/lib/spaceify/code/";
			baseConfig = doRequire(path.resolve(apipath, "spebaseconfig.js"));

			//console.log("Loaded base config from /var/lib/spaceify/code/");
			}
		catch (e)
			{
			baseConfig = __webpack_require__(8);

			//console.log("Loaded base config from the spaceifyedge package");
			}
		}

	if (!baseConfig)
		{
		//console.log("Error loading base config, exiting");

		process.exit(1);
		}

	// load and apply the overriding configs

	try	{
		overridingConfig = doRequire(module.parent.speconfig);
		Config.overrideConfigValues(baseConfig, overridingConfig);

		//console.log("Loaded overriding config from module.parent.speconfig");
		}
	catch (e)
		{}
	finally
		{
		try
			{
			overridingConfig = doRequire("speconfig");
			Config.overrideConfigValues(baseConfig, overridingConfig);

			//console.log("Loaded overriding config from \"speconfig\"");
			}
		catch (e)
			{}
		finally
			{
			try
				{
				//console.log("Trying to load overriding config from working directory "+process.cwd());

				overridingConfig = doRequire(path.resolve(process.cwd(), "speconfig.js"));
				Config.overrideConfigValues(baseConfig, overridingConfig);

				//console.log("Loaded overriding config from working directory");
				}
			catch (e)
				{
				//console.log(e);
				}
			finally
				{
				//console.log("Loading config files completed");
				}
			}
		}

	}
else if (typeof window !== "undefined")	//in browser
	{
	var lib = window;

	if (window.spe)	// browser using a bundled spaceifyedge
		{
		lib = window.spe;
		}

	if (!baseConfig)
		baseConfig = lib.SpeBaseConfig;

	if (lib.SpeConfig)
		Config.overrideConfigValues(baseConfig, lib.SpeConfig);
	
	if (lib !== window && window.SpConfig)
		Config.overrideConfigValues(baseConfig, window.SpConfig);
		
	}

/*
if (!baseConfig)						// Default configuration not found
	{
	config = {};
	}
else
	{
	config = {};

	// Apply configuration from webpack or window or nodejs config
	if(ConfigClass["defaultConfig"])							// Set defaultConfig as base
		config = ConfigLoader.overrideConfigValues(config, ConfigClass.defaultConfig);

	if (ConfigClass[class_])										// Class found
		config = ConfigLoader.overrideConfigValues(config, ConfigClass[class_]);

	if (ConfigClass["globalConfigOverride"])						// Global override
		config = ConfigLoader.overrideConfigValues(config, ConfigClass["globalConfigOverride"]);

	if(override_)												// User override (when calling this function)
		config = ConfigLoader.overrideConfigValues(config, override_);
	}
*/
//console.log("Config::Config() "+JSON.stringify(baseConfig));

globalObj.speBaseConfig_ = baseConfig;

self.getConfig = function()
	{
	return baseConfig;
	}

}

Config.overrideConfigValues = function(obj1, obj2)
	{
	for (var p in obj2)
		{
    	try
    		{
      		// Property in destination object set; update its value.
      		if ( obj2[p].constructor==Object )
      			{
        		obj1[p] = Config.overrideConfigValues(obj1[p], obj2[p]);
				}
			else
				{
        		obj1[p] = obj2[p];
				}
			}

    	catch(e)
    		{
      		// Property in destination object not set; create it and set its value.
      		obj1[p] = obj2[p];
			}
  		}

  	return obj1;
	};

/*
Config.overrideConfigValues = function(config, overridingValues)
	{
	var newConfig = config;

	for (var g in overridingValues)
		{
		if (overridingValues[g] !== null)
			newConfig[g] = overrideValues_[g];
		}
	return newConfig;
	};
*/
Config.destroySingleton = function()
	{
	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;
	else
		globalObj = window;

	globalObj.speConfigInstance_ = null;
	};

Config.getConfig = function()
	{
	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;
	else
		globalObj = window;

	if (!globalObj.speConfigInstance_)
		{
		globalObj.speConfigInstance_ = new Config();
		Object.freeze(globalObj.speConfigInstance_);
		}

	return globalObj.speConfigInstance_.getConfig();
	};

if(true)
	module.exports = Config;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(47)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Logger, 18.12.2013 Spaceify Oy
 *
 * @class Logger
 */

function Logger(config, class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

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

var showLabels	= true;

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
self.error		= function() { out(ERROR, false, arguments); }
self.warn		= function() { out(WARN, false, arguments); }
self.force		= function() { out(FORCE, false, arguments); }
self.stdout		= function() { out(STDOUT, true, arguments); }

	// -- -- -- -- -- -- -- -- -- -- //

var out = function(type, useStdout)
	{
	if (!enabled[type] && type != FORCE)
		return;

	var str = "";
	var strs = self.convertArguments(arguments[2]);
	var strp = null;

	for (var i = 0; i < strs.length; i++)							// Concatenate strings passed in the arguments, separate strings with space
		{
		strp = (typeof strs[i] == "string" ? strs[i] : JSON.stringify(strs[i]));
		str += (str != "" && str != "\n" && str != "\r" && str != "\r\n" ? " " : "") + strp;
		}

	if (type == ERROR)
		{
		str += new Error().stack;
		}

	str = str.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f]/g, "");		// Replace control characters 0-9, 11-12, 14-31

	if (!useStdout && showLabels)
		{
		var dateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

		str = dateString +" "+labels[type]+"["+class_+"] "+ str;
		}

	if (isNodeJs)
		{
		if (!useStdout)												// console.log prints new line
			console.log(str);
		else														// stdout.write doesn't
			process.stdout.write(str);
		}
	else
		{
		if (type == DIR && console.dir)
			console.dir(str);

		else if (type == ERROR && console.error)
			console.error(str);

		else if (type == INFO && console.info)
			console.info(str);

		else if (type == WARN && console.warn)
			console.warn(str);

		else
			console.log(str);
		}
	};

self.setOptions = function(options)
	{
	if (typeof options.enabled !== "undefined")
		{
		for (var type in options.enabled)
			{
			enabled[type] = options.enabled[type];
			}
		}

	if (typeof options.showLabels !== "undefined")
		showLabels = options.showLabels;
	};

self.clone = function(logger)
	{
	var enabled_ = logger.getEnabled();

	enabled[LOG]	= enabled_[LOG];
	enabled[DIR]	= enabled_[DIR];
	enabled[INFO]	= enabled_[INFO];
	enabled[ERROR]	= enabled_[ERROR];
	enabled[WARN]	= enabled_[WARN];
	};

self.getEnabled = function()
	{
	return enabled;
	};

/**
  * Clone the values from this instance of the logger to the global base configuration
  * => Other instance of the logger get the same values as this instance
  */
self.cloneInstanceToBaseConfiguration = function()
	{
	var iLogger;
	var globalObj = (typeof(window) === "undefined" ? global : window);

	if (globalObj.speBaseConfig_ && globalObj.speBaseConfig_.logger)
		{
		iLogger = globalObj.speBaseConfig_.logger;

		for (var i in iLogger)
			{
			if (i != class_)
				{
				iLogger[i][LOG]		= enabled[LOG];
				iLogger[i][DIR]		= enabled[DIR];
				iLogger[i][INFO]	= enabled[INFO];
				iLogger[i][ERROR]	= enabled[ERROR];
				iLogger[i][WARN]	= enabled[WARN];
				}
			}
		}
	};

/**
 * Convert arguments to array and sanitize empty arguments
 */
self.convertArguments = function()
	{
	var args;

	if (Object.keys(arguments[0]).length == 0)
		{
		args = [""];
		}
	else
		{
		args = Array.prototype.slice.call(arguments[0]);
		}

	return args;
	}

}

Logger.createLogger_ = function(class_)
	{
	//console.log("Logger::CreateLogger() creating new logger for "+class_);

	var lib;
	var Config;

	if (typeof window === "undefined")
		{
		try
			{
			Config = __webpack_require__(4);
			}
		catch (e)
			{
			var apipath = "/var/lib/spaceify/code/";
			Config = __webpack_require__(51)(apipath + "config.js");
			}
		}
	else if (typeof window !== "undefined")
		{
		lib = (window.spe ? window.spe : window);
		Config = (lib.Config ? lib.Config : null);
		}

	var config = Config.getConfig();

	//console.log("Logger::getLogger()" + JSON.stringify(config));

	var loggerConfig = {};

	// Get base config
	Config.overrideConfigValues(loggerConfig, config.logger.defaultLoggerConfig);

	// Override with class-specific properties

	if (config.logger.hasOwnProperty(class_))
		{
		Config.overrideConfigValues(loggerConfig, config.logger[class_]);
		}

	// Override with global override
	Config.overrideConfigValues(loggerConfig, config.logger.globalConfigOverride);

	// Apply the "all" keyword

	var all_ = (typeof loggerConfig.all !== "undefined" ? loggerConfig.all : null);

	if (all_ !== null)											// Class specific override
		{
		loggerConfig['log'] = all_;
		loggerConfig['dir'] = all_;
		loggerConfig['info'] = all_;
		loggerConfig['error'] = all_;
		loggerConfig['warn'] = all_;
		}

	return new Logger(loggerConfig, class_);
	};

Logger.getLogger = function(class_)
	{
	if (!class_)
		class_ = "mainlog";

	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;

	else
		globalObj = window;


	if (!globalObj.hasOwnProperty("speLoggerInstances_"))
		{
		globalObj["speLoggerInstances_"] = new Object();
		}

	if (!globalObj.speLoggerInstances_.hasOwnProperty(class_))
		{
		globalObj.speLoggerInstances_[class_] = Logger.createLogger_(class_);
		}

	return globalObj.speLoggerInstances_[class_];
	};

if (true)
	module.exports = Logger;


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
 * Logger wrapper for Spaceify edge, 5.4.2017 Spaceify Oy
 *
 * @class SpaceifyLogger
 */

function SpaceifyLogger(class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var Logger = null;
var SpaceifyError = null;

if (isNodeJs)
	{
	var apipath = "/var/lib/spaceify/code/";

	try { Logger = __webpack_require__(5); } catch (e) { Logger = __webpack_require__(53)(apipath + "logger"); }
	try { SpaceifyError = __webpack_require__(6); } catch (e) { SpaceifyError = __webpack_require__(12)(apipath + "spaceifyerror"); }
	}
else if (typeof window !== "undefined")
	{
	Logger = (window.Logger ? window.Logger : null);
	SpaceifyError = (window.SpaceifyError ? window.SpaceifyError : null);
	}

var errorc = new SpaceifyError();
var logger = Logger.getLogger(class_);

self.log		= function() { logger.log.apply(self, logger.convertArguments(arguments)); }
self.dir		= function() { logger.dir.apply(self, logger.convertArguments(arguments)); }
self.info		= function() { logger.info.apply(self, logger.convertArguments(arguments)); }
self.warn		= function() { logger.warnapply(self, logger.convertArguments(arguments)); }
self.force		= function() { logger.force.apply(self, logger.convertArguments(arguments)); }
self.stdout		= function() { logger.stdout.apply(self, logger.convertArguments(arguments)); }
self.error		= function(err, path, code, type)
	{
	var message = (errorc ? errorc.errorToString(err, path, code) : err);

	if (type == logger.ERROR)
		logger.error(logger.ERROR, false, [message]);
	else if (type == logger.FORCE)
		logger.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	logger.setOptions(options);
	};

self.clone = function(logger_)
	{
	logger.setOptions(logger_);
	};

self.getEnabled = function()
	{
	return logger.getEnabled();
	};

self.cloneInstanceToBaseConfiguration = function()
	{
	logger.cloneInstanceToBaseConfiguration();
	};

}

if (true)
	module.exports = SpaceifyLogger;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Config, 8.2.2017 Spaceify Oy
 *
 * This configuration is used with the 'spaceify connect'.
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
 * If the configuration for a class is not found, the default (defaultConfig) configuration
 * is used as a fallback. The default configuration operates identically to the individual
 * class configurations.
 *
 * There is a global (globalConfigOverride) override configuration. The global oveverride is applied
 * to all of the corresponding output types of all the individual class configurations.
 * The override takes three values:
 *   false = the output type of all the individual classes are disabled
 *    true = the output type of all the individual classes are enabled
 *    null = the override is not applied to the output type of the class
 *
 * NOTICE: the globalConfigOverride and defaultConfig configurations are mandatory variables in the config.js file!
 *
 * Order of precedence of the configurations
 *   Global configuration takes precedencence of class configurations
 * Order of precedence of the console output types
 *   'all' in a configuration (global or class) takes precedence the output types
 *
 * e.g.
 *      MyClass is unaltered
 *      globalConfigOverride = { log: null, dir: null, info: null, error: null, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *
 *      MyClass 'all' overrides its output types
 *      globalConfigOverride = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: null };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true,  all: false };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: false };
 *
 *      Global error is set to false and overrides MyClass error with false
 *      globalConfigOverride = { log: null, dir: null, info: null, error: false, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true,  warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: false, warn: true, all: null };
 *
 *      Global 'all' is set to false and all the output types of MyClass are overridden with false
 *      globalConfigOverride = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: false };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true, all: null };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: null };
 *
 * @class Config
 */

var SpeBaseConfig =
{
logger:
	{
	// Global configuration overrides (overrides the individual class configurations)

	loggerConfigOverride:
		{
		all: true,
		myoverride: 123,
		mydefault2: 3
		},

	// MANDATORY CONFIGURATION - Default configuration (always used as base config)

	defaultLoggerConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true,
		all: true,
		mydefault1: 1,
		mydefault2: 2
		},

	// Class configurations (overrides defaultConfig)
	ApplicationManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	AppManService:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	BinaryRpcCommunicator:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Core:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Database:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DHCPDLog:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerContainer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerHelper:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerImage:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RegisterEdge:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	HttpService:
		{
		log: false,
		dir: false,
		info: false,
		error: true,
		warn: false
		},

	Iptables:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Main:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RuntimeManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	ServiceRegistry:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Manifest:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Messaging:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	PubSub:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RpcCommunicator:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SecurityModel:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Service:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyApplication:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyApplicationManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyCore:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyError:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyMessages:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyNet:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyNetwork:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	ServiceInterface:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	ServiceSelector:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyUtility:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Spacelet:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SPM:
		{
		log: false,
		dir: false,
		info: false,
		error: false,
		warn: false
		},

	ValidateApplication:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebOperation:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebRtcClient:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebRtcConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketRpcConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketRpcServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Connection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		}
	},

testValue: "TestValueFromBaseConfig"
};

//Object.freeze(SpeBaseConfig);

if (true)
	module.exports = SpeBaseConfig;


/***/ }),
/* 9 */
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
var SpaceifyError = null;
var SpaceifyLogger = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());

	global.fs = __webpack_require__(0);
	global.WebSocket = __webpack_require__(37).w3cwebsocket;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	}

var errorc = new SpaceifyError();
var logger = new SpaceifyLogger("WebSocketConnection");

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
/* 10 */
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
var SpaceifyError = null;
var SpaceifyUtility = null;
var RpcCommunicator = null;
//var SpaceifyLogger = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	RpcCommunicator = __webpack_require__(13)(lib + "rpccommunicator");
	WebSocketConnection = __webpack_require__(15)(lib + "websocketconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyUtility = lib.SpaceifyUtility;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var logger = new SpaceifyLogger("WebSocketRpcConnection");

self.connect = function(options, callback)
	{
	connection.connect(options, function(err, data)
		{
		if(!err)
			{
			communicator.addConnection(connection);

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

self.connectionExists = function(connectionId)
	{
	return communicator.connectionExists(connectionId);
	}

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
/* 11 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 11;


/***/ }),
/* 12 */
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
webpackContext.id = 12;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./rpccommunicator": 26
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
webpackContext.id = 13;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 14;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketconnection": 9
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
webpackContext.id = 15;


/***/ }),
/* 16 */
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

var serverUpListener = null;
var serverDownListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
self.REQUIRED = 0;
self.PROVIDED = 1;

	// PRIVATE METHODS -- -- -- -- -- -- -- -- -- -- //
var listenConnection = function(connectionId, serverId, isSecure)
	{
	for(var i = 0; i < connectionListeners.length; i++)
		connectionListeners[i](connectionId, service_name, self.getIsSecure());
	}

var listenDisconnection = function(connectionId, serverId, isSecure)
	{
	for(var i = 0; i < disconnectionListeners.length; i++)
		disconnectionListeners[i](connectionId, service_name, self.getIsSecure());
	}

var listenServerUp = function(serverId)
	{
	if(serverUpListener)
		serverUpListener(serverId, service_name, self.getIsSecure());
	}

var listenServerDown = function(serverId)
	{
	if(serverDownListener)
		listenServerDown(serverId, service_name, self.getIsSecure());
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

self.getConnection = function()
	{
	return connection;
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.getServiceName = function()
	{
	return service_name;
	}

self.connectionExists = function(connectionId)
	{
	return connection.connectionExists(connectionId);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Service Logic, 29.7.2015 Spaceify Oy
 *
 * A class for connecting required services and opening servers for provided services.
 * This class can be used in Node.js applications and web pages.
 *
 * @class ServiceInterface
 */

function ServiceInterface()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var fibrous = null;
var Service = null;
var Connection = null;
var SpaceifyCore = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var ServiceSelector = null;
//var SpaceifyLogger = null;
var WebSocketRpcServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Service = __webpack_require__(54)(lib + "service");
	SpaceifyCore = __webpack_require__(31)(lib + "spaceifycore");
	SpaceifyError = __webpack_require__(12)(lib + "spaceifyerror");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyNetwork = __webpack_require__(57)(lib + "spaceifynetwork");
	ServiceSelector = __webpack_require__(56)(lib + "serviceselector");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	WebSocketRpcServer = __webpack_require__(59)(lib + "websocketrpcserver");
	Connection = __webpack_require__(30)(lib + "connection");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Service = lib.Service;
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	ServiceSelector = lib.ServiceSelector;
	//SpaceifyLogger = lib.SpaceifyLogger;
	WebSocketRpcServer = null;
	Connection = lib.Connection;
	fibrous = function(fn) { return fn; };
	}

var core = new SpaceifyCore();
var errorc = new SpaceifyError();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig("realpaths");
//var logger = new SpaceifyLogger("ServiceInterface");

var required = {};																				// <= Clients (required services)
var provided = {};																				// <= Servers (provided services)

var keepServerUp = true;
var keepConnectionUp = true;
var keepConnectionUpTimerIds = {};

var caCrt = config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW;
var key = config.VOLUME_TLS_PATH + config.SERVER_KEY;
var crt = config.VOLUME_TLS_PATH + config.SERVER_CRT;

var errorObj = errorc.makeErrorObject("not_open", "Connection is not ready.", "ServiceInterface::connect");

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// CLIENT SIDE - THE REQUIRED SERVICES - NODE.JS / WEB PAGES -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
self.connect = function(serviceObj, isSecure, callback)
	{ // serviceObj = object (service object) or string (service name)
	if (typeof isSecure === "function")															// From web page or not defined
		{
		callback = isSecure;
		isSecure = (isNodeJs ? false : network.isSecure());
		}
	else																						// Web page always checks the protocol
		{
		isSecure = (isNodeJs ? isSecure : network.isSecure());
		}

	open(serviceObj, isSecure, callback);
	}

var open = function(serviceObj, isSecure, callback)
	{
	var service;
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if (service_name == config.HTTP)
		return callback(errorObj, null);

	if (!required[service_name])																// Every service has a selector
		required[service_name] = new ServiceSelector();

	service = required[service_name].getService(isSecure);

	if (!service)
		{
		service = new Service(service_name, false, new Connection());

		service.setConnectionListener(connectionListener);
		service.setDisconnectionListener(disconnectionListener);

		required[service_name].add(service, isSecure);
		}

	getService(serviceObj, function(err, serviceObj)
		{
		if (!serviceObj || err)
			{
			disconnectionListener(-1, service_name, isSecure);									// Let the automaton get the connection up

			if (typeof callback == "function")
				callback(errorObj, null);
			}
		else
			{
			connect(service, (!isSecure ? serviceObj.port : serviceObj.securePort), isSecure, function()
				{
				if (typeof callback === "function")
					callback(null, service);
				});
			}
		});
	}

var getService = function(serviceObj,  callback)
	{
	if (typeof serviceObj === "object")															// Service is already fetched
		{
		callback(null, serviceObj);
		}
	else																						// Get service
		{
		core.getService(serviceObj, "", function(err, serviceObj)
			{
			callback(err, serviceObj);
			});
		}
	}

var connect = function(service, port, isSecure, callback)
	{
	if (service.getIsOpen())																	// Don't reopen connections!
		return callback();

	service.getConnection().connect({ hostname: config.EDGE_HOSTNAME, port: port, isSecure: isSecure, caCrt: caCrt }, callback);
	}

self.disconnect = function(service_names, callback)
	{ // service_names = disconnect one service (= string), liste of services (= array) or all services ( = undefined || null)
	var keys;

	if (!service_names)																			// All the services
		keys = Object.keys(required);
	else if (service_name.constructor !== Array)												// One service (string)
		keys = [service_names];

	for (var i = 0; i < keys.length; i++)
		{
		required[keys[i]].closeServiceConnection();
		}
	}

var connectionListener = function(id, service_name, isSecure)
	{
	}

var disconnectionListener = function(id, service_name, isSecure)
	{
	var timerIdName, service;

	if (!keepConnectionUp)
		return;

	timerIdName = service_name + (!isSecure ? "F" : "T");										// Services have their own timers and
	if (timerIdName in keepConnectionUpTimerIds)												// only one timer can be running at a time
		return;

	service = required[service_name].getService(isSecure);										// Make sure the service is not open
	if (service.getIsOpen())
		return;

	keepConnectionUpTimerIds[timerIdName] = setTimeout(waitConnectionAttempt, config.RECONNECT_WAIT, id, service_name, isSecure, timerIdName, service);
	}

var waitConnectionAttempt = function(id, service_name, isSecure, timerIdName, service)
	{
	getService(service_name, function(err, serviceObj)
		{
		delete keepConnectionUpTimerIds[timerIdName];											// Timer can now be retriggered

		if (serviceObj)
			connect(service, (!isSecure ? serviceObj.port : serviceObj.securePort), isSecure, function() {});
		else
			disconnectionListener(id, service_name, isSecure);
		});
	}

self.keepConnectionUp = function(val)
	{
	keepConnectionUp = (typeof val == "boolean" ? val : false);
	}

self.getRequiredService = function(service_name, isSecure)
	{
	return (required[service_name] ? required[service_name].getService(isSecure) : null);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// SERVER SIDE - THE PROVIDED SERVICES - NODE.JS -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
self.listen = fibrous( function(service_name, unique_name, port, securePort, listenUnsecure, listenSecure)
	{
	var service;

	if (!provided[service_name])
		{
		provided[service_name] = new ServiceSelector();

		service = new Service(service_name, true, new WebSocketRpcServer());
		provided[service_name].add(service, false);

		service = new Service(service_name, true, new WebSocketRpcServer());
		provided[service_name].add(service, true);
		}

	listenUnsecure = (typeof listenUnsecure == "undefined" ? true : listenUnsecure);
	listenSecure = (typeof listenSecure == "undefined" ? true : listenSecure);

	if (listenUnsecure)
		listen.sync(service_name, port, false);

	if (listenSecure)
		listen.sync(service_name, securePort, true);

	if (!port || !securePort)
		{ // If port was null or 0 the real port number is known only after the server is listening
		if (listenUnsecure)
			port = provided[service_name].getService(false).getPort();

		if (listenSecure)
			securePort = provided[service_name].getService(true).getPort();

		console.log("    LISTEN -----> " + service_name + " - port: " + port + ", secure port: " + securePort);
		}

	core.sync.registerService(service_name, {unique_name: unique_name, port: port, securePort: securePort});
	});

var listen = fibrous( function(service_name, port, isSecure)
	{
	var service = provided[service_name].getService(isSecure);

	if (service.getIsOpen())
		return;

	service.getConnection().sync.listen({ hostname: null, port: port, isSecure: isSecure, key: key, crt: crt, caCrt: caCrt, keepUp: keepServerUp });
	});

self.close = function(service_name)
	{  // service_names = disconnect one service (= string), liste of services (= array) or all services ( = undefined || null)
	var keys;

	if (typeof service_names == "undefined")													// All the services
		keys = Object.keys(provided);
	else if (typeof service_names != "undefined" && service_name.constructor !== Array)			// One service (string)
		keys = [service_names];

	for (var i = 0; i < keys.length; i++)
		{
		provided[keys[i]].closeServiceConnection();
		}
	}

self.getProvidedService = function(service_name, isSecure)
	{
	return (provided[service_name] ? provided[service_name].getService(isSecure) : null);
	}

self.keepServerUp = function(val)
	{
	keepServerUp = (typeof val == "boolean" ? val : false);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// BOTH SIDES -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
self.getServiceById = function(connectionId)
	{
	var i, names, service;

	names = Object.keys(provided);
	for (i = 0; i < names.length; i++)
		{
		if ((service = provided[names[i]].getServiceById(connectionId)))
			return service;
		}

	names = Object.keys(required);
	for (i = 0; i < names.length; i++)
		{
		if ((service = required[names[i]].getServiceById(connectionId)))
			return service;
		}

	return null;
	}

}

if (true)
	module.exports = ServiceInterface;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Service Selector, 27.12.2017 Spaceify Oy
 *
 * This class implements unsercure / secure service selection logic. Only for Spaceify's internal use.
 *
 * @class ServiceSelector
 */

function ServiceSelector()
{
var self = this;

var service = null;
var secureService = null;

self.add = function(service_, isSecure)
	{
	if (!isSecure)
		{
		service = service_;

		service.exposeRpcMethod = exposeRpcMethod;
		service.exposeRpcMethodSync = exposeRpcMethodSync;
		}
	else
		{
		secureService = service_;

		secureService.exposeRpcMethod = exposeRpcMethod;
		secureService.exposeRpcMethodSync = exposeRpcMethodSync;
		}
	}

self.getService = function(isSecure)
	{
	var _service = null;

	if (isSecure === false)
		{
		_service = service;
		}
	else if (isSecure === true)
		{
		_service = secureService;
		}
	else
		{
		if (secureService)
			_service = secureService;
		else if (service)
			_service = service;
		}

	return _service;
	}

self.getServiceById = function(connectionId)
	{
	var _service_ = null;

	if (service && service.connectionExists(connectionId))
		_service_ = service;
	else if (secureService && secureService.connectionExists(connectionId))
		_service_ = secureService;

	return _service_;
	}

self.closeServiceConnection = function(isSecure)
	{
	if (isSecure === false || typeof isSecure == "undefined")
		{
		if (service)
			service.getConnection().close();
		}

	if (isSecure === true || typeof isSecure == "undefined")
		{
		if (secureService)
			secureService.getConnection().close();
		}
	}

	// Expsose both unsecure and secure -- -- -- -- -- -- -- -- -- -- //
var exposeRpcMethod = function(name, object, method)
	{
	if (service)
		service.getConnection().exposeRpcMethod(name, object, method);

	if (secureService)
		secureService.getConnection().exposeRpcMethod(name, object, method);
	}

var exposeRpcMethodSync = function(name, object, method)
	{
	if (service)
		service.getConnection().exposeRpcMethodSync(name, object, method);

	if (secureService)
		secureService.getConnection().exposeRpcMethodSync(name, object, method);
	}

}

if (true)
	module.exports = ServiceSelector;

/***/ }),
/* 19 */
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

var lib = null;
var Connection = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Connection = __webpack_require__(30)(lib + "connection");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyNetwork = function() {};
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Connection = lib.Connection;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	//SpaceifyLogger = lib.SpaceifyLogger;
	}

var connection = new Connection();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyCore");

var callQueue = [];

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

self.getRuntimeServiceStates = function(sessionId, callback)
	{
	callRpc("getRuntimeServiceStates", [sessionId], callback);
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
	var callObj, isSecure, port, hostname, caCrt;

	if(connection.isConnecting())
		{
		callQueue.push({ method: method, params: params, callback: callback });
		}
	else if(!connection.isConnected())
		{
		callQueue.push({ method: method, params: params, callback: callback });

		isSecure = (isNodeJs ? true : network.isSecure());
		port = (!isSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);
		caCrt = (isNodeJs ? config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW : "");

		if(!isNodeJs)																		// Web page
			hostname = network.getEdgeURL({ protocol: "" });
		else if(isRealSpaceify)																// Node.js
			hostname = config.EDGE_IP;
		else																				// Develop mode
			hostname = config.CONNECTION_HOSTNAME;

		connection.connect({ hostname: hostname, port: port, isSecure: isSecure, caCrt: caCrt }, function(err, data)
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
		connection.callRpc(callObj.method, callObj.params, self, function()
			{
			callObj.callback.apply(this, arguments);

			nextRpcCall();
			});
		}
	}

self.close = function()
	{
	connection.close();
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Language, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * Language class for web pages.
 *
 * @class SpaceifyLanguage
 */

function SpaceifyLanguage()
{
var self = this;

self.processDocument = function(id, selector, doc)
	{
	var nodeList, node, data, result, indexes, index, pos, attribute, newElement;

	nodeList = document.getElementById(id);															// Find the container
	if (!nodeList)
		return;

	nodeList = nodeList.querySelectorAll("[" + selector + "]");										// Selector is usually "data-language"

	for (var i = 0; i < nodeList.length; ++i)														// Iterate the container
		{
		node = nodeList[i];

		indexes = node.getAttribute(selector).split(":");

		result = "";
		attribute = "";
		for (var t = 0; t < indexes.length; t++)													// Selector can contain one or more language indexes
			{
			index = indexes[t];

			if ((pos = index.indexOf(">")) != -1)
				{
				attribute = index.substr(0, pos);
				index = index.replace(attribute + ">", "");
				}

			if (index.indexOf(".") == -1)															// Plain string
				{
				result += index;
				}
			else																					// Index in the locales
				{
				index = index.split(".");

				result += window.spelocales[locale][index[0]][index[1]];							// locale:section:index
				}
			}

		if (attribute == "")
			{
			while (node.firstChild)
   				node.removeChild(node.firstChild);

			newElement = document.createTextNode(result);
			node.appendChild(newElement);
			}
		else
			{
			node[attribute] = result;
			}
		}

	if (doc)																						// Set strings to document level tags, e.g. <head> -> <title>
		{
		for (indexes in doc)
			{
			index = doc[indexes];
			document[indexes] = window.spelocales[locale][index.section][index.index];
			}
		}
	}

self.getString = function(section, index)
	{
	return window.spelocales[locale][section][index];
	}

self.setLocale = function(locale_)
	{
	locale = locale;
	}

var getCookie = function(cname)
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

var locale = getCookie("locale") || "en_US";
}

if(true)
	module.exports = SpaceifyLanguage;


/***/ }),
/* 21 */
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
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyError = __webpack_require__(12)(lib + "spaceifyerror");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyUtility = __webpack_require__(33)(lib + "spaceifyutility");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyUtility = lib.SpaceifyUtility;
	//var SpaceifyLogger = lib.SpaceifyLogger;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyNetwork");

var dregx = new RegExp(config.EDGE_DOMAIN.replace(".", "\\.") + "$", "i");

// Get the URL to the Spaceify Edge
self.getEdgeURL = function(opts)
	{
	var options = {};
	options.protocol = (typeof opts.protocol !== "undefined" ? opts.protocol : null);
	options.withEndSlash = (typeof opts.withEndSlash !== "undefined" ? opts.withEndSlash : false);

	var protocol = self.getProtocol(true, options.protocol);

	// Origin: local/remote edge webpage or webpage running spacelet (URL not ending with EDGE_DOMAIN); defaults to spacelet
	var hostname = config.EDGE_HOSTNAME;
	if(typeof window !== "undefined" && window.location.hostname.match(dregx) !== null)
		{
		hostname = window.location.hostname;
		}

	return protocol + hostname + (options.withEndSlash ? "/" : "");
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
	var protocol = self.getProtocol(false, null);

	return (protocol == "http:" ? false : true);
	}

// Return current protocol
self.getProtocol = function(withScheme, cProtocol)
	{
	var url, proto, protocol;

	if(cProtocol === "")														// No protocol
		{
		protocol = "";
		}
	else if(typeof window === "undefined")										// Node.js!!!
		{
		protocol = (cProtocol === null ? "" : cProtocol);
		}
	else																		// Web page
		{
		protocol = (cProtocol !== null ? cProtocol : location.protocol);

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
		}

	if(protocol != "" && !protocol.match(/:$/))
		protocol += ":";

	return protocol + (protocol != "" && withScheme ? "//" : "")
	}

// Parse URL query
self.parseQuery = function(url)
	{
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

	for(i = 0; i < exclude.length; i++)
		{
		if(exclude[i] in query)
			delete query[exclude[i]];
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

self.parseURL = function(url)
	{
	/*var parser = document.createElement("a");
	parser.href = url;
	return parser;*/

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var	o =
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

self.isPortInUse = function(port, callback)
	{ // Adapted from https://gist.github.com/timoxley/1689041
	if(!port)
		return callback(null, false);

	var net = __webpack_require__(70);
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
	var data;
	var result;
	var content;
	var error = null;
	var operationUrl;

	try {
		content = "Content-Disposition: form-data; name=operation;\r\nContent-Type: application/json; charset=utf-8";

		operationUrl = self.getEdgeURL({ withEndSlash: true }) + config.OPERATION_FILE;
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

			if(!result)
				{
				data = null;
				error = errorc.makeErrorObject("doOperation2", "Response is null.", "SpaceifyNetwork::doOperation");
				}
			else if(result.err)
				{
				data = result.data;
				error = result.err;
				}
			else if(result.error)
				{
				data = result.data;
				error = result.error;
				}
			else
				{
				data = result.data;
				error = null;
				}

			callback(error, data, id, ms);
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
/* 22 */
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
/* 23 */
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
var Language = null;
var SpaceifyConfig = null;
var SpaceifyLogger = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Language = __webpack_require__(52)(lib + "language");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyLogger = __webpack_require__(32)(lib + "spaceifylogger");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());

	global.os = __webpack_require__(71);
	global.fs = __webpack_require__(0);
	global.path = __webpack_require__(36);
	global.mkdirp = __webpack_require__(69);
	global.AdmZip = __webpack_require__(65);
	global.request = __webpack_require__(72);
	global.spawn = __webpack_require__(66).spawn;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Language = {};
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyLogger = lib.SpaceifyLogger;
	fibrous = function(fn) { return fn; };
	}

var config = SpaceifyConfig.getConfig();
var language = Language;//new Language();
var logger = new SpaceifyLogger("SpaceifyUtility");

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

self.isFile = function(path, callback)
	{
	self.isLocal(path, "file", callback);
	}

self.isDirectory = function(path, callback)
	{
	self.isLocal(path, "directory", callback);
	}

self.isLocal = function(path, type, callback)
	{
	try {
		var stats = fs.sync.stat(path);

		if(stats && type == "file" && stats.isFile())
			callback(null, true);
		else if(stats && type == "directory" && stats.isDirectory())
			callback(null, true);
		else
			callback(null, false);
		}
	catch(err)
		{
		callback(null, false);
		}
	}

self.getPathType = function(path, callback)
	{
	try {
		var stats = fs.stat(path, function(err, data)
			{
			if(stats && stats.isFile())
				callback(null, "file");
			else if(stats && stats.isDirectory())
				callback(null, "directory");
			else
				callback(null, "undefined");
			});
		}
	catch(err)
		{
		callback(null, "undefined");
		}
	}

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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Connection, 29.7.2015 Spaceify Oy
 *
 * A class for wrapping the local and remote connection logic.
 *
 * @class Connection
 */

function Connection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window !== "undefined" && window.isSpaceifyNetwork ? window.isSpaceifyNetwork : false);
var isSpaceletOrigin = (typeof window !== "undefined" && !window.location.hostname.match(/.*spaceify\.net/) ? true : false);

var lib = null;
var LoaderUtil = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var WebSocketRpcConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";
	LoaderUtil = null;
	SpaceifyNetwork = function() {};
	SpaceifyConfig = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	WebSocketRpcConnection = __webpack_require__(63)(lib + "websocketrpcconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	LoaderUtil = (window.spl ? window.spl.LoaderUtil.getLoaderUtil() : {});
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	WebSocketRpcConnection = lib.WebSocketRpcConnection;
	}

var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();

var _connection = (isSpaceifyNetwork || isNodeJs || isSpaceletOrigin ? new WebSocketRpcConnection() : LoaderUtil.getPiperClient());

var tunnelId = null;
var isConnected = false;
var isConnecting = false;

self.connect = function(options, callback)
	{
	isConnecting = true;

	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		_connection.connect(options, function(err, data)
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
		_connection.createWebSocketTunnel({host: network.getEdgeURL({ protocol: "" }), port: options.port, protocol: network.getProtocol(false, null)}, null, function(id)
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
	if(_connection.close)
		_connection.close();

	_connection = null;
	}

self.callRpc = function(/*method, params, callback*/)
	{
	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		_connection.callRpc.apply(self, arguments);
		}
	else
		{
		var args = Array.prototype.slice.call(arguments);
		args.unshift(tunnelId);

		_connection.callClientRpc.apply(self, args);
		}
	}

self.exposeRpcMethod = function(name, object, method)
	{
	_connection.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	if(_connection.exposeRpcMethodSync)
		_connection.exposeRpcMethodSync(name, object, method);
	}

self.isConnected = function()
	{
	return isConnected;
	}

self.isConnecting = function()
	{
	return isConnecting;
	}

self.getPort = function()
	{
	return _connection.getPort ? _connection.getPort() : null;
	}

self.getIsOpen = function()
	{
	return _connection.getIsOpen ? _connection.getIsOpen() : null;
	}

self.getId = function()
	{
	return _connection.getId ? _connection.getId() : null;
	}

self.getIsSecure = function()
	{
	return _connection.getIsSecure ? _connection.getIsSecure() : null;
	}

self.connectionExists = function(connectionId)
	{
	return _connection.connectionExists ? _connection.connectionExists(connectionId) : false;
	}

self.setConnectionListener = function(listener)
	{
	if(_connection.setConnectionListener)
		_connection.setConnectionListener(listener);
	}

self.setDisconnectionListener = function(listener)
	{
	if(_connection.setDisconnectionListener)
		_connection.setDisconnectionListener(listener);
	}

}

if(true)
	module.exports = Connection;

/***/ }),
/* 26 */
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
var SpaceifyError = null;
var SpaceifyLogger = null;
var CallbackBuffer = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	CallbackBuffer = __webpack_require__(60)(lib + "callbackbuffer");
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	CallbackBuffer = lib.CallbackBuffer;
	SpaceifyUtility = lib.SpaceifyUtility;
	fibrous = function(fn) { return fn; };
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var callbackBuffer = new CallbackBuffer();
var logger = new SpaceifyLogger("RpcCommunicator");

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
var STR_CALL_RPC       = "CALL RPC  >> ";
var STR_REQUEST        = "REQUEST   -> ";
var STR_NOTIFY         = "NOTIFY    -> ";
var STR_RESPONSE       = "RESPONSE  <- ";
var STR_ERROR_RESPONSE = "ERESPONSE <- ";

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
		for (var i = 0; i < methods.length; i++)
			{
			if (typeof callback == "function")												// Call: expects a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i], id: callSequence++};
			else																			// Notification: doesn't expect a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i]};

			callObjects.push(callObject);

			//logger.log(STR_NOTIFY + JSON.stringify(callObject));
			}

		if (typeof callback == "function")
			callbackBuffer.pushBack(currentId, object, callback);
		}
	catch(err)
		{
		return (typeof callback == "function" ? callback(errorc.makeErrorObject(-32000, "callRpc failed.", "RpcCommunicator::callRpc"), null) : false);
		}

	var request = isBatch ? callObjects : callObjects[0];									// Send as batch only if call was originally batch

	logger.log(STR_CALL_RPC + JSON.stringify(request));

	sendMessage(request, id);
	};

// Sends a RPC notification to all connections
self.notifyAll = function(method, params)
	{
	try	{
		for (var key in connections)
			{
			//logger.log("RpcCommunicator::notifyAll() sending message to " + key);

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
	//logger.log("RPCCommunicator::sendBinary() " + data.byteLength);

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
			//logger.log("RpcCommunicator::handleRpcCall() connectionId: " + connectionId);

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
	//logger.log("RpcCommunicator::handleRPCCall()");

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

		logger.log((requestId ? STR_REQUEST : STR_NOTIFY) + JSON.stringify(request));

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

		logger.log(STR_RESPONSE + JSON.stringify(result));

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

		logger.log(STR_ERROR_RESPONSE + JSON.stringify(err));

		responses.push({jsonrpc: "2.0", error: err, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO ERROR RESPONSE SEND");
	}

// Handle incoming return values for a RPC call that we have made previously
var handleReturnValue = function(responses, isBatch)
	{
	//logger.log("RpcCommunicator::handleReturnValue()");

	var error = null, result = null;

	try	{
		if (isBatch)
			{
			var processed = processBatchResponse(responses);
			callbackBuffer.callMethodAndPop(processed.smallestId, processed.errors, processed.results);
			}
		else
			{
			logger.log(STR_RESPONSE + JSON.stringify(responses[0]));

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

	for (var r = 0; r < responses.length; r++)
		{
		logger.log(STR_RESPONSE + JSON.stringify(responses[r]));

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
	//logger.log("RpcCommunicator::setupPipe() between: " + firstId + " and " + secondId);

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

		for (var i = 0; i < connectionListeners.length; i++)				// Bubble the event to client
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

		for (var i = 0; i < disconnectionListeners.length; i++)		// Bubble the event to clients
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

}

// Do this only in node.js, not in the browser

if (true)
	module.exports = RpcCommunicator;


/***/ }),
/* 27 */
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
var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	}

var logger = new SpaceifyLogger("WebRtcConnection");

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
/* 28 */
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
//var SpaceifyLogger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//SpaceifyLogger = require(lib + "spaceifylogger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = __webpack_require__(13)(lib + "rpccommunicator");
	WebSocketServer = __webpack_require__(64)(lib + "websocketserver");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//SpaceifyLogger = window.SpaceifyLogger;
	//SpaceifyConfig = window.SpaceifyConfig;
	RpcCommunicator = window.RpcCommunicator;
	WebSocketServer = window.WebSocketServer;
	}

//var config = SpaceifyConfig.getConfig();
var communicator = new RpcCommunicator();
var webSocketServer = new WebSocketServer();
//var logger = new SpaceifyLogger("WebSocketRpcServer");

webSocketServer.setEventListener(communicator);

var connectionListener = null;
var disconnectionListener = null;

self.listen = function(options, callback)
	{
	communicator.setConnectionListener(listenConnections);
	communicator.setDisconnectionListener(listenDisconnections);

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
self.getIsOpen = function()
	{
	return webSocketServer.getIsOpen();
	}

self.getIsSecure = function()
	{
	return webSocketServer.getIsSecure();
	}

self.getPort = function()
	{
	return webSocketServer.getPort();
	}

self.getId = function()
	{
	return webSocketServer.getId();
	}

self.connectionExists = function(connectionId)
	{
	return communicator.connectionExists(connectionId);
	}

self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function()
	{ // arguments contains a connection id!
	communicator.callRpc.apply(this, arguments);
	}

self.nofifyAll = function(method, params)
	{
	communicator.nofifyAll(method, params);
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
/* 29 */
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
var SpaceifyLogger = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyConfig = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	WebSocketConnection = __webpack_require__(15)(lib + "websocketconnection");

	global.fs = __webpack_require__(0);
	global.URL = __webpack_require__(73);
	global.http = __webpack_require__(67);
	global.https = __webpack_require__(68);
	global.WSServer = __webpack_require__(37).server;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = window.SpaceifyLogger;
	SpaceifyConfig = window.SpaceifyConfig;
	SpaceifyUtility = window.SpaceifyUtility;
	WebSocketConnection = window.WebSocketConnection;
	}

var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebSocketServer");

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./webjsonrpc/connection": 25,
	"./webjsonrpc/webrtcconnection": 27,
	"./webjsonrpc/websocketconnection": 9,
	"./webjsonrpc/websocketrpcconnection": 10
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
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifycore": 19
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
webpackContext.id = 31;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifylogger": 7
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
webpackContext.id = 32;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyutility": 23
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
webpackContext.id = 33;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 34;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 35;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_37__;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify application, 25.1.2016 Spaceify Oy
 * This class can be used in Node.js applications and web pages.
 *
 * @class SpaceifyApplication
 */

function SpaceifyApplication()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var WebServer = null;
var SpaceifyCore = null;
var SpaceifyConfig = null;
var SpaceifyLogger = null;
var SpaceifyUtility = null;
var ServiceInterface = null;
var fibrous = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	WebServer = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyCore = __webpack_require__(31)(lib + "spaceifycore");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyLogger = __webpack_require__(32)(lib + "spaceifylogger");
	SpaceifyUtility = __webpack_require__(33)(lib + "spaceifyutility");
	ServiceInterface = __webpack_require__(55)(lib + "serviceinterface");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	WebServer = function() {};
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyUtility = lib.SpaceifyUtility;
	ServiceInterface = lib.ServiceInterface;
	fibrous = function(fn) { return fn; };
	}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var httpServer = new WebServer();
var httpsServer = new WebServer();
var utility = new SpaceifyUtility();
var spaceifyCore = new SpaceifyCore();
var serviceInterface = new ServiceInterface();
var config = SpaceifyConfig.getConfig("realpaths");
var logger = new SpaceifyLogger("SpaceifyApplication");

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

					serviceInterface.sync.listen(services[i].service_name, manifest.unique_name, port, securePort, listenUnsecure, listenSecure);
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
					httpServer.setSessionListener(null, config.SESSION_TOKEN_NAME);
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
					httpsServer.setSessionListener(null, config.SESSION_TOKEN_NAME);
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

	serviceInterface.connect(service.service_name, function(err, data)
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

	serviceInterface.disconnect();																// Disconnect clients
	serviceInterface.close();																	// Close servers

	spaceifyCore.close();

	if(application && application.fail && typeof application.fail == "function")
		application.fail(err);
	});

var createRequiredServices = function(services, position, isSecure, callback)
	{
	if(position == services.length)
		{
		callback();
		}
	else
		{
		serviceInterface.connect(services[position++].service_name, isSecure, function(err, data)
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

	// REQUIRED (= CLIENT) / PROVIDED (= SERVICE) -- -- -- -- -- -- -- -- -- -- //
self.getRequiredService = function(service_name)
	{
	return serviceInterface.getRequiredService(service_name);
	}

self.getProvidedService = function(service_name)
	{
	return serviceInterface.getProvidedService(service_name);
	}

self.setDisconnectionListeners = function(service_name, listener)
	{ // Get service, check its type before setting
	var service;

	if (typeof listener != "function")
		return;

	if ((service = serviceInterface.getProvidedService(service_name, false)))
		{
		if (!service.getIsSecure())
			service.setDisconnectionListener(listener);
		}

	if ((service = serviceInterface.getProvidedService(service_name, true)))
		{
		if (service.getIsSecure())
			service.setDisconnectionListener(listener);
		}

	if ((service = serviceInterface.getRequiredService(service_name, false)))
		{
		if (!service.getIsSecure())
			service.setDisconnectionListener(listener);
		}

	if ((service = serviceInterface.getRequiredService(service_name, true)))
		{
		if (service.getIsSecure())
			service.setDisconnectionListener(listener);
		}
	}

self.setConnectionListeners = function(service_name, listener)
	{ // Get service, check its type before setting
	var service;

	if (typeof listener != "function")
		return;

	if ((service = serviceInterface.getProvidedService(service_name, false)))
		{
		if (!service.getIsSecure())
			service.setConnectionListener(listener);
		}

	if ((service = serviceInterface.getProvidedService(service_name, true)))
		{
		if (service.getIsSecure())
			service.setConnectionListener(listener);
		}
	}

self.callRpcByConnectionId = function(connectionId, method, params, object, callback)
	{
	var service = serviceInterface.getServiceById(connectionId);

	if (service)
		service.callRpc(method, params, object, callback);
	}

}

if(true)
	module.exports = (typeof window === "undefined" ? new SpaceifyApplication() : SpaceifyApplication);


/***/ }),
/* 39 */
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

self.getRuntimeServiceStates = function(origin, handler)
	{
	setup("getRuntimeServiceStates", {}, origin, handler, true);
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyDOM, 8.11.2017 Spaceify Oy
 *
 * Some DOM helper functions.
 *
 * @class SpaceifyDOM
 */

function SpaceifyDOM()
{
var self = this;

self.show = function(elements, status)
	{
	var i, ids, elem;

	ids = elements.split(",");

	for (i = 0; i < ids.length; i++)
		{
		elem = document.getElementById(ids[i].trim());

		if (elem)
			{
			if (typeof elem.style.display !== "undefined" && elem.style.display != "")
				elem.style.display = (!status ? "none" : "block");

			if (typeof elem.style.visibility !== "undefined" && elem.style.visibility != "")
				elem.style.visibility = (!status ? "hidden" : "visible");
			}
		}
	}

self.isVisible = function(id)
	{
	var status = false;
	var elem = document.getElementById(id);

	if (!elem)
		return false;

	if (typeof elem.style.display !== "undefined")
		{ // initial value: inline, completely removed: none, inherit: ?
		status = (elem.style.display != "" && elem.style.display != "none" ? true : false);
		}
	else if (typeof elem.style.visibility !== "undefined")
		{ // initial value: visible, is invisible: hidden, inherit: ?, collapse: applies only to tables = hidden for other elements
		status = (elem.style.visibility != "" && elem.style.visibility != "hidden" ? true : false);
		}

	return status;
	}

self.empty = function(ids)
	{
	var i, ids = ids.split(","), element;

	for (i = 0; i < ids.length; i++)
		{
		element = document.getElementById(ids[i].trim());

		while (element.firstChild)
    		element.removeChild(element.firstChild);
		}
	}

self.remove = function(parentId, id)
	{
	var parent, element;

	if (!(parent = document.getElementById(parentId)))
		return;

	if (!(element = document.getElementById(id)))
		return;

	parent.removeChild(element);
	}

self.value = function(id, value)
	{
	var result = null, element = document.getElementById(id);

	if (element)
		{
		if (value)
			{
			element.value = value;
			}
		else
			{
			result = element.value;
			}
		}

	return result;
	}

self.focus = function(id)
	{
	var element = document.getElementById(id);

	if (element)
		element.focus();
	}

self.append = function(id, content)
	{
	var element = document.getElementById(id);

	if (element)
		{
		if (typeof content == "string")
			element.appendChild(document.createTextNode(content));
		else
			element.appendChild(content);
		}

	}

self.getPosition = function(el)
	{
	// Adapted from:
	//	Get an Element's Position Using JavaScript, by kirupa | 16 March 2016
	//	https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	var xScroll, yScroll;
	var element, position = { x: 0, y: 0, set: false };

	if (typeof el == "string")
		element = document.getElementById(el);
	else
		element = el;

	while (element)
		{
		if (element.tagName == "BODY")
			{
			// deal with browser quirks with body/window/document and page scroll
			xScroll = element.scrollLeft || document.documentElement.scrollLeft;
			yScroll = element.scrollTop || document.documentElement.scrollTop;

			position.x += (element.offsetLeft - xScroll + element.clientLeft);
			position.y += (element.offsetTop - yScroll + element.clientTop);

			position.set = true;
			}
		else
			{
			// for all other non-BODY elements
			position.x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			position.y += (element.offsetTop - element.scrollTop + element.clientTop);

			position.set = true;
			}

		element = element.offsetParent;
		}

	return position;
	}

}

if (true)
	module.exports = SpaceifyDOM;


/***/ }),
/* 42 */
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

var connection = new lib.Connection();
var network = new lib.SpaceifyNetwork();
var config = lib.SpaceifyConfig.getConfig();
//var logger = new lib.SpaceifyLogger("SpaceifyMessages");

var messageId;
var errors = [];
var warnings = [];
var callerOrigin = null;
var managerOrigin = null;

self.connect = function(managerOrigin_, callerOrigin_)
	{
	errors = [];
	warnings = [];
	callerOrigin = callerOrigin_;
	managerOrigin = managerOrigin_;

	var protocol, host, options = { hostname: network.getEdgeURL({ protocol: "" }), port: config.APPMAN_MESSAGE_PORT_SECURE, isSecure: true };

	if (connection.isConnected())
		return managerOrigin.connected();

	connection.exposeRpcMethod("stdout", self, stdout);
	connection.exposeRpcMethod("fail", self, fail);
	connection.exposeRpcMethod("error", self, error);
	connection.exposeRpcMethod("warning", self, warning);
	connection.exposeRpcMethod("notify", self, notify);
	connection.exposeRpcMethod("message", self, message);
	connection.exposeRpcMethod("question", self, question);
	connection.exposeRpcMethod("questionTimedOut", self, questionTimedOut);
	connection.exposeRpcMethod("end", self, end);

	network.doOperation({ type: "requestMessageId" }, function(err, gotId)						// Request a messageId
		{
		if (err)
			return fail(err);

		messageId = gotId;

		if (messageId !== null)
			{
			connection.connect(options, function(err, data)
				{
				if (err)
					return fail(err);

				connection.callRpc("confirm", [messageId]);

				managerOrigin.connected();
				});
			}
		else
			{
			managerOrigin.connected();
			}
		});
	}

self.isConnected = function()
	{
	return connection.isConnected();
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
	if (callerOrigin.fail)
		callerOrigin.fail(err);

	managerOrigin.fail(err);

	if (typeof callback === "function")
		callback(null, true);
	}

var error = function(err, connObj, callback)
	{
	errors.push(err);

	if (typeof callback === "function")
		callback(null, true);
	}

var warning = function(message_, code, connObj, callback)
	{
	warning.push({message: message_, code: code});

	if (callerOrigin.warning)
		callerOrigin.warning(message_, code);

	if (typeof callback === "function")
		callback(null, true);
	}

var notify = function(message_, code, connObj, callback)
	{
	if (callerOrigin.notify)
		callerOrigin.notify(message_, code, connObj, callback);

	if (typeof callback === "function")
		callback(null, true);
	}

var message = function(message_, connObj, callback)
	{
	if (callerOrigin.message)
		callerOrigin.message(message_);

	if (typeof callback === "function")
		callback(null, true);
	}

var stdout = function(message_, connObj, callback)
	{
	if (callerOrigin.stdout)
		callerOrigin.stdout(message_);

	if (typeof callback === "function")
		callback(null, true);
	}

var question = function(message_, choices, origin, answerCallBackId, connObj, callback)
	{
	if (callerOrigin.question)
		callerOrigin.question(message_, choices, origin, answerCallBackId);

	if (typeof callback === "function")
		callback(null, true);
	}

var questionTimedOut = function(message_, origin, answerCallBackId, connObj, callback)
	{
	if (callerOrigin.questionTimedOut)
		callerOrigin.questionTimedOut(message_, origin, answerCallBackId);

	if (typeof callback === "function")
		callback(null, true);
	}

var end = function(message_, connObj, callback)
	{
	managerOrigin.end(1);

	if (typeof callback === "function")
		callback(null, true);
	}

	// Response methods -- -- -- -- -- -- -- -- -- -- //
self.sendAnswer = function(answer, answerCallBackId)
	{
	connection.callRpc("answer", [messageId, answer, answerCallBackId]);
	}

}

if (true)
	module.exports = SpaceifyMessages;

/***/ }),
/* 43 */
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
var applications = { spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}, spacelet_count: 0, sandboxed_count: 0, sandboxed_debian_count: 0, native_debian_count: 0 };

var lib = (window.spe ? window.spe : window);

var spdom = new lib.SpaceifyDOM();
var core = new lib.SpaceifyCore();
var utility = new lib.SpaceifyUtility();
var network = new lib.SpaceifyNetwork();
var sam = new lib.SpaceifyApplicationManager();
var config = lib.SpaceifyConfig.getConfig();
//var logger = new lib.SpaceifyLogger("SpaceifyNet");

var WWW_PORT = 80;
var WWW_PORT_SECURE = 443;

var TILE = "tile";
var APPTILE = "apptile";

	// USER INTERFACE -- -- -- -- -- -- -- -- -- -- //
self.showLoading = function(show)
	{
	if (show)
		{
		if (showLoadingInstances == 0)
			spdom.show("loading", true);

		showLoadingInstances++;
		}
	else
		{
		showLoadingInstances = Math.max(0, --showLoadingInstances);

		if (showLoadingInstances == 0)
			spdom.show("loading", false);
		}
	}

var alertTimerIds = { error: null, success: null };
self.showError = function(id, msgstr) { alerts(id, msgstr, "error"); }
self.showSuccess = function(msgstr) { alerts(id, msgstr, "success"); }
var alerts = function(id, msgstr, type)
	{
	var txt, element = document.getElementById(id);

	if (element)
		{
		if (alertTimerIds[type])
			clearTimeout(alertTimerIds[type]);

		spdom.empty(id);

		txt = document.createTextNode(msgstr);
		element.appendChild(txt);

		element.style.visibility = "visible";

		alertTimerIds[type] = window.setTimeout(function() { element.style.visibility = "hidden"; alertTimerIds[type] = null; }, 5000);
		}
	}

var msgFormat = function(msg)
	{
	var rmsg = "", i;

	if (self.isArray(msg))
		{
		for (i = 0; i < msg.length; i++)
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

	// SPLASH -- -- -- -- -- -- -- -- -- -- //
self.setSplashAccepted = function()
	{
	try {
		core.setSplashAccepted(function(err, data)
			{
			if (data && data == true)
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
	var src = network.getEdgeURL({ withEndSlash: true }) + "spaceify.crt";

	document.getElementById("certIframe").setAttribute("sp_src", src);

	spaceifyLoader.loadData(document.getElementById("certIframe"), {}, null);

	return true;
	}

self.adminLogOut = function()
	{
	var sam = new SpaceifyApplicationManager();

	this.error = this.fail = this.warning = this.notify = this.message = function()
		{}

	this.ok = function()
		{
		self.loadLaunchPage();
		}

	sam.logOut(self, this.ok);
	}

	// PAGE BROWSER -- -- -- -- -- -- -- -- -- -- //
self.loadAppstorePage = function(mode)
	{
	var sp_page;
	var url = network.getEdgeURL({ /*protocol: "https", */withEndSlash: true });
	var port = (!network.isSecure() ? WWW_PORT : WWW_PORT_SECURE);

	spaceifyLoader.loadPage(config.INDEX_FILE/*sp_page*/, port/*sp_port*/, url + config.APPSTORE/*sp_host*/, url/*spe_host*/);
	}

self.loadLaunchPage = function()
	{
	var url = network.getEdgeURL({ /*protocol: "https", */withEndSlash: true });
	var port = (!network.isSecure() ? WWW_PORT : WWW_PORT_SECURE);

	spaceifyLoader.loadPage(config.INDEX_FILE/*sp_page*/, port/*sp_port*/, url/*sp_host*/, url/*spe_host*/);
	}

self.loadSecurePage = function()
	{
	var src = network.getEdgeURL({ protocol: "https", withEndSlash: true });
	window.location.replace(src);
	}

	// APPLICATIONS -- -- -- -- -- -- -- -- -- -- //
self.showInstalledApplications = function(callback)
	{
	spdom.empty("spacelet, sandboxed, sandboxed_debian, native_debian");

	var methods = [], j;

	core.getApplicationData(function(err, apps)
		{
		if (!apps)
			return (typeof callback == "function" ? callback() : false);

		for (j = 0; j < apps.spacelet.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.spacelet[j], null], type: "async"});

		for (j = 0; j < apps.sandboxed.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed[j], null], type: "async"});

		for (j = 0; j < apps.sandboxed_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed_debian[j], null], type: "async"});

		for (j = 0; j < apps.native_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.native_debian[j], null], type: "async"});

		new SpaceifySynchronous().waterFall(methods, function()
			{
			if (typeof callback == "function")
				callback();
			});
		});

	}

self.renderTile = function(manifest, callback)
	{
	var element, query;
	var sp_port, host, sp_host, spe_host, sp_path, icon, apptile_id, icon_id, tile, element;

	if (manifest.hasTile)																			// Application supplies its own tile when its running
		{
		core.getApplicationURL(manifest.unique_name, function(err, appURL)
			{
			sp_port = (!network.isSecure() ? appURL.port : appURL.securePort);

			spe_host = network.getEdgeURL({ withEndSlash: true });

			if (appURL.implementsWebServer && sp_port)
				{
				host = spe_host;
				sp_host = spe_host;
				}
			else
				{
				host = spe_host;
				sp_host = network.externalResourceURL(manifest.unique_name, { withEndSlash: true });
				}

			sp_path = config.TILEFILE;

			apptile_id = makeAppTileId(manifest.unique_name);

			element = document.createElement("iframe");
			element.id = apptile_id;
			element.frameborder = "0";
			element.className = "edgeTile";
			spdom.append(manifest.type, element);

			query = {};
			query.sp_port = sp_port;
			query.sp_host = encodeURIComponent(sp_host);
			query.sp_path = encodeURIComponent(sp_path);
			query.spe_host = encodeURIComponent(spe_host);

			element = document.getElementById(apptile_id);
			element.src = host + "remote.html" + network.remakeQueryString(query, [], {}, "", true);

			callback();
			});
		}
	else																							// Spaceify renders default tile
		{
		if ((icon = utility.getApplicationIcon(manifest, false)))
			{
			sp_host = network.externalResourceURL(manifest.unique_name, { protocol: "", withEndSlash: true });
			sp_path = icon;
			}
		else
			{
			sp_host = network.getEdgeURL({ withEndSlash: true });
			sp_path = "images/default_icon-128p.png";
			}

		apptile_id = makeAppTileId(manifest.unique_name);
		icon_id = "icon_" + apptile_id;

		tile = window.spetiles[TILE];
		tile = tile.replace("::icon_id", icon_id);
		tile = tile.replace("::sp_src", sp_host + sp_path);
		tile = tile.replace("::manifest.name", manifest.name);
		tile = tile.replace("::manifest.developer.name", manifest.developer.name);

		element = document.createElement("div");
		element.id = apptile_id;
		element.className = "edgeTile";
		element.innerHTML = tile;
		spdom.append(manifest.type, element);
		spaceifyLoader.loadData(document.getElementById(icon_id), {}, callback);
		}

	addApplication(manifest);
	}

self.removeTile = function(type, manifest)
	{
	removeApplication(manifest);

	spdom.show(type + ", " + type + "_header", (applications[type + "_count"] > 0 ? true : false));

	spdom.remove(type, makeAppTileId(manifest.unique_name));
	}

var addApplication = function(manifest)
	{
	if (manifest.type == config.SPACELET)
		{ applications.spacelet[manifest.unique_name] = manifest; applications.spacelet_count++; }
	else if (manifest.type == config.SANDBOXED)
		{ applications.sandboxed[manifest.unique_name] = manifest; applications.sandboxed_count++; }
	else if (manifest.type == config.SANDBOXED_DEBIAN)
		{ applications.sandboxed_debian[manifest.unique_name] = manifest; applications.sandboxed_debian_count++; }
	else if (manifest.type == config.NATIVE_DEBIAN)
		{ applications.native_debian[manifest.unique_name] = manifest; applications.native_debian_count++; }
	}

var removeApplication = function(manifest)
	{
	if (manifest.type == config.SPACELET)
		{ delete applications.spacelet[manifest.unique_name]; applications.spacelet_count--; }
	else if (manifest.type == config.SANDBOXED)
		{ delete applications.sandboxed[manifest.unique_name]; applications.sandboxed_count--; }
	else if (manifest.type == config.SANDBOXED_DEBIAN)
		{ delete applications.sandboxed_debian[manifest.unique_name]; applications.sandboxed_debian_count--; }
	else if (manifest.type == config.NATIVE_DEBIAN)
		{ delete applications.native_debian[manifest.unique_name]; applications.native_debian_count--; }
	}

self.getApplications = function()
	{
	return applications;
	}

var makeAppTileId = function(unique_name)
	{
	 return APPTILE + "_" + unique_name.replace(/\//, "_");
	}

	// POPUPS -- -- -- -- -- -- -- -- -- -- //
self.showPopup = function(id, status)
	{
	var n, nodes, popup, isVisible;

	if (!(popup = document.getElementById(id)))
		return false;

	isVisible = spdom.isVisible(id);

	if (isVisible)																					// If already open, close all child elements
		{
		nodes = popup.childNodes;

		for (n = 0; n < nodes.length; n++)
			{
			if (typeof nodes[n].id != "undefined")
				spdom.show(nodes[n].id, false);
			}
		}

	spdom.show(id, status);

	return true;
	}

self.showMenu = function()
	{
	var btn_menu, popup_menu, position;

	btn_menu = document.getElementById("btn_menu");
	position = spdom.getPosition(btn_menu);

	var isOpen = self.showPopup("popups", true);

	if (isOpen)
		{
		popup_menu = document.getElementById("popup_menu");

		popup_menu.style.top = (position.y /*+ btn_menu.offsetHeight*/) + "px";
		popup_menu.style.left = (position.x + btn_menu.offsetWidth - 200) + "px";

		spdom.show("popup_menu", true);
		}
	}

}

if (true)
	module.exports = SpaceifyNet;


/***/ }),
/* 44 */
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
/* 45 */
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
//var logger = new lib.SpaceifyLogger("Spacelet");
var serviceInterface = new lib.ServiceInterface();
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
					serviceInterface.connect(serviceobj.serviceNames[i], (i + 1 != serviceobj.serviceNames.length ? null : function(err, data)
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

self.getRequiredService = function(service_name, isSecure)
	{
	return serviceInterface.getRequiredService(service_name, isSecure);
	}

self.isSpaceifyNetwork = function(timeout, callback)
	{
	spaceifyNetwork.isSpaceifyNetwork(timeout, callback);
	}

}

if(true)
	module.exports = Spacelet;


/***/ }),
/* 46 */
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
var SpaceifyLogger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = __webpack_require__(13)(lib + "rpccommunicator");
	WebSocketConnection = __webpack_require__(15)(lib + "websocketconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	//SpaceifyConfig = lib.SpaceifyConfig;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var speconfig = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebRtcClient");

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
/* 47 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SpeConfig =
{
logger:
	{
	// Overrides everything (including the individual class configurations)

	loggerConfigOverride:
		{
		all: true
		},

	// Class configurations (overrides defaultLoggerConfig)

		// x

	// Default logger config

	defaultLoggerConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true,
		all: null,
		mydefault1: 1,
		mydefault2: 2
		}
	},

// a test value for the unit tests

testValue: "TestValueFromSplConfig"
};

Object.freeze(SpeConfig);

if (true)
	module.exports = SpeConfig;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function()
{
var self = this;

self.make = function()
	{
	var SpaceifyConfig = __webpack_require__(3);
	var config = SpaceifyConfig.getConfig();

	return "(function spaceifyConfig(){window.speconfig=" + config.toMinifiedJSONString() + ";})();\n";
	}
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var fs = __webpack_require__(0);
var module_ = __webpack_require__(49);

var config = (new module_()).make();

fs.writeFileSync(__dirname + "/../../libs/spaceify.config.js", config, "utf8");

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./config.js": 4,
	"./spaceifyconfig.js": 3,
	"./spebaseconfig.js": 8,
	"./speconfig.js": 48,
	"./webpack/make.config.js": 50
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
webpackContext.id = 51;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifylanguage": 20
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
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./logger": 5,
	"./spaceifylogger": 7
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
webpackContext.id = 53;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./service": 16
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
webpackContext.id = 54;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./serviceinterface": 17
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
webpackContext.id = 55;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./serviceselector": 18
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
webpackContext.id = 56;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifynetwork": 21
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
webpackContext.id = 57;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 58;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./webjsonrpc/websocketrpcserver": 28
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
webpackContext.id = 59;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./callbackbuffer": 24
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
webpackContext.id = 60;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 61;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 62;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketrpcconnection": 10
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
webpackContext.id = 63;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketserver": 29
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
webpackContext.id = 64;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_65__;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_67__;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_68__;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_69__;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_70__;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_71__;

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_72__;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_73__;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
{
Config: __webpack_require__(4),
SpeBaseConfig: __webpack_require__(8),
Logger: __webpack_require__(5),
SpaceifyError: __webpack_require__(6),
SpaceifyLogger: __webpack_require__(7),

SpaceifyDOM: __webpack_require__(41),
SpaceifyLanguage: __webpack_require__(20),
Service: __webpack_require__(16),
SpaceifyApplication: __webpack_require__(38),
SpaceifyApplicationManager: __webpack_require__(39),
SpaceifyCache: __webpack_require__(40),
SpaceifyConfig: __webpack_require__(3),
SpaceifyCore: __webpack_require__(19),
SpaceifyMessages: __webpack_require__(42),
SpaceifyNet: __webpack_require__(43),
SpaceifyNetwork: __webpack_require__(21),
ServiceInterface: __webpack_require__(17),
ServiceSelector: __webpack_require__(18),
SpaceifySynchronous: __webpack_require__(44),
SpaceifyUnique: __webpack_require__(22),
SpaceifyUtility: __webpack_require__(23),
Spacelet: __webpack_require__(45),
//BinaryRpcCommunicator: require("./webjsonrpc/binaryrpccommunicator.js"),
CallbackBuffer: __webpack_require__(24),
RpcCommunicator: __webpack_require__(26),
WebRtcClient: __webpack_require__(46),
WebRtcConnection: __webpack_require__(27),
WebSocketConnection: __webpack_require__(9),
WebSocketRpcConnection: __webpack_require__(10),
WebSocketRpcServer: __webpack_require__(28),
WebSocketServer: __webpack_require__(29),
Connection: __webpack_require__(25)
};


/***/ })
/******/ ]);
});
(function spaceifyConfig(){window.speconfig={"SPACEIFY_PATH":"/var/lib/spaceify/","SPACEIFY_CODE_PATH":"/var/lib/spaceify/code/","SPACEIFY_DATA_PATH":"/var/lib/spaceify/data/","SPACEIFY_WWW_PATH":"/var/lib/spaceify/code/www/","SPACEIFY_NODE_MODULES_PATH":"/var/lib/spaceify/code/node_modules/","SPACEIFY_WWW_ERRORS_PATH":"/var/lib/spaceify/code/www/errors/","SPACEIFY_TLS_PATH":"/var/lib/spaceify/data/tls/","SPACEIFY_DATABASE_FILE":"/var/lib/spaceify/data/db/spaceify.db","SPACEIFY_TEMP_SESSIONID":"/var/lib/spaceify/data/db/session.id","SPACEIFY_REGISTRATION_FILE":"/var/lib/spaceify/data/db/edge.id","SPACEIFY_REGISTRATION_FILE_TMP":"/tmp/edge.id","SPACEIFY_MANIFEST_RULES_FILE":"/var/lib/spaceify/data/manifest/manifest.rules","SPACELETS_PATH":"/var/lib/spaceify/data/spacelets/","SANDBOXED_PATH":"/var/lib/spaceify/data/sandboxed/","SANDBOXED_DEBIAN_PATH":"/var/lib/spaceify/data/sandboxed_debian/","NATIVE_DEBIAN_PATH":"/var/lib/spaceify/data/native_debian/","INSTALLED_PATH":"/var/lib/spaceify/data/installed/","DOCS_PATH":"/var/lib/spaceify/data/docs/","VERSION_FILE":"/var/lib/spaceify/versions","WWW_DIRECTORY":"www/","API_PATH":"/api/","API_WWW_PATH":"/var/lib/spaceify/code/www/","API_NODE_MODULES_DIRECTORY":"/var/lib/spaceify/code/node_modules/","APPLICATION_ROOT":"application","APPLICATION_PATH":"/application/","APPLICATION_DIRECTORY":"application/","VOLUME_PATH":"/volume/","VOLUME_DIRECTORY":"volume/","VOLUME_APPLICATION_PATH":"/volume/application/","VOLUME_APPLICATION_WWW_PATH":"/volume/application/www/","VOLUME_TLS_PATH":"/volume/tls/","SYSTEMD_PATH":"/lib/systemd/system/","START_SH_FILE":"application/start.sh","WORK_PATH":"/tmp/package/","PACKAGE_PATH":"package/","SOURCES_DIRECTORY":"sources/","LOCALES_PATH":"/var/lib/spaceify/code/www/locales/","DEFAULT_LOCALE":"en_US","SPACEIFY_INJECT":"/var/lib/spaceify/code/www/lib/inject/spaceify.csv","LEASES_PATH":"/var/lib/spaceify/data/dhcp-data","IPTABLES_PATH":"/var/lib/spaceify/data/ipt-data","IPTABLES_PIPER":"/var/lib/spaceify/data/dev/iptpiper","IPTABLES_PIPEW":"/var/lib/spaceify/data/dev/iptpipew","TLS_DIRECTORY":"tls/","TLS_SCRIPTS_PATH":"/var/lib/spaceify/data/scripts/","UBUNTU_DISTRO_NAME":"ubuntu","RASPBIAN_DISTRO_NAME":"raspbian","UBUNTU_DOCKER_IMAGE":"spaceifyubuntu","RASPBIAN_DOCKER_IMAGE":"spaceifyraspbian","CUSTOM_DOCKER_IMAGE":"custom_","EDGE_IP":"10.0.0.1","EDGE_HOSTNAME":"edge.spaceify.net","EDGE_DOMAIN":"spaceify.net","EDGE_SHORT_HOSTNAME":"e.n","EDGE_SUBNET":"10.0.0.0/16","ALL_IPV4_LOCAL":"0.0.0.0","CONNECTION_HOSTNAME":"localhost","APPLICATION_SUBNET":"172.17.0.0/16","EDGE_PORT_HTTP":"80","EDGE_PORT_HTTPS":"443","APLICATION_PORT_HTTP":"80","APLICATION_PORT_HTTPS":"443","CORE_PORT":"2947","CORE_PORT_SECURE":"4947","APPMAN_PORT":"2948","APPMAN_PORT_SECURE":"4948","APPMAN_MESSAGE_PORT":"2950","APPMAN_MESSAGE_PORT_SECURE":"4950","REGISTRY_HOSTNAME":"spaceify.org","REGISTRY_URL":"https://spaceify.org","REGISTRY_PUBLISH_URL":"https://spaceify.org/ajax/upload.php?type=package&fileid=package","REGISTRY_INSTALL_URL":"https://spaceify.org/install.php","EDGE_APPSTORE_GET_PACKAGES_URL":"https://spaceify.org/appstore/getpackages.php","EDGE_REGISTER_URL":"https://spaceify.net/edge/register.php","EDGE_LOGIN_URL":"https://spaceify.net/edge/login.php","EDGE_GET_RESOURCE_URL":"https://spaceify.org/appstore/getresource.php?resource=","GITHUB_HOSTNAME":"github.com","MAC_REGX":"^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$","IP_REGX":"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$","JAVASCRIPT":"javascript","CSS":"css","FILE":"file","UTF8":"utf","ASCII":"ascii","BASE64":"base64","ANY":"any","ALL":"all","SPACELET":"spacelet","SANDBOXED":"sandboxed","SANDBOXED_DEBIAN":"sandboxed_debian","NATIVE_DEBIAN":"native_debian","OPEN":"open","OPEN_LOCAL":"open_local","STANDARD":"standard","ALIEN":"alien","HTTP":"http","EXT_COMPRESSED":".zip","PACKAGE_DELIMITER":"@","PX":"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","MANIFEST":"spaceify.manifest","README_MD":"readme.md","PACKAGE_ZIP":"package.zip","PUBLISH_ZIP":"publish.zip","SPM_ERRORS_JSON":"spm_errors.json","SPM_HELP":"spm.help","DOCKERFILE":"Dockerfile","MANIFEST_RULES":"manifest.rules","VERSIONS":"versions","APPSTORE":"appstore/","INDEX_FILE":"index.html","LOGIN_FILE":"login.html","SECURITY_FILE":"security.html","OPERATION_FILE":"operation.xop","LOCATION_FILE":"location.conf","SERVER_NAME":"Spaceify Web Server","TILEFILE":"tile.html","WEB_SERVER":"WEB_SERVER","APPLICATION_INITIALIZED":"*** application initialized","APPLICATION_UNINITIALIZED":"*** application uninitialized","IMAGE_DIRECTORY":"www/images/","FIRST_SERVICE_PORT":"2777","FIRST_SERVICE_PORT_SECURE":"3777","SERVER_CRT":"server.crt","SERVER_KEY":"server.key","SPACEIFY_CRT":"spaceify.crt","SPACEIFY_CRT_WWW":"www/spaceify.crt","RECONNECT_WAIT":"10000","SESSION_COOKIE_PUBSUB_PATH":"/var/lib/spaceify/data/db/session_cookies.pub","SPACEIFY_REPOSITORY":"deb [ arch=all,amd64,i386 ] http://spaceify.net/repo stable/spaceify main","SPACEIFY_APPLICATION_REPOSITORY_LIST":"/etc/apt/sources.list.d/spaceifyapplication.list","EVENT_SPACELET_INSTALLED":"spaceletInstalled","EVENT_SPACELET_REMOVED":"spaceletRemoved","EVENT_SPACELET_STARTED":"spaceletStarted","EVENT_SPACELET_STOPPED":"spaceletStopped","EVENT_SANDBOXED_INSTALLED":"sandboxedInstalled","EVENT_SANDBOXED_REMOVED":"sandboxedRemoved","EVENT_SANDBOXED_STARTED":"sandboxedStarted","EVENT_SANDBOXED_STOPPED":"sandboxedStopped","EVENT_SANDBOXED_DEBIAN_INSTALLED":"sandboxedDebianInstalled","EVENT_SANDBOXED_DEBIAN_REMOVED":"sandboxedDebianRemoved","EVENT_SANDBOXED_DEBIAN_STARTED":"sandboxedDebianStarted","EVENT_SANDBOXED_DEBIAN_STOPPED":"sandboxedDebianStopped","EVENT_NATIVE_DEBIAN_INSTALLED":"nativeDebianInstalled","EVENT_NATIVE_DEBIAN_REMOVED":"nativeDebianRemoved","EVENT_NATIVE_DEBIAN_STARTED":"nativeDebianStarted","EVENT_NATIVE_DEBIAN_STOPPED":"nativeDebianStopped","EVENT_EDGE_SETTINGS_CHANGED":"EdgeSettingsChanged","EVENT_CORE_SETTINGS_CHANGED":"CoreSettingsChanged","SESSION_TOKEN_NAME":"x-edge-session","SESSION_TOKEN_NAME_COOKIE":"xedgesession","WWW_CACHE_MAX_ITEMS":"40","WWW_CACHE_EXPIRE_TIME":"20"};})();
(function spaceifyLocales(){window.spelocales={"en_US":{"404":{"title":"Spaceify - 404","body":"Web server returned response code 404 - Not Found."},"500":{"title":"Spaceify - 500","body":"Web server returned response code 500 - Internal Server Error."},"global":{"locale":"en_US","encoding":"UTF-8","description":"American English","edge":"Spaceify Edge","loading":"Loading...","copyright":"Copyright © 2014 - 2018 Spaceify Oy","btn_login":"Log In","btn_install":"Install","btn_reload":"Reload","btn_cancel":"Cancel","certificate_error":"It seems that your browser does not have the Spaceify edge node certificate installed. The certificate is required for loading web pages over secure connection. Install the certificate by pushing the 'Install' button. A pop-up window should appear requesting to accept 'Spaceify CA' as a trusted Certificate Authority (CA). Depending of your browser, there might be options for selecting the trust level. Select to trust the CA for identifying web pages. After you have installed the certificate, push the 'Reload' button to switch using encrypted connection.","certificate_error_cancel":"Pushing the 'Cancel' button hides this message.","delete_certificate":"Installed certificate can be deleted only from browsers settings. Open the security settings and select 'Manage' or 'View' certificates. From there find 'Authorities' or 'Trusted Authorities' and search for Spaceify Inc. / Spaceify CA. Select the certificate and delete it.","security_warning":"Unsecure connection detected! Without encryption anyone can see and exploit your password, session, and all other data. Push the 'Reload' button to switch using encrypted connection.","open_appstore":"AppStore","back_to_launchpage":"Back to Launchpage","launchpage":"Launchpage","show_menu":"Show menu"},"index":{"title":"Welcome to Spaceify","version":"v","splash_welcome":"Welcome to Spaceify powered wireless network.","splash_info":"1. Insert Terms of use, privacy policy or anything here for your splash page. See index.html for details of how this page is generated and how to customize it for your purposes. 2. Add 'Accept' button for your site. Users can continue only if they agree with the rules of your edge node. 3. Add 'Install' button. Allow user to load and install the Spaceify CA root certificate to their list of trusted certificates. Encrypted pages can be loaded only if the certificate is installed.","splash_accept_action":"Accept","splash_certificate_action":"Install","spacelets":"Spacelets","sandboxed":"Applications","sandboxed debian":"Native Sandboxed","native_debian":"Native","user_utilities":"Utilities","admin_utilities":"Administration","admin_tile_title":"Spaceify Store","install_certificate_title":"Install Spaceify's certificate","logout":"Log Out","greeting":"Install applications and spacelets to get started"},"login":{"title":"Spaceify - Log In","password":"Password"},"security":{"title":"Spaceify - Security"},"appstore/index":{"title":"Spaceify - AppStore"}}};})();
(function spaceifyTiles(){window.spetiles={"tile":"<img id=\"::icon_id\" sp_src=\"::sp_src\" width=\"64\" height=\"64\"><div class=\"edgeText\">::manifest.name</div><div class=\"edgeText edgeSubText\">::manifest.developer.name</div>"};})();

(function spaceifyClasses(){
window.Logger = spe.Logger;
window.SpaceifyLanguage = spe.SpaceifyLanguage;
window.SpaceifyDOM = spe.SpaceifyDOM;
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
window.ServiceInterface = spe.ServiceInterface;
window.ServiceSelector = spe.ServiceSelector;
window.SpaceifySynchronous = spe.SpaceifySynchronous;
window.SpaceifyUnique = spe.SpaceifyUnique;
window.SpaceifyUtility = spe.SpaceifyUtility;
window.Spacelet = spe.Spacelet;
//window.BinaryRpcCommunicator = spe.BinaryRpcCommunicator;
window.CallbackBuffer = spe.CallbackBuffer;
window.RpcCommunicator = spe.RpcCommunicator;
window.WebRtcClient = spe.WebRtcClient;
window.WebRtcConnection = spe.WebRtcConnection;
window.WebSocketConnection = spe.WebSocketConnection;
window.WebSocketRpcConnection = spe.WebSocketRpcConnection;
window.WebSocketRpcServer = spe.WebSocketRpcServer;
window.WebSocketServer = spe.WebSocketServer})();
