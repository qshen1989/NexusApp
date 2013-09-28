//Application Window Component Constructor
function PersonalInfoWindow() {
	//load component dependencies
	var PersonalInfoView = require('ui/common/PersonalInfoView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
	});
		
	//construct UI
	var personalInfoView = new PersonalInfoView();
	self.add(personalInfoView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = PersonalInfoWindow;
