Ti.include('../logic/CommonFunctions.js');
function TopicsView() {
	//create object instance, a parasitic subclass of Observable
	//var self = Ti.UI.createTabGroup() { backgroundImage:'images/WelcomePage/welcomeBG.png'
	//});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var self = Titanium.UI.createTableView({
		//backgroundColor:'#220992',
		top:40,
		data:[],
		filterAttribute:'filter',
		backgroundColor:'white'
	});
	
	self.addEventListener('click',function(e){
		Titanium.API.info('haha');
	});
	

	return self;
}

module.exports = TopicsView;
