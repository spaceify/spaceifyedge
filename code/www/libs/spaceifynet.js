"use strict";

/**
 * SpaceifyNet, 29.7.2015 Spaceify Oy
 *
 * For Spaceify's internal use.
 *
 * @class SpaceifyNet
 */

function SpaceifyNet()
{
var self = this;

var ordinal = 0;
var showLoadingInstances = 0;
var applications = { spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}, spaceletCount: 0, sandboxedCount: 0, sandboxedDebianCount: 0, nativeDebianCount: 0 };

var core = new SpaceifyCore();
var config = new SpaceifyConfig();
var utility = new SpaceifyUtility();
var network = new SpaceifyNetwork();

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
		logger.error(err, true, true, 0, logger.ERROR);
		}
	}

self.loadCertificate = function()
	{
	document.getElementById("certIframe").src = network.getEdgeURL(false, false, true) + "spaceify.crt";
	return true;
	}

	// PAGE BROWSER -- -- -- -- -- -- -- -- -- -- //
self.loadAppstorePage = function()
	{
	var edgeURL = network.getEdgeURL(true, null, true);
	spaceifyLoader.loadPage(edgeURL + config.APPSTORE_INDEX_FILE, edgeURL + config.APPSTORE, edgeURL);
	}

self.loadLaunchPage = function()
	{
	var edgeURL = network.getEdgeURL(true, null, true);
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
	var xhr, element, url, query;
	var port, src, sp_host, spe_host, sp_path, icon, id;

	if(manifest.hasTile)																			// Application supplies its own tile
		{
		core.getApplicationURL(manifest.unique_name, function(err, appURL)
			{
			port = (!network.isSecure() ? appURL.port : appURL.securePort);
			spe_host = network.getEdgeURL(false, false, true);

			if(appURL.implementsWebServer && port)
				{
				sp_host = network.getEdgeURL(false, port, true);
				sp_path = config.TILEFILE;
				}
			else
				{
				sp_host = network.externalResourceURL(manifest.unique_name);
				sp_path = config.TILEFILE;
				}

			id = "apptile_" + manifest.unique_name.replace("/", "_");
			scope("edgeBody").addTile({type: "appTile", container: manifest.type, manifest: manifest, id:id, callback:
				function()
					{
					element = document.getElementById(id);
					src = sp_host + sp_path;

					xhr = new XMLHttpRequest();
					xhr.addEventListener("loadend", function(e)
						{
						if (xhr.readyState == 4)
							{
							element.onload = function(e)
								{
								window.URL.revokeObjectURL(element.src);

								callback();
								};

							if(xhr.response)
								{
								url = window.URL.createObjectURL(xhr.response);

								query = network.parseQuery(sp_path);

								query.url = "blob";
								query.sp_host = encodeURIComponent(sp_host);
								query.sp_path = encodeURIComponent(sp_path);
								query.spe_host = encodeURIComponent(spe_host);

								element.src = url + network.remakeQueryString(query, {}, {}, "", true);
								}
							else
								callback();
							}
						});
					xhr.open("GET", src, true);
					xhr.responseType = "blob";
					xhr.send();
					}
				});
			});
		}
	else																							// Spaceify renders default tile
		{
		if((icon = utility.getApplicationIcon(manifest, false)))
			{
			sp_host = network.externalResourceURL(manifest.unique_name);
			sp_path = icon;
			}
		else
			{
			sp_host = network.getEdgeURL(false, false, true);
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
