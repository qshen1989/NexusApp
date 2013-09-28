var URL_LOGIN = "http://10.136.99.119/myWOW/login.php";
var URL_REGISTER = "http://10.136.99.119/myWOW/register.php";
function getLoginResponse(type) {
	if (type == 1) {
		//normal user login
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				alert('success');
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				alert('error');
			},
			timeout : 5000 // in milliseconds
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	} else {
		//facebook user login

	}
}

function getRegisterResponse() {

}
