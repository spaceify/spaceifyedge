# spaceify-webpack-plugin

Spaceify webpack plugin by Spaceify Oy, 9.2.2017

Prepended and appended user defined files to the beginning or end of the webpack chunk(s) as strings.

The files and the basepath where the files are located are passed in a JSON object.

```js
{
	basepath: "...",
	prepend: [...],
	append: [...]  
}
```

The basepath can be relative or absolute. When basepath is relative it is with respect to the parent 
directory of the plugin. Do not add extra ../ to factor in the actual "spaceify-webpack-plugin" plugin 
directory! Path is considered to be relative if it starts with '../'.

Prepend and append contain list of filenames of the files that should be prepended or appended to the chunk(s). 
The filenames can contain path part. Example:

```js
webpack.config.js:

...
{
	basepath: "../src",
	prepend: ["classa.js", "more/classb.js"],
	append: []
}
...

Plugin:

	...
	// ==> ../src/classa.js
	// ==> ../src/more/classb.js
	...
```

The files are prepended and appended to the chunks(s) by default as strings. Filenames ending with '.module.js'
are presumed to be Node.js modules and are not prepended or appended to the chunk(s). The plugin runs the modules
and the modules can create the strings dynamically. The dynamically created strings are then prepended or appended
to the chunks. It is expected that the modules have 'make' function and that the function returns a string. Example:

```js
module.exports = function()
	{
	this.make = function()
		{
		var str = "Prepend or append me.";

		return str;
		}
	}
```

## USAGE: webpack.config.js

```js
var SpaceifyPlugin = require("spaceify-webpack-plugin");

module.exports =
	{
	...
	plugins:
		[
		new SpaceifyPlugin({basepath: "...", append: [...], prepend: [...]})
		],
	...
	};
```







