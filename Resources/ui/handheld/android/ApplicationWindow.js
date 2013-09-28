//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var LoginView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI
	var loginView = new LoginView();
	self.add(loginView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
