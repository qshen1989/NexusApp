Ti.include('../logic/CommonFunctions.js');
function TopicsView() {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var self = Titanium.UI.createTableView({
		//backgroundColor:'#220992',
		data : [],
		filterAttribute : 'filter',
		backgroundColor : 'white'
	});
	
	var data;
	var tableData = [];
	setTableData();
	
	function setTableData() {
		if (Titanium.App.Properties.getString('TopicList') == null) {
			getTopicsByPopularity();
			var checker = setInterval(function() {
				if (getResponseCode() == 1) {
					clearInterval(checker);
					data = getTopicList();
				} else if (getResponseCode() == -2) {
					clearInterval(checker);
					alert('Connection Error');
				}
			}, 500);
		} else {
			Titanium.API.info(Titanium.App.Properties.getString('TopicList'));
			data = getTopicList();
		}
		for (var i = 0; i < data.length; ++i) {
			var row = Ti.UI.createTableViewRow();
			row.selectedBackgroundColor = '#f2f2f2';
			row.height = 100;
			row.hasChild = true;
			row.url = '/ui/handheld/TopicContentWindow';

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
	}

	var updating = false;
	var loadingRow = Ti.UI.createTableViewRow({
		title : "Loading...",
		height:50
	});

	function beginUpdate() {
		updating = true;
		//tableData.push(loadingRow);
		self.setTop(20);
		tableData = [];
		getTopicsByPopularity();
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
		self.deleteRow(0);
		// simulate loading
		
		self.scrollToIndex(0, {
			animated : true,
			position : Ti.UI.iPhone.TableViewScrollPosition.NONE,
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
		if (offset < -30 && !updating) {
			// adjust the % of rows scrolled before we decide to start fetching
			var nearEnd = theEnd * .75;

			if (!updating && (total >= nearEnd)) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
	self.addEventListener('click',function(e){
		
		var NewWindow = require(e.rowData.url);
		var parentWindow = getTopicsWindow();
		
		var newWindow = new NewWindow({title:'haha',tabGroup:parentWindow.tabGroup});
		newWindow.setLeft(320);
		newWindow.open(slip_from_right);
	});
	self.setData(tableData);
	return self;
}

module.exports = TopicsView;
