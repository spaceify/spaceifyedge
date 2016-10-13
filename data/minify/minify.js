"use strict;"

var fs = require("fs");
var UglifyJS = require("uglify-js");

try {
	var lines;
	var tokens;
	var result = "";
	var spaceifyCSV;
	var cssFile = "";
	var jsFiles = [];
	var jsAsIsFiles = [];
	var cssFiles = [];
	var path = process.argv[2];

		// GET FILES -- -- -- -- -- -- -- -- -- --
	spaceifyCSV = fs.readFileSync(path + "/code/www/libs/inject/spaceify.csv", "utf8");

	lines = spaceifyCSV.split("\n");

	for(var i=0; i<lines.length; i++)
		{
		lines[i] = lines[i].trim();

		if(lines[i] == "" || lines[i].charAt(0) == "#")
			continue;

		tokens = lines[i].split("\t");

		if(tokens.length != 5)
			continue;

		if(tokens[0] == "javascript")
{
if(tokens[1] == "libs/webjsonrpc/binaryrpccommunicator.js" || tokens[1] == "libs/webjsonrpc/rpccommunicator.js")
	jsAsIsFiles.push(path + "/code/www/" + tokens[1]);
else
	jsFiles.push(path + "/code/www/" + tokens[1]);
}
		else if(tokens[0] == "css")
			cssFiles.push(path + "/code/www/" + tokens[1]);
		}

		// Uglify JavaScript -- -- -- -- -- -- -- -- -- --
	console.log("\n : Uglifying JavaScript")

	result = UglifyJS.minify(jsFiles, { mangle: { except: ["..."] } }).code;
	result = result.replace(/"use strict";/g, "");
	fs.writeFileSync(path + "/code/www/js/spaceify.min.js", "\"use strict\";" + result, "utf8");

for(var i = 0; i < jsAsIsFiles.length; i++)
{
	result = fs.readFileSync(jsAsIsFiles[i], "utf8");
	fs.appendFileSync(path + "/code/www/js/spaceify.min.js", result, "utf8");
}

		// Minify CSS -- -- -- -- -- -- -- -- -- --
	console.log(" : Minifying CSS")

	for(var i = 0; i < cssFiles.length; i++)
		{
		result = fs.readFileSync(cssFiles[i], "utf8");

		result = result.replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g, "");		// Comments
		result = result.replace(/^[ \t]+|[ \t]+$/gm, "");											// Leading and trailing whitespace
		result = result.replace(/\n/gm, "");														// Line breaks
		result = result.replace(/:([ \t]*)/gm, ":");												// Space after colon
		result = result.replace(/[ \t]*{/gm, "{");													// Space after opening curly bracket
		result = result.replace(/}[ \t]*/gm, "}");													// Space after closing curly bracket
		result = result.replace(/,[ \t]*|[ \t]*,/gm, ",");											// Space before or after comma

		cssFile = cssFiles[i].replace(".css", ".min.css");
		fs.writeFileSync(cssFile, result, "utf8");
		}
	}
catch(err)
	{
	console.log("\n\nUGLIFYING/MINIFYING ERROR:", err, "\n");
	process.exit(1);
	}