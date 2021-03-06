Ti.include('../logic/CommonFunctions.js');
function RegisterView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({
		//backgroundImage:'images/RegisterPage/registerBG.png',
		top:pxToDP(87),
		maxZoomScale : 1.0,
		minZoomScale : 1.0,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : true,
		horizontalBounce : false,
		verticalBounce : true,
		scrollingEnabled:true,
		borderWidth:0
	});	
	

	var view = Ti.UI.createView({
		height : 500,
		//backgroundColor:'#845744'
		backgroundImage:'images/RegisterPage/registerBG2.png',
		zIndex:0
	});
	self.add(view);
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var usernameBox = Ti.UI.createTextField({
		hintText : 'Username',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		width : pxToDP(405),
		height : pxToDP(52),
		left : pxToDP(115),
		top : pxToDP(162)
	});
	view.add(usernameBox);

	var passwordBox = Ti.UI.createTextField({
		hintText : 'Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		passwordMask : true,
		width : pxToDP(405),
		height : pxToDP(52),
		left : pxToDP(115),
		top : pxToDP(235)
	});
	view.add(passwordBox);

	var repasswordBox = Ti.UI.createTextField({
		hintText : 'Confirm Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		passwordMask : true,
		width : pxToDP(405),
		height : pxToDP(52),
		left : pxToDP(115),
		top : pxToDP(308)
	});
	view.add(repasswordBox);

	var lastNameBox = Ti.UI.createTextField({
		hintText : 'Last Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		width : pxToDP(405),
		height : 40,
		left : pxToDP(115),
		top : pxToDP(370)
	});
	view.add(lastNameBox);

	var firstNameBox = Ti.UI.createTextField({
		hintText : 'First Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		width : pxToDP(405),
		height : 40,
		left : pxToDP(115),
		top : pxToDP(444)
	});
	view.add(firstNameBox);


	//lastNameBox.addEventListener('blur', function(e) {
	//	self.scrollTo(0,0);
	//});

	var emailBox = Ti.UI.createTextField({
		hintText : 'Email',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		width : pxToDP(405),
		height : 40,
		left : pxToDP(115),
		top : pxToDP(520)
	});
	view.add(emailBox);

	var registerBtn = Ti.UI.createButton({
		backgroundImage: 'images/RegisterPage/registerBtn.png',
		width: pxToDP(405),
		height: pxToDP(78),
		top : pxToDP(620),
		left : pxToDP(115)
	});
	view.add(registerBtn);

	registerBtn.addEventListener('click', function(e) {
		var username = usernameBox.getValue();
		var password = passwordBox.getValue();
		var repassword = repasswordBox.getValue();
		var lastname = lastNameBox.getValue();
		var firstname = firstNameBox.getValue();
		var email = emailBox.getValue();
		if (isNull(username)) {
			alert('Username cannot be empty');
			return;
		} else if (isNull(password)) {
			alert('Password cannot be empty');
			return;
		} else if (isNull(repassword)) {
			alert('Input the same password again');
		} else if (password != repassword) {
			alert('Passwords are not the same');
			return;
		} else if (isNull(firstname)) {
			alert('Last name cannot be empty');
			return;
		} else if (isNull(lastname)) {
			alert('First name cannot be empty');
			return;
		} else if (!isEmail(email)) {
			alert('Email is not valid');
			return;
		} else {
			password = Titanium.Utils.md5HexDigest(password);
			register(username, password, firstname, lastname, email);
		}

	});

	var backBtn = Ti.UI.createButton({
		backgroundImage:'images/RegisterPage/backBtn.png',
		width: pxToDP(405),
		height: pxToDP(78),
		top : pxToDP(730),
		left : pxToDP(115)
	});
	view.add(backBtn);

	backBtn.addEventListener('click', function(e) {
		var registerWindow = getRegisterWindow();
		registerWindow.close(slip_to_right);
	});
	return self;
}

function register(username, password, firstname, lastname, email) {
	getRegisterResponse(username, password, firstname, lastname, email);
	var checker = setInterval(function() {
		if (getResponseCode() == 1) {
			clearInterval(checker);
			alert('Username is not available');
		} else if (getResponseCode() == 2) {
			clearInterval(checker);
			alert('Register succeed!');
			var registerWindow = getRegisterWindow();
			registerWindow.close(slip_to_right);
			var LoginWindow = require('ui/handheld/LoginWindow');
			var loginWindow = new LoginWindow();
			loginWindow.open();
		} else if (getResponseCode() == -2) {
			alert('Connection Error. Please try again later');
		}
	}, 500);
}

module.exports = RegisterView;
