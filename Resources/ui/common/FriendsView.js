Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/FriendDataHandler.js');
function FriendsView() {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	
	var view = Titanium.UI.createView({
		backgroundColor:'#445555'
	});
	
	var self = Titanium.UI.createTableView({
		backgroundColor : '#220992',
		data : [],
		filterAttribute : 'filter',
		backgroundColor : 'white',
		showVerticalScrollIndicator:true,
		headerView: view
	});

	var search = Titanium.UI.createSearchBar({
		barColor : '#385292',
		showCancel : false,
	});
	search.addEventListener('change', function(e) {
		e.value // search string as user types
	});
	search.addEventListener('return', function(e) {
		search.blur();
	});
	search.addEventListener('cancel', function(e) {
		search.blur();
	});
	var tableData = [];
	var data = [];

	setTableData();

	function setTableData() {
		if (Titanium.App.Properties.getString('FriendList') == null) {
			getFriends();
			var checker = setInterval(function() {
				if (getResponseCode() == 1) {
					clearInterval(checker);
					data = getFriendList();
				} else if (getResponseCode() == -2) {
					clearInterval(checker);
					alert('Connection Error');
				}
			}, 500);
		} else {
			Titanium.API.info(Titanium.App.Properties.getString('FriendList'));
			data = getFriendList();
		}
		Titanium.API.info('length==' + data.length);
		for (var i = 0; i < data.length; ++i) {
			var row = Ti.UI.createTableViewRow();
			row.backgroundColor = '#fff';
			row.selectedBackgroundColor = '#385292';
			row.height = 40;

			var photo = Ti.UI.createView({
				backgroundImage : '/images/FriendsPage/user.png',
				top : 5,
				left : 10,
				width : 20,
				height : 20,
				clickName : 'photo'
			});
			row.add(photo);

			var user = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontSize : 16,
					fontWeight : 'bold',
					fontFamily : 'Arial'
				},
				left : 70,
				top : 10,
				height : 30,
				width : 200,
				clickName : userID,
				text : data[i].lastname + ' ' + data[i].firstname
			});

			row.filter = user.text;
			row.add(user);
			tableData.push(row);
		}
	}

	var updating = false;
	var loadingRow = Ti.UI.createTableViewRow({
		title : "Loading...",
		font:{fontSize:10,fontFamliy:'Arial'}
	});

	function beginUpdate() {
		self.setTop(20);
		updating = true;
		//tableData.push(loadingRow);
		tableData = [];
		getFriends();
		self.insertRowBefore(0,loadingRow, {
			animated : true,
			animationStyle : Titanium.UI.iPhone.RowAnimationStyle.TOP
		});
		// just mock out the reload
		setTimeout(endUpdate, 2000);
	}

	function endUpdate() {

		updating = false;
		setTableData();
		// simulate loading
		self.deleteRow(0);
		// just scroll down a bit to the new rows to bring them into view
		self.scrollToIndex(0, {
			animated : true,
			position : Ti.UI.iPhone.TableViewScrollPosition.NONE
		});
		self.animate({top:0,duration:300});
	}

	var lastDistance = 0;
	// calculate location to determine direction

	self.addEventListener('scroll', function(e) {
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;

		// going down is the only time we dynamically load,
		// going up we can safely ignore -- note here that
		// the values will be negative so we do the opposite
		if (offset < -50) {
			// adjust the % of rows scrolled before we decide to start fetching
			var nearEnd = theEnd * .75;

			if (!updating && (total >= nearEnd)) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});

	self.setSearch(search);
	self.setData(tableData);

	return self;
}

module.exports = FriendsView;
