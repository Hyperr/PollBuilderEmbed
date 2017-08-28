
export default class SVGButton
{
	constructor(className, circleBackground = '#fff', washPercent = 0, blackText = true, fadeBackground = '#fff')
	{
		this.className = className;
		this.circleBackground = circleBackground;
		this.washPercent = washPercent;
		this.blackText = blackText;console.log('black:', blackText)
		this.fadeBackground = fadeBackground;
	}
	
	toString()
	{
		return `
		<svg class="pollbuilder-button-state pollbuilder-button-state-loading ${this.className}" viewBox="0 0 80 80" style="background-color:#ffffff00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width="80px" height="80px">
			<circle cx="40" cy="40" r="40" fill="${this.fadeBackground}" />
			<circle cx="40" cy="40" r="38.5" fill="${this.circleBackground}" stroke="${this.blackText ? '#000' : '#fff'}" stroke-width="1.5" opacity="${1-this.washPercent}" />
			<image x="13" y="27" width="56" height="29" xlink:href="${pollBuilder._pollBuilderURL}/assets/other/poll_your_friends-${this.blackText ? 'black' : 'white'}.png" opacity="${1-this.washPercent}" onload="${this.imgLoadCode()}"/>
		</svg>`
	}
	
	imgLoadCode()
	{
		// removes the 'pollbuilder-button-state-loading' class once the image is loaded
		return `this.parentElement.setAttribute('class', this.parentElement.getAttribute('class').replace(/ pollbuilder-button-state-loading/, ''));`;
	}
}