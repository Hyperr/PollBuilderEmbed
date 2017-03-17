
export default class EventDispatcher
{
	callbacks = {};
	
	addEventListener(type, callback)
	{	
		if (!this.callbacks[type])
			this.callbacks[type] = [];
		
		if (this.callbacks[type].indexOf(callback) === -1)
			this.callbacks[type].push(callback);
	}
	
	hasEventListener(type, callback)
	{
		return this.callbacks[type] && this.callbacks[type].indexOf(callback) > -1;
	}
	
	removeEventListener(type, callback)
	{
		var arr = this.callbacks[type];
		
		if (arr)
		{
			var i = arr.indexOf(callback);
			
			if (i > -1)
				arr.splice(i, 1);
		}
	}
	
	dispatchEvent(event)
	{
		var arr = this.callbacks[event.type];
		
		if (arr)
			for (var i=0, ii=arr.length; i < ii; i++)
				arr[i].call(this, event);
	}
}
