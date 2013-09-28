//Application Window Component Constructor
function MainWindow() {
	//load component dependencies
	var MainWindowTabGroup = require('ui/common/WelcomeView');
		
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
module.exports = MainWindow;
