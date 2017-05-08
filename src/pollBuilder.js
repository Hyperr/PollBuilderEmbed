

/*******************************************************
 * Copyright (C) 2016 PTP APP LLC - All Rights Reserved
 * Unauthorized copying of this file, in whole or in part, via any medium is strictly prohibited.
 * Proprietary and Confidential
 *******************************************************/
 
import EventDispatcher from './EventDispatcher';
import {isSupported, def} from './utils';
//import request from './request';
import './Promise';

// the default button image for sticky builder if no others are given
var defaultImage = 'http://res.cloudinary.com/hofetmrsh/image/upload/v1494262965/assets/ask_button.svg';
var defaultHover = 'http://res.cloudinary.com/hofetmrsh/image/upload/v1494262965/assets/ask_button_over.svg';

class PollBuilder extends EventDispatcher
{
	// version is important so that poll-builder served from hyperr knows what script is in use
	version = '1.0.1'
	
	// whether or not this component is supported
	isSupported = isSupported
	
	// private API, for setting the API and poll builder urls
	_apiURL = 'https://api.gethyperr.com' // prefix domain for the API
	_pollBuilderURL = 'https://pollbuilder.gethyperr.com' // prefix domain for the iframe
	_targetOrigin = 'https://pollbuilder.gethyperr.com' // target domain you want to allow communication from
	
	// requests for the poll builder to send a pb:data event with the raw state data, can use index/id/direct reference to choose iframe, otherwise uses 0
	requestData(ident)
	{
		ident = ident || 0;
		
		var iframe = ident;
		if (typeof ident === 'number')
			iframe = iframes[ident];
		if (typeof ident === 'string')
			iframe = document.querySelector(ident);
		
		iframe.contentWindow.postMessage({event:'requestdata'}, pollBuilder._targetOrigin)
	}
	
	// used to actually embed a poll builder in an element when manually used (i.e. no sticky)
	embed(cont, token)
	{
		if (!pollBuilder.isSupported())
			console.warn("This browser/device is not capable of using hyperr poll builder with drag and drop. You can use `pollBuilder.isSupported()` to determine this at runtime.");
		
		return new Promise((resolve, reject)=>
		{
			if (typeof cont === 'string')
				cont = window.document.querySelector(cont);
			
			var style = window.getComputedStyle(cont);
			if (style.getPropertyValue('position') === 'static') {
				console.warn('Embed container must not be set to the CSS `position:static;`. It will be changed to relative.');
				cont.style.position = 'relative';
			}
			
			var index = iframes.length;
			var id = `pollbuilder-iframe-${index}`;
			var urlWVars = `${pollBuilder._pollBuilderURL}/${token}?pollBuilderID=${id}&pollBuilderIndex=${index}&scriptVersion=${pollBuilder.version}`;
			
			var iframeStyle = `border:none; outline:none; display:block;`;
			var layoverStyle = `display:none; position:absolute; width:100%; height:100%; left:0; top:0;`;
			var addHTML = `<iframe id="${id}" src="${urlWVars}" width="100%" height="100%" style="${iframeStyle}"></iframe><div class="iframe-layover" style="${layoverStyle}"></div>`;
			
			cont.innerHTML = addHTML;
			cont.addEventListener('drop', drop, false);
			cont.addEventListener('dragover', dragover, false);
			cont.addEventListener('dragleave', dragleave, false);
			var iframe = cont.querySelector('iframe');
			iframes.push(iframe);
			var dispatcher = new EventDispatcher();
			dispatchers.push(dispatcher);
			layovers.push(cont.querySelector('.iframe-layover'));
			iframe.pollBuilderEventDispatcher = dispatcher;
			dispatcher.iframe = iframe;
			iframe.style.width = '0px';
			iframe.style.height = '0px';
			
			var firstSize = true, height = 0;
			dispatcher.addEventListener('pb:sizechange', function(evt)
			{
				var newHeight = evt.data.height;
				
				if (firstSize)
					iframe.style.width = evt.data.width+'px'; // only need to set width first time
				else
					iframe.style.transition = 'height '+(newHeight<height?400:200)+'ms';
				
				iframe.style.height = height = newHeight+'px';
				height = newHeight;
				firstSize = false;
			});
			
			resolve(iframe);
		})
	}
	
