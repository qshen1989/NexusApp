Ti.include('../logic/CommonFunctions.js');
function TopicContentView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		//backgroundImage : 'images/WelcomePage/welcomeBG.png'
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	return self;
}

module.exports = TopicContentView;
