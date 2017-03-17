
// assumes a JSON return value
export default function request(verb, url, body, headers)
{
	return new Promise((resolve, reject)=>
	{
		if (!body)
			body = '';
		if (typeof body === 'object')
			body = JSON.stringify(body);
		
		var req = new XMLHttpRequest();
		req.open(verb, url, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		
		if (headers)
			for (var key in headers)
				req.setRequestHeader(key, headers[key]);
		
		req.onerror = function(){
			reject(new Error('No server response.'));
		}
		
		req.onload = function(){
			try {
				var response = JSON.parse(req.responseText);
			} catch (e) {
				reject(new Error('Invalid JSON response. Responded:\n\n'+req.responseText));
			}
			if (req.status>=200 && req.status<400 && response) {
				resolve(response);
			} else {
				reject(new Error(response));
			}
		}
		
		req.send(body);
	})
}
