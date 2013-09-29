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
	var topView = Ti.UI.createView({
		backgroundImage:'images/RegisterPage/topBar2.png',
		zIndex:5,
		height:pxToDP(89),
	});
	self.add(topView);
	var registerView = new RegisterView();
	self.add(registerView);
	
	return self;
}

//make constructor function the public component interface
module.exports = RegisterWindow;
