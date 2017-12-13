
export default class SVGButton
{
	constructor(className, circleBackground = '#fff', washPercent = 0, blackText = true, fadeBackground = '#fff')
	{
		this.className = className;
		this.circleBackground = circleBackground;
		this.washPercent = washPercent;
		this.blackText = blackText;
		this.fadeBackground = fadeBackground;
	}
	
	toString()
	{
		return `
		<div class="pollbuilder-button-state-cont pollbuilder-button-state-loading">
			<svg class="pollbuilder-button-state ${this.className}" viewBox="0 0 80 80" style="background-color:#ffffff00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width="80px" height="80px">
				<circle cx="40" cy="40" r="40" fill="${this.fadeBackground}" />
				<circle cx="40" cy="40" r="38.5" fill="${this.circleBackground}" stroke="${this.blackText ? '#000' : '#fff'}" stroke-width="1.5" opacity="${1-this.washPercent}" />
			</svg>
			<img style="position:absolute; top:27px; left:13px; width:56px; height:29px; opacity:${1-this.washPercent};" src="${pollBuilder._pollBuilderURL}/assets/other/poll_your_friends-${this.blackText ? 'black' : 'white'}.png" onload="${this.imgLoadCode()}"/>
		</div>`
	}
	
	imgLoadCode()
	{
		// removes the 'pollbuilder-button-state-loading' class once the image is loaded, and sets the opacity of the main button container to 1 (since it starts at 0 when using default sticker)
		return `this.parentNode.setAttribute('class', this.parentNode.getAttribute('class').replace(/ pollbuilder-button-state-loading/, '')); if(this.parentNode.parentNode) this.parentNode.parentNode.style.opacity = 1;`;
	}
}