//Application Window Component Constructor
function TopicContentWindow() {
	//load component dependencies
	var TopicContentView = require('ui/common/TopicContentView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundImage:'images/TopicContentPage/Topic_02.png'	
		});
	
	var back = Titanium.UI.createButton({
		title : 'back',
		color : '#344322',
		top: 10,
		left: 20,
		height:30,
		width:50
	});
	
	self.add(back);

	var reply = Titanium.UI.createButton({
		title : 'Reply',
		top: 10,
		right: 20,
		height:30,
		width:50
	});
	
	self.add(reply);

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [back, flexSpace, reply],
		backgroundImage:'images/TopicContentPage/bar.png',
		top : 0,
		borderTop : true,
		borderBottom : false,
	});
	
	//self.add(toolbar);
		
	//construct UI
	back.addEventListener('click',function(e){
		self.close(slip_to_right);
	});
	var topicContentView = new TopicContentView();
	self.add(topicContentView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = TopicContentWindow;
