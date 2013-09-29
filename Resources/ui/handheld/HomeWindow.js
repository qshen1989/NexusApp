//Application Window Component Constructor
function HomeWindow() {
	//load component dependencies
	var HomeView = require('ui/common/HomeView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title:'Home'
	});
		
	//construct UI
	var homeView = new HomeView();
	self.add(homeView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = HomeWindow;
