Ti.include('UserData.js');
var URL_PREFIX = "http://192.168.1.107/myWOW/topic.php?";
var responseCode = 0;


function showFriends(){
	responseCode = 0;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			    Ti.API.info('GOT ' + this.responseText);
				Ti.App.Properties.setString('friendsXML', this.responseText);
				responseCode = 1;
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			responseCode = -2;
			//alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	var url = URL_PREFIX + "f=showFriends&userID=" + getUserID();
	Titanium.API.info(url);
	client.open("GET", url);
	// Send the request.
	client.send();
}
