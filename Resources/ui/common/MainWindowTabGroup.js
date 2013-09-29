Ti.include('../logic/CommonFunctions.js');
function MainWindowTabGroup() {
	var self = Ti.UI.createTabGroup({
		backgroundColor : '#333333',
		zIndex : 100
	}), HomeWindow = require('ui/handheld/HomeWindow');
	FriendsWindow = require('ui/handheld/FriendsWindow');
	TopicsWindow = require('ui/handheld/TopicsWindow');

	var homeWindow = new HomeWindow();
	var friendsWindow = new FriendsWindow();
	var topicsWindow = new TopicsWindow();

	var homeTab = Ti.UI.createTab({
		title : 'Home',
		window : homeWindow
	});
	homeWindow.containingTab = homeTab;
	self.addTab(homeTab);

	var friendsTab = Ti.UI.createTab({
		title : 'Friends',
		window : friendsWindow
	});
	friendsWindow.containgTab = friendsTab;
	self.addTab(friendsTab);

	var topicsTab = Ti.UI.createTab({
		title : 'Topics',
		window : topicsWindow
	});
	
	topicsTab.addEventListener('focus',function(e){
		getTopics();
		var checker = setInterval(function(){
			if (getResponseCode() == 1){
				
			}else if(getResponseCode() == -2){
				
			}
		},500);
	});
	topicsWindow.containgTab = topicsTab;
	self.addTab(topicsTab);

	
	
	self.setActiveTab(2);
	return self;
}

module.exports = MainWindowTabGroup;
