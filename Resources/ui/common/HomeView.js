Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/UserData.js');
Ti.include('../logic/FriendDataHandler.js');
function HomeView(uid) {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var self = Ti.UI.createScrollView({
		backgroundImage : 'images/home/Homepage_02.png',
		maxZoomScale : 1.0,
		minZoomScale : 1.0,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : false,
		scrollingEnabled : false,
		horizontalBounce : false,
		verticalBounce : false,

	});

	var view1 = Titanium.UI.createView({
		width: pxToDP(639),
		height : pxToDP(283),
		top : 0,
		backgroundImage: 'images/home/Homepage_03.png',
	});

	self.add(view1);
	//
	var data = [];
	initData();
	getMyTopics();

	function initData() {
		getUserInfo(uid);
		var checker = setInterval(function() {
			if (getResponseCode() == 1) {
				clearInterval(checker);
				data = parseUserInfo();

				if (data != null) {
					var nameLabel = Ti.UI.createLabel({
						text : data[0].firstName + " " + data[0].lastName,

						//		text : data[0].firstName + " " + data[0].lastName,
						font : {
							fontSize : 20,
							fontWeight : 'bold'
						},
						top : 25,
						left : 95
					});

					view1.add(nameLabel);
				}
				view1.add(nameLabel);
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
				if (getResponseCode() == 1) {
					clearInterval(checker);
					view1.add(addFriendBtn);
				} else if (getResponseCode() == -2) {
					alert('Network Error, please try again later');
				}
			}, 500);
		}

	}

	var topicsView = Ti.UI.createScrollView();
	topicsView.setTop(view1.height);

	getTopics();

	function getTopics() {
		var checker = setInterval(function() {
			if (getResponseCode() == 1) {
				clearInterval(checker);
				addTopicView();
			} else if (getResponseCode() == -2) {
				alert('Network Error, please try again later');
			}
		}, 500);
	}

	function addTopicView() {
		var topics = getMyTopicList();
		for (var i = 0; i < data.length; i++) {
			var topicView = Ti.UI.createView({
				top : 10,
				backgroundColor : '#ffffff',
			});
			var user = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontSize : 16,
					fontWeight : 'bold',
					fontFamily : 'Arial'
				},
				left : 10,
				top : 2,
				height : 15,
				width : 200,
				clickName : 'user',
				text : data[0].firstName + ' ' + data[0].lastName
			});
			topicView.add(user);
			var title = Ti.UI.createLabel({
				color : '#FF6666',
				font : {
					fontSize : 16,
					fontFamily : 'Arial',
					fontStyle : 'italic'
				},
				left : 50,
				top : 2,
				height : 10,
				width : 200,
				clickName : 'title',
				text : data[0].title
			});
			topicView.add(title);
			var content = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontSize : 12,
					fontFamily : 'Arial',
				},
				left : 10,
				top : 20,
				height : 30,
				width : 200,
				clickName : 'title',
				text : topics[i].content
			});

			topicView.add(content);
			topicsView.add(topicView);
		}
	}


	self.add(topicsView);

	return self;
}

module.exports = HomeView;
