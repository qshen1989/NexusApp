Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/Validation.js');
function LoginView() {
	//create object instance, a parasitic subclass of Observable
	//Titanium.Facebook.logout();
	var self = Ti.UI.createScrollView({
		maxZoomScale : 1.5,
		minZoomScale : 1.0,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : false,
		scrollingEnabled : false,
		horizontalBounce : false,
		verticalBounce : false
	});
	//var client = Ti.Network.createHTTPClient();
	
	var view = Ti.UI.createView({
		backgroundImage : 'images/LoginPage/loginBG.png',

	});
	self.add(view);
	Titanium.Facebook.logout();
	var client = Titanium.Network.createHTTPClient();
	client.clearCookies('http://login.facebook.com');
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var userNameBox = Ti.UI.createTextField({
		top : pxToDP(565),
		width : pxToDP(405),
		height : pxToDP(53),
		hintText : ' Username',
		left: pxToDP(115),
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization : false,
		//borderStyle : Titanium.UI.INPUT_BORDERSTYLE_LINE,
		//borderColor: '#334455',
		keyboardType : Titanium.UI.KEYBOARD_ASCII
	});

	userNameBox.addEventListener('focus', function(e) {
		if (self.getZoomScale() == 1.0) {
			self.scrollTo(0, 40);
			self.setZoomScale(1.4, {
				animated : true
			});
		}
	});

	userNameBox.addEventListener('return', function(e) {
		self.setZoomScale(1.0, {
			animated : true
		});
	});

	var passwordBox = Ti.UI.createTextField({
		top : pxToDP(636),
		width : pxToDP(405),
		height : pxToDP(53),
		left: pxToDP(115),
		hintText : ' Password',
		passwordMask : true,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization : false,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS
	});

	passwordBox.addEventListener('focus', function(e) {
		if (self.getZoomScale() == 1.0) {
			self.scrollTo(0, 40);
			self.setZoomScale(1.4, {
				animated : true
			});
		}
	});

	passwordBox.addEventListener('return', function(e) {
		self.setZoomScale(1.0, {
			animated : true
		});
	});
	view.add(userNameBox);
	view.add(passwordBox);

	var normalLoginBtn = Ti.UI.createButton({
		backgroundImage : 'images/LoginPage/loginBtn.png',
		top : pxToDP(720),
		width : pxToDP(405),
		height : pxToDP(80),
		left: pxToDP(115)
	});

	normalLoginBtn.addEventListener('click', function(e) {
		if (userNameBox.getValue().length == 0) {
			alert('Username cannot be empty');
			return;
		} else if (passwordBox.getValue().length == 0) {
			alert('Password cannot be empty');
			return;
		} else {
			var username = userNameBox.getValue();
			var password = Titanium.Utils.md5HexDigest(passwordBox.getValue());
			Ti.API.info(password);
			login(username, password, self);
		}
	});
	view.add(normalLoginBtn);

	var registerLabel = Ti.UI.createLabel({
		text : 'New Debater?',
		font : {
			fontSize : 15
		},
		color : '#ADADAD',
		width : 'auto',
		height : 20,
		top : pxToDP(810),
	});

	registerLabel.addEventListener('touchstart', function(e) {
		registerLabel.setColor("#2828FF");
	});
	view.add(registerLabel);

	registerLabel.addEventListener('touchend', function(e) {
		registerLabel.setColor("#ADADAD");
	});

	registerLabel.addEventListener('click', function(e) {
		var RegisterWindow = require('ui/handheld/RegisterWindow');
		var registerWindow = new RegisterWindow();
		setRegisterWindow(registerWindow);
		registerWindow.open(slip_from_right);
	});

	var facebookLoginBtn = Ti.UI.createButton({
		backgroundImage : 'images/LoginPage/floginBtn.png',
		top : pxToDP(930),
		width : pxToDP(405),
		height : pxToDP(79),
		left: pxToDP(115)
	});

	var fb = require('facebook');
	fb.appid = '563214183734201';
	fb.permissions = ['publish_stream', 'read_stream'];
	fb.forceDialogAuth = true;
	fb.addEventListener('login', function(e) {
		if (e.success) {
			setTimeout(function() {
				fbLogin(fb, self);
			}, 500);
		} else if (e.error) {
			alert(e.error);
		} 
	});

	facebookLoginBtn.addEventListener('click', function(e) {
		if(fb.loggedIn){
			fb.logout();
		}
		fb.authorize();
	});
	view.add(facebookLoginBtn);

	//Add behavior for UI
	return self;
}

function login(username, password, view) {
	getLoginResponse(username, password);
	var checker = setInterval(function() {
		if (getResponseCode() == 1) {
			//succeed
			clearInterval(checker);
			/*var MainWindow = require('ui/handheld/MainWindow');
			var mainWindow = new MainWindow();
			mainWindow.setOpacity(0);
			view.animate(get_darken);
			mainWindow.open(get_lighter);*/
			var Group = require('ui/common/MainWindowTabGroup');
			var group = new Group();
			group.setOpacity(0);
			var loginWindow = getLoginWindow();
			loginWindow.animate(get_darken);
			group.open(get_lighter);
		} else if (getResponseCode() == -1) {
			//failed
			alert('Login failed. Please check your username or password');
			clearInterval(checker);
		} else if (getResponseCode() == -2) {
			//error
			alert('Connection Error. Please try again later');
			clearInterval(checker);
		}
	}, 500);
}

function fbLogin(fb, view) {
	getFBLoginResponse(Titanium.Facebook.getUid());
	Titanium.API.info(getResponseCode());
	var checker = setInterval(function() {
		if (getResponseCode() == 1) {
			//new user
			clearInterval(checker);
			var PersonalInfoWindow = require('ui/handheld/PersonalInfoWindow');
			var personalInfoWindow = new PersonalInfoWindow();
			personalInfoWindow.setOpacity(0);
			view.animate(get_darken);
			personalInfoWindow.open(get_lighter);
		} else if (getResponseCode() == 2) {
			//old user
			clearInterval(checker);
			/*var MainWindow = require('ui/handheld/MainWindow');
			var mainWindow = new MainWindow();
			mainWindow.setOpacity(0);
			view.animate(get_darken);
			mainWindow.open(get_lighter);*/
			
			var Group = require('ui/common/MainWindowTabGroup');
			var group = new Group();
			group.setOpacity(0);
			var loginWindow = getLoginWindow();
			loginWindow.animate(get_darken);
			group.open(get_lighter);
		} else if (getResponseCode() == -2) {
			//error
			alert('Connection Error. Please try again later');
			fb.logout();
			clearInterval(checker);
		}
	}, 500);
}

module.exports = LoginView;
