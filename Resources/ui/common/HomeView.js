Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/UserData.js');
Ti.include('../logic/FriendDataHandler.js');
function HomeView(uid) {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var self = Ti.UI.createView({
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
		width : pxToDP(639),
		height : pxToDP(283),
		top : 0,
		backgroundImage : 'images/home/Homepage_03.png',
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
							fontSize : 26,
							fontFamily : 'Arial'
						},
						fontWeight : 'bold',
						color : '#FFFFFF',
						top : pxToDP(25),
						left : pxToDP(330),
						height : 30,
					});

					view1.add(nameLabel);
				}
				view1.add(nameLabel);
			}

		}, 500);
	}

	var photo = Ti.UI.createView({
		backgroundImage : '/images/home/head4.png',
		top : 15,
		left : 25,
		width : pxToDP(200),
		height : pxToDP(199),
		clickName : 'photo'
	});

	view1.add(photo);

	var addFriendBtn = Ti.UI.createButton({
		top : pxToDP(120),
		left : pxToDP(330),
		width : pxToDP(192),
		height : pxToDP(59),
		backgroundImage : '/images/home/Homepage_04.png',
	});
	//view1.add(addFriendBtn);

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
    
    var topPosition = 20;


	function addTopicView() {
		var topics = getMyTopicList();
		for (var i = 0; i < topics.length; i++) {
			var backgroundPath = 'images/home/Homepage_' + (i % 4 + 1) + '.png';
			var topicView = Ti.UI.createView({
				top : topPosition+i*pxToDP(250),
				backgroundImage : backgroundPath,
				width : pxToDP(600),
				left : pxToDP(18),
				height : pxToDP(242),
			});
			
			var userRole;
			
			if(i%2==1){
				userRole = 'Participator';
			}else{
				userRole = 'Topic Holder';
			}

			var user = Ti.UI.createLabel({
				color : '#000000',
				font : {
					fontSize : 20,
					fontFamily : 'Arial'
				},
				left : pxToDP(165),
				top : pxToDP(25),
				height : 20,
				width : 200,
				clickName : 'user',
				text : userRole
			});
			topicView.add(user);

			var time = Ti.UI.createLabel({
				color : '#000000',
				font : {
					fontSize : 12,
					fontFamily : 'Arial'
				},
				left : pxToDP(165),
				top : pxToDP(70),
				height : 12,
				width : 200,
				clickName : 'time',
				text : topics[i].createTime
			});
			topicView.add(time);

			// var title = Ti.UI.createLabel({
				// color : '#FF6666',
				// font : {
					// fontSize : 16,
					// fontWeight : 'bold',
					// fontFamily : 'Arial',
				// },
				// left : pxToDP(400),
				// top : pxToDP(25),
				// height : 20,
				// width : 100,
				// clickName : 'title',
				// text : data[0].title
			// });
			// topicView.add(title);

			var content = Ti.UI.createLabel({
				color : '#000000',
				font : {
					fontSize : 14,
					fontFamily : 'Arial',
				},
				left : 30,
				top : pxToDP(150),
				height : 30,
				width : pxToDP(500),
				clickName : 'content',
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
