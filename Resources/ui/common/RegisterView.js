Ti.include('../logic/CommonFunctions.js');
function RegisterView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({
		//backgroundImage:'images/WelcomePage/welcomeBG.png'
		borderColor : '#0000C6',
		borderWidth : 2,
		maxZoomScale : 1.5,
		minZoomScale : 1.0,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : false,
		horizontalBounce : false,
		verticalBounce : true,
	});
	
	var view = Ti.UI.createView({
	});
	self.add(view);
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var usernameBox = Ti.UI.createTextField({
		hintText : 'Username',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 120
	});
	view.add(usernameBox);

	var passwordBox = Ti.UI.createTextField({
		hintText : 'Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		passwordMask:true,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 180
	});
	view.add(passwordBox);

	var repasswordBox = Ti.UI.createTextField({
		hintText : 'Confirm Password',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		passwordMask:true,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 240
	});
	view.add(repasswordBox);

	var lastNameBox = Ti.UI.createTextField({
		hintText : 'Last Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		width : pxToDP(200),
		height : 40,
		left : 30,
		top : 300
	});
	view.add(lastNameBox);

	var firstNameBox = Ti.UI.createTextField({
		hintText : 'First Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		width : pxToDP(200),
		height : 40,
		left : 160,
		top : 300
	});
	view.add(firstNameBox);
	
	lastNameBox.addEventListener('focus',function(e){
		view.setHeight(Titanium.Platform.displayCaps.platformHeight+10);
		self.scrollTo(0,30);
	});
	
	lastNameBox.addEventListener('blur',function(e){
		view.setHeight(Titanium.Platform.displayCaps.platformHeight);
		self.scrollToBottom();
	});

	var emailBox = Ti.UI.createTextField({
		hintText : 'Email',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 360
	});
	view.add(emailBox);

	var registerBtn = Ti.UI.createButton({
		title : 'Register',
		width : 100,
		height : 40,
		top : 420,
		left : 40
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
		}else if(isNull(firstname)){
			alert('Last name cannot be empty');
			return;
		} else if(isNull(lastname)){
			alert('First name cannot be empty');
			return;
		}
		else if (!isEmail(email)) {
			alert('Email is not valid');
			return;
		} else {
			password = Titanium.Utils.md5HexDigest(password);
			register(username,password,firstname,lastname,email);
		}

	});

	var backBtn = Ti.UI.createButton({
		title : 'Back',
		width : 100,
		height : 40,
		top : 420,
		left : 140
	});
	view.add(backBtn);

	backBtn.addEventListener('click', function(e) {
		var registerWindow = getRegisterWindow();
		registerWindow.close(slip_to_right);
	});
	return self;
}

function register(username,password,firstname,lastname,email){
	getRegisterResponse(username,password,firstname,lastname,email);
	var checker = setInterval(function(){
	if (getResponseCode() == 1){
		clearInterval(checker);
		alert('Username is not available');
	} else if(getResponseCode() == 2){
		clearInterval(checker);
		alert('Register succeed!');
	} else if(getResponseCode() == -2){
		alert('Connection Error. Please try again later');
	}
	},500);
}

module.exports = RegisterView;