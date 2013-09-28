//Application Window Component Constructor
function RegisterWindow() {
	//load component dependencies
	var RegisterView = require('ui/common/RegisterView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		left:320
	});
		
	//construct UI
	var registerView = new RegisterView();
	self.add(registerView);
	
	return self;
}

//make constructor function the public component interface
module.exports = RegisterWindow;