	// an easier way to use, creates a sticky version with certain data
	embedSticky(token, init)
	{
		init = init || {};
		init.side = def(init.side, 'right');
		init.fromTop = def(init.fromTop, false);
		init.verticalPercent = def(init.verticalPercent, 0);
		init.verticalOffset = def(init.verticalOffset, 10);
		init.position = def(init.position, 'fixed');
		init.zIndex = def(init.zIndex, 99);
		init.buttonImage = def(init.buttonImage, defaultImage);
		init.buttonImageHover = def(init.buttonImageHover, defaultHover);
		init.buttonImageActive = def(init.buttonImageActive, null);
		init.buttonImages2x = def(init.buttonImages2x, false);
		init.buttonMarkup = def(init.buttonMarkup, null);
		init.buttonBottom = def(init.buttonBottom, false);
		init.backgroundColor = def(init.backgroundColor, '#fff');
		
		init.buttonStyles = def(init.buttonStyles, 'box-shadow:0 2px 5px rgba(0,0,0,0.25);');
		init.builderStyles = def(init.builderStyles, 'box-shadow:0 1px 5px rgba(0,0,0,0.25);');
		
		var index = iframes.length;
		
		// create main container that holds it all
		var cont = document.createElement('div');
		cont.style.position = init.position;
		cont.style.backgroundColor = init.backgroundColor;
		cont.style[init.side] = '0px';
		cont.style.zIndex = init.zIndex+'';
		cont.style[init.fromTop ? 'top' : 'bottom'] = `calc(${init.verticalPercent}% + ${init.verticalOffset}px)`;
		cont.id = 'pollbuilder-sticky-'+index;
		document.body.appendChild(cont);
		
		// create the container that holds the poll builder part
		var pb = document.createElement('div');
		pb.style.cssText = init.buttonStyles;
		pb.className = 'poll-builder-instance';
		pb.style.overflow = 'hidden';
		setTimeout(function(){ pb.style.transition = 'width 400ms'; }, 0); // add on event loop so that it doesn't animate from load
		cont.appendChild(pb);
		
		// embed the poll builder where we want it...
		var prom = pollBuilder.embed(pb, token);
		prom.then(iframe=>
		{
			// we won't know the data width until the iframe randers and gives it to us via this event
			iframe.pollBuilderEventDispatcher.addEventListener('pb:sizechange', firstSizeChange);
			function firstSizeChange(evt)
			{
				// track the width needed for the builder
				pb.setAttribute('data-width', evt.data.width);
				
				// create the container and contents of the poll builder button
				var btn = document.createElement('div');
				btn.style.cssText = init.builderStyles;
				btn.className = 'poll-builder-button';
				btn.style.position = 'absolute';
				btn.style[init.side] = '100%';
				btn.style.cursor = 'pointer';
				btn.style[init.buttonBottom ? 'bottom' : 'top'] = '0';
				btn.addEventListener('click', pollBuilder.toggleSticky.bind(null, index));
				if (init.buttonMarkup) {
					btn.innerHTML = init.buttonMarkup;
				} else if (init.buttonImage) {
					var attr2xMain = init.buttonImages2x ? 'onload="this.width/=2;this.style.opacity=1;"' : 'onload="this.style.opacity=1;"';
					var attr2x = init.buttonImages2x ? 'onload="this.width/=2"' : '';
					btn.innerHTML = `<img src="${init.buttonImage}" ${attr2xMain}/>`;
					
					if (init.buttonImageHover)
						btn.innerHTML += `<img src="${init.buttonImageHover}" class="poll-builder-button-hover" ${attr2x}/>`;
					if (init.buttonImageActive)
						btn.innerHTML += `<img src="${init.buttonImageActive}" class="poll-builder-button-active" ${attr2x}/>`;
					
					btn.innerHTML += `
						<style>
							.poll-builder-button img {
								display:block;
								transition:opacity 200ms;
								opacity:0;
							}
							
							.poll-builder-button img.poll-builder-button-hover,
							.poll-builder-button img.poll-builder-button-active {
								position:absolute;
								left:0;
								top:0;
							}
							
							.poll-builder-button:hover img.poll-builder-button-hover { opacity:1; }
							.poll-builder-button:active img.poll-builder-button-active { opacity:1; }
						</style>`
				} else {
					console.warn(`No button image or markup was given for the poll builder!`);
				}
				cont.appendChild(btn);
				
				// remove listener
				iframe.pollBuilderEventDispatcher.removeEventListener('pb:sizechange', firstSizeChange);
			}
			
			// listen for a begindrag and open it
			dispatchers[index].addEventListener('pb:begindrag', function(){ pollBuilder.maximizeSticky(index); });
			
			// now start out minimized
			pollBuilder.minimizeSticky(index);
			
			// float it to one side depending on the side it's on, cuz it makes it animate better
			iframe.style.float = init.side==='right' ? 'left' : 'right';
		})
		
		return prom;
	}

