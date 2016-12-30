"use strict"

/**
 * Implements the XMLHttpRequest interface.
 * References the GLOBAL variable piperClient to implement its functionality
 *
 * Logics / comments from https://xhr.spec.whatwg.org/ and https://developer.mozilla.org/
 *
 * Not implemented:
 *   XMLHttpRequestUpload object
 *   CORS
 *   Synchronous load
 *
 * Object.defineProperty() for read-only properties???
 */

/*var handler = {
	get: function(target, property, receiver)
		{
		console.log("\nGET PROXY: ", property, target.responseURL);
		return target[property];
		},

	set: function(target, property, value, receiver)
		{
		console.log("\SET PROXY:", property + "=" + value);

		target[property] = value;

		return true;
		},

	apply: function(target, thisArg, argumentsList)
		{
		console.log("\APPLY PROXY:");
		}
	};*/

function SpXMLHttpRequest()
{
var self = this;

var xhr = (SpXMLHttpRequest.OriginalXMLHttpRequest ? new SpXMLHttpRequest.OriginalXMLHttpRequest() : null);

var logger = console;

	// Includes -- -- -- -- -- -- -- -- -- -- //
var URL = null;
var HttpParser = null;
var piperClient = null;
//var LoaderUtil = null;

if (typeof exports !== "undefined")
	{
	URL = require("urlutils");
	HttpParser = require("./httpparser");
	LoaderUtil = require("./loaderutil");
	piperClient = LoaderUtil.piperClient;
	}
else
	{
	URL = window.URL;
	HttpParser = window.HttpParser;
	//LoaderUtil = new window.LoaderUtil();
	piperClient = LoaderUtil.piperClient;
	}

var httpParser = new HttpParser();

	// Stored method arguments and xhr state information (flags) -- -- -- -- -- -- -- -- -- -- //
var url = "";
var parsedUrl = "";
var method = "GET";
var username = null;
var password = null;

var openFlag = false;
var sendFlag = false;
var redirectingFlag = false;
var synchronousFlag = false;
var stopTimeoutFlag = false;
var uploadListenerFlag = false;
var uploadCompleteFlag = false;

var timeoutId = null;
var milliseconds = 0;

var body = null;

	// Connection / Network -- -- -- -- -- -- -- -- -- -- //
var responseArrayBuffer = null;
var responseBlob = null;
var responseDocument = null;
var responseJSON = null;

var contentType = null;
var contentLength = null;
var bodyBytesReceived = 0;
var overridedMimeType = null;
var authorRequestHeaders = [];

var allowedHttpHeaderMethods = ["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"];
var blockedHttpHeaderHeaders = ["CONNECT", "TRACE", "TRACK"];

var port = "80";
var host = "localhost";
var hostname = "localhost";

var request = "";
var TerminationReason = { none: "", abort: "end-user abort", fatal: "fatal", timeout: "timeout" };
var ResponseType = { basic: "basic", cors: "cors", default: "default", error: "error", opaque: "opaque", opaqueredirect: "opaqueredirect" };
var response =	{
				type: ResponseType.default,
				terminationReason: TerminationReason.none,
				url: null,
				urlList: [],
				status: 200,
				statusText: "OK",
				headers: {},
				body: null,
				trailer: {},
				httpsState: "none",
				CSPList: [],
				CORSExposedHeaderNameList: [],
				locationURL: null // (null, failure, or a URL)
				};

var bytesToTransmit = 0;
var transmittedBytes = 0;

	// Internal constants / Variables -- -- -- -- -- -- -- -- -- -- //

/*enum*/var XMLHttpRequestResponseType = {	DOMSTRING: "",
											BLOB: "blob",
											JSON: "json",
											TEXT: "text",
											DOCUMENT: "document",
											ARRAYBUFFER: "arraybuffer",
											MOZ_BLOB: "moz-blob",									// Non-standard
											MOZ_CHUNKED_TEXT: "moz-chunked-text",
											MOZ_CHUNKED_ARRAYBUFFER: "moz-chunked-arraybuffer",
											MS_STREAM: "ms-stream" };

var forbiddenHeaderNames  = "^(Accept-Charset)$|^(Accept-Encoding)$|^(Access-Control-Request-Headers)$|^(Access-Control-Request-Method)$|";
	forbiddenHeaderNames += "^(Connection)$|^(Content-Length)$|^(Cookie)$|^(Cookie2)$|^(Date)$|^(DNT)$|^(Expect)$|^(Host)$|^(Keep-Alive)$|";
	forbiddenHeaderNames += "^(Origin)$|^(Referer)$|^(TE)$|^(Trailer)$|^(Transfer-Encoding)$|^(Upgrade)$|^(Via)$|^(Proxy-.*)|^(Sec-.*)";
	forbiddenHeaderNames = new RegExp(forbiddenHeaderNames, "i");

	// XHR variables - set default values
self.readyState = SpXMLHttpRequest.UNSENT;
self.response = "";
self.responseText = null;
self.responseType = XMLHttpRequestResponseType.DOMSTRING;
self.responseURL = "";
self.responseXML = null;
self.status = 0;
self.statusText = "";
self.timeout = 0;
self.withCredentials = false;
self.upload = 	{	// The upload process
				onabort: null,
				onerror: null,
				ontimeout: null,
				onprogress: null,
				onloadstart: null,
				onload: null,
				onloadend: null
				};

	// XHR events - onloadstart -> onprogress -> onload || onerror -> onloadend
self.onabort = null;				// When the fetch has been aborted. For instance, by invoking the abort() method.
self.onerror = null;				// The fetch failed.
self.ontimeout = null;				// The author specified timeout has passed before the fetch completed.
self.onprogress = null;				// Transmitting data.
self.onloadstart = null;			// The fetch initiates.
self.onload = null;					// The fetch succeeded.
self.onloadend = null;				// The fetch completed (success or failure).
self.onreadystatechange = null;		// The readyState attribute changes value, except when it changes to UNSENT.
var eventListeners = {};
var eventListenerTypes = ["abort", "error", "timeout", "progress", "loadstart", "load", "loadend", "readystatechange"];

	// REAL XHR EVENT HANDLERS
var onTimeOut = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onTimeOut()");

	if (typeof self.ontimeout == "function")
		self.ontimeout(e);
	};

