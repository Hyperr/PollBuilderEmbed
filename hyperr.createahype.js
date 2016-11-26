
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory();
	} else if (typeof root === "object") {
		root.hyperr = root.hyperr || {};
		root.hyperr.createAHype = factory();
	}
}(this, function(){
    
	var createAHype = {
		
		targetOrigin: "*", // TODO: this needs to change
		
		embed: function(toAdd)
		{
			if (typeof toAdd === 'string')
				toAdd = window.document.querySelector(toAdd);
			
			var style = window.getComputedStyle(toAdd);
			
			if (style.getPropertyValue("position") === 'static')
				toAdd.style.position = 'relative';
			
			addEmbed(toAdd);
		}
	}
	
	var iframeStyle = 'border:none; outline:none; display:block;';
	var layoverStyle = 'display:none; position:absolute; width:100%; height:100%; left:0; top:0;';
	var addHTML = '<iframe src="embeddable.html" width="100%" height="100%" style="'+iframeStyle+'"></iframe><div class="iframe-layover" style="'+layoverStyle+'"></div>';
	
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
		target.contentWindow.postMessage(JSON.stringify({event:'drop', data:hypeDragData}), createAHype.targetOrigin)
		
		evt.stopPropagation();
		evt.preventDefault();
	}

	function dragover(evt)
	{
		if (!hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage(JSON.stringify({event:'dragover'}), createAHype.targetOrigin)
		
		evt.preventDefault();
		return false;
	}

	function dragleave(evt)
	{
		if (!hypeDragData)
			return;
		
		var target = evt.currentTarget.querySelector('iframe')
		target.contentWindow.postMessage(JSON.stringify({event:'dragleave'}), createAHype.targetOrigin)
		
		evt.preventDefault();
		return false;
	}


	// ------------------- generic drag starting/stopping to turn on/off iframes ----------------------

	function dragstart(evt)
	{
		if (!evt || !evt.target || !evt.target.hasAttribute || !evt.target.hasAttribute('data-for-hype'))
			return;
		
		var data = evt.target.getAttribute('data-for-hype')
		
		if (data)
		{
			hypeDragData = data;
			
			if (evt.dataTransfer && evt.dataTransfer.setData)
				evt.dataTransfer.setData('text', data); // firefox needs dataTransfer data to work, but we don't actually use it
			
			var i = iframes.length;
			while (i--) {
				iframes[i].style.pointerEvents = 'none';
				layovers[i].style.display = 'block';
				iframes[i].contentWindow.postMessage(JSON.stringify({event:'dragstart'}), createAHype.targetOrigin)
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
				iframes[i].contentWindow.postMessage(JSON.stringify({event:'dragend'}), createAHype.targetOrigin)
			}
		}
	}
	
	window.document.addEventListener('dragstart', dragstart, false);
	window.document.addEventListener('dragend', dragend, false);
	
	
	// ------------------- for adding the embeds ---------------------
	
	function addEmbed(cont)
	{
		cont.innerHTML = addHTML;
		cont.addEventListener('drop', drop, false);
		cont.addEventListener('dragover', dragover, false);
		cont.addEventListener('dragleave', dragleave, false);
		iframes.push(cont.querySelector('iframe'));
		layovers.push(cont.querySelector('.iframe-layover'));
	}
	
	
	return createAHype;

}));
