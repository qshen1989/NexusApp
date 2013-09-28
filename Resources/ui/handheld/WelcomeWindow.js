//Application Window Component Constructor
function WelcomeWindow() {
	//load component dependencies
	var WelcomeView = require('ui/common/WelcomeView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		exitOnClose:true
	});
		
	//construct UI
	var welcomeView = new WelcomeView();
	self.add(welcomeView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = WelcomeWindow;