var onProgress = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onProgress()");

	if (typeof self.onprogress == "function")
		self.onprogress(e);
	};

var onAbort = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onAbort()");

	if (typeof self.onabort == "function")
		self.onabort(e);
	};

var onError = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onError()");

	if (typeof self.onerror == "function")
		self.onerror(e);
	};

var onLoadStart = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onLoadStart()");

	if (typeof self.onloadstart == "function")
		self.onloadstart(e);
	};

var onLoad = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onLoad()");

	if (typeof self.onload == "function")
		self.onload(e);
	};

var onLoadEnd = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onLoadEnd()");

	if (typeof self.onloadend == "function")
		self.onloadend(e);
	};

var onReadyStateChange = function(e)
	{
	getXhrAttributes();

	//logger.log("SpXMLHttpRequest::onReadyStateChange()", readyState, (self.onreadystatechange ? "YES" : "NO"));

	if (typeof self.onreadystatechange == "function")
		self.onreadystatechange(e);
	};

if(xhr)
	{
	xhr.ontimeout = onTimeOut;
	xhr.onprogress = onProgress;
	xhr.onabort = onAbort;
	xhr.onerror = onError;
	xhr.onloadstart = onLoadStart;
	xhr.onload = onLoad;
	xhr.onloadend = onLoadEnd;
	xhr.onreadystatechange = onReadyStateChange;
	}

	// Public XHR methods -- -- -- -- -- -- -- -- -- -- //
self.open = function(method_, url_, async_, user_, pass_)
	{
	//logger.log("SpXMLHttpRequest::open()");

	if(xhr)
		openXHR(method_, url_, async_, user_, pass_);
	else
		openSpXHR(method_, url_, async_, user_, pass_);
	}

