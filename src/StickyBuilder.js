
import {shouldEmbedMobile, def, cssUnit} from './utils'
import Builder from './Builder'
import SVGButton from './SVGButton'

export default class StickyBuilder extends Builder
{
	sticky = null; // another container holding this.cont and this.button, necessary for sticky
	button = null; // the container of the button used, as set up in init
	init = null; // the initialization object used, normalized to defaults
	
	constructor(token, init)
	{
		// create the container that holds the poll builder part
		var cont = document.createElement('div');
		
		// if init.useMobile is null then detect on our own, otherwise honor their manual setting
		var useMobile = isEmpty(init.useMobile) ? shouldEmbedMobile() : init.useMobile;
		
		// super, and create the builder
		super(cont, token, {useMobile:useMobile});
		
		
		this.promise.then(iframe=>
		{
			// if it didn't embed, that's the end of it
			if (!this.iframe) return;
			
			// allow them to just use a string for init to use for buttons
			if (typeof init === 'string')
				init = {addButtons:init};
			
			// add defaults to init for any not provided
			init = handleDefaults(init, this.metadata);
			
			// if not drag and drop AND no addButtons given, then we don't want to embed because there won't be an adding method
			if (!pollBuilder.dragAndDropSupported() && !init.addButtons) {
				console.warn("Poll builder will not be embedded because this browser/device is not capable of drag and drop adding, and no other adding method is being used. Try the init option `addButtons` to allow adding that way.");
				return {promise:Promise.resolve(null)};
			}
			
			this.init = init;
			this.sticky = sticky;
			
			// apply styles to cont
			cont.style.cssText = this.mobile ? init.mobileBuilderStyles : init.builderStyles;
			
			// add the cont transition event loop so that it doesn't animate from load
			setTimeout(()=>{ cont.style.transition = `height 400ms ease-in-out, opacity 400ms`; }, 0);
			
			if (init.addButtons)
				pollBuilder.addButtons(init.addButtons)
			
			// create main container that holds it all
			var sticky = this.sticky = document.createElement('div');
			sticky.id = 'pollbuilder-sticky-'+this.index;
			sticky.className = 'pollbuilder-sticky';
			if (this.mobile)
				sticky.className += ' pollbuilder-sticky-mobile';
			
			// now add the cont to it, and add it to the page
			sticky.appendChild(cont);
			document.body.appendChild(sticky);
		
			// we won't know the data width until the iframe randers and gives it to us via this event
			this.addEventListener('pb:sizechange', this._onResize2);
			this.addEventListener('pb:sizechange', this._onFirstResize);
			
			// listen for a begindrag and open it
			this.addEventListener('pb:begindrag', function(){ pollBuilder.maximizeSticky(this.index); });
			
			// and listen for pb:closebuilder and pb:openbuilder for the builder wanting to close/open itself
			this.addEventListener('pb:closebuilder', function(){ pollBuilder.minimizeSticky(this.index); })
			this.addEventListener('pb:openbuilder',  function(){ pollBuilder.maximizeSticky(this.index); })
			
			// now start out minimized
			pollBuilder.minimizeSticky(this.index);
			
			// float it to one side depending on the side it's on, cuz it makes it animate better
			this.iframe.style.float = init.side==='right' ? 'left' : 'right';
		})
	}
	
	minimize()
	{
		if (this.maxxed && this.loaded)
		{
			this.iframe.contentWindow.postMessage({event:'stickyminimize'}, pollBuilder._targetOrigin);
			var event = {type:'pb:minimized'};
			this.dispatchEvent(event);
			pollBuilder.dispatchEvent(event);
		}
		
		this.sticky.setAttribute('data-maximized', '0');
		this.button && this.button.setAttribute('data-maximized', '0');
		this.cont.style.height = '0px';
	}
	
	maximize()
	{
		var maxW = this.cont.getAttribute('data-width');
		var maxH = this.cont.getAttribute('data-height');
		
		if (!this.maxxed)
		{
			this.iframe.contentWindow.postMessage({event:'stickymaximize'}, pollBuilder._targetOrigin);
			var event = {type:'pb:maximized'};
			this.dispatchEvent(event);
			pollBuilder.dispatchEvent(event);
		}
		
		this.sticky.setAttribute('data-maximized', '1');
		this.button && this.button.setAttribute('data-maximized', '1');
		this.cont.style.height = maxH+'px';
	}
	
	toggle()
	{
		if (this.maxxed)
			this.minimize();
		else
			this.maximize();
	}
	
