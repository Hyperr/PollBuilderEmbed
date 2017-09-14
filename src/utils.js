
import Platform from './Platform';

export function def(val, dflt) {
	return typeof val === 'undefined' ? dflt : val;
}


export function isSupported()
{
	var ie = getIEVersion();
	
	if (ie && ie < 10)
		return false;
	
	return true;
}

export function dragAndDropSupported()
{
	var hasDraggable  = "draggable" in document.createElement("div");
	var isKnownMobile = /Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);
	var hasEvents     = isEventSupported('dragstart') && isEventSupported('drop');
	
	return hasDraggable && hasEvents && !isKnownMobile;
}

export function shouldEmbedMobile()
{
	return Platform.mobile;
}

function getIEVersion() // Note: undefined for IE Edge
{
    var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return match ? parseInt(match[1]) : undefined;
}

// isEventSupported code derived from https://github.com/kangax/iseventsupported
// Copyright (c) 2009 Juriy Zaytsev, released open source under license: https://github.com/kangax/iseventsupported/blob/gh-pages/LICENSE
function isEventSupported(eventName, element)
{
	var TAGNAMES = {
		'select': 'input', 'change': 'input',
		'submit': 'form', 'reset': 'form',
		'error': 'img', 'load': 'img', 'abort': 'img'
	};
	
	element = element || document.createElement(TAGNAMES[element] || 'div');
	eventName = 'on' + eventName;
	
	// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
	var isSupported = eventName in element;

	if ( !isSupported ) {
		// If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
		if ( !element.setAttribute ) {
			element = document.createElement('div');
		}
		if ( element.setAttribute && element.removeAttribute ) {
			element.setAttribute(eventName, '');
			isSupported = typeof element[eventName] == 'function';

			// If property was created, "remove it" (by setting value to `undefined`)
			if ( typeof element[eventName] != 'undefined' ) {
				element[eventName] = undefined;
			}
			element.removeAttribute(eventName);
		}
	}
	
	element = null;
	return isSupported;
}

export function cssUnit(val)
{
	if (typeof val === 'number')
		return val + 'px';
	else
		return val;
}
