module.exports = function()
{
var self = this;

self.make = function()
	{
	var i, obj = {};
	var fs = require("fs");
	var path = __dirname + "/../../locales/";

	var files = fs.readdirSync(path);

	for(i = 0; i < files.length; i++)
		{
		obj[files[i].replace(".json", "")] = makeSections(fs.readFileSync(path + files[i], "utf8"));
		}

	return "(function spaceifyLocales(){window.spelocales=" + JSON.stringify(obj, 0) + ";})();\n";
	}

var makeSections = function(locale)
	{
	var sections = {};

	locale = JSON.parse(locale);

	for(var section in locale)
		{
		sections[section] = locale[section];
		}

	return sections;
	}

}
