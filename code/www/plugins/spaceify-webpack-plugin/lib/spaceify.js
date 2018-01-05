/**
 * Spaceify webpack plugin by Spaceify Oy, 9.2.2017
 *
 * Prepended and appended user defined files to the beginning or end of the webpack chunk(s) as strings.
 *
 * The files and the basepath where the files are located are passed in a JSON object.
 * 
 * {
 *   basepath: "...",
 *   prepend: [...],
 *   append: [...]  
 * }
 *
 * The basepath can be relative or absolute. When basepath is relative it is with respect to the parent 
 * directory of the plugin. Do not add extra ../ to factor in the actual "spaceify-webpack-plugin" plugin 
 * directory! Path is considered to be relative if it starts with '../'.
 *
 * Prepend and append contain list of filenames of the files that should be prepended or appended to the chunk(s). 
 * The filenames can contain path part. Example:
 * 
 * webpack.config.js:
 *   ...
 *   {
 *     basepath: "../src",
 *     prepend: ["classa.js", "more/classb.js"],
 *     append: []
 *   }
 *   ...
 *
 * Plugin:
 *   ...
 *   // ==> ../src/classa.js
 *   // ==> ../src/more/classb.js
 *   ...
 * 
 * The files are prepended and appended to the chunks(s) by default as strings. Filenames ending with '.module.js'
 * are presumed to be Node.js modules and are not prepended or appended to the chunk(s). The plugin runs the modules
 * and the modules can create the strings dynamically. The dynamically created strings are then prepended or appended
 * to the chunks. It is expected that the modules have 'make' function and that the function returns a string. Example:
 *
 * module.exports = function()
 *   {
 *   this.make = function()
 *     {
 *     var str = "Prepend or append me.";
 *
 *     return str;
 *     }
 *   }
 *
 * ----------
 *
 * USAGE: webpack.config.js
 *
 * var SpaceifyPlugin = require("spaceify-webpack-plugin");
 *
 * module.exports =
 *   {
 *   ...
 *   plugins:
 *     [
 *     new SpaceifyPlugin({basepath: "...", append: [...], prepend: [...]})
 *     ],
 *   ...
 *   };
 */

var ConcatSource = require("../../../node_modules/webpack-sources/lib/ConcatSource");

var options;

function Spaceify(options_) { options = options_; }

module.exports = Spaceify;

Spaceify.prototype.apply = function(compiler)
	{
	compiler.plugin("compilation", function(compilation)
		{
		compilation.plugin("optimize-chunk-assets", function(chunks, callback)
			{
			var module_;
			var basepath = "";
			var fs = require("fs");
			var append = "", prepend = "";

			if(!options.basepath.match(/\//))
				options.basepath += "/";

			if(options.basepath.match(/^\.\.\//))									// Developers do not need to add the extra ../../
				{																	// induced to the relative path by 
				options.basepath = "../../" + options.basepath;						// spaceify-webpack-plugin/lib directory

				basepath = __dirname + "/" + options.basepath;
				}
			else																	// Absolute path
				{
				basepath = options.basepath;
				}
							
				// PREPEND -- -- -- -- -- -- -- -- -- -- //
			options.prepend.forEach(function(file, index)
				{
				if(!file.match(/\.module\.js$/))
					prepend += "\n" + fs.readFileSync(basepath + file, "utf8");
				else
					{
					module_ = new require(basepath + file);
					prepend += (new module_()).make();
					}
				});

				// APPEND -- -- -- -- -- -- -- -- -- -- //
			options.append.forEach(function(file, index)
				{
				if(!file.match(/\.module\.js$/))
					append += "\n" + fs.readFileSync(basepath + file, "utf8");
				else
					{
					module_ = new require(basepath + file);
					append += (new module_()).make();
					}
				});

				// CHUNK -- -- -- -- -- -- -- -- -- -- //
			if(prepend == "" && append == "")
				return callback();

			chunks.forEach(function(chunk)
				{
				chunk.files.forEach(function(file, i)
					{
					compilation.assets[file] = new ConcatSource(prepend, "\n", compilation.assets[file]);
					compilation.assets[file] = new ConcatSource(compilation.assets[file], "\n", append);
					});
				});

			callback();
			});
		});
	};
