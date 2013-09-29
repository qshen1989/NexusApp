function getFriendList(){
	var xml = Titanium.App.Properties.getString('FriendList');
	xml = Titanium.XML.parseString(xml);
	var contents = xml.documentElement.getElementsByTagName('friend');
	var data = [];
	for (var i=0;i<contents.length;++i){
		data.push({
			id: contents.item(i).getElementsByTagName('friendID').item(0).text,
			lastname: contents.item(i).getElementsByTagName('lastName').item(0).text,
			firstname: contents.item(i).getElementsByTagName('firstName').item(0).text,
			email: contents.item(i).getElementsByTagName('friendID').item(0).text,
		});
	}
	return data;
}

