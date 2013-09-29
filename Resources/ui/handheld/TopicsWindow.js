//Application Window Component Constructor
function TopicsWindow() {
	//load component dependencies
	var TopicsView = require('ui/common/TopicsView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#ffffff',
		navBarHidden : false,

	});

	var leftBtn = Ti.UI.createButton({
		title : 'Sort by Time',
	});

	self.setLeftNavButton(leftBtn);
	
	var rightBtn = Ti.UI.createButton({
		title : 'Sort by Pop',
	});
	
	self.setRightNavButton(rightBtn);

	//construct UI
	//Ti.API.info(toolbar.height);
	var topicsView = new TopicsView(leftBtn,rightBtn);
	self.add(topicsView);

	//self.add(toolbar);
	//self.add(topicsView);

	return self;

}

//make constructor function the public component interface
module.exports = TopicsWindow;
