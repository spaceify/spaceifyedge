/**
 * Routines, 17.10.2016 Spaceify Oy
 * Dependency free routines
 */

function Routines()
{
var self = this;

self.makeUniqueDirectory = function(unique_name, noEndSlash)
	{ // Make a file system safe directory name: lowercase, allowed characters, can't start or end with /.
	unique_name = unique_name.toLowerCase();
	unique_name = unique_name.replace(/[^a-z0-9\/]/g, "/");
	unique_name = unique_name.replace(/^\/+/, "");
	unique_name += (unique_name.search(/\/$/) != -1 ? "" : "/");

	if(noEndSlash)
		unique_name = unique_name.replace(/\/$/, "");

	return unique_name;
	}

}

module.exports = Routines;