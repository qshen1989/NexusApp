Ti.include('../logic/UserData.js');

//Application Window Component Constructor
function HomeWindow(id) {
	//load component dependencies
	var HomeView = require('ui/common/HomeView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title:'Home'
	});
		
	//construct UI
	var homeView = new HomeView(id);
	self.add(homeView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = HomeWindow;
