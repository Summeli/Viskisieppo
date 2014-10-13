var requestFilter = {
	urls: [
		"*://*/*"
	]
};

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	var headers = details.requestHeaders;
	var header_set = false;
	for(var i = 0, l = headers.length; i < l; ++i) {
		if( headers[i].name == "X-Forwarded-for" ) {
			headers[i].value = "12.13.14.15";
			header_set = true;
			break;
		}
	}
	if(!header_set){
		headers.push({name:"X-Forwarded-for",value:"12.13.14.15"});
	}
	return {requestHeaders: headers};
}, requestFilter, ['requestHeaders','blocking']);