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
		var path = (process.argv.length >= 3 ? process.argv[2] : "/var/lib/spaceify");

		if(process.argv.length < 3)
			console.log("\n :: Using default path \'" + path + "/code/www" + "' as the source and target for the minified/uglified files.");
		else
			{
			path = path.replace(/\/^/, "");

			console.log("\n :: Using path \'" + path + "/code/www" + "' as target for the minified/uglified files.");
			}

		//	//	//	//	//	//	//
		//	//	//	//	//	//	//
		// LOADER - JAVASCRIPT	//
		//	//	//	//	//	//	//
		//	//	//	//	//	//	//

		loader = parse(path, "/code/www/libs/spaceifyloader.csv");

		console.log(" :: Uglifying SpaceifyLoader JavaScript");

		loader = UglifyJS.minify(loader.js).code;
		loader = loader.replace(/"use strict";/g, "");
		fs.writeFileSync(path + "/code/www/js/spaceify.loader.js", loader, "utf8");

		//	//	//	//	//	//	//	//	//	//
		//	//	//	//	//	//	//	//	//	//
		// EDGE / APPLICATION - JAVASCRIPT	//
		//	//	//	//	//	//	//	//	//	//
		//	//	//	//	//	//	//	//	//	//

		edge = parse(path, "/code/www/libs/spaceify.csv");

			// PREREQUISITIES -- -- -- -- -- -- -- -- -- -- //
				// ++ EDGE ++ //
		fs.writeFileSync(path + "/code/www/js/spaceify.edge.js", "\"use strict\";", "utf8");
		//fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "if(typeof window.angular!=\"undefined\"){delete window.angular;}", "utf8");

		result = fs.readFileSync(path + "/code/www/js/angular-1.5.3.min.js", "utf8");
		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + result, "utf8");

		jquery = fs.readFileSync(path + "/code/www/js/jquery.min.js", "utf8");
		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + jquery, "utf8");

		result = UglifyJS.minify(path + "/code/www/js/spaceifyapp.js").code;
		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n" + result, "utf8");

				// ++ APP ++ //
		fs.writeFileSync(path + "/code/www/js/spaceify.app.js", "\"use strict\";", "utf8");

		fs.writeFileSync(path + "/code/www/js/spaceify.app.jquery.js", "\"use strict\";" + "\n\n" + jquery, "utf8");

			// Uglify JavaScript -- -- -- -- -- -- -- -- -- -- //
		console.log(" :: Uglifying Edge and App JavaScript");

		edgeJS = UglifyJS.minify(edge.js).code;
		edgeJS = edgeJS.replace(/"use strict";/g, "");

			// ++ EDGE ++ //
		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + edgeJS, "utf8");

			// ++ APP ++ //
		fs.appendFileSync(path + "/code/www/js/spaceify.app.js", "\n\n" + edgeJS, "utf8");

		fs.appendFileSync(path + "/code/www/js/spaceify.app.jquery.js", "\n\n" + edgeJS, "utf8");

			// Minify JSON -- -- -- -- -- -- -- -- -- -- //
		console.log(" :: Minifying Edge and App JSON");

		json = "";
		for(var i = 0; i < edge.json.length; i++)
			{
			result = fs.readFileSync(edge.json[i].file, "utf8");
			result = JSON.minify(result);
			json += "window." + edge.json[i].parameter + "=" + result + ";";
			}

			// ++ EDGE ++ //
		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + json, "utf8");

			// ++ APP ++ //
		fs.appendFileSync(path + "/code/www/js/spaceify.app.js", "\n\n" + json, "utf8");

		fs.appendFileSync(path + "/code/www/js/spaceify.app.jquery.js", "\n\n" + json, "utf8");

			// Minify locales -- -- -- -- -- -- -- -- -- -- //
		console.log(" :: Minifying Edge language JSON");

		for(var i = 0, obj = {}; i < edge.locale.length; i++)
			{
			result = fs.readFileSync(edge.locale[i].file, "utf8");
			obj[edge.locale[i].locale] = makeSections(result);
			}

		result = JSON.minify(JSON.stringify(obj));
		result = (edge.groups["locale"].context + "." + edge.groups["locale"].property) + "=" + result + ";";

		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + result, "utf8");

			// Pack tiles -- -- -- -- -- -- -- -- -- -- //
		console.log(" :: Packing Edge tiles");

		for(var i = 0, obj = {}; i < edge.tile.length; i++)
			{
			result = fs.readFileSync(edge.tile[i].file, "utf8");

			obj[edge.tile[i].type] = result.replace(/[\\\t\\\n]/g, "");
			}

		result = JSON.minify(JSON.stringify(obj));
		result = (edge.groups["tiles"].context + "." + edge.groups["tiles"].property) + "=" + result;

		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + result + ";", "utf8");

			// Initializing -- -- -- -- -- -- -- -- -- -- //
			// ++ EDGE ++ //
		result = fs.readFileSync(path + "/code/www/js/initializeedge.js", "utf8");
		fs.appendFileSync(path + "/code/www/js/spaceify.edge.js", "\n\n" + result, "utf8");

			// ++ APP ++ //
		result = fs.readFileSync(path + "/code/www/js/initializeapp.js", "utf8");

		fs.appendFileSync(path + "/code/www/js/spaceify.app.js", "\n\n" + result, "utf8");

		fs.appendFileSync(path + "/code/www/js/spaceify.app.jquery.js", "\n\n" + result, "utf8");

		//	//	//	//	//
		//	//	//	//	//
		// EDGE - CSS	//
		//	//	//	//	//
		//	//	//	//	//

		console.log(" :: Minifying Edge CSS");

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
	catch(err)
		{
		console.log("\n\nUGLIFYING/MINIFYING ERROR:", err, "\n");
		process.exit(1);
		}
	}

var makeSections = function(locale)
	{
	locale = JSON.parse(locale);

	var current;
	var sections = {};
	var globals = locale.globals;

	for(var section in locale)
		{
		if(section == "global")
			continue;

		current = locale[section];

		for(var i in globals)
			{
			if(i == "locale" || i == "encoding" || i == "description")
				continue;

			current[i] = globals[i];
			}

		sections[section] = current;
		}

	return sections;
	}

var parse = function(path, filepath)
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
	var csv = fs.readFileSync(path + filepath, "utf8");

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
			js.push(path + "/code/www/" + tokens[1]);
		else if(tokens[0] == "css")
			css.push(path + "/code/www/" + tokens[1]);
		else if(tokens[0] == "json")
			json.push({file: path + "/code/www/" + tokens[1], parameter: tokens[4] });
		else if(tokens[0] == "locale")
			locale.push({file: path + "/code/www/" + tokens[1], locale: tokens[2]});
		else if(tokens[0] == "tile")
			tile.push({file: path + "/code/www/" + tokens[1], type: tokens[2]});
		}

	return { js: js, css: css, json: json, tile: tile, locale: locale, groups: groups };
	}

}

var minify = new Minify()
minify.make();