	get maxxed()
	{
		return this.sticky.getAttribute('data-maximized') != false;
	}
	
	
	// INTERNAL -----------------------------------------------------------
	
	_onResize2 = (evt) =>
	{
		// track the width needed for the builder, or height since that's needed for mobile one
		this.cont.setAttribute('data-width', evt.data.width);
		this.cont.setAttribute('data-height', evt.data.height);
	}
	
	_onFirstResize = (evt) =>
	{
		var init = this.init;
		
		// create the container and contents of the poll builder button
		var btn = this.button = document.createElement('div');
		btn.style.cssText = this.mobile ? init.mobileButtonStyles : init.buttonStyles;
		btn.className = 'pollbuilder-button pollbuilder-button-hidden';
		btn.id = `pollbuilder-button-${this.index}`;
		btn.addEventListener('click', pollBuilder.toggleSticky.bind(null, this.index));
		setTimeout(()=>{ btn.className = 'pollbuilder-button'; }, init.buttonDelay);
		
		// fill that container based on the method from the init object
		if (init.buttonMarkup) {
			btn.innerHTML = init.buttonMarkup;
		} else if (init.buttonImage) {
			var attr2xMain = init.buttonImages2x ? 'onload="pollBuilder.utils.halfenImage(this);this.style.opacity=1;"' : 'onload="this.style.opacity=1;"';
			var attr2x = init.buttonImages2x ? 'onload="pollBuilder.utils.halfenImage(this);"' : '';
			btn.innerHTML = `<img src="${init.buttonImage}" class="pollbuilder-button-state pollbuilder-button-normal" ${attr2xMain}/>`;
			
			if (init.buttonImageHover)
				btn.innerHTML += `<img src="${init.buttonImageHover}" class="pollbuilder-button-state pollbuilder-button-hover" ${attr2x}/>`;
			if (init.buttonImageActive)
				btn.innerHTML += `<img src="${init.buttonImageActive}" class="pollbuilder-button-state pollbuilder-button-active" ${attr2x}/>`;
		} else {
			console.warn(`No button image or markup was given for the poll builder!`);
		}
		
		btn.innerHTML += cssToAdd();
		btn.innerHTML += `
			<style>
				#pollbuilder-sticky-${this.index} {
					position: ${init.position};
					background-color: ${init.backgroundColor};
					z-index: ${init.zIndex};
				}
				#pollbuilder-sticky-${this.index}:not(.pollbuilder-sticky-mobile) {
					border-radius: 6px;
				}
				#pollbuilder-button-${this.index} {
					position: ${init.position};
					${init.side==='left' ? 'left' : 'right'}: ${cssUnit(init.buttonOffsetY)};
					${init.side==='left' ? 'right' : 'left'}: auto;
					${init.fromTop ? 'top' : 'bottom'}: ${cssUnit(init.buttonOffsetX)};
					${init.fromTop ? 'bottom' : 'top'}: auto;
					transition: opacity 200ms;
					z-index: ${init.zIndex};
				}
				#pollbuilder-button-${this.index}[data-maximized="1"],
				#pollbuilder-button-${this.index}.pollbuilder-button-hidden {
					opacity: 0 !important;
					pointer-events: none;
				}
			</style>` // Normal CSS, seperate because of init options making each builder different
		if (this.mobile) {
			btn.innerHTML += `
			<style>
				
			</style>` // Mobile CSS, separate to make it only apply to mobile ones, and future applying of init options
		} else {
			btn.innerHTML += `
			<style>
				#pollbuilder-sticky-${this.index}[data-maximized="1"] { opacity: 1; transition: opacity 300ms ease 150ms; }
				#pollbuilder-sticky-${this.index}[data-maximized="0"] { opacity: 0; transition: opacity 300ms; }
				#pollbuilder-sticky-${this.index} {
					${init.side==='left' ? 'left' : 'right'}: ${cssUnit(init.builderOffsetY)};
					${init.side==='left' ? 'right' : 'left'}: auto;
					${init.fromTop ? 'top' : 'bottom'}: ${cssUnit(init.builderOffsetX)};
					${init.fromTop ? 'bottom' : 'top'}: auto;
				}
			</style>` // Desktop CSS, only applies to desktop
		}
		
		document.body.insertBefore(btn, this.sticky);
		
		// remove listener
		this.removeEventListener('pb:sizechange', this._onFirstResize);
	}
}


// STATIC PRIVATE -----------------------------------------------------------

