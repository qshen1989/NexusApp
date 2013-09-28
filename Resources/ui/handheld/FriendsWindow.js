//Application Window Component Constructor
function FriendsWindow() {
	//load component dependencies
	var FriendsView = require('ui/common/FriendsView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
	});
		
	//construct UI
	var friendsView = new FriendsView();
	self.add(friendsView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = FriendsWindow;
