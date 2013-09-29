//Application Window Component Constructor
function TopicContentWindow() {
	//load component dependencies
	var TopicContentView = require('ui/common/TopicContentView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		exitOnClose:true
	});
		
	//construct UI
	var topicContentView = new TopicContentView();
	self.add(topicContentView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = TopicContentWindow;
