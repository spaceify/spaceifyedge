module.exports = function()
{
var self = this;

self.make = function()
	{
	var SpaceifyConfig = require(__dirname + "/../../src/spaceifyconfig");
	var config = SpaceifyConfig.getConfig();

	return "(function spaceifyConfig(){window.speconfig=" + config.toMinifiedJSONString() + ";})();\n";
	}
}