var openXHR = function(method_, url_, async_, user_, pass_)
	{
	method = method_;
	isAsync = (async_ !== "undefined" ? async_ : true);
	username = (user_ !== "undefined" ? user_ : null);
	password = (pass_ !== "undefined" ? pass_ : null);

	xhr.open(method_, url_, isAsync, username, password);
	}

var openSpXHR = function(method_, url_, async_, user_, pass_)
	{
	if (openFlag)
		return;

	/*
	 * 1. If context object's relevant settings object has a responsible document and it is not fully active, throw an InvalidStateError exception.
	 */

// 	ToDo

		// Method - Do not throw exceptions, fail quietely.
	method_ = method_.toUpperCase();

	/*
	 * 2. If method is not a method, throw a SyntaxError exception.
	 */

	if (allowedHttpHeaderMethods.indexOf(method_) == -1)
		return;

	/*
	 * 3. If method is a forbidden method, throw a SecurityError exception.
	 */

	if (blockedHttpHeaderHeaders.indexOf(method_) != -1)
		return;

	/*
	 * 4. Normalize method.
	 */

	method = method_;

	// URL
	/*
	 * 5. Let parsedURL be the result of parsing url with context object's relevant settings object's API base URL.
	 * 6. If parsedURL is failure, throw a SyntaxError exception. - Do not throw exception, fail quietely.
	 */

	parseURL(url_);

	/*
	 * 7. If the async argument is omitted, set async to true, and set username and password to null.
	 */

	if (async_ === "undefined")
		{
		async_ = true;
		user_ = null;
		pass_ = null;
		}

	username = (user_ ? user_ : null);
	password = (pass_ ? pass_ : null);

	/*
	 * 8. If parsedURL's host is non-null, run these substeps:
	 */

	if (host)
		{
		var auth = "";

		// 8.1. If the username argument is not null, set the username given parsedURL and username.
		if (username)
			auth = username;

		// 8.2. If the password argument is not null, set the password given parsedURL and password.
		if (password && auth)
			auth += ":" + password;

		if (auth)
			host = auth + "@" + host;
		}

	/*
	 * 9. If async is false, entry settings object's global object is a Window object, and the timeout attribute value is not zero or the
	 *    responseType attribute value is not the empty string, then throw an InvalidAccessError exception. ?
	 */

// 	ToDo
// 	Synchronous calls are not supported yet.

	/*
	 * 10. Terminate the request. (Note: A fetch can be ongoing at this point.)
	 */

// 	ToDo

	/*
	 * 11. Set variables associated with the object as follows:
	 */

	sendFlag = false;														// Unset the send() flag, stop timeout flag, and upload listener flag.
	stopTimeoutFlag = false;
	uploadListenerFlag = false;

	// Set request method to method. (see 4.)

// 	ToDo
// 	Set request URL to parsedURL.

	synchronousFlag = (async_ ? false : true);								// Set the synchronous flag, if async is false, and unset the synchronous flag otherwise.

	authorRequestHeaders = [];												// Empty author request headers.

	response.type = ResponseType.error;										// Set response to a network error.
	response.status = 0;													// Set received bytes to the empty byte sequence.
	response.statusText = "";
	response.headers = {};
	response.body = null;
	response.trailer = {};

	responseArrayBuffer = null;												// Set response ArrayBuffer object to null.

	responseBlob = null;													// Set response Blob object to null.

	responseDocument = null;												// Set response Document object to null.

	responseJSON = null;													// Set response JSON object to null.

	/*
	 * 12. If the state is not opened, run these substeps:
	 */

	openFlag = true;														// Set state to opened.

	changeReadyState(SpXMLHttpRequest.OPENED);								// Fire an event named readystatechange.
	};

self.send = function(body_)
	{
	if(xhr)
		sendXHR(body_);
	else
		sendSpXHR(body_);
	}

var sendXHR = function(body_)
	{
	//logger.log("SpXMLHttpRequest::send()");

	if(isAsync)														// Setting type is allowed only for asynchronous calls
		xhr.responseType = self.responseType;

	return xhr.send(body_);
	};

