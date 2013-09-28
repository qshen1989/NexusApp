//Application Window Component Constructor
function MainWindow() {
	//load component dependencies
	var MainWindowTabGroup = require('ui/common/MainWindowTabGroup');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
	});
		
	//construct UI
	var tabGroup = new MainWindowTabGroup();
	self.add(tabGroup);
		tabGroup.open();
	
	return self;
	
}

//make constructor function the public component interface
module.exports = MainWindow;
