
import EventDispatcher from './EventDispatcher';
import request from './request';

export default class Builder extends EventDispatcher
{
	// STATIC PUBLIC -----------------------------------------------------------
	
	static instances = [];
	
	static dragStart(evt)
	{
		Builder.instances.map(inst => inst._dragstart(evt));
		pollBuilder.dispatchEvent({type:'pb:begindrag'});
	}
	
	static dragEnd(evt)
	{
		Builder.instances.map(inst => inst._dragend(evt));
		pollBuilder.dispatchEvent({type:'pb:enddrag'});
	}
	
	static buttonAdd(evt)
	{
		var btn = evt.currentTarget;
		var index = parseInt(btn.getAttribute('data-poll-builder-index')) || 0;
		Builder.instances[index]._buttonadd(btn);
	}
	
	static setLoaded(index)
	{
		Builder.instances[index].loaded = true;
	}
	
	
	// PUBLIC -----------------------------------------------------------
	
	index      = null;
	id         = null;
	mobile     = null;
	token      = null;
	promise    = null;
	metadata   = null;
	cont       = null; // containing element it's being embedded in
	iframe     = null; // the iframe element itself
	layover    = null; // layover element that goes over the iframe
	loaded     = false;
	
	constructor(cont, token, opts)
	{
		super();
		
		var index = this.index = Builder.instances.length;
		Builder.instances[index] = this;
		
		if (!pollBuilder.isSupported()) {
			console.warn("This browser/device is not capable of using hyperr poll builder and will not embed. You can use `pollBuilder.isSupported()` to determine this at runtime.");
			return {promise:Promise.resolve(null)};
		}
		
		this.promise = new Promise((resolve, reject)=>
		{	
			var style = window.getComputedStyle(cont);
			if (style.getPropertyValue('position') === 'static') {
				console.warn('Embed container must not be set to the CSS `position:static;`. It will be changed to relative.');
				cont.style.position = 'relative';
			}
			
			request('GET', `${pollBuilder._apiURL}/builders/${token}`).then((metadata)=>
			{
				this.metadata = metadata;
				this.index = index;
				this.cont = typeof cont==='string' ? window.document.querySelector(cont) : cont;
				this.id = `pollbuilder-iframe-${this.index}`;
				this.mobile = opts && opts.useMobile;
				
				var urlWVars = `${pollBuilder._pollBuilderURL}/${token}?pollBuilderID=${this.id}&pollBuilderIndex=${index}&scriptVersion=${pollBuilder.version}${this.mobile?'&mobile=1':''}${pollBuilder.dragAndDropSupported()?'&dnd=1':''}`;
				var addHTML = `<iframe id="${this.id}" class="pollbuilder-iframe" onload="pollBuilder._iframeLoaded(${index});" src="${urlWVars}"></iframe><div class="pollbuilder-iframe-layover"></div>`;
				addHTML += cssToAdd(); // adds static CSS needed if not already added
				
				cont.innerHTML = addHTML;
				cont.addEventListener('drop', this._drop, false);
				cont.addEventListener('dragover', this._dragover, false);
				cont.addEventListener('dragleave', this._dragleave, false);
				cont.className += ' pollbuilder-cont';
				
				var iframe = this.iframe = cont.querySelector('iframe');
				iframe.builder = this;
				iframe.style.width = '0px';
				iframe.style.height = '0px';
				
				this.layover = cont.querySelector('.pollbuilder-iframe-layover');
				
				this.addEventListener('pb:sizechange', this._onResize);
				
				resolve(iframe);
			})
			.catch((err)=>
			{
				reject(err);
			})
		})
	}
	
	
	// INTERNAL -----------------------------------------------------------
	
	_firstSize = true;
	_height = 0;
	_hypeDragData = false;
	
	_onResize = (evt) =>
	{
		var newHeight = evt.data.height;
		
		if (this._firstSize)
			this.iframe.style.width = this.mobile ? '100%' : evt.data.width+'px';
		
		if (!this._firstSize)
			this.iframe.style.transition = 'height '+(newHeight<this._height?400:200)+'ms';
		
		if (!this._firstSize && this.maxxed)
			this.cont.style.height = newHeight+'px';
		
		this.iframe.style.height = newHeight+'px';
		
		this._height = newHeight;
		this._firstSize = false;
	}		
	
	_dragstart = (evt) =>
	{
		// if not a poll builder intended item, ignore
		if (!evt || !evt.target || !evt.target.hasAttribute || !evt.target.hasAttribute('data-poll-builder'))
			return;
		
		var data = evt.target.getAttribute('data-poll-builder');
		
		if (data)
		{
			this._hypeDragData = data;
			
			if (evt.dataTransfer && evt.dataTransfer.setData)
				evt.dataTransfer.setData('text', data); // firefox needs dataTransfer data to work, but we don't actually use it
			
			this.iframe.style.pointerEvents = 'none';
			this.layover.style.display = 'block';
			this.iframe.contentWindow.postMessage({event:'dragstart'}, pollBuilder._targetOrigin);
			this.dispatchEvent({type:'pb:begindrag'});
		}
	}
	
	_dragend = (evt) =>
	{
		if (this._hypeDragData)
		{
			this._hypeDragData = false;
			
			this.iframe.style.pointerEvents = 'auto';
			this.layover.style.display = 'none';
			this.iframe.contentWindow.postMessage({event:'dragend'}, pollBuilder._targetOrigin)
		}
	}

	_dragover = (evt) =>
	{
		if (!this._hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage({event:'dragover'}, pollBuilder._targetOrigin)
		
		evt.preventDefault();
		return false;
	}

	_dragleave = (evt) =>
	{
		if (!this._hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage({event:'dragleave'}, pollBuilder._targetOrigin)
		
		evt.preventDefault();
		return false;
	}
	
	_drop = (evt) =>
	{
		if (!this._hypeDragData)
			return;
		
		try { this._hypeDragData = JSON.parse(this._hypeDragData); }
		catch(e){}
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage({event:'drop', data:this._hypeDragData}, pollBuilder._targetOrigin)
		
		evt.stopPropagation();
		evt.preventDefault();
	}
	
	_buttonadd = (btn) =>
	{
		try {
		
			var data = btn.getAttribute('data-poll-builder');
			data = JSON.parse(data);
			
			if (this.iframe) {
				this.iframe.contentWindow.postMessage({event:'add', data:data}, pollBuilder._targetOrigin);
				this.dispatchEvent({type:'pb:buttonadd', button:btn});
				pollBuilder.dispatchEvent({type:'pb:buttonadd', button:btn});
			}
			
			pollBuilder.maximizeSticky(this.index);
		
		} catch (e) {}
	}
}


// STATIC PRIVATE  -----------------------------------------------------------

var cssAdded = false;
function cssToAdd()
{
	if (!cssAdded)
	{
		cssAdded = true;
		return `
			<style>
				.pollbuilder-cont {
					overflow: hidden;
				}
				
				.pollbuilder-iframe-layover {
					display: none;
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
				}
				
				.pollbuilder-iframe {
					border: none;
					outline: none;
					display: block;
				}
			</style>`
	} else {
		return '';
	}
}
