Ti.include('../logic/CommonFunctions.js');
function TopicsView() {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var self = Titanium.UI.createTableView({
		//backgroundColor:'#220992',
		top : 40,
		data : [],
		filterAttribute : 'filter',
		backgroundColor : 'white'
	});
	var data = getTopicList();
	var tableData = [];
	setTableData();
	function setTableData() {
		data = getTopicList();
		for (var i = 0; i < data.length; ++i) {
			var row = Ti.UI.createTableViewRow();
			row.selectedBackgroundColor = '#f2f2f2';
			row.height = 100;

			var photo = Ti.UI.createView({
				backgroundImage : '/images/TopicsPage/user.png',
				top : 5,
				left : 10,
				width : 50,
				height : 50,
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
				top : 2,
				height : 30,
				width : 200,
				clickName : 'user',
				text : data[i].content
			});

			row.filter = user.text;
			row.add(user);

			var fontSize = 16;
			if (Titanium.Platform.name == 'android') {
				fontSize = 14;
			}
			var comment = Ti.UI.createLabel({
				color : '#222',
				font : {
					fontSize : 14,
					fontWeight : 'bold',
					fontFamily : 'Arial'
				},
				left : 70,
				top : 21,
				height : 50,
				width : 200,
				clickName : 'comment',
				text : 'No.' + (i + 1) + ' popular topic\n' + data[i].popularity + ' people attended'
			});
			row.add(comment);

			var button = Ti.UI.createView({
				//backgroundImage:'/images/custom_tableview/commentButton.png',
				top : 35,
				right : 5,
				width : 36,
				clickName : 'button',
				height : 34
			});
			row.add(button);

			var date = Ti.UI.createLabel({
				color : '#999',
				font : {
					fontSize : 13,
					fontWeight : 'normal',
					fontFamily : 'Arial'
				},
				left : 105,
				bottom : 5,
				height : 20,
				width : 100,
				clickName : 'date',
				text : 'posted on 3/11'
			});
			//row.add(date);

			tableData.push(row);
		}
		self.data = tableData;
	}

	var updating = false;
	var loadingRow = Ti.UI.createTableViewRow({
		title : "Loading..."
	});

	function beginUpdate() {
		updating = true;
		//tableData.push(loadingRow);
		tableData = [];
		getTopicsByPopularity();
		self.appendRow(loadingRow);
		// just mock out the reload
		setTimeout(endUpdate, 2000);
	}

	function endUpdate() {
		updating = false;
		setTableData();
		// simulate loading

		// just scroll down a bit to the new rows to bring them into view
		self.scrollToIndex(0, {
			animated : true,
			position : Ti.UI.iPhone.TableViewScrollPosition.TOP
		});
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
		if (distance < lastDistance) {
			// adjust the % of rows scrolled before we decide to start fetching
			var nearEnd = theEnd * .75;

			if (!updating && (total >= nearEnd)) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});

	return self;
}

module.exports = TopicsView;
