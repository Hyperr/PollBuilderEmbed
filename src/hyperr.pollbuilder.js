
/*******************************************************
 * Copyright (C) 2016 PTP APP LLC - All Rights Reserved
 * Unauthorized copying of this file, in whole or in part, via any medium is strictly prohibited.
 * Proprietary and Confidential
 *******************************************************/

// Polyfill for Object.assign
if (typeof Object.assign !== 'function')
{
	Object.assign = function(target, varArgs)
	{
		'use strict';
		if (target == null) // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		
		var to = Object(target);
		
		for (var index = 1; index < arguments.length; index++)
		{
			var nextSource = arguments[index];

			if (nextSource != null) // Skip over if undefined or null
				for (var nextKey in nextSource)
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) // Avoid bugs when hasOwnProperty is shadowed
						to[nextKey] = nextSource[nextKey];
		}
    
		return to;
	}
}

// UMD for pollBuilder creation
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory();
	} else if (typeof root === "object") {
		root.pollBuilder = factory();
	}
}(this, function(){
    
	var publicAPI = {
		// set to the target domain you want to allow communication from
		targetOrigin: "https://pollbuilder.gethyperr.com",
		
		// used to actually embed a poll builder in an element
		embed: embed,
		
		// whether or not this component is supported
		isSupported: isSupported,
		
		// requests for the poll builder to send a pb:data event with the raw state data, can use index/id/direct reference to choose iframe, otherwise uses 0
		requestData: requestData,
		
		// version is important so that poll-builder served from hyperr knows what script is in use
		version: '2.0.0'
	}
	
	var pollBuilder = Object.create(dispatcherFunctions());
	Object.assign(pollBuilder, publicAPI);
	
	// need to keep a list of droppable iframes and their layovers in order to shut them off whenever dragging
	var iframes = [];
	var layovers = [];
	var dispatchers = [];
	var hypeDragData = false;
	
	// ---------- the events/functions for the dropzone ---------

	function drop(evt)
	{
		if (!hypeDragData)
			return;
		
		try { hypeDragData = JSON.parse(hypeDragData); }
		catch(e){}
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage({event:'drop', data:hypeDragData}, pollBuilder.targetOrigin)
		
		evt.stopPropagation();
		evt.preventDefault();
	}

	function dragover(evt)
	{
		if (!hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage({event:'dragover'}, pollBuilder.targetOrigin)
		
		evt.preventDefault();
		return false;
	}

	function dragleave(evt)
	{
		if (!hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage({event:'dragleave'}, pollBuilder.targetOrigin)
		
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
				iframes[i].contentWindow.postMessage({event:'dragstart'}, pollBuilder.targetOrigin)
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
				iframes[i].contentWindow.postMessage({event:'dragend'}, pollBuilder.targetOrigin)
			}
		}
	}
	
	window.document.addEventListener('dragstart', dragstart, false);
	window.document.addEventListener('dragend', dragend, false);
	
	// ------------- deal with events from poll builder ------------
	
	window.addEventListener("message", function(obj)
	{
		var validOrigin = obj.origin === pollBuilder.targetOrigin;
		var wildTarget = pollBuilder.targetOrigin === '*';
		var dataIsObj = typeof obj.data === 'object';
		var fromPollFlag = !!obj.data.fromPoll;
		
		// weed out messages not from poll builders
		if (!dataIsObj || !fromPollFlag || (!validOrigin && !wildTarget))
			return;
		
		// if is flagged as an event, then dispatch it
		if (obj.data.isEvent)
		{
			var event = obj.data.event;
			var dispatcher = dispatchers[event.index];
			delete event.index; // user doesn't need this, will only be possibly confused
			dispatcher.dispatchEvent(event);
			pollBuilder.dispatchEvent(event);
		}
	})
	
	// ------------- utility functions --------------
	
	function isSupported()
	{
		var hasDraggable  = "draggable" in document.createElement("div");
		var isKnownMobile = /Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);
		var hasEvents     = isEventSupported('dragstart') && isEventSupported('drop');
		
		return hasDraggable && hasEvents && !isKnownMobile;
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
	
	function requestData(ident)
	{
		ident = ident || 0;
		
		var iframe = ident;
		if (typeof ident === 'number')
			iframe = iframes[ident];
		if (typeof ident === 'string')
			iframe = document.querySelector(ident);
		
		iframe.contentWindow.postMessage({event:'requestdata'}, pollBuilder.targetOrigin)
	}
	
	// ------------------------------------------------
	
	// for the base of the pollBuilder to be an event dispatcher
	function dispatcherFunctions()
	{
		function EventDispatcher(){}
		var proto = EventDispatcher.prototype;
		var callbacks = {};
		
		proto.on = proto.addEventListener = function(type, callback)
		{	
			if (!callbacks[type])
				callbacks[type] = [];
			
			if (callbacks[type].indexOf(callback) === -1)
				callbacks[type].push(callback);
		}
		
		proto.has = proto.hasEventListener = function(type, callback)
		{
			return callbacks[type] && callbacks[type].indexOf(callback) > -1;
		}
		
		proto.off = proto.removeEventListener = function(type, callback)
		{
			var arr = callbacks[type];
			
			if (arr)
			{
				var i = arr.indexOf(callback);
				
				if (i > -1)
					arr.splice(i, 1);
			}
		}
		
		proto.trigger = proto.dispatchEvent = function(event)
		{
			var arr = callbacks[event.type];
			
			if (arr)
				for (var i=0, ii=arr.length; i < ii; i++)
					arr[i].call(this, event);
		}
		
		return proto;
	}
	
	// ------------------- for adding the embeds ---------------------
	
	function embed(cont, url)
	{
		if (!isSupported()) {
			console.warn("This browser/device is not capable of using hyperr poll builder. You can use `pollBuilder.isSupported()` to determine this at runtime.");
			return;
		}
		
		if (typeof cont === 'string')
			cont = window.document.querySelector(cont);
		
		var style = window.getComputedStyle(cont);
		if (style.getPropertyValue('position') === 'static') {
			console.warn('Embed container must not be set to the CSS `position:static;`. It will be changed to relative.');
			cont.style.position = 'relative';
		}
		
		var index = iframes.length;
		var id = 'pollbuilder-iframe-'+index;
		var urlWVars = url + (url.indexOf('?')>-1 ? '&' : '?') + 'poll_builder_id=' + id + '&' + 'poll_builder_index=' + index;
		
		var iframeStyle = 'border:none; outline:none; display:block;';
		var layoverStyle = 'display:none; position:absolute; width:100%; height:100%; left:0; top:0;';
		var addHTML = '<iframe id="'+id+'" src="'+urlWVars+'" width="100%" height="100%" style="'+iframeStyle+'"></iframe><div class="iframe-layover" style="'+layoverStyle+'"></div>';
		
		cont.innerHTML = addHTML;
		cont.addEventListener('drop', drop, false);
		cont.addEventListener('dragover', dragover, false);
		cont.addEventListener('dragleave', dragleave, false);
		var iframe = cont.querySelector('iframe');
		iframes.push(iframe);
		var dispatcher = Object.create(dispatcherFunctions());
		dispatchers.push(dispatcher);
		layovers.push(cont.querySelector('.iframe-layover'));
		iframe.pollBuilderEventDispatcher = dispatcher;
		dispatcher.iframe = iframe;
		
		return iframe;
	}
	
	return pollBuilder;

}));
