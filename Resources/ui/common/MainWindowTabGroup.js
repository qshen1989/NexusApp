Ti.include('../logic/CommonFunctions.js');
function MainWindowTabGroup() {
	var self = Ti.UI.createTabGroup({
		backgroundColor : '#333333',
		zIndex : 100
	}), HomeWindow = require('ui/handheld/HomeWindow');
	FriendsWindow = require('ui/handheld/FriendsWindow');
	TopicsWindow = require('ui/handheld/TopicsWindow');

	var homeWindow = new HomeWindow(getUserID());
	var friendsWindow = new FriendsWindow();
	var topicsWindow = new TopicsWindow();

	var homeTab = Ti.UI.createTab({
		window : homeWindow,
		icon:'images/tab1.png',
	});
	homeWindow.containingTab = homeTab;
	self.addTab(homeTab);

	var topicsTab = Ti.UI.createTab({
		window : topicsWindow,
		icon:'images/tab3.png',
	});
	topicsWindow.containgTab = topicsTab;
	/*self.addEventListener('click', function(e) {
		Titanium.API.info(e.index);
		getTopicsByPopularity();
		var checker = setInterval(function() {
			if (getResponseCode() == 1) {

			} else if (getResponseCode() == -2) {

			}
		}, 500);
	});*/
	self.addTab(topicsTab);
	
	var friendsTab = Ti.UI.createTab({
		window : friendsWindow,
		icon:'images/tab2.png'
	});
	friendsWindow.containgTab = friendsTab;
	self.addTab(friendsTab);
	
	setHomeWindow(homeWindow);
	setFriendsWindow(friendsWindow);
	setTopicsWindow(topicsWindow);
	
	self.addEventListener('click',function(e){
		alert(e.index);
	});
	self.setActiveTab(1);
	return self;
}

module.exports = MainWindowTabGroup;
