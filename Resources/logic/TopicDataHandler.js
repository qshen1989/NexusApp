function getTopicList() {
	var xml = Titanium.App.Properties.getString('TopicList');
	xml = Titanium.XML.parseString(xml);
	var contents = xml.documentElement.getElementsByTagName('topic');
	var data = [];
	for (var i = 0; i < contents.length; ++i) {
		data.push({
			id : contents.item(i).getElementsByTagName('topicID').item(0).text,
			popularity : contents.item(i).getElementsByTagName('popularity').item(0).text,
			content : contents.item(i).getElementsByTagName('content').item(0).text,
		});
	}
	return data;
	//var
}

function getMyTopicList() {
	var xml = Titanium.App.Properties.getString('MyTopicList');
	xml = Titanium.XML.parseString(xml);
	var contents = xml.documentElement.getElementsByTagName('topic');
	if (!contents.length == 0) {
		var data = [];
		for (var i = 0; i < contents.length; ++i) {
			data.push({
				id : contents.item(i).getElementsByTagName('topicID').item(0).text,
				content : contents.item(i).getElementsByTagName('content').item(0).text,
			});
		}
	}
	return data;
	//var
}

