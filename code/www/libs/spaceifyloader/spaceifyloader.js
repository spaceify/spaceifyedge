"use strict"

var SERVER_ADDRESS = {host: "spaceify.net", port: 1980};
var WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

//Global variable
var piperClient = new PiperClient();

var getSessionCookies = function()
	{
	var cookies = sessionStorage.getItem("sessionCookies");
	
	if (sessionStorage.getItem("sessionCookies"))
		return sessionStorage.getItem("sessionCookies");
	else
		return "";

	/*var tag = document.getElementById("spcookietag");
	if (tag)
		return tag.value;
	else
		return "";*/
	};

function SpaceifyLoader()
{
var self = this;

var spHost = null;

var connected = false;
var connectionListener = null;

var injectionIndex = 0;

var scriptsToInject = [
					"libs/gamelib.bundle.js",
					"libs/httpparser.js",
					"piperclient.js",
					"spxmlhttprequest.js",
					"spaceifyloader.js",
					"testnetwork.js"
					];

// ----- contents of former contentloader.js

var elements = null;
var elementIndex = 0;

var elementsToLoad = new Array();

var urlParser = document.createElement("a");

self.loadData = function(element, callback)
	{
	var sp_type, type, url, xhr = new SpXMLHttpRequest();

	if(element.getAttribute("sp_src"))
		{ sp_type = "sp_src"; type = "src"; }
	else if(element.getAttribute("sp_href"))
		{ sp_type = "sp_href"; type = "href"; }

	url = element.getAttribute(sp_type);

	if(url.indexOf("//") == -1 && spHost)							// Relative URLs will not load without host
		url = new URL(url, spHost).toString()

	if(!url)
		{
		callback();
		return;
		}

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			var blob = xhr.response;
			element.onload = function(e)
				{
				window.URL.revokeObjectURL(element[type]);			// Clean up after yourself
				};
			element[type] = window.URL.createObjectURL(blob);
			element.removeAttribute(sp_type);
			callback();
			}
		};

	xhr.open("GET", url, true);
	xhr.responseType = "blob";
	xhr.send();
	};

self.postData = function(url, post, responseType, callback)
	{
	var xhr = new SpXMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			if (xhr.status != 200)
				callback(xhr.status, null);
			else if(xhr.response instanceof Blob)
				{
				var reader = new FileReader();
				reader.onload = function(err)
					{
					callback(null, reader.result);
					}
				reader.readAsText(xhr.response.data, "UTF-8");
				}
			else
				callback(null, JSON.stringify(xhr.response));
			}
		};

	var boundary = "---------------------------" + Date.now().toString(16);

	var body = "";
	for(var i = 0; i < post.length; i++)
		{
		body += "\r\n--" + boundary + "\r\n";

		body += post[i].content;
		body += "\r\n\r\n" + post[i].data + "\r\n";
		}
	body += "\r\n--" + boundary + "--";

	xhr.open("POST", url, true);
	xhr.responseType = (responseType ? responseType : "text");
	xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
	xhr.send(body);
	};

self.loadPage = function(url, sp_host)
	{
	var xhr = new SpXMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		//console.log("SpaceifyLoader::loadPage() content arrived, readyState=="+xhr.readyState);

		if (xhr.readyState == 4)
			{
			var newDoc = document.open("text/html", "replace");
			newDoc.write(xhr.responseText);
			newDoc.close();

			var input = newDoc.createElement("input");					// host of the page (e.g. http://edge.spaceify.net:32771)
			input.setAttribute("type", "hidden");
			input.setAttribute("id", "sp_host");
			input.setAttribute("name", "sp_host");
			input.setAttribute("value", sp_host ? sp_host : "");
			input.setAttribute("style", "display: none;");
			newDoc.body.appendChild(input);

			if (!window.isSpaceifyNetwork && injectionIndex < scriptsToInject.length && xhr.status != 0)
				self.recurseInjections();
//alert(xhr.getResponseHeader("Date"));
			self.setSessionCookies(xhr.getResponseHeader("Set-Cookie"));
			}

		}

	xhr.open("GET", url, true);

	if(window.isSpaceifyNetwork)										// OPTIONS: Access-Control-Request-Headers <> Access-Control-Allow-Headers
		xhr.setRequestHeader("Evaste", getSessionCookies());

	xhr.send(null);
	};

self.loadAllElements = function()
	{
	var srcs = Array.prototype.slice.call(document.querySelectorAll("[sp_src]"));

	var hrefs = Array.prototype.slice.call(document.querySelectorAll("[sp_href]"));

	console.log("ContentLoader::loadAll() :: Number of elements with sp_src: " + srcs.length + ", sp_href: " + hrefs.length);

	elements = hrefs.concat(srcs);										// css first

	elementIndex = 0;
	recurseElements();
	};

//---functions from former contentloader.js end

var recurseElements = function()
	{
	if (elementIndex < elements.length)
		{
		self.loadData(elements[elementIndex], function()
			{
			elementIndex++;
			recurseElements();
			});
		}
	}

self.recurseInjections = function()
	{
	var tag = document.createElement("script");
	var head = document.getElementsByTagName("head")[0];
	tag.type = "text/javascript";
	tag.src = scriptsToInject[injectionIndex];
	tag.setAttribute("class", "injected");
	if (injectionIndex<scriptsToInject.length-1)
		tag.onload = self.recurseInjections;

	head.appendChild(tag);

	injectionIndex++;
	};

self.setSessionCookies = function(cookies)
	{
	if(!cookies)
		cookies = "";

	sessionStorage.setItem("sessionCookies", cookies.trim());

	/*var tag = document.createElement("input");
	var body = document.getElementsByTagName("body")[0];
	tag.type = "hidden";
	tag.value = cookies.trim();
	tag.id = "spcookietag";
	tag.setAttribute("class", "injected");
	body.appendChild(tag);*/
	};

self.parseQuery = function(url)
	{ // Adapted from http://james.padolsey.com/snippets/parsing-urls-with-the-dom/
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	part = url.split("?");												// url with search or just the search
	part = (part.length < 2 ? part[0] : part[1]);

	pairs = part.split("&");

	for(var i = 0, length = pairs.length; i < length; i++)
		{
		if(!pairs[i])
			continue;

		pair = pairs[i].split("=");
		parameters[pair[0]] = (pair.length == 2 ? pair[1] : null);
		}

	return parameters;
	}

self.setSpHost = function(host)
	{
	spHost = host;
	}

self.connect = function(host, port, callback)
	{
	piperClient.connect(host, port, function()
		{
		if (connectionListener)
			connectionListener();
		callback();
		});
	};

self.setConnectionListener = function(lis)
	{
	connectionListener = lis;
	if (connected)
		lis();
	};

}

var spaceifyLoader = new SpaceifyLoader();
var contentLoader = spaceifyLoader;										// for leagacy templates compatibility

var sp_host = document.getElementById("sp_host");						// host (baseURL) for relative urls
if(sp_host)
	spaceifyLoader.setSpHost(sp_host.value);

if(window.isSpaceifyNetwork)
	{
	SpXMLHttpRequest = window.XMLHttpRequest;

	if(typeof window.loadOnce == "undefined")
		spaceifyLoader.loadAllElements();
	}
else
	{
	window.isSpaceifyNetwork = false;

	spaceifyLoader.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, function()
		{
		if(typeof window.loadOnce == "undefined")
			spaceifyLoader.loadAllElements();
		});
	}