function handleDefaults(init, metadata)
{
	init = init || {};
	init.side = def(init.side, 'right');
	init.fromTop = def(init.fromTop, false);
	init.buttonOffsetX = def(init.buttonOffsetX, 20);
	init.buttonOffsetY = def(init.buttonOffsetY, 20);
	init.builderOffsetX = def(init.builderOffsetX, 20);
	init.builderOffsetY = def(init.builderOffsetY, 20);
	init.position = def(init.position, 'fixed');
	init.zIndex = def(init.zIndex, 99);
	init.buttonImage = def(init.buttonImage, null);
	init.buttonImageHover = def(init.buttonImageHover, null);
	init.buttonImageActive = def(init.buttonImageActive, null);
	init.buttonImages2x = def(init.buttonImages2x, false);
	init.buttonMarkup = def(init.buttonMarkup, null);
	init.backgroundColor = def(init.backgroundColor, '#fff');
	init.addButtons = def(init.addButtons, false);
	init.useMobile = def(init.useMobile, null);
	init.buttonColor = def(init.buttonColor, metadata.theme.buttonColor || (!init.highlight?'#fff':init.highlight));
	init.invertButton = def(init.invertButton, isEmpty(metadata.theme.invertButton) ? !!init.highlight : metadata.theme.invertButton);
	init.highlight = def(init.highlight, metadata.theme.highlight || '#000');
	init.buttonStyles = def(init.buttonStyles, 'box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);');
	init.builderStyles = def(init.builderStyles, `box-shadow: 1px 0 1px ${init.highlight},-1px 0 1px ${init.highlight},0 1px 1px ${init.highlight},0 -1px 1px ${init.highlight}, 3px 3px 3px rgba(0, 0, 0, 0.15); border-radius: 6px;`);
	init.mobileButtonStyles = def(init.mobileButtonStyles, init.buttonStyles);
	init.mobileBuilderStyles = def(init.mobileBuilderStyles, `box-shadow: 1px 0 1px ${init.highlight},-1px 0 1px ${init.highlight},0 1px 1px ${init.highlight},0 -1px 1px ${init.highlight}, 0 0 6px 0 rgba(0, 0, 0, 0.15);`);
	init.buttonDelay = def(init.buttonDelay, 0);
	
	// if button is not set at all by user, then use default values
	if (!init.buttonImage && !init.buttonImageHover && !init.buttonImageActive && !init.buttonImages2x && !init.buttonMarkup) {
		init.buttonMarkup = new SVGButton('pollbuilder-button-normal', init.buttonColor, 0, !init.invertButton) + new SVGButton('pollbuilder-button-hover', init.buttonColor, 0.3, !init.invertButton);
		init.buttonStyles += 'border-radius: 999px; opacity: 0;';
		init.mobileButtonStyles += 'border-radius: 999px; opacity: 0;';
	}
	
	return init;
}

function isEmpty(val)
{
	return typeof val === 'undefined' || val === null;
}



var cssAdded = false;
function cssToAdd()
{
	if (!cssAdded)
	{
		cssAdded = true;
		return `
			<style>
				.pollbuilder-button {
					position: fixed;
					cursor: pointer;
					width: 80px;
					height: 80px;
				}
				
				.pollbuilder-button .pollbuilder-button-state-cont {
					transition: opacity 300ms;
					opacity: 1;
					position: absolute;
				}
				.pollbuilder-button .pollbuilder-button-state-cont.pollbuilder-button-state-loading {
					opacity: 0 !important;
				}
				
				.pollbuilder-button .pollbuilder-button-state {
					display: block;
					max-width: none;
					max-height: none;
					width: auto;
					height: auto;
					transition: opacity 200ms;
				}
				.pollbuilder-button svg.pollbuilder-button-state {
					
				}
				.pollbuilder-button .pollbuilder-button-normal {
					opacity: 1;
				}
				
				.pollbuilder-button .pollbuilder-button-state.pollbuilder-button-hover,
				.pollbuilder-button .pollbuilder-button-state.pollbuilder-button-active {
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
				}
				
				.pollbuilder-button:hover .pollbuilder-button-state.pollbuilder-button-hover { opacity:1; }
				.pollbuilder-button:active .pollbuilder-button-state.pollbuilder-button-active { opacity:1; }
				
				
				
				.pollbuilder-sticky-mobile {
					top: auto !important;
					bottom: 0px !important;
					min-width: 320px;
				}
				@media screen and (max-width: 440px) {
					.pollbuilder-sticky-mobile {
						width: 100% !important;
					}
				}
				@media screen and (min-width: 441px) {
					.pollbuilder-sticky-mobile {
						width: 440px !important;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			</style>`
	} else {
		return '';
	}
}