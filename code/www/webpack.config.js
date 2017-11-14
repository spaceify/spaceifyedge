var webpack = require("webpack");
var SpaceifyPlugin = require("./plugins/spaceify-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");

var lib;
var libraryname = "spe";
var splibraryname = "sp";
var spllibraryname = "spl";

const config =
	{
	target: "node",
	externals: [/^[a-z\-0-9]+$/],
	output:
		{
		libraryTarget: "umd", 	// export itself to a global var
		umdNamedDefine: true,
		library: libraryname, 	// name of the global var: "Foo"
		path: "./libs"
		},
	plugins:
		[
		new StringReplacePlugin()
		],
	module:
		{
		exprContextCritical: false,

		rules: [{
				test: /\.js$/,
				loader: StringReplacePlugin.replace(
					{
					replacements: [{
						pattern: /WEBPACK_MAIN_LIBRARY|WEBPACK_SP_LIBRARY|WEBPACK_SPL_LIBRARY/g,
						replacement: function (match, p1, p2)
							{
							if(match == "WEBPACK_MAIN_LIBRARY")
								lib = libraryname;
							else if(match == "WEBPACK_SP_LIBRARY")
								lib = splibraryname;
							else if(match == "WEBPACK_SPL_LIBRARY")
								lib = spllibraryname;

							return lib;
							}
						}]
					})
				}
			]
		}
	};

	// -- -- -- -- -- -- -- -- -- -- //
var spaceifyPluginOptions = 
	{
	basepath: "../src/webpack/",
	};

if (process.env.WEBPACK_MODE === "edge-prod")
	{
	config.output.filename = "spaceify.edge.js";
	config.entry = "./src/spaceify.edge.common.js";

	spaceifyPluginOptions.prepend = [],
	spaceifyPluginOptions.append = ["config.module.js", "locales.module.js", "tiles.module.js", "classes.js"]
	}
else if (process.env.WEBPACK_MODE === "edge-bundle")
	{
	config.output.filename = "spaceify.edge.bundle.js";
	config.entry = "./src/spaceify.edge.common.js";

	spaceifyPluginOptions.prepend = [],
	spaceifyPluginOptions.append = ["config.module.js", "locales.module.js", "tiles.module.js", "classes.js"]
	}
else if (process.env.WEBPACK_MODE === "api-prod")
	{
	config.output.filename = "spaceify.api.js";
	config.entry = "./src/spaceify.api.common.js";

	spaceifyPluginOptions.prepend = [];
	spaceifyPluginOptions.append = ["config.module.js", "classes.js"];
	}
else if (process.env.WEBPACK_MODE === "api-bundle")
	{
	config.output.filename = "spaceify.api.bundle.js";
	config.entry = "./src/spaceify.api.common.js";

	spaceifyPluginOptions.prepend = [];
	spaceifyPluginOptions.append = ["config.module.js", "classes.js"];
	}

if (process.env.WEBPACK_MODE.match(/prod/))
	{
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	}

config.plugins.push(new SpaceifyPlugin(spaceifyPluginOptions));

module.exports = config;
