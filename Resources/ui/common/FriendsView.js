Ti.include('../logic/CommonFunctions.js');
Ti.include('../logic/FriendDataHandler.js');
function FriendsView() {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var self = Titanium.UI.createView({
		backgroundColor : '#220992',
		top : 40
	});

	var search = Titanium.UI.createSearchBar({
		barColor : '#385292',
		showCancel : false
	});
	search.addEventListener('change', function(e) {
		e.value; // search string as user types
	});
	search.addEventListener('return', function(e) {
		search.blur();
	});
	search.addEventListener('cancel', function(e) {
		search.blur();
	});

	var tableView;
	var data = [];

	function createUserRow(userID, username) {
		var row = Ti.UI.createTableViewRow();
		row.backgroundColor = '#576996';
		row.selectedBackgroundColor = '#385292';
		row.selectedBackgroundColor = '#fff';
		row.height = 30;
		row.className = 'datarow';
		row.clickName = 'row';
	
		var photo = Ti.UI.createView({
//			backgroundImage:'/images/custom_tableview/user.png',
			top:5,
			left:10,
			width:20,
			height:20,
			clickName:'photo'
		});
		row.add(photo);
	
	
		var user = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			left:70,
			top:10,
			height:30,
			width:200,
			clickName: userID,
			text: username
		});
	
		row.filter = user.text;
		row.add(user);
		data.push(row);

	}
	
	function buildTableData(){
	
	showFriends();
	var checker = setInterval(function (){
		
	},500);
	var friendXML = Ti.App.Properties.getString('friendsXML');
	if (friendXML!=null){
	var xmlData = Ti.XML.parseString(friendXML);
    Ti.API.info(xmlData);
    var friends = xmlData.documentElement.getElementByTagName("friend");
    for (var i=0; i<friends.length;i++){
    	createUserRow(friends.item(i).getElementByTagName("friendID").item(0).text, friends.item(i).getElementByTagName("userName").item(0).text);
    }}
    }
    
    tableView = Titanium.UI.createTableView({
			data:data,
			search:search,
			filterAttribute:'filter',
			backgroundColor:'white'
		});
		
	win.add(tableView);
	
	return self;
}

module.exports = FriendsView;
