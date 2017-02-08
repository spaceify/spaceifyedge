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

if(typeof exports !== "undefined")
	module.exports = SpaceifyUnique;