Ti.include('../logic/CommonFunctions.js');
function HomeView() {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var self = Titanium.UI.createView({
		
	});

	return self;
}

module.exports = HomeView;
