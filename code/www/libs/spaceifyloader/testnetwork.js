window.isSpaceifyNetwork = true;
var xhr = new XMLHttpRequest();
xhr.open("HEAD", window.location.protocol + "//10.0.0.1/templates/test.txt", true);
xhr.timeout = 30;
xhr.onreadystatechange = function()
	{
	if(xhr.readyState == 4)
		window.isSpaceifyNetwork = (xhr.status >= 200 && xhr.status < 304 ? true : false);
	};
xhr.send();