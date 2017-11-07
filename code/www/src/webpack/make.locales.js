"use strict";

var fs = require("fs");
var module_ = require("./locales.module.js");

var locales = (new module_()).make();

fs.writeFileSync(__dirname + "/../../libs/spaceify.locales.js", locales, "utf8");
