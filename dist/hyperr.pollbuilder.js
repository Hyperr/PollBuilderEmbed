/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventDispatcher2 = __webpack_require__(1);
	
	var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);
	
	var _utils = __webpack_require__(2);
	
	__webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*******************************************************
	 * Copyright (C) 2016 PTP APP LLC - All Rights Reserved
	 * Unauthorized copying of this file, in whole or in part, via any medium is strictly prohibited.
	 * Proprietary and Confidential
	 *******************************************************/
	
	//import request from './request';
	
	
	// the default button image for sticky builder if no others are given
	var defaultImage = 'https://res.cloudinary.com/hofetmrsh/image/upload/assets/ask_button.png';
	var defaultHover = 'https://res.cloudinary.com/hofetmrsh/image/upload/assets/ask_button_over.png';
	
	var PollBuilder = function (_EventDispatcher) {
		_inherits(PollBuilder, _EventDispatcher);
	
		function PollBuilder() {
			var _ref;
	
			var _temp, _this, _ret;
	
			_classCallCheck(this, PollBuilder);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PollBuilder.__proto__ || Object.getPrototypeOf(PollBuilder)).call.apply(_ref, [this].concat(args))), _this), _this.version = '1.0.1', _this.isSupported = _utils.isSupported, _this._apiURL = 'https://api.gethyperr.com', _this._pollBuilderURL = 'https://pollbuilder.gethyperr.com', _this._targetOrigin = 'https://pollbuilder.gethyperr.com', _temp), _possibleConstructorReturn(_this, _ret);
		}
		// version is important so that poll-builder served from hyperr knows what script is in use
	
	
		// whether or not this component is supported
	
	
		// private API, for setting the API and poll builder urls
		// prefix domain for the API
		// prefix domain for the iframe
	
	
		_createClass(PollBuilder, [{
			key: 'requestData',
			// target domain you want to allow communication from
	
			// requests for the poll builder to send a pb:data event with the raw state data, can use index/id/direct reference to choose iframe, otherwise uses 0
			value: function requestData(ident) {
				ident = ident || 0;
	
				var iframe = ident;
				if (typeof ident === 'number') iframe = iframes[ident];
				if (typeof ident === 'string') iframe = document.querySelector(ident);
	
				iframe.contentWindow.postMessage({ event: 'requestdata' }, pollBuilder._targetOrigin);
			}
	
			// used to actually embed a poll builder in an element when manually used (i.e. no sticky)
	
		}, {
			key: 'embed',
			value: function embed(cont, token) {
				if (!pollBuilder.isSupported()) console.warn("This browser/device is not capable of using hyperr poll builder with drag and drop. You can use `pollBuilder.isSupported()` to determine this at runtime.");
	
				return new Promise(function (resolve, reject) {
					if (typeof cont === 'string') cont = window.document.querySelector(cont);
	
					var style = window.getComputedStyle(cont);
					if (style.getPropertyValue('position') === 'static') {
						console.warn('Embed container must not be set to the CSS `position:static;`. It will be changed to relative.');
						cont.style.position = 'relative';
					}
	
					var index = iframes.length;
					var id = 'pollbuilder-iframe-' + index;
					var urlWVars = pollBuilder._pollBuilderURL + '/' + token + '?pollBuilderID=' + id + '&pollBuilderIndex=' + index + '&scriptVersion=' + pollBuilder.version;
	
					var iframeStyle = 'border:none; outline:none; display:block;';
					var layoverStyle = 'display:none; position:absolute; width:100%; height:100%; left:0; top:0;';
					var addHTML = '<iframe id="' + id + '" src="' + urlWVars + '" width="100%" height="100%" style="' + iframeStyle + '"></iframe><div class="iframe-layover" style="' + layoverStyle + '"></div>';
	
					cont.innerHTML = addHTML;
					cont.addEventListener('drop', drop, false);
					cont.addEventListener('dragover', dragover, false);
					cont.addEventListener('dragleave', dragleave, false);
					var iframe = cont.querySelector('iframe');
					iframes.push(iframe);
					var dispatcher = new _EventDispatcher3.default();
					dispatchers.push(dispatcher);
					layovers.push(cont.querySelector('.iframe-layover'));
					iframe.pollBuilderEventDispatcher = dispatcher;
					dispatcher.iframe = iframe;
					iframe.style.width = '0px';
					iframe.style.height = '0px';
	
					var firstSize = true,
					    height = 0;
					dispatcher.addEventListener('pb:sizechange', function (evt) {
						var newHeight = evt.data.height;
	
						if (firstSize) iframe.style.width = evt.data.width + 'px'; // only need to set width first time
						else iframe.style.transition = 'height ' + (newHeight < height ? 400 : 200) + 'ms';
	
						iframe.style.height = height = newHeight + 'px';
						height = newHeight;
						firstSize = false;
					});
	
					resolve(iframe);
				});
			}
	
			// an easier way to use, creates a sticky version with certain data
	
		}, {
			key: 'embedSticky',
			value: function embedSticky(token, init) {
				init = init || {};
				init.side = (0, _utils.def)(init.side, 'right');
				init.fromTop = (0, _utils.def)(init.fromTop, false);
				init.verticalPercent = (0, _utils.def)(init.verticalPercent, 0);
				init.verticalOffset = (0, _utils.def)(init.verticalOffset, 10);
				init.position = (0, _utils.def)(init.position, 'fixed');
				init.zIndex = (0, _utils.def)(init.zIndex, 99);
				init.buttonImage = (0, _utils.def)(init.buttonImage, defaultImage);
				init.buttonImageHover = (0, _utils.def)(init.buttonImageHover, defaultHover);
				init.buttonImageActive = (0, _utils.def)(init.buttonImageActive, null);
				init.buttonImages2x = (0, _utils.def)(init.buttonImages2x, false);
				init.buttonMarkup = (0, _utils.def)(init.buttonMarkup, null);
				init.buttonBottom = (0, _utils.def)(init.buttonBottom, false);
				init.backgroundColor = (0, _utils.def)(init.backgroundColor, '#fff');
	
				init.buttonStyles = (0, _utils.def)(init.buttonStyles, 'box-shadow:0 2px 5px rgba(0,0,0,0.25);');
				init.builderStyles = (0, _utils.def)(init.builderStyles, 'box-shadow:0 1px 5px rgba(0,0,0,0.25);');
	
				var index = iframes.length;
	
				// create main container that holds it all
				var cont = document.createElement('div');
				cont.style.position = init.position;
				cont.style.backgroundColor = init.backgroundColor;
				cont.style[init.side] = '0px';
				cont.style.zIndex = init.zIndex + '';
				cont.style[init.fromTop ? 'top' : 'bottom'] = 'calc(' + init.verticalPercent + '% + ' + init.verticalOffset + 'px)';
				cont.id = 'pollbuilder-sticky-' + index;
				document.body.appendChild(cont);
	
				// create the container that holds the poll builder part
				var pb = document.createElement('div');
				pb.style.cssText = init.buttonStyles;
				pb.className = 'poll-builder-instance';
				pb.style.overflow = 'hidden';
				setTimeout(function () {
					pb.style.transition = 'width 400ms';
				}, 0); // add on event loop so that it doesn't animate from load
				cont.appendChild(pb);
	
				// embed the poll builder where we want it...
				var prom = pollBuilder.embed(pb, token);
				prom.then(function (iframe) {
					// we won't know the data width until the iframe randers and gives it to us via this event
					iframe.pollBuilderEventDispatcher.addEventListener('pb:sizechange', firstSizeChange);
					function firstSizeChange(evt) {
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
							btn.innerHTML = '<img src="' + init.buttonImage + '" ' + attr2xMain + '/>';
	
							if (init.buttonImageHover) btn.innerHTML += '<img src="' + init.buttonImageHover + '" class="poll-builder-button-hover" ' + attr2x + '/>';
							if (init.buttonImageActive) btn.innerHTML += '<img src="' + init.buttonImageActive + '" class="poll-builder-button-active" ' + attr2x + '/>';
	
							btn.innerHTML += '\n\t\t\t\t\t\t<style>\n\t\t\t\t\t\t\t.poll-builder-button img {\n\t\t\t\t\t\t\t\tdisplay:block;\n\t\t\t\t\t\t\t\ttransition:opacity 200ms;\n\t\t\t\t\t\t\t\topacity:0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t.poll-builder-button img.poll-builder-button-hover,\n\t\t\t\t\t\t\t.poll-builder-button img.poll-builder-button-active {\n\t\t\t\t\t\t\t\tposition:absolute;\n\t\t\t\t\t\t\t\tleft:0;\n\t\t\t\t\t\t\t\ttop:0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t.poll-builder-button:hover img.poll-builder-button-hover { opacity:1; }\n\t\t\t\t\t\t\t.poll-builder-button:active img.poll-builder-button-active { opacity:1; }\n\t\t\t\t\t\t</style>';
						} else {
							console.warn('No button image or markup was given for the poll builder!');
						}
						cont.appendChild(btn);
	
						// remove listener
						iframe.pollBuilderEventDispatcher.removeEventListener('pb:sizechange', firstSizeChange);
					}
	
					// listen for a begindrag and open it
					dispatchers[index].addEventListener('pb:begindrag', function () {
						pollBuilder.maximizeSticky(index);
					});
	
					// now start out minimized
					pollBuilder.minimizeSticky(index);
	
					// float it to one side depending on the side it's on, cuz it makes it animate better
					iframe.style.float = init.side === 'right' ? 'left' : 'right';
				});
	
				return prom;
			}
		}, {
			key: 'minimizeSticky',
			value: function minimizeSticky(index) {
				index = index || 0;
				var cont = document.getElementById('pollbuilder-sticky-' + index);
				if (!cont) return;
				var pb = cont.getElementsByClassName('poll-builder-instance')[0];
				var maxxed = pb.getAttribute('data-maximized') != false;
				if (maxxed) iframes[index].contentWindow.postMessage({ event: 'stickyminimize' }, pollBuilder._targetOrigin);
				pb.setAttribute('data-maximized', '0');
				pb.style.width = '0px';
			}
		}, {
			key: 'maximizeSticky',
			value: function maximizeSticky(index) {
				index = index || 0;
				var cont = document.getElementById('pollbuilder-sticky-' + index);
				if (!cont) return;
				var pb = cont.getElementsByClassName('poll-builder-instance')[0];
				var maxW = pb.getAttribute('data-width');
				var maxxed = pb.getAttribute('data-maximized') != false;
				if (!maxxed) iframes[index].contentWindow.postMessage({ event: 'stickymaximize' }, pollBuilder._targetOrigin);
				pb.setAttribute('data-maximized', '1');
				pb.style.width = maxW + 'px';
			}
		}, {
			key: 'toggleSticky',
			value: function toggleSticky(index) {
				index = index || 0;
				var cont = document.getElementById('pollbuilder-sticky-' + index);
				if (!cont) return;
				var pb = cont.getElementsByClassName('poll-builder-instance')[0];
				var maxxed = pb.getAttribute('data-maximized') != false;
				if (maxxed) pollBuilder.minimizeSticky(index);else pollBuilder.maximizeSticky(index);
			}
		}]);
	
		return PollBuilder;
	}(_EventDispatcher3.default);
	
	// create/export for usage
	
	
	var pollBuilder = new PollBuilder();
	exports.default = pollBuilder;
	
	window.pollBuilder = pollBuilder;
	
	// need to keep a list of droppable iframes and their layovers in order to shut them off whenever dragging
	var iframes = [];
	var layovers = [];
	var dispatchers = pollBuilder.dispatchers = [];
	var hypeDragData = false;
	
	// ---------- the events/functions for the dropzone ---------
	
	function drop(evt) {
		if (!hypeDragData) return;
	
		try {
			hypeDragData = JSON.parse(hypeDragData);
		} catch (e) {}
	
		var target = evt.currentTarget.querySelector('iframe');
		target.contentWindow.postMessage({ event: 'drop', data: hypeDragData }, pollBuilder._targetOrigin);
	
		evt.stopPropagation();
		evt.preventDefault();
	}
	
	function dragover(evt) {
		if (!hypeDragData) return;
	
		var target = evt.currentTarget.querySelector('iframe');
		target.contentWindow.postMessage({ event: 'dragover' }, pollBuilder._targetOrigin);
	
		evt.preventDefault();
		return false;
	}
	
	function dragleave(evt) {
		if (!hypeDragData) return;
	
		var target = evt.currentTarget.querySelector('iframe');
		target.contentWindow.postMessage({ event: 'dragleave' }, pollBuilder._targetOrigin);
	
		evt.preventDefault();
		return false;
	}
	
	// ------------------- generic drag starting/stopping to turn on/off iframes ----------------------
	
	function dragstart(evt) {
		if (!evt || !evt.target || !evt.target.hasAttribute || !evt.target.hasAttribute('data-poll-builder')) return;
	
		var data = evt.target.getAttribute('data-poll-builder');
	
		if (data) {
			hypeDragData = data;
	
			if (evt.dataTransfer && evt.dataTransfer.setData) evt.dataTransfer.setData('text', data); // firefox needs dataTransfer data to work, but we don't actually use it
	
			var i = iframes.length;
			while (i--) {
				iframes[i].style.pointerEvents = 'none';
				layovers[i].style.display = 'block';
				iframes[i].contentWindow.postMessage({ event: 'dragstart' }, pollBuilder._targetOrigin);
			}
	
			pollBuilder.dispatchEvent({ type: 'pb:begindrag' });
			var j = dispatchers.length;
			while (j--) {
				dispatchers[j].dispatchEvent({ type: 'pb:begindrag' });
			}
		}
	}
	
	function dragend(evt) {
		if (hypeDragData) {
			hypeDragData = false;
	
			var i = iframes.length;
			while (i--) {
				iframes[i].style.pointerEvents = 'auto';
				layovers[i].style.display = 'none';
				iframes[i].contentWindow.postMessage({ event: 'dragend' }, pollBuilder._targetOrigin);
			}
		}
	}
	
	window.document.addEventListener('dragstart', dragstart, false);
	window.document.addEventListener('dragend', dragend, false);
	
	// ------------- deal with events from poll builder ------------
	
	window.addEventListener("message", function (obj) {
		var validOrigin = obj.origin === pollBuilder._targetOrigin;
		var wildTarget = pollBuilder._targetOrigin === '*';
		var dataIsObj = _typeof(obj.data) === 'object';
		var fromPollFlag = !!obj.data.fromPoll;
	
		// weed out messages not from poll builders
		if (!dataIsObj || !fromPollFlag || !validOrigin && !wildTarget) return;
	
		// if is flagged as an event, then dispatch it
		if (obj.data.isEvent) {
			var event = obj.data.event;
			var dispatcher = dispatchers[event.index];
			delete event.index; // user doesn't need this, will only be possibly confused
			dispatcher.dispatchEvent(event);
			pollBuilder.dispatchEvent(event);
		}
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventDispatcher = function () {
		function EventDispatcher() {
			_classCallCheck(this, EventDispatcher);
	
			this.callbacks = {};
		}
	
		_createClass(EventDispatcher, [{
			key: "addEventListener",
			value: function addEventListener(type, callback) {
				if (!this.callbacks[type]) this.callbacks[type] = [];
	
				if (this.callbacks[type].indexOf(callback) === -1) this.callbacks[type].push(callback);
			}
		}, {
			key: "hasEventListener",
			value: function hasEventListener(type, callback) {
				return this.callbacks[type] && this.callbacks[type].indexOf(callback) > -1;
			}
		}, {
			key: "removeEventListener",
			value: function removeEventListener(type, callback) {
				var arr = this.callbacks[type];
	
				if (arr) {
					var i = arr.indexOf(callback);
	
					if (i > -1) arr.splice(i, 1);
				}
			}
		}, {
			key: "dispatchEvent",
			value: function dispatchEvent(event) {
				var arr = this.callbacks[event.type];
	
				if (arr) for (var i = 0, ii = arr.length; i < ii; i++) {
					arr[i].call(this, event);
				}
			}
		}]);
	
		return EventDispatcher;
	}();
	
	exports.default = EventDispatcher;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.def = def;
	exports.isSupported = isSupported;
	function def(val, dflt) {
		return typeof val === 'undefined' ? dflt : val;
	}
	
	function isSupported() {
		var hasDraggable = "draggable" in document.createElement("div");
		var isKnownMobile = /Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);
		var hasEvents = isEventSupported('dragstart') && isEventSupported('drop');
	
		return hasDraggable && hasEvents && !isKnownMobile;
	}
	
	// isEventSupported code derived from https://github.com/kangax/iseventsupported
	// Copyright (c) 2009 Juriy Zaytsev, released open source under license: https://github.com/kangax/iseventsupported/blob/gh-pages/LICENSE
	function isEventSupported(eventName, element) {
		var TAGNAMES = {
			'select': 'input', 'change': 'input',
			'submit': 'form', 'reset': 'form',
			'error': 'img', 'load': 'img', 'abort': 'img'
		};
	
		element = element || document.createElement(TAGNAMES[element] || 'div');
		eventName = 'on' + eventName;
	
		// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
		var isSupported = eventName in element;
	
		if (!isSupported) {
			// If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
			if (!element.setAttribute) {
				element = document.createElement('div');
			}
			if (element.setAttribute && element.removeAttribute) {
				element.setAttribute(eventName, '');
				isSupported = typeof element[eventName] == 'function';
	
				// If property was created, "remove it" (by setting value to `undefined`)
				if (typeof element[eventName] != 'undefined') {
					element[eventName] = undefined;
				}
				element.removeAttribute(eventName);
			}
		}
	
		element = null;
		return isSupported;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	Copyright (c) 2014 Taylor Hakes
	Copyright (c) 2014 Forbes Lindesay
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/
	
	(function (root) {
	
	  // Store setTimeout reference so promise-polyfill will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var setTimeoutFunc = setTimeout;
	
	  function noop() {}
	
	  // Polyfill for Function.prototype.bind
	  function bind(fn, thisArg) {
	    return function () {
	      fn.apply(thisArg, arguments);
	    };
	  }
	
	  function Promise(fn) {
	    if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
	    if (typeof fn !== 'function') throw new TypeError('not a function');
	    this._state = 0;
	    this._handled = false;
	    this._value = undefined;
	    this._deferreds = [];
	
	    doResolve(fn, this);
	  }
	
	  function handle(self, deferred) {
	    while (self._state === 3) {
	      self = self._value;
	    }
	    if (self._state === 0) {
	      self._deferreds.push(deferred);
	      return;
	    }
	    self._handled = true;
	    Promise._immediateFn(function () {
	      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
	      if (cb === null) {
	        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
	        return;
	      }
	      var ret;
	      try {
	        ret = cb(self._value);
	      } catch (e) {
	        reject(deferred.promise, e);
	        return;
	      }
	      resolve(deferred.promise, ret);
	    });
	  }
	
	  function resolve(self, newValue) {
	    try {
	      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
	      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then;
	        if (newValue instanceof Promise) {
	          self._state = 3;
	          self._value = newValue;
	          finale(self);
	          return;
	        } else if (typeof then === 'function') {
	          doResolve(bind(then, newValue), self);
	          return;
	        }
	      }
	      self._state = 1;
	      self._value = newValue;
	      finale(self);
	    } catch (e) {
	      reject(self, e);
	    }
	  }
	
	  function reject(self, newValue) {
	    self._state = 2;
	    self._value = newValue;
	    finale(self);
	  }
	
	  function finale(self) {
	    if (self._state === 2 && self._deferreds.length === 0) {
	      Promise._immediateFn(function () {
	        if (!self._handled) {
	          Promise._unhandledRejectionFn(self._value);
	        }
	      });
	    }
	
	    for (var i = 0, len = self._deferreds.length; i < len; i++) {
	      handle(self, self._deferreds[i]);
	    }
	    self._deferreds = null;
	  }
	
	  function Handler(onFulfilled, onRejected, promise) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.promise = promise;
	  }
	
	  /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	  function doResolve(fn, self) {
	    var done = false;
	    try {
	      fn(function (value) {
	        if (done) return;
	        done = true;
	        resolve(self, value);
	      }, function (reason) {
	        if (done) return;
	        done = true;
	        reject(self, reason);
	      });
	    } catch (ex) {
	      if (done) return;
	      done = true;
	      reject(self, ex);
	    }
	  }
	
	  Promise.prototype['catch'] = function (onRejected) {
	    return this.then(null, onRejected);
	  };
	
	  Promise.prototype.then = function (onFulfilled, onRejected) {
	    var prom = new this.constructor(noop);
	
	    handle(this, new Handler(onFulfilled, onRejected, prom));
	    return prom;
	  };
	
	  Promise.all = function (arr) {
	    var args = Array.prototype.slice.call(arr);
	
	    return new Promise(function (resolve, reject) {
	      if (args.length === 0) return resolve([]);
	      var remaining = args.length;
	
	      function res(i, val) {
	        try {
	          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
	            var then = val.then;
	            if (typeof then === 'function') {
	              then.call(val, function (val) {
	                res(i, val);
	              }, reject);
	              return;
	            }
	          }
	          args[i] = val;
	          if (--remaining === 0) {
	            resolve(args);
	          }
	        } catch (ex) {
	          reject(ex);
	        }
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        res(i, args[i]);
	      }
	    });
	  };
	
	  Promise.resolve = function (value) {
	    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
	      return value;
	    }
	
	    return new Promise(function (resolve) {
	      resolve(value);
	    });
	  };
	
	  Promise.reject = function (value) {
	    return new Promise(function (resolve, reject) {
	      reject(value);
	    });
	  };
	
	  Promise.race = function (values) {
	    return new Promise(function (resolve, reject) {
	      for (var i = 0, len = values.length; i < len; i++) {
	        values[i].then(resolve, reject);
	      }
	    });
	  };
	
	  // Use polyfill for setImmediate for performance gains
	  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
	    setImmediate(fn);
	  } || function (fn) {
	    setTimeoutFunc(fn, 0);
	  };
	
	  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
	    if (typeof console !== 'undefined' && console) {
	      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
	    }
	  };
	
	  /**
	   * Set the immediate function to execute callbacks
	   * @param fn {function} Function to execute
	   * @deprecated
	   */
	  Promise._setImmediateFn = function _setImmediateFn(fn) {
	    Promise._immediateFn = fn;
	  };
	
	  /**
	   * Change the function to execute on unhandled rejection
	   * @param {function} fn Function to execute on unhandled rejection
	   * @deprecated
	   */
	  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
	    Promise._unhandledRejectionFn = fn;
	  };
	
	  // modified from original to act as actual polyfill instead of UMD
	  if (window && !window.Promise) window.Promise = Promise;
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(5);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";
	
	(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	        // Callback can either be a function or a string
	        if (typeof callback !== "function") {
	            callback = new Function("" + callback);
	        }
	        // Copy function arguments
	        var args = new Array(arguments.length - 1);
	        for (var i = 0; i < args.length; i++) {
	            args[i] = arguments[i + 1];
	        }
	        // Store and register the task
	        var task = { callback: callback, args: args };
	        tasksByHandle[nextHandle] = task;
	        registerImmediate(nextHandle);
	        return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	            case 0:
	                callback();
	                break;
	            case 1:
	                callback(args[0]);
	                break;
	            case 2:
	                callback(args[0], args[1]);
	                break;
	            case 3:
	                callback(args[0], args[1], args[2]);
	                break;
	            default:
	                callback.apply(undefined, args);
	                break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            process.nextTick(function () {
	                runIfPresent(handle);
	            });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function () {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function onGlobalMessage(event) {
	            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function registerImmediate(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function (event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function registerImmediate(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function registerImmediate(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=hyperr.pollbuilder.js.map