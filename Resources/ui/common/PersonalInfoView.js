Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/Validation.js');
function PersonalInfoView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
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

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	
	if(Titanium.Facebook.loggedIn){
		Titanium.Facebook.logout();
	}
	
	var view = Ti.UI.createView({
	});
	self.add(view);
	
	var lastNameBox = Ti.UI.createTextField({
		hintText : 'Last Name',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		width : pxToDP(200),
		height : 40,
		left : 30,
		top : 100
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
		top : 100
	});
	view.add(firstNameBox);
	
	lastNameBox.addEventListener('focus',function(e){
		view.setHeight(Titanium.Platform.displayCaps.platformHeight+10);
	});
	
	lastNameBox.addEventListener('blur',function(e){
		view.setHeight(Titanium.Platform.displayCaps.platformHeight);
	});

	var emailBox = Ti.UI.createTextField({
		hintText : 'Email',
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_LINE,
		clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		autocapitalization:false,
		width : pxToDP(405),
		height : 40,
		left : 40,
		top : 160
	});
	view.add(emailBox);

	var registerBtn = Ti.UI.createButton({
		title : 'Register',
		width : 100,
		height : 40,
		top : 220,
		left : 40
	});
	view.add(registerBtn);

	registerBtn.addEventListener('click', function(e) {
		var lastname = lastNameBox.getValue();
		var firstname = firstNameBox.getValue();
		var email = emailBox.getValue();
		if(isNull(firstname)){
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
			fbuid = Titanium.Facebook.getUid();
			register(firstname,lastname,email,fbuid);
		}

	});

	return self;
}

function register(firstname,lastname,email,fbuid){
	refillPersonalInfo(firstname,lastname,email,fbuid);
	var checker = setInterval(function(){
	if(getResponseCode() == 1){
		clearInterval(checker);
		alert('Register succeed!');
	} else if(getResponseCode() == -1){
		alert('Connection Error. Please try again later');
	}
	},500);
}

module.exports = PersonalInfoView;
