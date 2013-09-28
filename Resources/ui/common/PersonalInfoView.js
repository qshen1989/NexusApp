Ti.include('../logic/CommonFunctions.js');
function PersonalInfoView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundImage:'images/WelcomePage/welcomeBG.png'
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var loginBtn = Ti.UI.createButton({
		backgroundImage: 'images/WelcomePage/joinBtn_welcomePG.png',
		width : pxToDP(421),
		height : pxToDP(78),
		top : 320,

	});
	
	loginBtn.addEventListener('click', function(e) {
		var LoginWindow = require('ui/handheld/LoginWindow');
		var loginWindow = new LoginWindow();
		setLoginWindow(loginWindow);
		self.animate(get_darken);
		setTimeout(function(){
			loginWindow.open(get_lighter);
		},600);
	});
	self.add(loginBtn);
	return self;
}

module.exports = PersonalInfoView;
