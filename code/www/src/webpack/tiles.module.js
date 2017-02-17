module.exports = function()
	{
	var self = this;

	self.make = function()
		{
		var fs = require("fs");
		var i, obj = {}, type, result;
		var path = __dirname + "/../../templates/";

		var files = fs.readdirSync(path);

		for(i = 0; i < files.length; i++)
			{
			type = files[i].split(".");

			if(!type[0].match(/tile/))
				continue;

			result = fs.readFileSync(path + files[i], "utf8");

			obj[type[0]] = result.replace(/[\\\t\\\n]/g, "");
			}

		return "(function spaceifyTiles(){window.spetiles=" + JSON.stringify(obj, 0) + ";})();\n";
		}
	}
