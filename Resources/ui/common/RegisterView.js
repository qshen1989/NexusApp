Ti.include('../logic/CommonFunctions.js');
function RegisterView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		//backgroundImage:'images/WelcomePage/welcomeBG.png'
		borderColor:'#0000C6',
		borderWidth:2
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var usernameBox = Ti.UI.createTextField({
		hintText : 'Username',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 120
	});
	self.add(usernameBox);

	var passwordBox = Ti.UI.createTextField({
		hintText : 'Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 180
	});
	self.add(passwordBox);

	var repasswordBox = Ti.UI.createTextField({
		hintText : 'Confirm Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 240
	});
	self.add(repasswordBox);

	var lastNameBox = Ti.UI.createTextField({
		hintText : 'Last Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width : pxToDP(200),
		height : 40,
		left : 30,
		top : 300
	});
	self.add(lastNameBox);

	var firstNameBox = Ti.UI.createTextField({
		hintText : 'First Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width : pxToDP(200),
		height : 40,
		left : 160,
		top : 300
	});
	self.add(firstNameBox);

	var emailBox = Ti.UI.createTextField({
		hintText : 'Email',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 360
	});
	self.add(emailBox);

	var registerBtn = Ti.UI.createButton({
		title : 'Register',
		width : 100,
		height : 40,
		top : 420,
		left : 40
	});
	self.add(registerBtn);

	var backBtn = Ti.UI.createButton({
		title : 'Back',
		width : 100,
		height : 40,
		top : 420,
		left : 140
	});
	self.add(backBtn);
	
	backBtn.addEventListener('click',function(e){
	var registerWindow = getRegisterWindow();
	registerWindow.close(slip_to_right);
	});
	return self;
}

module.exports = RegisterView;
