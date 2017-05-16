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

	Language = require(lib + "language");
	SpaceifyConfig = require(lib + "spaceifyconfig");
	SpaceifyLogger = require(lib + "spaceifylogger");
	fibrous = require(lib + "fibrous");

	global.os = require("os");
	global.fs = require("fs");
	global.path = require("path");
	global.mkdirp = require("mkdirp");
	global.AdmZip = require("adm-zip");
	global.request = require("request");
	global.spawn = require("child_process").spawn;
	}
else
	{
	lib = (window.WEBPACK_MAIN_LIBRARY ? window.WEBPACK_MAIN_LIBRARY : window);

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
		chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$#%&/(){}[]<>|§½=+?*,.;:-_";

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

if(typeof exports !== "undefined")
	module.exports = SpaceifyUtility;
