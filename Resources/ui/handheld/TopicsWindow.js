//Application Window Component Constructor
function TopicsWindow() {
	//load component dependencies
	var TopicsView = require('ui/common/TopicsView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title:'Topics',
		navBarHidden: true
	});
		
	//construct UI
	var topicsView = new TopicsView();
	
	var send = Titanium.UI.createButton({
		title : 'Q1',
		color:'#344322'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var camera = Titanium.UI.createButton({
		title : 'Q2',
		width: 200,
		backgroundColor:'#556655'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var cancel = Titanium.UI.createButton({
		title : 'Q3',
		backgroundColor:'#344322'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [send, flexSpace, camera, flexSpace, cancel],
		barColor:'#344322',
		top : 0,
		borderTop : true,
		borderBottom : false,
	});
	//Ti.API.info(toolbar.height);
	self.add(toolbar);
	self.add(topicsView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = TopicsWindow;
