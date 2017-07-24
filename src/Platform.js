/*
	This script is not open source. It is a proprietary script not to be reused or redistributed.
*/

export default class Platform
{
	desktop = false;
	mobile = false; // true if phone OR tablet
	phone = false;
	tablet = false;
	
	android = false;
	ios = false;
	blackberry = false;
	winmobile = false;
}


// ----------- setup ------------

var os = navigator.platform.toLowerCase(), ua = navigator.userAgent.toLowerCase();
var easyregex = /mobi(le)?|tablet|phone|palm|pocket|handheld|e?book|reader|ip(ad|od|hone)|android|blackberry|playbook|webos|windows ce/;
var osregex = /linux|unix|^win|^mac/;
var isIE = !!navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);

// figure out mobile vs desktop
if (!isIE && (easyregex.test(os) || easyregex.test(ua))) {
	Platform.mobile = true;
} else if (osregex.test(os)) {
	Platform.desktop = true;
} else {
	Platform.mobile = true; // assume mobile if unknown
}

// if mobile, try to determine type
if (Platform.mobile)
{
	// figure out OS if we can
	if ((/android/).test(ua))
		Platform.android = true;
	else if ((/ip(ad|od|hone)/).test(ua))
		Platform.ios = true;
	else if ((/blackberry|playbook/).test(ua))
		Platform.blackberry = true;
	else if ((/windows/).test(ua))
		Platform.winmobile = true;
	
	// determine tablet vs phone
	if ((/tablet|ipad|playbook/).test(ua))
		Platform.tablet = true;
	else if ((/phone/).test(ua))
		Platform.phone = true;
	else
		Platform.phone = true; // default to phone if unknown
}