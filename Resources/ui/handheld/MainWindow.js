//Application Window Component Constructor
function MainWindow() {
	//load component dependencies
	var MainWindowTabGroup = require('ui/common/MainWindowTabGroup');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#332222',
		navBarHidden:false,
		zIndex:10
	});

	//construct UI
	var tabGroup = new MainWindowTabGroup();
	//self.add(tabGroup);
	//	tabGroup.open();
	var send = Titanium.UI.createButton({
		title : 'Home',
		color:'#344322'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var camera = Titanium.UI.createButton({
		title : 'Friends',
		width: 200,
		backgroundColor:'#556655'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var cancel = Titanium.UI.createButton({
		title : 'Topics',
		backgroundColor:'#344322'
		//style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [send, flexSpace, camera, flexSpace, cancel],
		barColor:'#344322',
		bottom : 0,
		borderTop : true,
		borderBottom : false
	});
	self.add(toolbar);
	self.add(tabGroup);
	tabGroup.open();
	return self;

}

//make constructor function the public component interface
module.exports = MainWindow;
