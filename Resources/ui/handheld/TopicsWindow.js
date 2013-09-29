//Application Window Component Constructor
function TopicsWindow() {
	//load component dependencies
	var TopicsView = require('ui/common/TopicsView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#ffffff',
		title : 'Topics',
		navBarHidden : false,

	});

	var leftBtn = Ti.UI.createButton({
		title : 'Q1',
	});

	self.setLeftNavButton(leftBtn);

	//construct UI
	//Ti.API.info(toolbar.height);
	var topicsView = new TopicsView();
	self.add(topicsView);

	//self.add(toolbar);
	//self.add(topicsView);

	return self;

}

//make constructor function the public component interface
module.exports = TopicsWindow;