var sendSpXHR = function(body_)
	{
	// References global piperClient
	//logger.log("SpXMLHttpRequest::send()");

	if (body_)
		body = body_;

	bodyBytesReceived = 0;

	/*
	 * 1. If state is not opened, throw an InvalidStateError exception.
	 */
	if (!openFlag)
		return;

	/*
	 * 2. If the send() flag is set, throw an InvalidStateError exception.
	 */
	if (sendFlag && !redirectingFlag)
		return;

	/*
	 * 3. If the request method is GET or HEAD, set body to null.
	 */
	if (method == "GET" || method == "HEAD")
		body = null;

	/*
	 * 4. If body is null, go to the next step.
	 */
// 	ToDo
// 	if (body)
// 		{
//
// 		}

	/*
	 * 5. If one or more event listeners are registered on the associated XMLHttpRequestUpload object, then set upload listener flag.
	 */
	 if (self.upload.onabort || self.upload.onerror || self.upload.ontimeout || self.upload.onprogress ||
		self.upload.onloadstart || self.upload.onload || self.upload.onloadend)
		uploadListenerFlag = true;

	/*
	 * 6. Let req be a new request, initialized as follows:
	 */
	request = method + " " + parsedUrl + " HTTP/1.1\r\nHost: " + host;					// 	method - request method
																						// 	url - request URL

	for(var i = 0; i < authorRequestHeaders.length; i++)								// 	header list - author request headers
		request += "\r\n" + authorRequestHeaders[i].header + ": " + authorRequestHeaders[i].value;

// 	ToDo
// 	unsafe-request flag - Set.

	if (body)																			// 	body - request body
		{
		request += "\r\nContent-Length: " + body.length + "\r\n";
		request += body;
		}

	request = request + "\r\n\r\n";

	var data = LoaderUtil.toab(request);
	bytesToTransmit = data.byteLength;

//	ToDo
// 	client - context object's relevant settings object
// 	synchronous flag - Set if the synchronous flag is set.
// 	mode - "cors"
// 	use-CORS-preflight flag - Set if upload listener flag is set.
// 	credentials mode - If the withCredentials attribute value is true, "include", and "same-origin" otherwise.
// 	use URL credentials flag - Set if either request URL's username is not the empty string or request URL's password is non-null.

	/*
	 * 7. Unset the upload complete flag.
	 */
	uploadCompleteFlag = false;

	/*
	 * 8. If req's body is null, set the upload complete flag.
	 */
	if (!body)
		uploadCompleteFlag = true;

	/*
	 * 9. Set the send() flag.
	 */
	sendFlag = true;

	/*
	 * 10. If the synchronous flag is unset, run these substeps:
	 */
	if (!synchronousFlag)
		{
		// 10.1 Fire a progress event named loadstart with 0 and 0.
		if (typeof self.onloadstart === "function" && !redirectingFlag)
			self.onloadstart(createEvent("loadstart", {loaded: 0, total: 0, lengthComputable: false, target: self}));

		// 10.2 If the upload complete flag is unset and upload listener flag is set, then fire a progress event named
		//      loadstart on the XMLHttpRequestUpload object with 0 and req's body's total bytes.
		if (!uploadCompleteFlag && uploadListenerFlag)
			{
			if (typeof self.upload.onloadstart === "function" && !redirectingFlag)
				self.upload.onloadstart(createEvent("loadstart", {loaded: 0, total: request.length, lengthComputable: true, target: self}));
			}

		// 10.3 Fetch req. Handle the tasks queued on the networking task source per below.

		// Run these subsubsteps in parallel:
		// 1. Let milliseconds be zero.
		// 2. Every millisecond, as long as the stop timeout flag is unset, queue a microtask to run these subsubsubsteps:
		// 2.1 Increase milliseconds by one.
		// 2.2 If milliseconds is equal or greater than the timeout attribute value and the timeout attribute value is not zero,
		//     terminate fetching with reason timeout.
		if (timeoutId)
			clearInterval(timeoutId);

		timeoutId = null;
		milliseconds = 0;

		if (self.timeout > 0)
			{
			timeoutId = setInterval(function()
				{
				if (stopTimeoutFlag)
					{
					clearInterval(timeoutId);
					}
				else
					{
					if (++milliseconds >= self.timeout)
						{
						clearInterval(timeoutId);

						// ToDo - timeout event
						}
					}
				}, 1);
			}

		// To process request body for request, run these subsubsteps:
		// See ### below
		}
	/*
	 * 11. Otherwise, if the synchronous flag is set, run these substeps:
	 */
	else
		{
// 	ToDo
// 	Synchronous calls are not supported yet.
		}

	/*
	 * ###
	 */
	transmittedBytes = 0;

	piperClient.createTcpTunnel(hostname, port, onBinary, function(pipeId)
		{
		// To process request body for request, run these subsubsteps:
		piperClient.sendTcpBinary(pipeId, data);

		// Note: These subsubsteps are only invoked when new bytes are transmitted.
		// >>>>>>>>>> This could a listener receiving the number of transmitted bytes. ToDo: Is it possible to monitor connection and get the send bytes?
		transmittedBytes = bytesToTransmit;

		// 1. If not roughly 50ms have passed since these subsubsteps were last invoked, terminate these subsubsteps.
// ToDo

		// 2. If upload listener flag is set, then fire a progress event named progress on the XMLHttpRequestUpload object with
		//    request's body's transmitted bytes and request's body's total bytes.
// ToDo
		// <<<<<<<<<<

		requestEndOfBody();

		redirectingFlag = false;

		// Upload phase is ready. The reponse steps of 10. are in onBinary event handler below.
		});
	};

