"use strict";

/**
 * Web Server, 29.11.2013 Spaceify Oy
 * 
 * @class WebServer
 */
// minify.csv, src/loaderutil.js, src/spxmlhttprequest.js, src/spaceifyloader.common.js
var fs = require("fs");
var url = require("url");
var http = require("http");
var https = require("https");
var qs = require("querystring");
var Logger = require("./logger");
var fibrous = require("./fibrous");
var language = require("./language");
var contentTypes = require("./contenttypes");
var WebOperation = require("./weboperation");
var SpaceifyError = require("./spaceifyerror");
var SpaceifyConfig = require("./spaceifyconfig");
var SpaceifyUtility = require("./spaceifyutility");

function WebServer()
{
var self = this;

var logger = new Logger();
var errorc = new SpaceifyError();
var config = new SpaceifyConfig();
var utility = new SpaceifyUtility();
var webOperation = new WebOperation();

var options = {};
var isOpen = false;
var webServer = null;

var sessionManager = null;
var sessionTokenName = "";
var sessionTokenNameCookie = "";

var requestListener = null;
var serverUpListener = null;
var serverDownListener = null;

var isSpaceify = (typeof process.env.IS_REAL_SPACEIFY == "undefined" ? true : false);

var regxHTML = /<html.*>/i;

var requests = [];
var currentRequest = null;
var processingRequest = false;
var events = require('events');
var eventEmitter = new events.EventEmitter();

var accessControlAllowHeaders = [];

self.listen = function(opts, callback)
	{
	var key;
	var crt;
	var body;
	var caCrt;
	var files;
	var urlObj;

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

	options.locale = options.locale || config.DEFAULT_LOCALE;

	options.serverName = opts.serverName || config.SERVER_NAME;

	options.protocol = (!options.isSecure ? "http" : "https");

	options.debug = ("debug" in opts ? opts.debug : false);

	//
	logger.setOptions({output: options.debug});

	// -- --
	logger.info(utility.replace(language.WEBSERVER_CONNECTING, {"~protocol": options.protocol, "~hostname": options.hostname, "~port": options.port}));

	// -- --
	eventEmitter.on("processRequest", processRequest);					// Request events, process one request at a time

	// -- --
	if(!options.isSecure)												// Start a http server
		{
		webServer = http.createServer();
		}
	else																// Start a https server
		{
		key = fs.sync.readFile(options.key);
		crt = fs.sync.readFile(options.crt);
		caCrt = fs.sync.readFile(options.caCrt);

		webServer = https.createServer({ key: key, cert: crt, ca: caCrt });
		}

	webServer.listen(options.port, options.hostname, 511, function()
		{
		options.port = webServer.address().port;

		if(!options.mappedPort)
			options.mappedPort = options.port;

		isOpen = true;

		if(serverUpListener)
			serverUpListener({isSecure: options.isSecure});

		callback(null, true);
		});

	webServer.on("request", function(request, response)
			{
			body = "";

			request.on("data", function(chunk)
				{
				body += chunk;
				});

			request.on("end", function()
				{
				urlObj = url.parse(request.url, true);

				requests.push({	body: body,
								headers: [],
								urlObj: urlObj,
								request: request,
								response: response,
								GET: urlObj.query,
								POST: (request.method == "POST" ? parsePost(request, body) : {}),
								cookies: parseCookies(request),
								protocol: (urlObj.protocol ? urlObj.protocol : "http:")
								});
				eventEmitter.emit("processRequest");
				});
			});

	webServer.on("error", function(err)
		{
		isOpen = false;

		if(serverDownListener)
			serverDownListener({isSecure: options.isSecure});

		callback(language.E_LISTEN_FATAL_ERROR.preFmt("WebServer()::connect", {"~hostname": options.hostname, "~port": options.port, "~err": err.toString()}), null);
		});

	webServer.on("close", function()
		{
		if(serverDownListener)
			serverDownListener({isSecure: options.isSecure});
		});
	};

self.close = function()
	{
	isOpen = false;

	if(webServer != null)
		{
		logger.info(utility.replace(language.WEBSERVER_CLOSING, {"~protocol": options.protocol, "~hostname": options.hostname, "~port": options.port}));

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

self.setSessionManager = function(manager, tokenName)
	{
	sessionTokenName = tokenName;
	sessionTokenNameCookie = tokenName.replace(/[^0-9a-zA-Z]/g, "");
	accessControlAllowHeaders.push(tokenName);
	sessionManager = (typeof manager == "function" ? manager : null);
	}

// -- -- -- -- -- -- -- -- -- -- //
var processRequest = function()
	{
	if(!processingRequest && requests.length > 0)
		{
		fibrous.run( function()
			{
			currentRequest = requests.shift();
			loadContent.sync();
			}, function(err, data) { } );
		}
	}

var loadContent = fibrous( function()
	{
	processingRequest = true;

	var pathname;
	var reqLisObj;
	var requestUrl;
	var wwwPathType;
	var location = "";
	var status = false;
	var wwwPath = options.wwwPath;

	try {
		if(currentRequest.request.method == "OPTIONS")
			writeOptions();
		else
			{
			pathname = currentRequest.urlObj.pathname.replace(/^\/*|\/*$/g, "");	// remove forward slash from the beginning and end

			if(requestListener)
				{
				reqLisObj = requestListener.sync(currentRequest.request, currentRequest.body, currentRequest.urlObj, options.isSecure);

				if(reqLisObj.type == "load")
					{
					wwwPath = reqLisObj.wwwPath;
					currentRequest.request.url = reqLisObj.pathname;
					pathname = reqLisObj.pathname.replace(/^\/*|\/*$/g, "");
					currentRequest.urlObj.pathname = reqLisObj.pathname;
					}
				else if(reqLisObj.type == "write")
					status = write(reqLisObj.content, reqLisObj.contentType, reqLisObj.responseCode, reqLisObj.location);
				}

			if(status === false)															// Redirect back to directory if / is not at the end of the directory
				{
				wwwPathType = utility.sync.getPathType( checkURL(wwwPath, pathname) );

				requestUrl = currentRequest.request.url;
				if(currentRequest.urlObj.search)
					requestUrl = requestUrl.replace(currentRequest.urlObj.search, "");
				if(currentRequest.urlObj.hash)
					requestUrl = requestUrl.replace(currentRequest.urlObj.hash, "");

				if(wwwPathType == "directory" && requestUrl.charAt(requestUrl.length - 1) != "/")
					{
					//location = options.protocol + "://" + config.EDGE_HOSTNAME + (currentRequest.urlObj.port ? ":" + currentRequest.urlObj.port : "") + requestUrl + "/";
					//location = currentRequest.urlObj.protocol + "//" + currentRequest.urlObj.auth + "@" + urlObject.host + urlObject.pathname + "/";
					location += (currentRequest.urlObj.protocol ? currentRequest.urlObj.protocol : options.protocol + ":") + "//";
					location += (currentRequest.urlObj.auth ? currentRequest.urlObj.auth + "@" : "");
					location += (currentRequest.urlObj.host ? currentRequest.urlObj.host : config.EDGE_HOSTNAME);
					location += (pathname ? "/" + pathname : "") + "/";
					location += (currentRequest.urlObj.search ? "?" + currentRequest.urlObj.search : "");
					location += (currentRequest.urlObj.hash ? "#" + currentRequest.urlObj.hash : "");

					status = redirect(302, location);
					}
				}

			if(status === false)															// www
				status = load(wwwPath, pathname);

			if(status === false)															// www + index file
				status = load(wwwPath, pathname + "/" + options.indexFile);
				//status = redirect(404, "");

			if(status === false)															// Not Found
				status = write(fs.sync.readFile(config.ERROR_PATHS["404"].file), config.ERROR_PATHS["404"].content_type, "404", "");

			if(typeof status !== "boolean" || status === false)
				throw status;
			}
		}
	catch(err)																				// Internal Server Error
		{
		write(fs.sync.readFile(config.ERROR_PATHS["500"].file), config.ERROR_PATHS["500"].content_type, "500", "");
		//redirect(500, "");
		}
	finally
		{
		processingRequest = false;
		eventEmitter.emit("processRequest");
		}
	});

var load = function(wwwPath, pathname)
	{
	var html;
	var fileExt;
	var content;
	var contentType;
	var status = false;
	var isLogInPage = false;
	var isSecurePage = false;
	var isAngularJS = false;
	var isOperationPage = false;

	try {
		wwwPath = checkURL(wwwPath, pathname);										// Check URL validity

		if(!utility.sync.isLocal(wwwPath, "file"))									// Return if file is not found
			throw false;

		content = fs.sync.readFile(wwwPath);										// Get the file content as binary

		contentType = pathname.lastIndexOf(".");									// Get content type of the file
		contentType = pathname.substr(contentType + 1, pathname.length - contentType - 1);

		if(wwwPath.lastIndexOf(".htm") !== -1)										// Reqular or AngularJS file
			{ // e.g., <html ng-app spaceify-secure spaceify-login> -> ['html', 'ng-app', 'spaceify-secure', 'spaceify-is-login']
			html = content.toString().match(regxHTML);

			if(html)
				{
				if(html[0].indexOf("ng-app") != -1 || html[0].indexOf("ng-spaceify") != -1)
					isAngularJS = true;

				if(html[0].indexOf("spaceify-secure") != -1)
					isAngularJS = isSecurePage = true;

				if(html[0].indexOf("spaceify-login") != -1)
					isAngularJS = isSecurePage = isLogInPage = true;

				if(html[0].indexOf("spaceify-operation") != -1)
					isOperationPage = true;
				}
			}

		if(isOperationPage)
			status = renderOperationPage.sync(5);
		else if(isAngularJS)														// The web page contains AngularJS
			status = renderAngularJS(content, contentType, pathname, isSecurePage, isLogInPage);
		else																		// Regular web page / resource
			status = renderHTML.sync(content, contentType);
		}
	catch(err)
		{
		}

	return status;
	}

var renderHTML = fibrous( function(content, contentType)
	{
	/*if(sessionManager)
		{
		var session = sessionManager(currentRequest);
		currentRequest.headers.push([sessionTokenName, session.token]);
		currentRequest.cookies[sessionTokenNameCookie] = {value: session.token, cookie: sessionTokenNameCookie + "=" + session.token};
		}*/

	return write(content, contentType, null, "", []);
	});

var renderOperationPage = fibrous( function(attempt)
	{
	var session;
	var isSecure;
	var userData;
	var operation;
	var data = null;
	var error = null;
	var operationData;

	if(sessionManager)
		{
		if(!currentRequest.POST["operation"])
			error = language.E_INVALID_POST_DATA.pre("WebServer::renderOperationPage");
		else
			{
			session = sessionManager(currentRequest);
			currentRequest.headers.push([sessionTokenName, session.token]);
			currentRequest.cookies[sessionTokenNameCookie] = {value: session.token, cookie: sessionTokenNameCookie + "=" + session.token};

			operation = utility.parseJSON(currentRequest.POST["operation"].body, true);

			//isSecure = options.isSecure;
			// ToDo: Rethink this logic, it most propably is not a secure way to detect remote operation
			isSecure = ((currentRequest.protocol == "https:" && !options.isSecure) || options.isSecure);

			operationData = webOperation.sync.getData(operation, session.userData, isSecure);

			data = operationData.data;
			error = operationData.error;
			}
		}
	else
		error = language.E_NO_SESSION_MANAGER.pre("WebServer::renderOperationPage");

	return write(JSON.stringify({err: error, data: data}), "json", null, "");
	});

var renderAngularJS = function(content, contentType, pathname, isSecurePage, isLogInPage)
	{
	var head;
	var script;
	var session;
	var operationData;
	var locale = config.DEFAULT_LOCALE;

	if(sessionManager)
		{
		session = sessionManager(currentRequest);
		currentRequest.headers.push([sessionTokenName, session.token]);
		currentRequest.cookies[sessionTokenNameCookie] = {value: session.token, cookie: sessionTokenNameCookie + "=" + session.token};

		// GET THE LOCALE / LANGUAGE FOR THE CURRENT SESSION, REMEMBER LOCALE
		if(currentRequest.GET && currentRequest.GET.locale)
			locale = currentRequest.GET.locale;
		else if(currentRequest.POST.locale)
			locale = currentRequest.POST.locale;
		else if(currentRequest.cookies.locale)
			locale = currentRequest.cookies.locale.value;
		else if(options.locale)
			locale = options.locale;

		currentRequest.cookies.locale = {value: locale, cookie: "locale=" + locale};

		// ToDo: Rethink this logic, it most propably is not a secure or even a functional way to mix local and remote operation
			// Accept local and remote requests - Remote HTTPS requests arriving over secure pipe to unsecure web server must not be redirected
		//if(!options.isSecure && isSecurePage)
		if(!options.isSecure && currentRequest.protocol == "http:" && isSecurePage)
			{
			content = fs.sync.readFile(config.ERROR_PATHS["302"].file, "utf8");
			content = content.replace("~url", utility.parseURLFromURLObject(currentRequest.urlObj, config.EDGE_HOSTNAME, "https", currentRequest.urlObj.port));

			return write(Buffer.from(content, "utf8"), config.ERROR_PATHS["302"].content_type, null, "");
			//return redirect(302, utility.parseURLFromURLObject(currentRequest.urlObj, config.EDGE_HOSTNAME, "https", currentRequest.urlObj.port));
			}

			// Secure server or remote https request - Remote HTTPS requests arriving over secure pipe to HTTP web server must not be redirected
		//else if(options.isSecure && isSecurePage)
		if((options.isSecure || currentRequest.protocol == "https:") && isSecurePage)
			{
			operationData = webOperation.sync.getData({ type: "isAdminLoggedIn" }, session.userData, options.isSecure);

			if(operationData.error)															// Internal Server Error
				return write(fs.sync.readFile(config.ERROR_PATHS["500"].file), config.ERROR_PATHS["500"].content_type, null, "");
				//return redirect(500, "");
			else if(!operationData.isLoggedIn && !isLogInPage)								// Show log in if not logged in
				return write(fs.sync.readFile(config.ADMIN_LOGIN_PATH.file), config.ADMIN_LOGIN_PATH.content_type, null, "");
				//return redirect(302, config.ADMIN_LOGIN_URL);
			else if(operationData.isLoggedIn && isLogInPage)								// Show appstore index if already logged in
				return write(fs.sync.readFile(config.APPSTORE_INDEX_PATH.file), config.APPSTORE_INDEX_PATH.content_type, null, "");
				//return redirect(302, config.APPSTORE_INDEX_URL);
			}
		}
	else
		return write(fs.sync.readFile(config.ERROR_PATHS["501"].file), config.ERROR_PATHS["501"].content_type, null, "");

	return write(content, contentType, null, "");
	}

var redirect = function(responseCode, location)
	{
	var content = "";

	if(responseCode == 301)
		content = utility.replace(language.E_MOVED_PERMANENTLY.message, {"~location": location, "~serverName": options.serverName, "~hostname": options.hostname, "~port": options.port});
	else if(responseCode == 302)
		content = utility.replace(language.E_MOVED_FOUND.message, {"~location": location, "~serverName": options.serverName, "~hostname": options.hostname, "~port": options.port});
	else if(responseCode == 404 || responseCode == 500)
		content = fs.sync.readFile(options.wwwErrorsPath + responseCode + ".html");

	return write(content, "html", responseCode, location);
	}

var write = function(content, contentType, responseCode, location)
	{
	var now = new Date();

	currentRequest.headers.push(["Content-Type", (contentTypes[contentType] ? contentTypes[contentType] : "text/plain"/*application/octet-stream*/) + "; charset=utf-8"]);
	currentRequest.headers.push(["Accept-Ranges", "bytes"]);
	currentRequest.headers.push(["Content-Length", content.length]);
	currentRequest.headers.push(["Server", options.serverName]);
	currentRequest.headers.push(["Date", now.toUTCString()]);
	currentRequest.headers.push(["Access-Control-Allow-Origin", getOrigin()]);
	currentRequest.headers.push(["Access-Control-Allow-Credentials", "true"]);
	if(sessionManager)
		currentRequest.headers.push(["Access-Control-Expose-Headers", sessionTokenName]);

	if(responseCode == 301 || responseCode == 302)
		currentRequest.headers.push(["Location", location]);

	for(var i in currentRequest.cookies)
		currentRequest.headers.push(["Set-Cookie", currentRequest.cookies[i].cookie]);

	currentRequest.response.writeHead(responseCode || 200, currentRequest.headers);
	currentRequest.response.end(currentRequest.request.method == "HEAD" ? "" : content);

	return true;
	}

var writeOptions = function()
	{ // CORS preflight
	var value;
	var header;
	var allowed = false;
	var now = new Date();
	var allowHeaders = [];

	currentRequest.headers.push(["Server", options.serverName]);
	currentRequest.headers.push(["Date", now.toUTCString()]);
	currentRequest.headers.push(["Access-Control-Allow-Origin", getOrigin()]);
	currentRequest.headers.push(["Access-Control-Allow-Credentials", "true"]);
	if(sessionManager)
		currentRequest.headers.push(["Access-Control-Expose-Headers", sessionTokenName]);

	if("access-control-request-headers" in currentRequest.request.headers)
		{
		header = currentRequest.request.headers["access-control-request-headers"].split(",");
		for(var i = 0; i < header.length; i++)
			{
			value = header[i].trim().toLowerCase();

			if(accessControlAllowHeaders.indexOf(value) != -1)
				allowHeaders.push(value);
			}

		if(allowHeaders.length > 0)
			{
			allowed = true;
			currentRequest.headers.push(["Access-Control-Allow-Headers", allowHeaders.join(",")]);
			}
		}

	currentRequest.response.writeHead(allowed ? 200 : 403, currentRequest.headers);
	currentRequest.response.end("");

	return true;
	}

var getOrigin = function()
	{
	//var port = (options.mappedPort != 80 && options.mappedPort != 443 ? ":" + options.mappedPort : "");
	//return (currentRequest.request.headers.origin ? currentRequest.request.headers.origin + port : "*");
	return "*";
	}

var checkURL = function(wwwPath, pathname)
	{
	// The pathname must be checked so that loading is possible only from the supplied wwwPath
	pathname = pathname.replace(/\.\./g, "");							// prevent ../ attacks, e.g. displaying /../../../../../../../../../../../../../../../etc/shadow
	pathname = pathname.replace(/\/{2,}/g, "");

	pathname = pathname.replace(/(\[.*?\])|(\{.*?\})/g, "");			// ranges

	pathname = pathname.replace(/[~*^|?$\[\]{}\\]/g, "");				// characters

	wwwPath = wwwPath + pathname;										// Can not have something//something
	wwwPath = wwwPath.replace(/\/{2,}/g, "/");

	return wwwPath;
	}

var parseCookies = function(request)
	{
	var name_value;
	var cookies = {};

	var cookie = (request.headers.cookie || "").split(";");

	for(var i = 0; i < cookie.length; i++)
		{
		name_value = cookie[i].split("=");
		if(name_value.length == 2)
			cookies[name_value[0].trim()] = {value: name_value[1].trim(), cookie: cookie[i]};
		}

	return cookies;
	}

var parsePost = function(request, body)
	{ // Simple parsing of POST body
	var post = {};
	var contentType;

	try {
		if(!request.headers["content-type"])
			throw "";

		contentType = request.headers["content-type"].toLowerCase();

		if(contentType.indexOf("application/x-www-form-urlencoded") != -1)
			post = qs.parse(body);
		else if(contentType.indexOf("multipart/form-data") != -1)
			post = utility.parseMultiPartData(contentType, body, true);
		}
	catch(err)
		{}

	return post;
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
