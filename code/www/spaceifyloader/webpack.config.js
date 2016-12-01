var webpack = require("webpack");
//var ignore = new webpack.IgnorePlugin(/^[^.]/);
//var ignore = new webpack.IgnorePlugin(new RegExp("^(websocket)$"))
//externals: {"websocket": "window.WebSocket"},

module.exports = 
	{
	externals: {"websocket": "websocket", "wrtc": "wrtc"},
	entry: "./src/spaceifyloader.common.js",
	output: 
		{
        libraryTarget: "umd", 	// export itself to a global var
        library: "spl", 		// name of the global var: "Foo"
		path: "./out",
		filename: 'spaceifyloader.bundle.js'
		},
	plugins: [
	new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify('browser')
    	}
		})
	]	
     };