self.setRequestHeader = function(header, value)
	{
	//logger.log("SpXMLHttpRequest::setRequestHeader()");

	if(xhr)
		xhr.setRequestHeader(header, value);
	else
		{
		// 1. If state is not opened, throw an InvalidStateError exception.
		if (!openFlag)
			return;

		// 2. If the send() flag is set, throw an InvalidStateError exception.
		if (sendFlag)
			return;

		// 3. Normalize value.
		header = header.trim().toLowerCase();

		// 4. If name is not a name or value is not a value, throw a SyntaxError exception.
		// Note: An empty byte sequence represents an empty header value.
		// ToDo: Check against real header field names
		if(!header || !value)
			return;

		// 5. Terminate these steps if name is a forbidden header name.
		if(header.match(forbiddenHeaderNames))
			return;

		// 6. Combine name/value in author request headers.
		authorRequestHeaders.push({header: header, value: value});
		}
	}

self.abort = function()
	{
	//logger.log("SpXMLHttpRequest::abort()", URL);

	if(xhr)
		{
		self.readyState = SpXMLHttpRequest.UNSENT;

		xhr.abort();
		}
	else
		{
// ToDo
		// 1. Terminate the request.
		// 2. If state is either opened with the send() flag set, headers received, or loading, run the request error steps for event abort.
		// 3. If state is done, set state to unsent.
		// Note: No readystatechange event is dispatched.
		}
	};

self.getResponseHeader = function(header)
	{
	//logger.log("SpXMLHttpRequest::getResponseHeader()");

	if(xhr)
		return xhr.getResponseHeader(header);
	else
		return httpParser.getHeaderValue(header);
	}

self.getAllResponseHeaders = function()
	{
	if(xhr)
		return xhr.getAllResponseHeaders();
	else
		{
		// 1. Let output be an empty byte sequence.
		// 2. Let headers be the result of running sort and combine with response's header list.
		// 3. For each header in headers, run these substeps:
		// 3.1 Append header's name, followed by a 0x3A 0x20 byte pair, followed by header's value, to output.
		// 3.2 If header is not the last pair in headers, then append a 0x0D 0x0A byte pair, to output.
		// 4. Return output.
		return httpParser.getRawHeaders();
		}
	}

