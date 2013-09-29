//Application Window Component Constructor
function TopicContentWindow() {
	//load component dependencies
	var TopicContentView = require('ui/common/TopicContentView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#333333',
	});
	
	var back = Titanium.UI.createButton({
		title : 'back',
		color : '#344322',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var topic = Titanium.UI.createButton({
		title : 'Topic',
		width : 200,
		backgroundColor : '#556655'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var reply = Titanium.UI.createButton({
		title : 'Reply',
		backgroundColor : '#344322',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [back, flexSpace, topic, flexSpace, reply],
		barColor : '#344322',
		top : 0,
		borderTop : true,
		borderBottom : false,
	});
	
	self.add(toolbar);
		
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
