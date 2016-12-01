
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


function Utf8ArrayToStr(array)
{
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = array.length;
	i = 0;
	while(i < len)
		{
		c = array[i++];
		switch(c >> 4)
		{
		case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
			// 0xxxxxxx
			out += String.fromCharCode(c);
		break;
		case 12: case 13:
			// 110x xxxx   10xx xxxx
			char2 = array[i++];
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
		break;
		case 14:
			// 1110 xxxx  10xx xxxx  10xx xxxx
			char2 = array[i++];
			char3 = array[i++];
			out += String.fromCharCode(((c & 0x0F) << 12) |
							((char2 & 0x3F) << 6) |
							((char3 & 0x3F) << 0));
		break;
		}
	}

	return out;
}
function ab2str(buf)
	{
	return Utf8ArrayToStr(buf);
	//return String.fromCharCode.apply(null, new Uint8Array(buf));
	}

function toab(str)
	{
	var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++)
		{
		bufView[i] = str.charCodeAt(i);
		}
	return buf;
	}

var SERVER_ADDRESS = {host: "localhost", port: 1979};
var WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

if (typeof(exports) !== "unefined")
	{
	global.SERVER_ADDRESS = SERVER_ADDRESS;
	global.WEBRTC_CONFIG = WEBRTC_CONFIG;
	}
	
describe("PiperClient", function() 
	{
	var HUB_HOST = "localhost";
	var HUB_PORT = "1979";
	var CLIENT_TYPE = "communicationclient";
	var GROUP_ID = "testgroup";
	
	var SpaceifyLoader = null;

	if (typeof(exports) !== "undefined")
		{
		PiperClient = require("../src/piperclient");
		}
	
	else
		PiperClient = window.PiperClient;
	
	/*
	beforeEach(function()
		{
		communicationHub = new CommunicationHub();
		communicationHub.run();	
		});
	*/	
	var piperClient = null;
	
	it("Connects to a CommunicationHub and builds a direct connection to the SpaceifyPiper", function(done) 
		{
		piperClient = new PiperClient();
		piperClient.connect(HUB_HOST, HUB_PORT, function()
			{
			console.log("Jasmine Connected");
			done();
			});
		
    	}); 
    
    var tcpTunnelId = null;
    
    function HttpPrinter(times, done)
    	{
    	var self = this;
    	var counter = 0;
		var startTime = 0;
		var bytesReceived = 0;

		self.start = function(){

			startTime = Date.now();
		}

   		self.printHttp = function(data) 
    		{
			var dataArray = new Uint8Array(data);

			

    		//console.log(ab2str(dataArray));
    		//counter++;
    		//console.log(counter);
			
			bytesReceived += dataArray.byteLength;

			console.log("dataArrayLength: "+dataArray.byteLength);

			var elapsedTime = (Date.now()-startTime)/1000;
			console.log("Time elapsed: "+elapsedTime+" s");

			var megabitsReceived = bytesReceived * 8 / 1024 / 1024;
			console.log("Average download speed: "+ (megabitsReceived/elapsedTime).toFixed(2) + " Mbit/s");
			//timer = Date.now();
    		
    		var temp = ab2str(dataArray);
    		var count = (temp.match(/\r\n\r\n/g) || []).length;
    		
    		counter += count;
    		console.log("HTTP replies received: " +counter);
    		if (counter>=times)
    			done();
    		}; 	
    	
    	};
    	
   
   	var repetitions = 1000;
    var request1 = "GET /index.html?count="; 
    var request2= " HTTP/1.1\r\nHost: localhost\r\nConnection: keep-alive\r\n\r\n";
	//var data = toab(request);
	
		
    it("creates a TCP relay tunnel to localhost port 80 over WebSocket relay and sends "+repetitions+" HTTP Requests", function(done) 
		{
		var printer = new HttpPrinter(repetitions, done);
		piperClient.createTcpTunnel("localhost", "80", printer.printHttp, function(connectionId)
			{
			printer.start();
			console.log("Jasmine TCP tunnel ready");
			tcpTunnelId = connectionId;
			for (var i=0; i< repetitions; i++)
				{
				piperClient.sendTcpBinary(tcpTunnelId, toab(request1+i+request2));	
				}
			});
    	});
    /*	 	
     it("upgrades the connection to the SpaceifyPiper to WebRtc", function(done)
		{
		piperClient.upgradeToWebRtc(function()
			{
			console.log("Jasmine upgraded to WebRtc");
			done();
			});
		});
	
	repetitions = 1000;	
	 it("creates a TCP relay tunnel to localhost port 80 over WebRtc and sends "+repetitions+" HTTP Requests", function(done) 
		{
		var printer = new HttpPrinter(repetitions, done);
		piperClient.createTcpTunnel("localhost", "80", printer.printHttp, function(connectionId)
			{
			printer.start();
			console.log("Jasmine TCP tunnel ready");
			tcpTunnelId = connectionId;
			for (var i=0; i< repetitions; i++)
				{
				var data = toab(request1+i+request2);
				
				console.log("Trying to send a request");
				piperClient.sendTcpBinary(tcpTunnelId, data);	
				}
			});
    	});
	*/		
});