	minimizeSticky(index)
	{
		index = index || 0;
		var cont = document.getElementById('pollbuilder-sticky-'+index);
		if (!cont) return;
		var pb = cont.getElementsByClassName('poll-builder-instance')[0];
		var maxxed = pb.getAttribute('data-maximized') != false;
		if (maxxed)
			iframes[index].contentWindow.postMessage({event:'stickyminimize'}, pollBuilder._targetOrigin)
		pb.setAttribute('data-maximized', '0');
		pb.style.width = '0px';
	}

	maximizeSticky(index)
	{
		index = index || 0;
		var cont = document.getElementById('pollbuilder-sticky-'+index);
		if (!cont) return;
		var pb = cont.getElementsByClassName('poll-builder-instance')[0];
		var maxW = pb.getAttribute('data-width');
		var maxxed = pb.getAttribute('data-maximized') != false;
		if (!maxxed)
			iframes[index].contentWindow.postMessage({event:'stickymaximize'}, pollBuilder._targetOrigin)
		pb.setAttribute('data-maximized', '1');
		pb.style.width = maxW+'px';
	}

	toggleSticky(index)
	{
		index = index || 0;
		var cont = document.getElementById('pollbuilder-sticky-'+index);
		if (!cont) return;
		var pb = cont.getElementsByClassName('poll-builder-instance')[0];
		var maxxed = pb.getAttribute('data-maximized') != false;
		if (maxxed)
			pollBuilder.minimizeSticky(index);
		else
			pollBuilder.maximizeSticky(index);
	}
}

// create/export for usage
var pollBuilder = new PollBuilder();
export default pollBuilder;
window.pollBuilder = pollBuilder;

// need to keep a list of droppable iframes and their layovers in order to shut them off whenever dragging
var iframes = [];
var layovers = [];
var dispatchers = pollBuilder.dispatchers = [];
var hypeDragData = false;

// ---------- the events/functions for the dropzone ---------

function drop(evt)
{
	if (!hypeDragData)
		return;
	
	try { hypeDragData = JSON.parse(hypeDragData); }
	catch(e){}
	
	var target = evt.currentTarget.querySelector('iframe')
	target.contentWindow.postMessage({event:'drop', data:hypeDragData}, pollBuilder._targetOrigin)
	
	evt.stopPropagation();
	evt.preventDefault();
}

function dragover(evt)
{
	if (!hypeDragData)
		return;
	
	var target = evt.currentTarget.querySelector('iframe')
	target.contentWindow.postMessage({event:'dragover'}, pollBuilder._targetOrigin)
	
	evt.preventDefault();
	return false;
}

function dragleave(evt)
{
	if (!hypeDragData)
		return;
	
	var target = evt.currentTarget.querySelector('iframe')
	target.contentWindow.postMessage({event:'dragleave'}, pollBuilder._targetOrigin)
	
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
			iframes[i].contentWindow.postMessage({event:'dragstart'}, pollBuilder._targetOrigin)
		}
		
		pollBuilder.dispatchEvent({type:'pb:begindrag'});
		var j = dispatchers.length;
		while (j--)
			dispatchers[j].dispatchEvent({type:'pb:begindrag'});
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
			iframes[i].contentWindow.postMessage({event:'dragend'}, pollBuilder._targetOrigin)
		}
	}
}

window.document.addEventListener('dragstart', dragstart, false);
window.document.addEventListener('dragend', dragend, false);

// ------------- deal with events from poll builder ------------

window.addEventListener("message", function(obj)
{
	var validOrigin = obj.origin === pollBuilder._targetOrigin;
	var wildTarget = pollBuilder._targetOrigin === '*';
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
