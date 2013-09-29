function getFriendList() {
	var xml = Titanium.App.Properties.getString('FriendList');
	Ti.API.info(xml);
	xml = Titanium.XML.parseString(xml);
	var contents = xml.documentElement.getElementsByTagName('friend');
	var data = [];
	for (var i = 0; i < contents.length; ++i) {
		data.push({
			id : contents.item(i).getElementsByTagName('friendID').item(0).text,
			lastname : contents.item(i).getElementsByTagName('lastName').item(0).text,
			firstname : contents.item(i).getElementsByTagName('firstName').item(0).text,
			email : contents.item(i).getElementsByTagName('email').item(0).text,
		});
	}
	return data;
}

function parseUserInfo() {
	var xml = Titanium.App.Properties.getString('UserInfo');

	var parsedXML = Titanium.XML.parseString(xml);
	var userName = parsedXML.documentElement.getElementsByTagName('userName').item(0).text;
	var firstName = parsedXML.documentElement.getElementsByTagName('firstName').item(0).text;
	var lastName = parsedXML.documentElement.getElementsByTagName('lastName').item(0).text;
	var email = parsedXML.documentElement.getElementsByTagName('email').item(0).text;
	var title = parsedXML.documentElement.getElementsByTagName('title').item(0).text;
	var data = [];
	data.push({
		userName : userName,
		email : email,
		firstName : firstName,
		lastName : lastName,
		title : title
	});

	return data;
}

