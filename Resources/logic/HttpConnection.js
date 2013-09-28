Ti.include('UserData.js');
var URL_LOGIN = "http://10.136.99.119/myWOW/login.php";
var URL_REGISTER = "http://10.136.99.119/myWOW/register.php";
var responseCode = 0;

function getLoginResponse(username, password) {
	//normal user login
	responseCode = 0;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info('GOT ' + this.responseText);
			if (this.responseText != 'FAILED') {
				setUserID(this.responseText);
				responseCode = 1;
			} else {
				responseCode = -1;
			}
			//alert('success');
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
	var url = URL_LOGIN + "?loginType=1&username=" + username + "&password=" + password;
	Titanium.API.info(url);
	client.open("GET", url);
	// Send the request.
	client.send();
	//setTimeout(function({}))
}

function getResponseCode() {
	return responseCode;
}

function getUserID() {
	return userID;
}

function test() {
	var url = "https://10.136.99.119/myWOW/HelloWorld.php";
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			// this function is called when data is returned from the server and available for use
			// this.responseText holds the raw text return of the message (used for text/JSON)
			// this.responseXML holds any returned XML (including SOAP)
			// this.responseData holds any returned binary data
			Ti.API.debug(this.responseText);
			alert('success');
		},
		onerror : function(e) {
			// this function is called when an error occurs, including a timeout
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000 /* in milliseconds */
	});
	xhr.open("GET", url);
	xhr.send();
	// request is actually sent with this statementF
}

function getFBLoginResponse(uid) {
	responseCode = 0;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info('GOT ' + this.responseText);
			if (this.responseText != 'GOT NEW') {
				setUserID(this.responseText);
				responseCode = 2;
			} else {
				responseCode = 1;
			}

			//alert('success');
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
	var url = URL_LOGIN + "?fbuid=" + uid;
	Titanium.API.info(url);
	client.open("GET", url);
	// Send the request.
	client.send();
}

function getRegisterResponse(username, password, lastname, firstname, email) {
	responseCode = 0;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info('GOT ' + this.responseText);
			if (this.responseText != 'USERNAMEDUPLICATION') {
				//succeed
				setUserID(this.responseText);
				responseCode = 2;
			} else {
				//username duplication
				responseCode = 1;
			}

			//alert('success');
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
	var url = URL_REGISTER + "?username=" + username + "&password=" + password + "&lastName=" + lastname + "&firstName=" + firstname + "&email=" + email;
	Titanium.API.info(url);
	client.open("GET", url);
	// Send the request.
	client.send();
}

function refillPersonalInfo(lastname, firstname, email) {

}
