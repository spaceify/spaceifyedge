
var specReporter = new function()
	{
	var self = this;

	self.specStarted = function(result)
		{
		self.name = result.fullName;
		console.log("\n-----------------------"+self.name+"------------------------------\n");
		}
	};

jasmine.getEnv().addReporter(specReporter);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3600000;

var repetions;

function makeRequests(index, done)
	{
	if(++index == repetions + 1)
		{
		done();
		return;
		}

	var startTime;
	var elapsedTime;
	var megabitsReceived;
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			elapsedTime = (Date.now() - startTime) / 1000;
			console.log("Time elapsed: " + elapsedTime + " s");

			megabitsReceived = parseInt(xhr.getResponseHeader("content-length")) * 8 / 1024 / 1024;
			console.log("Average download speed: " + (megabitsReceived / elapsedTime).toFixed(2) + " Mbit/s\n\n");

			makeRequests(index, done);
			}
		}

	xhr.open("GET", "http://localhost/index.html?count=" + index, true);
	startTime = Date.now();
	xhr.send(null);
	}


describe("FakeXMLHttpRequest", function()
	{
	repetions = 1000;

	if (typeof(exports) !== "undefined")
		{
		
		//SpXMLHttpRequest = require("../src/spxmlhttprequest");
		}
	else
		{
		
		//SpXMLHttpRequest = window.SpXMLHttpRequest;
		}

	var SERVER_ADDRESS = {host: "localhost", port: 1979};

	it("Makes a number of HTTP get requests", function(done)
		{
		makeRequests(0, done);
		});

// 	it("Upgrades the connection to the SpaceifyPiper to WebRtc", function(done)
// 		{
// 		LoaderUtil.piperClient.upgradeToWebRtc(function()
// 			{
// 			requests(1001, done);
// 			});
// 		});
	});

