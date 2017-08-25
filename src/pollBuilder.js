

/*******************************************************
 * Copyright (C) 2016 PTP APP LLC - All Rights Reserved
 * Unauthorized copying of this file, in whole or in part, via any medium is strictly prohibited.
 * Proprietary and Confidential
 *******************************************************/

import EventDispatcher from './EventDispatcher';
import {isSupported, dragAndDropSupported} from './utils';
import Utils from './UtilsClass';
import Builder from './Builder';
import StickyBuilder from './StickyBuilder';
import './Promise';

class PollBuilder extends EventDispatcher
{
	// version is important so that pollbuilder served from hyperr knows what script is in use
	version = '2.0.1'
	
	// whether or not this component is supported
	isSupported = isSupported
	
	// whether or not the drag and drop usage is supported
	dragAndDropSupported = dragAndDropSupported
	
	// private API, for setting the API and poll builder urls and other stuff
	_apiURL = 'https://api.gethyperr.com' // prefix domain for the API
	_pollBuilderURL = 'https://pollbuilder.gethyperr.com' // prefix domain for the iframe
	_targetOrigin = 'https://pollbuilder.gethyperr.com' // target domain you want to allow communication from
	_iframeLoaded(ind) { Builder.setLoaded(ind); }
	
	// utility functions that the pollBuilder needs or provides
	utils = Utils
	
	// requests for the poll builder to send a pb:data event with the raw state data, can use index to choose iframe, otherwise uses 0
	requestData(index = 0)
	{
		var iframe = this.instances[index].iframe;
		iframe.contentWindow.postMessage({event:'requestdata'}, pollBuilder._targetOrigin)
	}
	
	// Array of instances for the poll builder, automatically kept up by the Builder class
	instances = Builder.instances
	
	// used to actually embed a poll builder in an element when manually used (i.e. no sticky)
	embed(cont, token, opts)
	{
		var inst = new Builder(cont, token, opts);
		return inst.promise;
	}
	
	// an easier way to use, creates a sticky version with certain data
	embedSticky(token, init)
	{
		var inst = new StickyBuilder(token, init);
		return inst.promise;
	}

	minimizeSticky(index = 0)
	{
		var inst = Builder.instances[index];
		inst.minimize();
	}

	maximizeSticky(index = 0)
	{
		var inst = Builder.instances[index];
		inst.maximize();
	}

	toggleSticky(index = 0)
	{
		var inst = Builder.instances[index];
		inst.toggle();
	}
	
	addButtons(queryStr)
	{
		var list = document.querySelectorAll(queryStr);
		for (var i=0,ii=list.length; i<ii; i++)
			list[i].addEventListener('click', Builder.buttonAdd);
	}
}

// create/export for usage
var pollBuilder = new PollBuilder();
export default pollBuilder;
window.pollBuilder = pollBuilder;

// ------------------- need to listen to all dragging events to pass them to builders ----------------------

window.document.addEventListener('dragstart', Builder.dragStart, false);
window.document.addEventListener('dragend', Builder.dragEnd, false);

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
		var index = event.index;
		delete event.index; // user doesn't need this, will only be possibly confused
		pollBuilder.instances[index].dispatchEvent(event);
		pollBuilder.dispatchEvent(event);
	}
})

