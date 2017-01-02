"use strict;"

var fs = require("fs");
// https://www.npmjs.com/package/uglify-js : https://github.com/mishoo/UglifyJS2 : npm install uglify-js
var UglifyJS = require("uglify-js");
var jsonm = require("./JSON.minify/minify.json.js")();

function Minify()
{
var self = this;

this.make = function()
	{
	try {
		var obj;
		var edge;
		var loader;
		var result;
		var edgeJS;
		var jquery;
		var json = "";
		var hasJSDirectory = true;

		if(process.argv.length < 5)
			process.stdout.write("\n :: Usage: node minify [js|css|loader|all] <source directory </var/lib/spaceify/code/www/>> <destination directory </var/lib/spaceify/code/www/>>");

		var operation = (process.argv.length >= 3 ? process.argv[2] : "");
		var sourcePath = (process.argv.length >= 4 ? process.argv[3] : "/var/lib/spaceify/code/www/");
		var targetPath = (process.argv.length >= 5 ? process.argv[4] : "/var/lib/spaceify/code/www/");

		if(operation != "js" && operation != "css" && operation != "loader" && operation != "all")
			throw "Operation must be js, css, loader or all. Exiting.";

		process.stdout.write("\n :: Minify/uglify - operation '" + operation + "', source '" + sourcePath + "', destination '" + targetPath + "'");

		//	//	//	//	//	//	//
		//	//	//	//	//	//	//
		// LOADER - JAVASCRIPT	//
		//	//	//	//	//	//	//
		//	//	//	//	//	//	//

		if(operation == "loader" || operation == "all")
			{
			process.stdout.write("\n :: Uglifying SpaceifyLoader JavaScript");

			loader = parse(sourcePath, sourcePath + "spaceifyloader/minify.csv");
			try { fs.accessSync(targetPath + "js", fs.F_OK); } catch(err) { hasJSDirectory = false; }

			result = UglifyJS.minify(loader.js).code;
			result = result.replace(/"use strict";/g, "");
			if(hasJSDirectory)
				fs.writeFileSync(targetPath + "js/spaceify.loader.js", result, "utf8");
			fs.writeFileSync(targetPath + "spaceifyloader/libs/spaceify.loader.js", result, "utf8");

			result = "";
			for(var i = 0; i < loader.js.length; i++)
				result += fs.readFileSync(loader.js[i], "utf8");
			if(hasJSDirectory)
				fs.writeFileSync(targetPath + "js/spaceify.loader.bundle.js", result, "utf8");
			fs.writeFileSync(targetPath + "spaceifyloader/libs/spaceify.loader.bundle.js", "\n" + result, "utf8");
			}

		//	//	//	//	//	//	//	//	//	//
		//	//	//	//	//	//	//	//	//	//
		// EDGE / APPLICATION - JAVASCRIPT	//
		//	//	//	//	//	//	//	//	//	//
		//	//	//	//	//	//	//	//	//	//

		if(operation == "js" || operation == "css" || operation == "all")
			edge = parse(sourcePath, sourcePath + "libs/minify.csv");

		if(operation == "js" || operation == "all")
			{
			process.stdout.write("\n :: Uglifying Edge and App JavaScript");

				// PREREQUISITIES -- -- -- -- -- -- -- -- -- -- //
					// ++ EDGE ++ //
			fs.writeFileSync(targetPath + "js/spaceify.edge.js", "\"use strict\";", "utf8");
			fs.writeFileSync(targetPath + "js/spaceify.edge.bundle.js", "\"use strict\";", "utf8");
			//fs.appendFileSync(targetPath + "js/spaceify.edge.js", "if(typeof window.angular!=\"undefined\"){delete window.angular;}", "utf8");
			//fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "if(typeof window.angular!=\"undefined\"){delete window.angular;}", "utf8");

			result = fs.readFileSync(sourcePath + "js/angular-1.5.3.min.js", "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + result, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + result, "utf8");

			jquery = fs.readFileSync(sourcePath + "js/jquery.min.js", "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + jquery, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + jquery, "utf8");

			result = UglifyJS.minify(sourcePath + "js/spaceify.angular.js").code;
			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n" + result, "utf8");
			result = fs.readFileSync(sourcePath + "js/spaceify.angular.js", "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n" + result, "utf8");

					// ++ APP ++ //
			fs.writeFileSync(targetPath + "js/spaceify.app.js", "\"use strict\";", "utf8");
			fs.writeFileSync(targetPath + "js/spaceify.app.bundle.js", "\"use strict\";", "utf8");

			fs.writeFileSync(targetPath + "js/spaceify.app.jquery.js", "\"use strict\";" + "\n\n" + jquery, "utf8");
			fs.writeFileSync(targetPath + "js/spaceify.app.jquery.bundle.js", "\"use strict\";" + "\n\n" + jquery, "utf8");

				// Uglify / Bundle JavaScript -- -- -- -- -- -- -- -- -- -- //
			edgeJS = UglifyJS.minify(edge.js).code;
			edgeJS = edgeJS.replace(/"use strict";/g, "");

			result = "";
			for(var i = 0; i < edge.js.length; i++)
				result += "\n" + fs.readFileSync(edge.js[i], "utf8");
		
					// ++ EDGE ++ //
			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + edgeJS, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + result, "utf8");

					// ++ APP ++ //
			fs.appendFileSync(targetPath + "js/spaceify.app.js", "\n\n" + edgeJS, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.app.bundle.js", "\n\n" + result, "utf8");

			fs.appendFileSync(targetPath + "js/spaceify.app.jquery.js", "\n\n" + edgeJS, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.app.jquery.bundle.js", "\n\n" + result, "utf8");

				// Minify JSON -- -- -- -- -- -- -- -- -- -- //
			process.stdout.write("\n :: Minifying Edge and App JSON");

			json = "";
			for(var i = 0; i < edge.json.length; i++)
				{
				result = fs.readFileSync(edge.json[i].file, "utf8");
				result = JSON.minify(result);
				json += "window." + edge.json[i].parameter + "=" + result + ";";
				}

					// ++ EDGE ++ //
			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + json, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + json, "utf8");

					// ++ APP ++ //
			fs.appendFileSync(targetPath + "js/spaceify.app.js", "\n\n" + json, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.app.bundle.js", "\n\n" + json, "utf8");

			fs.appendFileSync(targetPath + "js/spaceify.app.jquery.js", "\n\n" + json, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.app.jquery.bundle.js", "\n\n" + json, "utf8");

				// Minify locales -- -- -- -- -- -- -- -- -- -- //
			process.stdout.write("\n :: Minifying Edge language JSON");

			for(var i = 0, obj = {}; i < edge.locale.length; i++)
				{
				result = fs.readFileSync(edge.locale[i].file, "utf8");
				obj[edge.locale[i].locale] = makeSections(result);
				}

			result = JSON.minify(JSON.stringify(obj));
			result = (edge.groups["locale"].context + "." + edge.groups["locale"].property) + "=" + result + ";";

			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + result, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + result, "utf8");

				// Pack tiles -- -- -- -- -- -- -- -- -- -- //
			process.stdout.write("\n :: Packing Edge tiles");

			for(var i = 0, obj = {}; i < edge.tile.length; i++)
				{
				result = fs.readFileSync(edge.tile[i].file, "utf8");

				obj[edge.tile[i].type] = result.replace(/[\\\t\\\n]/g, "");
				}

			result = JSON.minify(JSON.stringify(obj));
			result = (edge.groups["tiles"].context + "." + edge.groups["tiles"].property) + "=" + result;

			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + result + ";", "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + result + ";", "utf8");

				// Initializing -- -- -- -- -- -- -- -- -- -- //
					// ++ EDGE ++ //
			result = fs.readFileSync(sourcePath + "js/initialize.edge.js", "utf8");

			fs.appendFileSync(targetPath + "js/spaceify.edge.js", "\n\n" + result, "utf8");
			fs.appendFileSync(targetPath + "js/spaceify.edge.bundle.js", "\n\n" + result, "utf8");
		}

		//	//	//	//	//
		//	//	//	//	//
		// EDGE - CSS	//
		//	//	//	//	//
		//	//	//	//	//
		if(operation == "css" || operation == "all")
			{
			process.stdout.write("\n :: Minifying Edge CSS");

			for(var i = 0; i < edge.css.length; i++)
				{
				result = fs.readFileSync(edge.css[i], "utf8");

				result = result.replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g, "");		// Comments
				result = result.replace(/^[ \t]+|[ \t]+$/gm, "");											// Leading and trailing whitespace
				result = result.replace(/\n/gm, "");														// Line breaks
				result = result.replace(/:([ \t]*)/gm, ":");												// Space after colon
				result = result.replace(/[ \t]*{/gm, "{");													// Space after opening curly bracket
				result = result.replace(/}[ \t]*/gm, "}");													// Space after closing curly bracket
				result = result.replace(/,[ \t]*|[ \t]*,/gm, ",");											// Space before or after comma

				fs.writeFileSync(edge.css[i].replace(".css", ".edge.css"), result, "utf8");
				}
			}
		}
	catch(err)
		{
		process.stdout.write("\n :: error: " + err + "\n\n");
		process.exit(1);
		}
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

var parse = function(sourcePath, minifyFile)
	{
	var lines;
	var tokens;
	var result;
	var js = [];
	var css = [];
	var json = [];
	var tile = [];
	var locale = [];
	var groups = {};
	var csv = fs.readFileSync(minifyFile, "utf8");

	lines = csv.split("\n");

	for(var i=0; i<lines.length; i++)
		{
		lines[i] = lines[i].trim();

		if(lines[i] == "" || lines[i].charAt(0) == "#")
			continue;

		if(lines[i].charAt(0) == "!")
			{
			result = lines[i].replace("!", "");
			result = result.split(":");
			groups[result[0]] = {context: result[1], property: result[2]};
			continue;
			}

		tokens = lines[i].split("\t");

		if(tokens.length != 5)
			continue;

		if(tokens[0] == "javascript")
			js.push(sourcePath + tokens[1]);
		else if(tokens[0] == "css")
			css.push(sourcePath + tokens[1]);
		else if(tokens[0] == "json")
			json.push({file: sourcePath + tokens[1], parameter: tokens[4] });
		else if(tokens[0] == "locale")
			locale.push({file: sourcePath + tokens[1], locale: tokens[2]});
		else if(tokens[0] == "tile")
			tile.push({file: sourcePath + tokens[1], type: tokens[2]});
		}

	return { js: js, css: css, json: json, tile: tile, locale: locale, groups: groups };
	}

}

var minify = new Minify()
minify.make();