self.overrideMimeType = function(mime)
	{
	//logger.log("SpXMLHttpRequest::overrideMimeType()");

	if(xhr)
		return xhr.overrideMimeType(mime);
	else
		{
		// 1. If state is loading or done, throw an InvalidStateError exception.
		if(self.readyState == SpXMLHttpRequest.LOADING || self.readyState == SpXMLHttpRequest.DONE)
			return;

		// 2. If parsing mime analogously to the value of the `Content-Type` header fails, throw a SyntaxError exception.
		// 3. If mime is successfully parsed, set override MIME type to its MIME type, excluding any parameters, and converted to ASCII lowercase.
		mime = mime.toLowerCase();
		// 4. If a `charset` parameter is successfully parsed, set override charset to its value.
		overridedMimeType = mime;
		}
	};

self.addEventListener = function(type, listener, obj)
	{
	var options = obj;

	if (xhr)
		xhr.addEventListener(type, listener, obj);
	else
		{
		if(eventListenerTypes.indexOf(type) === -1)
			return;

		if(typeof obj === "boolean")
			options = { capture: obj, once: false, passive: false };

		}

	// eventListeners[type] = { listener: listener, options: options };
	}

self.removeEventListener = function(type, listener, obj)
	{
	var options = obj;

	if (xhr)
		xhr.removeEventListener(type, listener, obj);
	else
		{
		if(typeof obj === "boolean")
			options = { capture: obj, passive: false };

		}
	}

self.dispatchEvent = function(event)
	{
	if (xhr)
		xhr.dispatchEvent(event);
	else
		{

		}
	}

	// Private methods -- -- -- -- -- -- -- -- -- -- //
var onBinary = function(data)
	{ // Follows roughly "10. If the synchronous flag is unset, run these substeps:"
	// To process response for response, run these subsubsteps:

	// 1. If the stop timeout flag is unset, set the stop timeout flag.
	stopTimeoutFlag = true;

	var arr = new Uint8Array(data);
	//logger.log("SpXMLHttpRequest::onBinary()" + " data: " + ab2str(arr));

	/*
	 * This is the header chunk
	 */
	if (!contentLength)
		{
		httpParser.parse(arr);

		//logger.log("SpXMLHttpRequest::onBinary() HTTP server replied with statusCode " + httpParser.getStatusCode());

		/*
		 * Redirect
		 */
		if (httpParser.getStatusCode() == 301 || httpParser.getStatusCode() == 302)
			{
			//logger.log("SpXMLHttpRequest::onBinary() redirecting to : " + parsedUrl);

			redirectingFlag = true;
			parseURL(httpParser.getHeaderValue("Location"));
			self.send();

			return;
			}

		/*
		 * Header fields
		 */
		contentType = httpParser.getHeaderValue("Content-Type");
		contentLength = httpParser.getHeaderValueAsInt("Content-Length");		// this class can handle only unpacked bodies

// ToDo
		// 2. Set response to response.
		response.headers = httpParser.getHeaders();
		response.body = [];

		// 3. Handle errors for response.
		/*
		if (#error#)
			{
			response.type = ResponseType.error;
			response.terminationReason = TerminationReason.fatal;
			response.status = 0;
			response.statusText = "";
			response.headers = {};
			response.body = null;
			}
		*/

		// 4. If response is a network error, return.
		/*
		if (isNetworkError())
			{
			return;
			}
		*/

		// 5. Set state to headers received.
		// 6. Fire an event named readystatechange.
		changeReadyState(SpXMLHttpRequest.HEADERS_RECEIVED);

		// 7. If state is not headers received, then return.
		// Assume the headers are always received

		/*
		 * Plain header bytes
		 */
		if (!contentLength)
			{
			// 8. If response's body is null, then run handle response end-of-body and return.
			responseEndOfBody(true);
			}
		/*
		 * Header + Content (body) bytes
		 */
		else
			{
			addBytesToFetched(arr.subarray(httpParser.getContentBegin()));
			}

		// 9. Let reader be the result of getting a reader from response's body's stream.
		// We do not have a reader
		}
	/*
	 * This is some other chunk
	 */
	else
		{
		addBytesToFetched(arr);
		}

	//logger.log(bodyBytesReceived + " / " + contentLength + " bytes of " + parsedUrl + " received" );

	/*
	 *  Body loaded
	 */
	if (contentLength && contentLength == bodyBytesReceived)
		{
		//!!!!!!!!!!!!!!!!!!commented out for testing in node
		//if (!overridedMimeType)
		//	self.response = new Blob(response.body, {type : contentType} );
		//else
		//	self.response = new Blob(response.body, {type : overridedMimeType} );
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		for (var i = 0; i < response.body.length; i++)
			{
			if (response.body[i])
				self.responseText += LoaderUtil.ab2str(response.body[i]);
			}

		responseEndOfBody(false);
		}

// onerror == network level error!!! onerror and onload never fire simultaneously. It's either one or the other. However onloadend fires in both cases and is the last event in the row
	};

