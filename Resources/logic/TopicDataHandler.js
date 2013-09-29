function getTopicList(){
	var xml = Titanium.App.Properties.getString('TopicList');
	xml = Titanium.XML.parseString(xml);
	var contents = xml.documentElement.getElementsByTagName('content');
	var data = [];
	for (var i=0;i<contents.length;++i){
		
	}
	//var 
}
