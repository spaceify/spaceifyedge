"use strict";

var fs = require("fs");
var module_ = require("./config.module.js");

var config = (new module_()).make();

fs.writeFileSync(__dirname + "/../../libs/spaceify.config.js", config, "utf8");
