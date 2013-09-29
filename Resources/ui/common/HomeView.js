Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/UserData.js');
Ti.include('../logic/FriendDataHandler.js');
function HomeView(uid) {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var self = Ti.UI.createScrollView({
		maxZoomScale : 1.0,
		minZoomScale : 1.0,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : false,
		scrollingEnabled : false,
		horizontalBounce : false,
		verticalBounce : false,

	});

	var view1 = Titanium.UI.createView({
		backgroundColor : '#ff3322',
		height : 100,
		top : 0
	});

	self.add(view1);
	//
	var data = [];
	initData();

	function initData() {
		getUserInfo(uid);
		var checker = setInterval(function() {
			if (getResponseCode() == 1) {
				clearInterval(checker);
				data = parseUserInfo();

				if (data != null) {
					var nameLabel = Ti.UI.createLabel({
						text : data[0].firstName + " " + data[0].lastName,
						font : {
							fontSize : 20,
							fontWeight : 'bold'
						},
						top : 25,
						left : 95
					});

					view1.add(nameLabel);
				}
			}
		}, 500);
	}

	var photo = Ti.UI.createView({
		backgroundImage : '/images/FriendsPage/user.png',
		top : 20,
		left : 20,
		width : 50,
		height : 50,
		clickName : 'photo'
	});

	view1.add(photo);

	var addFriendBtn = Ti.UI.createButton({
		top : 70,
		width : 100,
		height : 50,
		backgroundColor : '#faa755',
	});

	isHomePage();

	function isHomePage() {
		if (!uid == getUserID()) {
			isFriends(uid, getUserID());
			var checker = setInterval(function() {
				if (getResponseCode() == 2) {
					clearInterval(checker);
					view1.add(addFriendBtn);
				} else if (getResponseCode() == -2) {
					alert('Network Error, please try again later');
				}
			}, 500);
		}

	}

	var TopicsView = require('ui/common/TopicsView');

	topicsView = new TopicsView();
	topicsView.setTop(view1.height);
	self.add(topicsView);

	return self;
}

module.exports = HomeView;
