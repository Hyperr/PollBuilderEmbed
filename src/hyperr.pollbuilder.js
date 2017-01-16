
// v1.0.0

(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory();
	} else if (typeof root === "object") {
		root.hyperr = root.hyperr || {};
		root.hyperr.pollBuilder = factory();
	}
}(this, function(){
    
	var pollBuilder = {
		// set to the target domain you want to allow communication from
		targetOrigin: "https://pollbuilder.gethyperr.com",
		
		// used to actually embed a poll builder in an element
		embed: addEmbed,
		
		// read-only for whether or not this component is supported
		get supported(){ return dragAndDropExists(); }
	}
	
	// need to keep a list of droppable iframes and their layovers in order to shut them off whenever dragging
	var iframes = [];
	var layovers = [];
	var hypeDragData = false;
	
	// ---------- the events/functions for the dropzone ---------

	function drop(evt)
	{
		if (!hypeDragData)
			return;
		
		try { hypeDragData = JSON.parse(hypeDragData); }
		catch(e){}
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage(JSON.stringify({event:'drop', data:hypeDragData}), pollBuilder.targetOrigin)
		
		evt.stopPropagation();
		evt.preventDefault();
	}

	function dragover(evt)
	{
		if (!hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage(JSON.stringify({event:'dragover'}), pollBuilder.targetOrigin)
		
		evt.preventDefault();
		return false;
	}

	function dragleave(evt)
	{
		if (!hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage(JSON.stringify({event:'dragleave'}), pollBuilder.targetOrigin)
		
		evt.preventDefault();
		return false;
	}

	// ------------------- generic drag starting/stopping to turn on/off iframes ----------------------

	function dragstart(evt)
	{
		if (!evt || !evt.target || !evt.target.hasAttribute || !evt.target.hasAttribute('data-poll-builder'))
			return;
		
		var data = evt.target.getAttribute('data-poll-builder')
		
		if (data)
		{
			hypeDragData = data;
			
			if (evt.dataTransfer && evt.dataTransfer.setData)
				evt.dataTransfer.setData('text', data); // firefox needs dataTransfer data to work, but we don't actually use it
			
			var i = iframes.length;
			while (i--) {
				iframes[i].style.pointerEvents = 'none';
				layovers[i].style.display = 'block';
				iframes[i].contentWindow.postMessage(JSON.stringify({event:'dragstart'}), pollBuilder.targetOrigin)
			}
		}
	}

	function dragend(evt)
	{
		if (hypeDragData)
		{
			hypeDragData = false;
			
			var i = iframes.length;
			while (i--) {
				iframes[i].style.pointerEvents = 'auto';
				layovers[i].style.display = 'none';
				iframes[i].contentWindow.postMessage(JSON.stringify({event:'dragend'}), pollBuilder.targetOrigin)
			}
		}
	}
	
	window.document.addEventListener('dragstart', dragstart, false);
	window.document.addEventListener('dragend', dragend, false);
	
	// ------------- utility functions --------------
	
	var dragAndDropChecked = false;
	var dragAndDropCache   = null;
	function dragAndDropExists()
	{
		if (dragAndDropChecked)
			return dragAndDropCache;
		
		var hasDraggable  = "draggable" in document.createElement("div");
		var isKnownMobile = /Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);
		var hasEvents     = isEventSupported('dragstart') && isEventSupported('drop');
		
		dragAndDropChecked = true;
		dragAndDropCache = hasDraggable && hasEvents && !isKnownMobile
		return dragAndDropCache;
	}
	
	// isEventSupported code derived from https://github.com/kangax/iseventsupported
	// Copyright (c) 2009 Juriy Zaytsev, released open source under license: https://github.com/kangax/iseventsupported/blob/gh-pages/LICENSE
	var TAGNAMES = {
		'select': 'input', 'change': 'input',
		'submit': 'form', 'reset': 'form',
		'error': 'img', 'load': 'img', 'abort': 'img'
	};
	function isEventSupported(eventName, element)
	{
		element = element || document.createElement(TAGNAMES[eventName] || 'div');
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
	
	// ------------------- for adding the embeds ---------------------
	
	function addEmbed(cont, url)
	{
		if (!dragAndDropExists()) {
			console.warn("This browser/device is not capable of using hyperr poll builder. You can use `pollBuilder.supported` to determine this at runtime.");
			return;
		}
		
		if (typeof cont === 'string')
			cont = window.document.querySelector(cont);
		
		var style = window.getComputedStyle(cont);
		if (style.getPropertyValue('position') === 'static') {
			console.warn('Embed container must not be set to the CSS `position:static;`. It will be changed to relative.');
			cont.style.position = 'relative';
		}
		
		var iframeStyle = 'border:none; outline:none; display:block;';
		var layoverStyle = 'display:none; position:absolute; width:100%; height:100%; left:0; top:0;';
		var addHTML = '<iframe src="'+url+'" width="100%" height="100%" style="'+iframeStyle+'"></iframe><div class="iframe-layover" style="'+layoverStyle+'"></div>';
		
		cont.innerHTML = addHTML;
		cont.addEventListener('drop', drop, false);
		cont.addEventListener('dragover', dragover, false);
		cont.addEventListener('dragleave', dragleave, false);
		iframes.push(cont.querySelector('iframe'));
		layovers.push(cont.querySelector('.iframe-layover'));
	}
	
	return pollBuilder;

}));