var addBytesToFetched = function(arr)
	{
	// 10. Let read be the result of reading a chunk from response's body's stream with reader.

	// When read is fulfilled with an object whose done property is false and whose value property is a Uint8Array object,
	// run these subsubsubsteps and then run the above subsubstep again:

	// 10.1. Append the value property to received bytes.
	response.body.push(arr);
	bodyBytesReceived += arr.byteLength;

	// 10.2. If not roughly 50ms have passed since these subsubsubsteps were last invoked, then terminate these subsubsubsteps.

	// 10.3. If state is headers received, then set state to loading.
	// State is already set to headers received in onBytes
	// 10.4. Fire an event named readystatechange.
	//	Note: Web compatibility is the reason readystatechange fires more often than state changes.
	changeReadyState(SpXMLHttpRequest.LOADING, true);

	// 10.5. Fire a progress event named progress with response's body's transmitted bytes and response's body's total bytes.
	if (typeof self.onprogress === "function")
		self.onprogress(createEvent("progress", {loaded: bodyBytesReceived, total: contentLength, lengthComputable: true, target: self}));

	// When read is fulfilled with an object whose done property is true, run handle response end-of-body for response.
	// This is handled in onBytes

	// When read is rejected with an exception, run handle errors for response.
	// We do not have a reader
	}

var requestEndOfBody = function()
	{
	// https://xhr.spec.whatwg.org/#the-send()-method, step 10.
	// To process request end-of-body for request, run these subsubsteps:

	// 1. Set the upload complete flag.
	uploadCompleteFlag = true;

	// 2. If upload listener flag is unset, then terminate these subsubsteps.
	if (!uploadListenerFlag || redirectingFlag)
		return;

	// 3. Let transmitted be request's body's transmitted bytes.
	// 4. Let length be request's body's total bytes.

	// 5. Fire a progress event named progress on the XMLHttpRequestUpload object with transmitted and length.
	if (typeof self.upload.onprogress === "function")
		self.upload.onprogress(createEvent("progress", {loaded: transmittedBytes, total: bytesToTransmit, lengthComputable: true, target: self}));

	// 6. Fire a progress event named load on the XMLHttpRequestUpload object with transmitted and length.
	if (typeof self.upload.onload === "function")
		self.upload.onload(createEvent("load", {loaded: transmittedBytes, total: bytesToTransmit, lengthComputable: true, target: self}));

	// 7. Fire a progress event named loadend on the XMLHttpRequestUpload object with transmitted and length.
	if (typeof self.upload.onloadend === "function")
		self.upload.onloadend(createEvent("loadend", {loaded: transmittedBytes, total: bytesToTransmit, lengthComputable: true, target: self}));
	}

