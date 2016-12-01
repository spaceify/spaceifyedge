
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

var totaltime;
var repetitions;

describe("SpXMLHttpRequest", function()
	{
	totaltime = 0;
	repetitions = 1000;

	if (typeof(exports) !== "undefined")
		{
		LoaderUtil = require("../src/loaderutil");
		SpXMLHttpRequest = require("../src/spxmlhttprequest");
		}
	else
		{
		LoaderUtil = new window.LoaderUtil();
		SpXMLHttpRequest = window.SpXMLHttpRequest;
		}

	var SERVER_ADDRESS = {host: "localhost", port: 1979};

	it("Connects to a CommunicationHub using SpXMLHttpRequest", function(done)
		{
		LoaderUtil.piperClient.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, function(id)
			{

			/*LoaderUtil.piperClient.testPing(function(totaltime, repetitions)
				{
				console.log("Total time: " + (totaltime / 1000) + " s, Requests per second: " + (repetitions / (totaltime / 1000)).toFixed(2));
				done();
				});*/

			requests(0, function()
				{
				console.log("Total time: " + (totaltime / 1000) + " s, Requests per second: " + (repetitions / (totaltime / 1000)).toFixed(2));

				done();
				});
			});
		});

// 	it("Upgrades the connection to the SpaceifyPiper to WebRtc", function(done)
// 		{
// 		LoaderUtil.piperClient.upgradeToWebRtc(function()
// 			{
// 			requests(1001, done);
// 			});
// 		});
	});

function requests(index, done)
	{
	if(++index == repetitions + 1)
		{
		done();
		return;
		}

	var startTime;
	var elapsedTime;
	var megabitsReceived;
	var xhr = new SpXMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			totaltime += Date.now() - startTime;
			elapsedTime = (Date.now() - startTime) / 1000;
			console.log("Time elapsed: " + elapsedTime + " s");

			megabitsReceived = parseInt(xhr.getResponseHeader("content-length")) * 8 / 1024 / 1024;
			console.log("Average download speed: " + (megabitsReceived / elapsedTime).toFixed(2) + " Mbit/s\n\n");

			requests(index, done);
			}
		}

	xhr.open("GET", "http://edge.spaceify.net/index.html?count=" + index, true);
	startTime = Date.now();
	xhr.send(null);
	}