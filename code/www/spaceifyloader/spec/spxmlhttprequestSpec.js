
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

var totaltime = 0;
var repetitions = 1000;
var results = new Array(repetitions);

describe("SpXMLHttpRequest", function()
	{
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
				writeCsv();

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
	if(index == repetitions + 1)
		{
		done();
		return;
		}

	var startTime;
	var elapsedTime;
	var bytesReceived;
	var megabitsReceived;
	var xhr = new SpXMLHttpRequest();

	xhr.onreadystatechange = function()
		{
		if (xhr.readyState == 4)
			{
			totaltime += Date.now() - startTime;
			elapsedTime = (Date.now() - startTime) / 1000;
			elapsedTime = (elapsedTime == 0 ? 0.001 : elapsedTime);		// Less than 1 ms, round up to 1 ms

			bytesReceived = parseInt(xhr.getResponseHeader("content-length"));
			megabitsReceived = bytesReceived * 8 / 1024 / 1024;

			results[index++] = elapsedTime + "\t" + bytesReceived + "\t" + (megabitsReceived / elapsedTime).toFixed(2) + "\n";

			requests(index, done);
			}
		}

	xhr.open("GET", "http://edge.spaceify.net/index.html?count=" + index, true);
	startTime = Date.now();
	xhr.send(null);
	}

var writeCsv = function()
	{
	var fs = require('fs');

	fs.writeFileSync("/tmp/spxmlhttprequestSpec.csv", "elapsed\tbytes\tMbits/s\n", "utf8");

	for(var i = 0; i < repetitions; i++)
		fs.appendFileSync("/tmp/spxmlhttprequestSpec.csv", results[i], "utf8");
	}
