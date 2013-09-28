Ti.include('HttpConnection.js');
function is_digitals(str) {
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

function isEmail(str) {
	var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return reg.test(str);
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isNull(str) {
	return (trim(str) == "");
}


function registerValidation() {

}

function facebookLoginValidation() {

}