var responseEndOfBody = function(plainHeader)
	{
	self.status = httpParser.getStatusCode();
	self.statusText = httpParser.getStatusText();

	// To handle response end-of-body for response, run these steps:

// ToDo
	// 1. If the synchronous flag is set, set response to response.
	// 2. Handle errors for response.
	// 3. If response is a network error, return.
	// 4. If the synchronous flag is unset, update response's body using response.

	// 5. Fire a progress event named progress with transmitted and length.
	if (plainHeader && typeof self.onprogress === "function")
		self.onprogress(createEvent("progress", {loaded: 0, total: 0, lengthComputable: true, target: self}));

	// 6. Set state to done.
	// 7. Unset the send() flag.
	// 8. Fire an event named readystatechange.
	sendFlag = false;
	changeReadyState(SpXMLHttpRequest.DONE);

	// 9. Let transmitted be response's body's transmitted bytes.
	// 10. Let length be response's body's total bytes.
	// 11. Fire a progress event named load with transmitted and length.
	// 12. Fire a progress event named loadend with transmitted and length.
	if (typeof self.onload === "function")
		self.onload(createEvent("load", {loaded: bodyBytesReceived, total: (contentLength ? contentLength : 0), lengthComputable: true, target: self}));

	if (typeof self.onloadend === "function")
		self.onloadend(createEvent("loadend", {loaded: bodyBytesReceived, total: (contentLength ? contentLength : 0), lengthComputable: true, target: self}));
	}

var responseError = function()
	{
	}

var requestError = function(type)
	{
	}

var createEvent = function(type, options)
	{
	var evt;

	/*if (typeof exports === "undefined")
		{
		evt = document.createEvent("Event");
		evt.initEvent(type, false, false);
		}
	else
		{
		evt = {type: type};
		}*/
	evt = {type: type};

	if (options)
		{
		for(var i in options)
			evt[i] = options[i];
		}

	return evt;
	}

var changeReadyState = function(newReadyState, repeat/**/)
	{
	if (self.readyState != newReadyState || repeat)
		{
		self.readyState = newReadyState;

		if (typeof self.onreadystatechange === "function")
			self.onreadystatechange(createEvent("readystatechange", {target: self}));
		}
	}

var parseURL = function(url_)
	{
	var tempUrl;

	if (url_.indexOf("//") != -1)											// It is an absolute url
		{
		tempUrl = new URL(url_);

		if (tempUrl.hostname == "10.0.0.1")
			tempUrl.hostname = "localhost";

		host = tempUrl.host;

		if (tempUrl.hostname)
			hostname = tempUrl.hostname;

		if (tempUrl.port)
			port = tempUrl.port;

		parsedUrl = tempUrl.toString();
		}
	else
		{
		tempUrl = url_;

		if (tempUrl.charAt(0) != "/")
			tempUrl = "/" + tempUrl;

		parsedUrl = tempUrl;
		}

	url = url_;
	}

var getXhrAttributes = function()
	{
	self.status = xhr.status;
	self.statusText = xhr.statusText;
	self.response = xhr.response;
	self.readyState = xhr.readyState;
	self.responseURL = xhr.responseURL;
	self.responseType = xhr.responseType;

	if(self.responseType == XMLHttpRequestResponseType.DOMSTRING || self.responseType == XMLHttpRequestResponseType.TEXT)
		self.responseText = xhr.responseText;

	if(self.responseType == XMLHttpRequestResponseType.DOCUMENT && isAsync)
		self.responseXML = xhr.responseXML;

	self.upload = xhr.upload;
	self.timeout = xhr.timeout;
	self.withCredentials = xhr.withCredentials;
	};

var isNetworkError = function()
	{
	return (response.type == ResponseType.error && response.status == 0 && response.statusText == "" &&
			Object.keys(response.headers) == 0 && response.body == null && Object.keys(response.trailer) == 0 ? true : false);
	}

	//return new Proxy(self, handler);
}

	// Const
SpXMLHttpRequest.UNSENT = 0;
SpXMLHttpRequest.OPENED = 1;
SpXMLHttpRequest.HEADERS_RECEIVED = 2;
SpXMLHttpRequest.LOADING = 3;
SpXMLHttpRequest.DONE = 4;

SpXMLHttpRequest.OriginalXMLHttpRequest = (typeof window !== "undefined" ? window.XMLHttpRequest : null);

if (typeof exports !== "undefined")
	{
	module.exports = SpXMLHttpRequest;
	}