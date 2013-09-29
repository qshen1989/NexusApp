Ti.include('../logic/UserData.js');

//Application Window Component Constructor
function HomeWindow(id) {
	//load component dependencies
	var HomeView = require('ui/common/HomeView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		barImage: 'images/home/Homebar.png'
	});
		
	//construct UI
	
	var view1 = Titanium.UI.createView({
		width: pxToDP(639),
		height : pxToDP(283),
		top : 0
	});

	self.add(view1);
	
	
	
	var homeView = new HomeView(id);
	self.add(homeView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = HomeWindow;
