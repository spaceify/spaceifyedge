"use strict";

/**
 * Web Server, 29.11.2013 Spaceify Oy
 *
 * @class WebServer
 */

var fs = require("fs");
var url = require("url");
var zlib = require('zlib');
var http = require("http");
var https = require("https");
var qs = require("querystring");
var fibrous = require("./fibrous");
var language = require("./language");
var contentTypes = require("./contenttypes");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyLogger = require("./spaceifylogger");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");
var SpaceifyNetwork = require("./spaceifynetwork");

function WebServer()
{
var self = this;

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebServer");

var options = {};
var isOpen = false;
var webServer = null;

var requestListener = null;
var serverUpListener = null;
var serverDownListener = null;

var isSpaceify = (typeof process.env.IS_REAL_SPACEIFY == "undefined" ? true : false);

var requests = [];
var processingRequest = false;
var events = require("events");
var eventEmitter = new events.EventEmitter();

var customHeaders = [];
var accessControlAllowHeaders = [];

var cache = {};
var cacheSize = 0;

self.listen = function(opts, callback)
	{
	var key;
	var crt;
	var body;
	var caCrt;
	var files;
	var urlObj;
	var timestamp;

	options.hostname = opts.hostname || config.ALL_IPV4_LOCAL;
	options.port = opts.port || 0;
	options.mappedPort = opts.mappedPort || 0;

	options.isSecure = opts.isSecure || false;
	options.key = opts.key || config.SPACEIFY_TLS_PATH + config.SERVER_KEY;
	options.crt = opts.crt || config.SPACEIFY_TLS_PATH + config.SERVER_CRT;
	options.caCrt = opts.caCrt || config.SPACEIFY_WWW_PATH + config.SPACEIFY_CRT;

	options.indexFile = opts.indexFile || config.INDEX_FILE;

	options.wwwPath = opts.wwwPath || config.SPACEIFY_WWW_PATH;
	options.wwwErrorsPath = opts.wwwErrorsPath || config.SPACEIFY_WWW_ERRORS_PATH;

	options.locale = opts.locale || config.DEFAULT_LOCALE;

	options.serverName = opts.serverName || config.SERVER_NAME;

	options.protocol = (!options.isSecure ? "http" : "https");

	options.isEdge = ("isEdge" in opts ? opts.isEdge : false);

	options.cookieDomain = opts.cookieDomain || false;
	options.cookiePath = opts.cookiePath || false;
	options.cookieSecure = opts.cookieSecure || false;

	options.sendLocale = opts.sendLocale || false;

	options.cacheMaxItems = opts.cacheMaxItems || config.WWW_CACHE_MAX_ITEMS;
	options.cacheExpireTime = opts.cacheExpireTime || config.WWW_CACHE_EXPIRE_TIME;

	// -- --
	logger.log(utility.replace(language.WEBSERVER_CONNECTING, {"~protocol": options.protocol, "~hostname": options.hostname, "~port": options.port}));

	// -- --
	//eventEmitter.on("processRequest", processRequest);									// Request events, process one request at a time

	// -- --
	if (!options.isSecure)																	// Start a http server
		{
		webServer = http.createServer();
		}
	else																					// Start a https server
		{
		key = fs.sync.readFile(options.key);
		crt = fs.sync.readFile(options.crt);
		caCrt = fs.sync.readFile(options.caCrt);

		webServer = https.createServer({ key: key, cert: crt, ca: caCrt });
		}

	webServer.listen(options.port, options.hostname, 511, function()
		{
		options.port = webServer.address().port;

		if (!options.mappedPort)
			options.mappedPort = options.port;

		isOpen = true;

		if (serverUpListener)
			serverUpListener({isSecure: options.isSecure});

		callback(null, true);
		});

	webServer.on("request", function(request, response)
			{
			var timestamp = Date.now();

			body = "";

			request.on("data", function(chunk)
				{
				body += chunk;
				});

			request.on("end", function()
				{
				urlObj = url.parse(request.url, true);

				requests.push(	{
								body: body,
								urlObj: urlObj,
								request: request,
								GET: urlObj.query,
								response: response,
								responseHeaders: [],
								requestHeaders: request.headers,
								wwwPath: options.wwwPath,
								isSecure: options.isSecure,
								cookies: parseCookies(request),
								method: request.method,
								protocol: (urlObj.protocol ? urlObj.protocol : "http:"),
								POST: (request.method == "POST" ? parsePost(request, body) : {}),
								// Default content
								content: null,
								contentType: null,
								responseCode: 200,
								location: "",
								isRendered: false,
								timestamp: timestamp
								});

				//eventEmitter.emit("processRequest");
				processRequest();
				});
			});

	webServer.on("error", function(err)
		{
		isOpen = false;

		if (serverDownListener)
			serverDownListener({isSecure: options.isSecure});

		callback(language.E_LISTEN_FATAL_ERROR.preFmt("WebServer()::connect", {"~hostname": options.hostname, "~port": options.port, "~err": err.toString()}), null);
		});

	webServer.on("close", function()
		{
		if (serverDownListener)
			serverDownListener({isSecure: options.isSecure});
		});
	};

self.close = function()
	{
	isOpen = false;

	if (webServer != null)
		{
		logger.log(utility.replace(language.WEBSERVER_CLOSING, {"~protocol": options.protocol, "~hostname": options.hostname, "~port": options.port}));

		webServer.close();
		webServer = null;
		}
	}

self.getPort = function()
	{
	return options.port;
	}

self.getMappedPort = function()
	{
	return options.mappedPort;
	}

self.getIsOpen = function()
	{
	return isOpen;
	}

self.addHeader = function(name, value)
	{
	customHeaders.push([name, value]);
	}

self.addAccessControlAllowHeaders = function(value)
	{
	accessControlAllowHeaders.push(value);
	}

self.setServerUpListener = function(listener)
	{
	serverUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	serverDownListener = (typeof listener == "function" ? listener : null);
	}

self.setRequestListener = function(listener)
	{
	requestListener = (typeof listener == "function" ? listener : null);
	}

	// -- -- -- -- -- -- -- -- -- -- //

var processRequest = function()																// Process request in order
	{
	if (!processingRequest && requests.length > 0)
		{
		processingRequest = true;

		var _request_ = requests.shift();

		fibrous.run( function()
			{
			loadContent.sync(_request_);

			processingRequest = false;

			processRequest();

			}, function(err, data) { } );
		}
	}

var loadContent = fibrous( function(_request_)
	{
	var pathname;
	var reqLisObj;
	var requestUrl;
	var wwwPathType;
	var location = "";
	var status = false;

	try {
		if (_request_.method == "OPTIONS")
			{
			writeOptions(_request_);
			}
		else
			{
			pathname = _request_.urlObj.pathname.replace(/^\/*|\/*$/g, "");					// remove forward slash from the beginning and end

			if (requestListener)
				{
				reqLisObj = requestListener.sync(_request_, pathname);

				if (reqLisObj.type == "load")
					{
					_request_.wwwPath = reqLisObj.wwwPath || _request_.wwwPath;
					pathname = reqLisObj.pathname.replace(/^\/*|\/*$/g, "");
					//_request_.request.url = reqLisObj.pathname;
					//_request_.urlObj.pathname = reqLisObj.pathname;
					}
				else if (reqLisObj.type == "write")
					{
					_request_.content = reqLisObj.content;
					_request_.contentType = reqLisObj.contentType;
					_request_.responseCode = reqLisObj.responseCode;
					_request_.location = reqLisObj.location;

					status = write(_request_, true);
					}
				}

			/*
			if (status === false)															// Redirect back to directory if / is not at the end of the directory
				{
				wwwPathType = utility.sync.getPathType( checkURL(_request_.wwwPath, pathname) );

				if (wwwPathType == "directory" && requestUrl.charAt(requestUrl.length - 1) != "/")
					{
					requestUrl = _request_.request.url;

					if (_request_.urlObj.search)
						requestUrl = requestUrl.replace(_request_.urlObj.search, "");
					if (_request_.urlObj.hash)
						requestUrl = requestUrl.replace(_request_.urlObj.hash, "");

					_request_.location = self.makeLocation(_request_, pathname);

					_request_.responseCode = 302;

					_request_.content = utility.replace(language.E_MOVED_FOUND.message, {"~location": _request_.location , "~serverName": options.serverName,
																						 "~hostname": options.hostname, "~port": options.port});

					status = write(_request_, true);
					}
				}
			*/

			if (status === false)															// www
				status = load(pathname, _request_);

			if (status === false)															// www + index file
				status = load(pathname + "/" + options.indexFile, _request_);

			if (status === false)															// Not Found
				{
				_request_.content = checkCache(config.ERROR_PATHS["404"].file);
				_request_.content = _request_.content.toString().replace("%1", self.makeLocation(_request_, pathname));
				_request_.contentType = config.ERROR_PATHS["404"].content_type;
				_request_.responseCode = 404;

				status = write(_request_, true);
				}

			if (typeof status !== "boolean" || status === false)
				throw status;
			}
		}
	catch(err)																				// Internal Server Error
		{
//console.log(err);
		_request_.content = checkCache(config.ERROR_PATHS["500"].file);//(err ? config.ERROR_PATHS["error"].message : data);
		_request_.contentType = config.ERROR_PATHS["500"].content_type;
		_request_.responseCode = 500;

		write(_request_, true);
		}
	finally
		{
		//eventEmitter.emit("processRequest");
		processRequest();
		}
	});

var load = function(pathname, _request_)
	{
	var html;
	var locale;
	var contentType;
	var pageType = "";
	var status = false;

	try {
		_request_.wwwPath = checkURL(_request_.wwwPath, pathname);							// Check URL validity

		_request_.content = checkCache(_request_.wwwPath);									// The content is binary

		contentType = pathname.lastIndexOf(".");											// Get content type of the file
		_request_.contentType = pathname.substr(contentType + 1, pathname.length - contentType - 1);

		if (options.sendLocale)
			{
			if (_request_.GET && _request_.GET.locale)
				locale = _request_.GET.locale;
			else if (_request_.POST.locale)
				locale = _request_.POST.locale;
			else if (_request_.cookies.locale)
				locale = _request_.cookies.locale.value;
			else if (options.locale)
				locale = options.locale;
			else
				locale = config.DEFAULT_LOCALE;

			_request_.cookies.locale = { value: locale, cookie: "locale=" + locale };
			}

		status = write(_request_, true);
		}
	catch(err)
		{
		}

	return status;
	}

var write = function(_request_)
	{
	var now = new Date(), cookie, encodings;

	if (_request_.requestHeaders["accept-encoding"] != "undefined")
		{
		encodings = _request_.requestHeaders["accept-encoding"].split(",");

		if (encodings.indexOf("gzip") != -1)
			{
			_request_.content = zlib.sync.gzip(_request_.content);
			_request_.responseHeaders.push(["Content-Encoding", "gzip"]);
			}
		}

	_request_.responseHeaders.push(["Content-Type", (contentTypes[_request_.contentType] ? contentTypes[_request_.contentType] : "text/plain"/*application/octet-stream*/) + "; charset=utf-8"]);
	_request_.responseHeaders.push(["Accept-Ranges", "bytes"]);
	_request_.responseHeaders.push(["Content-Length", _request_.content.length]);
	_request_.responseHeaders.push(["Server", options.serverName]);
	_request_.responseHeaders.push(["Date", now.toUTCString()]);
	_request_.responseHeaders.push(["Access-Control-Allow-Origin", getOrigin(_request_)]);
	_request_.responseHeaders.push(["Access-Control-Allow-Credentials", "true"]);
	_request_.responseHeaders.push(...customHeaders);

	if (_request_.responseCode == 301 || _request_.responseCode == 302)
		_request_.responseHeaders.push(["Location", _request_.location]);

	for (var i in _request_.cookies)
		{
		cookie = _request_.cookies[i].cookie;

		if(options.cookieDomain)
			 cookie += "; Domain=" + options.cookieDomain;

		if(options.cookiePath)
			 cookie += "; Path=" + options.cookiePath;

		if(options.cookieSecure && options.isSecure)
			 cookie += "; Secure";

		_request_.responseHeaders.push(["Set-Cookie", cookie]);
		}

	_request_.response.writeHead(_request_.responseCode || 200, _request_.responseHeaders);
	_request_.response.end(_request_.method == "HEAD" ? "" : _request_.content);

	return true;
	}

var writeOptions = function(_request_)
	{ // CORS preflight
	var value;
	var header;
	var allowed = false;
	var now = new Date();
	var allowedHeaders = [];

	_request_.responseHeaders.push(["Server", options.serverName]);
	_request_.responseHeaders.push(["Date", now.toUTCString()]);
	_request_.responseHeaders.push(["Access-Control-Allow-Origin", getOrigin(_request_)]);
	_request_.responseHeaders.push(["Access-Control-Allow-Credentials", "true"]);
	_request_.responseHeaders.push(...customHeaders);

	if ("access-control-request-headers" in _request_.requestHeaders)
		{
		header = _request_.requestHeaders["access-control-request-headers"].split(",");
		for (var i = 0; i < header.length; i++)
			{
			value = header[i].trim().toLowerCase();

			if (accessControlAllowHeaders.indexOf(value) != -1)
				allowedHeaders.push(value);
			}

		if (allowedHeaders.length > 0)
			{
			allowed = true;
			_request_.responseHeaders.push(["Access-Control-Allow-Headers", allowedHeaders.join(",")]);
			}
		}

	_request_.response.writeHead(allowed ? 200 : 403, _request_.responseHeaders);
	_request_.response.end("");

	return true;
	}

var getOrigin = function(_request_)
	{
	var port, origin;

	if (options.isEdge)
		{
		port = (options.mappedPort != 80 && options.mappedPort != 443 ? ":" + options.mappedPort : "");
		origin = (_request_.requestHeaders.origin ? _request_.requestHeaders.origin + port : "*");
		}
	else
		{
		origin = (_request_.requestHeaders.origin ? _request_.requestHeaders.origin : "*");
		}

	return origin;
	}

var checkURL = function(wwwPath, pathname)
	{
	// The pathname must be checked so that loading is possible only from the supplied wwwPath
	pathname = pathname.replace(/\.\./g, "");												// prevent ../ attacks, e.g. displaying /../../../../../../../../../../../../../../../etc/shadow
	pathname = pathname.replace(/\/{2,}/g, "");

	pathname = pathname.replace(/(\[.*?\])|(\{.*?\})/g, "");								// ranges

	pathname = pathname.replace(/[~*^|?$\[\]{}\\]/g, "");									// characters

	wwwPath = wwwPath + pathname;															// Can not have something//something
	wwwPath = wwwPath.replace(/\/{2,}/g, "/");

	return wwwPath;
	}

var parseCookies = function(request)
	{
	var name_value;
	var cookies = {};

	var cookie = (request.headers.cookie || "").split(";");

	for (var i = 0; i < cookie.length; i++)
		{
		name_value = cookie[i].split("=");
		if (name_value.length == 2)
			cookies[name_value[0].trim()] = { value: name_value[1].trim(), cookie: cookie[i] };
		}

	return cookies;
	}

var parsePost = function(request, body)
	{ // Simple parsing of POST body
	var post = {};
	var contentType;

	try {
		if (!request.headers["content-type"])
			throw "";

		contentType = request.headers["content-type"].toLowerCase();

		if (contentType.indexOf("application/x-www-form-urlencoded") != -1)
			post = qs.parse(body);
		else if (contentType.indexOf("multipart/form-data") != -1)
			post = network.parseMultiPartData(contentType, body, true);
		}
	catch(err)
		{}

	return post;
	}

self.makeLocation = function(_request_, pathname)
	{
	var location;

	location  = (_request_.urlObj.protocol ? _request_.urlObj.protocol : options.protocol + ":") + "//";
	location += (_request_.urlObj.auth ? _request_.urlObj.auth + "@" : "");
	location += (_request_.urlObj.hostname ? _request_.urlObj.hostname : config.EDGE_HOSTNAME);
	location += (_request_.urlObj.port ? ":" + _request_.urlObj.port : "");
	location += (pathname ? (pathname.charAt(0) != "/" ? "/" : "") + pathname : "");
	location += (_request_.urlObj.search ? "/?" + _request_.urlObj.search : "");
	location += (_request_.urlObj.hash ? "#" + _request_.urlObj.hash : "");

	return location;
	}

var checkCache = function(filename, filetype)
	{
	return fs.sync.readFile(filename, filetype);
//hits =
//hitRatio =
//lastHit =
	/*
	if (filename in cache)
		{
		return cache[filename].file;
		}
	else
		{
		if (cacheSize < config.WWW_CACHE_MAX_ITEMS)
			{

			}
		else
			{
			// Remove item which has not been used in some time
			}


		cache[filename] = {};
		cache[filename].file = fs.sync.readFile(filename, filetype);

		return cache[filename].file
		}
	*/
	}

/*
+var mergeHeaders = function(headers)
	{
	var ret = new Object();

	for (var i=0; i < headers.length; i++)
		{
		if (ret.hasOwnProperty(headers[i][0]))
			{
			ret[headers[i][0]].push(headers[i][1]);
			}
		else
			{
			ret[headers[i][0]] = [headers[i][1]];
			}
		}

	return ret;
	};*/

}

module.exports = WebServer;
