Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/Validation.js');
function LoginView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({
		maxZoomScale : 1.5,
		minZoomScale : 1.0,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : false,
		scrollingEnabled : false,
		horizontalBounce : false,
		verticalBounce : false
	});

	var view = Ti.UI.createView({
		backgroundImage : 'images/LoginPage/loginBG.png',

	});
	self.add(view);
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var userNameBox = Ti.UI.createTextField({
		top : pxToDP(536),
		width : pxToDP(405),
		height : pxToDP(53),
		hintText : ' Username',
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		//borderStyle : Titanium.UI.INPUT_BORDERSTYLE_LINE,
		backgroundImage : 'images/LoginPage/Log-in_04.png',
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
		top : pxToDP(609),
		width : pxToDP(405),
		height : pxToDP(53),
		hintText : ' Password',
		passwordMask : true,
		backgroundImage : 'images/LoginPage/Log-in_04.png',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
		autocapitalization:false,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS
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
		top : pxToDP(712),
		width : pxToDP(405),
		height : pxToDP(80)
	});

	normalLoginBtn.addEventListener('click', function(e) {
		if (userNameBox.getValue().length == 0){
			alert('Username cannot be empty');
			return;
		} else if(passwordBox.getValue().length == 0){
			alert('Password cannot be empty');
			return;
		}else{
			var username = userNameBox.getValue();
			var password = Titanium.Utils.md5HexDigest(passwordBox.getValue());
			//Ti.API.info(password);
			if (loginValidation(username,password)){
				alert('login succeed');
			}else{
				alert('wrong username or password');
			}
		}
	});
	view.add(normalLoginBtn);
	
	var registerLabel = Ti.UI.createLabel({
		text:'New Debater?',
		font:{fontSize:15},
		color: '#ADADAD',
		width:'auto',
		height: 20,
		top: pxToDP(810)
	});
	
	registerLabel.addEventListener('touchstart',function(e){
		registerLabel.setColor("#2828FF");
	});
	view.add(registerLabel);
	
	registerLabel.addEventListener('touchend',function(e){
		registerLabel.setColor("#ADADAD");
	});
	
	registerLabel.addEventListener('click',function(e){
		var RegisterWindow = require('ui/handheld/RegisterWindow');
		var registerWindow = new RegisterWindow();
		setRegisterWindow(registerWindow);
		registerWindow.open(slip_from_right);
	});

	var facebookLoginBtn = Ti.UI.createButton({
		backgroundImage : 'images/LoginPage/floginBtn.png',
		top : pxToDP(943),
		width : pxToDP(405),
		height : pxToDP(79)
	});

	var fb = require('facebook');
	fb.appid = '563214183734201';
	fb.permissions = ['publish_stream', 'read_stream'];
	fb.forceDialogAuth = true;

	fb.addEventListener('login', function(e) {
		if (e.success) {
			alert('Logged In');
		} else if (e.error) {
			alert(e.error);
		} else if (e.cancelled) {
			alert("Canceled");
		}
	});
	facebookLoginBtn.addEventListener('click', function(e) {
		fb.logout();
		fb.authorize();
	});
	view.add(facebookLoginBtn);

	//Add behavior for UI
	return self;
}

module.exports = LoginView;
