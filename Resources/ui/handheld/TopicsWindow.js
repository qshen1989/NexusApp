//Application Window Component Constructor
function TopicsWindow() {
	//load component dependencies
	var TopicsView = require('ui/common/TopicsView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title:'Topics'
	});
		
	//construct UI
	var topicsView = new TopicsView();
	self.add(topicsView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = TopicsWindow;
