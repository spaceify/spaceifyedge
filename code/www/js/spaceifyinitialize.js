var isSpaceifyNetwork = true;
/**
 * Test is web page in local network and after that finish initializing it
 * Spaceify Oy 4.10.2016
*/

var xhr = new XMLHttpRequest();
xhr.open("HEAD", window.location.protocol + "//10.0.0.1/templates/test.txt", true);
xhr.timeout = 1;
xhr.onreadystatechange = function()
	{
	if(xhr.readyState == 4)
		{
		isSpaceifyNetwork = (xhr.status >= 200 && xhr.status < 304 ? true : false);

		// -- -- -- -- -- -- -- -- -- -- //
		if(typeof spaceifyApp !== "undefined")
			angular.bootstrap(document, ["spaceifyApp"]);

		if(typeof window.spaceifyReady == "function")
			{
			spaceifyReady();
			}
		else
			{
			var evt = document.createEvent("Event");
			evt.initEvent("spaceifyReady", true, true);
			window.dispatchEvent(evt);
			}
		}
	};
xhr.send();