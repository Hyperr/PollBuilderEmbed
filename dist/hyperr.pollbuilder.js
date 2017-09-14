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
	
	var _UtilsClass = __webpack_require__(4);
	
	var _UtilsClass2 = _interopRequireDefault(_UtilsClass);
	
	var _Builder = __webpack_require__(5);
	
	var _Builder2 = _interopRequireDefault(_Builder);
	
	var _StickyBuilder = __webpack_require__(7);
	
	var _StickyBuilder2 = _interopRequireDefault(_StickyBuilder);
	
	__webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*******************************************************
	 * Copyright (C) 2016 PTP APP LLC - All Rights Reserved
	 * Unauthorized copying of this file, in whole or in part, via any medium is strictly prohibited.
	 * Proprietary and Confidential
	 *******************************************************/
	
	var PollBuilder = function (_EventDispatcher) {
		_inherits(PollBuilder, _EventDispatcher);
	
		function PollBuilder() {
			var _ref;
	
			var _temp, _this, _ret;
	
			_classCallCheck(this, PollBuilder);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PollBuilder.__proto__ || Object.getPrototypeOf(PollBuilder)).call.apply(_ref, [this].concat(args))), _this), _this.version = '2.1.0', _this.isSupported = _utils.isSupported, _this.dragAndDropSupported = _utils.dragAndDropSupported, _this._apiURL = 'https://api.gethyperr.com', _this._pollBuilderURL = 'https://pollbuilder.gethyperr.com', _this._targetOrigin = 'https://pollbuilder.gethyperr.com', _this.utils = _UtilsClass2.default, _this.instances = _Builder2.default.instances, _temp), _possibleConstructorReturn(_this, _ret);
		}
		// version is important so that pollbuilder served from hyperr knows what script is in use
	
	
		// whether or not this component is supported
	
	
		// whether or not the drag and drop usage is supported
	
	
		// private API, for setting the API and poll builder urls and other stuff
		// prefix domain for the API
		// prefix domain for the iframe
	
	
		_createClass(PollBuilder, [{
			key: '_iframeLoaded',
			// target domain you want to allow communication from
			value: function _iframeLoaded(ind) {
				_Builder2.default.setLoaded(ind);
			}
	
			// utility functions that the pollBuilder needs or provides
	
		}, {
			key: 'requestData',
	
	
			// requests for the poll builder to send a pb:data event with the raw state data, can use index to choose iframe, otherwise uses 0
			value: function requestData() {
				var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
				var iframe = this.instances[index].iframe;
				iframe.contentWindow.postMessage({ event: 'requestdata' }, pollBuilder._targetOrigin);
			}
	
			// Array of instances for the poll builder, automatically kept up by the Builder class
	
		}, {
			key: 'embed',
	
	
			// used to actually embed a poll builder in an element when manually used (i.e. no sticky)
			value: function embed(cont, token, opts) {
				var inst = new _Builder2.default(cont, token, opts);
				return inst.promise;
			}
	
			// an easier way to use, creates a sticky version with certain data
	
		}, {
			key: 'embedSticky',
			value: function embedSticky(token, init) {
				var inst = new _StickyBuilder2.default(token, init);
				return inst.promise;
			}
		}, {
			key: 'minimizeSticky',
			value: function minimizeSticky() {
				var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
				var inst = _Builder2.default.instances[index];
				inst.minimize();
			}
		}, {
			key: 'maximizeSticky',
			value: function maximizeSticky() {
				var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
				var inst = _Builder2.default.instances[index];
				inst.maximize();
			}
		}, {
			key: 'toggleSticky',
			value: function toggleSticky() {
				var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
				var inst = _Builder2.default.instances[index];
				inst.toggle();
			}
		}, {
			key: 'addButtons',
			value: function addButtons(queryStr) {
				var list = document.querySelectorAll(queryStr);
				for (var i = 0, ii = list.length; i < ii; i++) {
					list[i].addEventListener('click', _Builder2.default.buttonAdd);
				}
			}
		}]);
	
		return PollBuilder;
	}(_EventDispatcher3.default);
	
	// create/export for usage
	
	
	var pollBuilder = new PollBuilder();
	exports.default = pollBuilder;
	
	window.pollBuilder = pollBuilder;
	
	// ------------------- need to listen to all dragging events to pass them to builders ----------------------
	
	window.document.addEventListener('dragstart', _Builder2.default.dragStart, false);
	window.document.addEventListener('dragend', _Builder2.default.dragEnd, false);
	
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
			var index = event.index;
			delete event.index; // user doesn't need this, will only be possibly confused
			pollBuilder.instances[index].dispatchEvent(event);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.def = def;
	exports.isSupported = isSupported;
	exports.dragAndDropSupported = dragAndDropSupported;
	exports.shouldEmbedMobile = shouldEmbedMobile;
	exports.cssUnit = cssUnit;
	
	var _Platform = __webpack_require__(3);
	
	var _Platform2 = _interopRequireDefault(_Platform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function def(val, dflt) {
		return typeof val === 'undefined' ? dflt : val;
	}
	
	function isSupported() {
		var ie = getIEVersion();
	
		if (ie && ie < 10) return false;
	
		return true;
	}
	
	function dragAndDropSupported() {
		var hasDraggable = "draggable" in document.createElement("div");
		var isKnownMobile = /Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);
		var hasEvents = isEventSupported('dragstart') && isEventSupported('drop');
	
		return hasDraggable && hasEvents && !isKnownMobile;
	}
	
	function shouldEmbedMobile() {
		return _Platform2.default.mobile;
	}
	
	function getIEVersion() // Note: undefined for IE Edge
	{
		var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
		return match ? parseInt(match[1]) : undefined;
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
	
	function cssUnit(val) {
		if (typeof val === 'number') return val + 'px';else return val;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
		This script is not open source. It is a proprietary script not to be reused or redistributed.
	*/
	
	var Platform = function Platform() {
		_classCallCheck(this, Platform);
	
		this.desktop = false;
		this.mobile = false;
		this.phone = false;
		this.tablet = false;
		this.android = false;
		this.ios = false;
		this.blackberry = false;
		this.winmobile = false;
	} // true if phone OR tablet
	;
	
	// ----------- setup ------------
	
	exports.default = Platform;
	var os = navigator.platform.toLowerCase(),
	    ua = navigator.userAgent.toLowerCase();
	var easyregex = /mobi(le)?|tablet|phone|palm|pocket|handheld|e?book|reader|ip(ad|od|hone)|android|blackberry|playbook|webos|windows ce/;
	var osregex = /linux|unix|^win|^mac/;
	var isIE = !!navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
	
	// figure out mobile vs desktop
	if (!isIE && (easyregex.test(os) || easyregex.test(ua))) {
		Platform.mobile = true;
	} else if (osregex.test(os)) {
		Platform.desktop = true;
	} else {
		Platform.mobile = true; // assume mobile if unknown
	}
	
	// if mobile, try to determine type
	if (Platform.mobile) {
		// figure out OS if we can
		if (/android/.test(ua)) Platform.android = true;else if (/ip(ad|od|hone)/.test(ua)) Platform.ios = true;else if (/blackberry|playbook/.test(ua)) Platform.blackberry = true;else if (/windows/.test(ua)) Platform.winmobile = true;
	
		// determine tablet vs phone
		if (/tablet|ipad|playbook/.test(ua)) Platform.tablet = true;else if (/phone/.test(ua)) Platform.phone = true;else Platform.phone = true; // default to phone if unknown
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Utils = function () {
		function Utils() {
			_classCallCheck(this, Utils);
		}
	
		_createClass(Utils, null, [{
			key: "halfenImage",
	
			// used onload to halfen images that are double size for retina
			value: function halfenImage(img) {
				img.style.width = img.width / 2 + "px";
			}
		}]);
	
		return Utils;
	}();
	
	exports.default = Utils;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _EventDispatcher2 = __webpack_require__(1);
	
	var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);
	
	var _request = __webpack_require__(6);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Builder = function (_EventDispatcher) {
		_inherits(Builder, _EventDispatcher);
	
		_createClass(Builder, null, [{
			key: 'dragStart',
			value: function dragStart(evt) {
				Builder.instances.map(function (inst) {
					return inst._dragstart(evt);
				});
				pollBuilder.dispatchEvent({ type: 'pb:begindrag' });
			}
			// STATIC PUBLIC -----------------------------------------------------------
	
		}, {
			key: 'dragEnd',
			value: function dragEnd(evt) {
				Builder.instances.map(function (inst) {
					return inst._dragend(evt);
				});
				pollBuilder.dispatchEvent({ type: 'pb:enddrag' });
			}
		}, {
			key: 'buttonAdd',
			value: function buttonAdd(evt) {
				var btn = evt.currentTarget;
				var index = parseInt(btn.getAttribute('data-poll-builder-index')) || 0;
				Builder.instances[index]._buttonadd(btn);
			}
		}, {
			key: 'setLoaded',
			value: function setLoaded(index) {
				Builder.instances[index].loaded = true;
			}
	
			// PUBLIC -----------------------------------------------------------
	
			// containing element it's being embedded in
			// the iframe element itself
			// layover element that goes over the iframe
	
		}]);
	
		function Builder(cont, token, opts) {
			_classCallCheck(this, Builder);
	
			var _this = _possibleConstructorReturn(this, (Builder.__proto__ || Object.getPrototypeOf(Builder)).call(this));
	
			_this.index = null;
			_this.id = null;
			_this.mobile = null;
			_this.token = null;
			_this.promise = null;
			_this.metadata = null;
			_this.cont = null;
			_this.iframe = null;
			_this.layover = null;
			_this.loaded = false;
			_this._firstSize = true;
			_this._height = 0;
			_this._hypeDragData = false;
	
			_this._onResize = function (evt) {
				var newHeight = evt.data.height;
	
				if (_this._firstSize) _this.iframe.style.width = _this.mobile ? '100%' : evt.data.width + 'px';
	
				if (!_this._firstSize) _this.iframe.style.transition = 'height ' + (newHeight < _this._height ? 400 : 200) + 'ms';
	
				if (!_this._firstSize && _this.maxxed) _this.cont.style.height = newHeight + 'px';
	
				_this.iframe.style.height = newHeight + 'px';
	
				_this._height = newHeight;
				_this._firstSize = false;
			};
	
			_this._dragstart = function (evt) {
				// if not a poll builder intended item, ignore
				if (!evt || !evt.target || !evt.target.hasAttribute || !evt.target.hasAttribute('data-poll-builder')) return;
	
				var data = evt.target.getAttribute('data-poll-builder');
	
				if (data) {
					_this._hypeDragData = data;
	
					if (evt.dataTransfer && evt.dataTransfer.setData) evt.dataTransfer.setData('text', data); // firefox needs dataTransfer data to work, but we don't actually use it
	
					_this.iframe.style.pointerEvents = 'none';
					_this.layover.style.display = 'block';
					_this.iframe.contentWindow.postMessage({ event: 'dragstart' }, pollBuilder._targetOrigin);
					_this.dispatchEvent({ type: 'pb:begindrag' });
				}
			};
	
			_this._dragend = function (evt) {
				if (_this._hypeDragData) {
					_this._hypeDragData = false;
	
					_this.iframe.style.pointerEvents = 'auto';
					_this.layover.style.display = 'none';
					_this.iframe.contentWindow.postMessage({ event: 'dragend' }, pollBuilder._targetOrigin);
				}
			};
	
			_this._dragover = function (evt) {
				if (!_this._hypeDragData) return;
	
				var target = evt.currentTarget.querySelector('iframe');
				target.contentWindow.postMessage({ event: 'dragover' }, pollBuilder._targetOrigin);
	
				evt.preventDefault();
				return false;
			};
	
			_this._dragleave = function (evt) {
				if (!_this._hypeDragData) return;
	
				var target = evt.currentTarget.querySelector('iframe');
				target.contentWindow.postMessage({ event: 'dragleave' }, pollBuilder._targetOrigin);
	
				evt.preventDefault();
				return false;
			};
	
			_this._drop = function (evt) {
				if (!_this._hypeDragData) return;
	
				try {
					_this._hypeDragData = JSON.parse(_this._hypeDragData);
				} catch (e) {}
	
				var target = evt.currentTarget.querySelector('iframe');
				target.contentWindow.postMessage({ event: 'drop', data: _this._hypeDragData }, pollBuilder._targetOrigin);
	
				evt.stopPropagation();
				evt.preventDefault();
			};
	
			_this._buttonadd = function (btn) {
				try {
	
					var data = btn.getAttribute('data-poll-builder');
					data = JSON.parse(data);
	
					if (_this.iframe) {
						_this.iframe.contentWindow.postMessage({ event: 'add', data: data }, pollBuilder._targetOrigin);
						_this.dispatchEvent({ type: 'pb:buttonadd', button: btn });
						pollBuilder.dispatchEvent({ type: 'pb:buttonadd', button: btn });
					}
	
					pollBuilder.maximizeSticky(_this.index);
				} catch (e) {}
			};
	
			var index = _this.index = Builder.instances.length;
			Builder.instances[index] = _this;
	
			if (!pollBuilder.isSupported()) {
				var _ret;
	
				console.warn("This browser/device is not capable of using hyperr poll builder and will not embed. You can use `pollBuilder.isSupported()` to determine this at runtime.");
				return _ret = { promise: Promise.resolve(null) }, _possibleConstructorReturn(_this, _ret);
			}
	
			_this.promise = new Promise(function (resolve, reject) {
				var style = window.getComputedStyle(cont);
				if (style.getPropertyValue('position') === 'static') {
					console.warn('Embed container must not be set to the CSS `position:static;`. It will be changed to relative.');
					cont.style.position = 'relative';
				}
	
				(0, _request2.default)('GET', pollBuilder._apiURL + '/builders/' + token).then(function (metadata) {
					_this.metadata = metadata;
					_this.index = index;
					_this.cont = typeof cont === 'string' ? window.document.querySelector(cont) : cont;
					_this.id = 'pollbuilder-iframe-' + _this.index;
					_this.mobile = opts && opts.useMobile;
	
					var urlWVars = pollBuilder._pollBuilderURL + '/' + token + '?pollBuilderID=' + _this.id + '&pollBuilderIndex=' + index + '&scriptVersion=' + pollBuilder.version + (_this.mobile ? '&mobile=1' : '') + (pollBuilder.dragAndDropSupported() ? '&dnd=1' : '');
					var addHTML = '<iframe id="' + _this.id + '" class="pollbuilder-iframe" onload="pollBuilder._iframeLoaded(' + index + ');" src="' + urlWVars + '"></iframe><div class="pollbuilder-iframe-layover"></div>';
					addHTML += cssToAdd(); // adds static CSS needed if not already added
	
					cont.innerHTML = addHTML;
					cont.addEventListener('drop', _this._drop, false);
					cont.addEventListener('dragover', _this._dragover, false);
					cont.addEventListener('dragleave', _this._dragleave, false);
					cont.className += ' pollbuilder-cont';
	
					var iframe = _this.iframe = cont.querySelector('iframe');
					iframe.builder = _this;
					iframe.style.width = '0px';
					iframe.style.height = '0px';
	
					_this.layover = cont.querySelector('.pollbuilder-iframe-layover');
	
					_this.addEventListener('pb:sizechange', _this._onResize);
	
					resolve(iframe);
				}).catch(function (err) {
					reject(err);
				});
			});
			return _this;
		}
	
		// INTERNAL -----------------------------------------------------------
	
		return Builder;
	}(_EventDispatcher3.default);
	
	// STATIC PRIVATE  -----------------------------------------------------------
	
	Builder.instances = [];
	exports.default = Builder;
	var cssAdded = false;
	function cssToAdd() {
		if (!cssAdded) {
			cssAdded = true;
			return '\n\t\t\t<style>\n\t\t\t\t.pollbuilder-cont {\n\t\t\t\t\toverflow: hidden;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.pollbuilder-iframe-layover {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttop: 0;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.pollbuilder-iframe {\n\t\t\t\t\tborder: none;\n\t\t\t\t\toutline: none;\n\t\t\t\t\tdisplay: block;\n\t\t\t\t}\n\t\t\t</style>';
		} else {
			return '';
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = request;
	
	// assumes a JSON return value
	function request(verb, url, body, headers) {
		return new Promise(function (resolve, reject) {
			if (!body) body = '';
			if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') body = JSON.stringify(body);
	
			var req = new XMLHttpRequest();
			req.open(verb, url, true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	
			if (headers) for (var key in headers) {
				req.setRequestHeader(key, headers[key]);
			}req.onerror = function () {
				reject(new Error('No server response.'));
			};
	
			req.onload = function () {
				try {
					var response = JSON.parse(req.responseText);
				} catch (e) {
					reject(new Error('Invalid JSON response. Responded:\n\n' + req.responseText));
				}
				if (req.status >= 200 && req.status < 400 && response) {
					resolve(response);
				} else {
					reject(new Error(response));
				}
			};
	
			req.send(body);
		});
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _Builder2 = __webpack_require__(5);
	
	var _Builder3 = _interopRequireDefault(_Builder2);
	
	var _SVGButton = __webpack_require__(8);
	
	var _SVGButton2 = _interopRequireDefault(_SVGButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var StickyBuilder = function (_Builder) {
		_inherits(StickyBuilder, _Builder);
	
		// the initialization object used, normalized to defaults
	
		// another container holding this.cont and this.button, necessary for sticky
		function StickyBuilder(token, init) {
			_classCallCheck(this, StickyBuilder);
	
			// create the container that holds the poll builder part
			var cont = document.createElement('div');
	
			// if init.useMobile is null then detect on our own, otherwise honor their manual setting
			var useMobile = isEmpty(init.useMobile) ? (0, _utils.shouldEmbedMobile)() : init.useMobile;
	
			// super, and create the builder
	
			var _this = _possibleConstructorReturn(this, (StickyBuilder.__proto__ || Object.getPrototypeOf(StickyBuilder)).call(this, cont, token, { useMobile: useMobile }));
	
			_initialiseProps.call(_this);
	
			_this.promise.then(function (iframe) {
				// if it didn't embed, that's the end of it
				if (!_this.iframe) return;
	
				// allow them to just use a string for init to use for buttons
				if (typeof init === 'string') init = { addButtons: init };
	
				// add defaults to init for any not provided
				init = handleDefaults(init, _this.metadata);
	
				// if not drag and drop AND no addButtons given, then we don't want to embed because there won't be an adding method
				if (!pollBuilder.dragAndDropSupported() && !init.addButtons) {
					console.warn("Poll builder will not be embedded because this browser/device is not capable of drag and drop adding, and no other adding method is being used. Try the init option `addButtons` to allow adding that way.");
					return { promise: Promise.resolve(null) };
				}
	
				_this.init = init;
				_this.sticky = sticky;
	
				// apply styles to cont
				cont.style.cssText = _this.mobile ? init.mobileBuilderStyles : init.builderStyles;
	
				// add the cont transition event loop so that it doesn't animate from load
				setTimeout(function () {
					cont.style.transition = 'height 400ms ease-in-out, opacity 400ms';
				}, 0);
	
				if (init.addButtons) pollBuilder.addButtons(init.addButtons);
	
				// create main container that holds it all
				var sticky = _this.sticky = document.createElement('div');
				sticky.id = 'pollbuilder-sticky-' + _this.index;
				sticky.className = 'pollbuilder-sticky';
				if (_this.mobile) sticky.className += ' pollbuilder-sticky-mobile';
	
				// now add the cont to it, and add it to the page
				sticky.appendChild(cont);
				document.body.appendChild(sticky);
	
				// we won't know the data width until the iframe randers and gives it to us via this event
				_this.addEventListener('pb:sizechange', _this._onResize2);
				_this.addEventListener('pb:sizechange', _this._onFirstResize);
	
				// listen for a begindrag and open it
				_this.addEventListener('pb:begindrag', function () {
					pollBuilder.maximizeSticky(this.index);
				});
	
				// and listen for pb:closebuilder and pb:openbuilder for the builder wanting to close/open itself
				_this.addEventListener('pb:closebuilder', function () {
					pollBuilder.minimizeSticky(this.index);
				});
				_this.addEventListener('pb:openbuilder', function () {
					pollBuilder.maximizeSticky(this.index);
				});
	
				// now start out minimized
				pollBuilder.minimizeSticky(_this.index);
	
				// float it to one side depending on the side it's on, cuz it makes it animate better
				_this.iframe.style.float = init.side === 'right' ? 'left' : 'right';
			});
			return _this;
		} // the container of the button used, as set up in init
	
	
		_createClass(StickyBuilder, [{
			key: 'minimize',
			value: function minimize() {
				if (this.maxxed && this.loaded) {
					this.iframe.contentWindow.postMessage({ event: 'stickyminimize' }, pollBuilder._targetOrigin);
					var event = { type: 'pb:minimized' };
					this.dispatchEvent(event);
					pollBuilder.dispatchEvent(event);
				}
	
				this.sticky.setAttribute('data-maximized', '0');
				this.button && this.button.setAttribute('data-maximized', '0');
				this.cont.style.height = '0px';
			}
		}, {
			key: 'maximize',
			value: function maximize() {
				var maxW = this.cont.getAttribute('data-width');
				var maxH = this.cont.getAttribute('data-height');
	
				if (!this.maxxed) {
					this.iframe.contentWindow.postMessage({ event: 'stickymaximize' }, pollBuilder._targetOrigin);
					var event = { type: 'pb:maximized' };
					this.dispatchEvent(event);
					pollBuilder.dispatchEvent(event);
				}
	
				this.sticky.setAttribute('data-maximized', '1');
				this.button && this.button.setAttribute('data-maximized', '1');
				this.cont.style.height = maxH + 'px';
			}
		}, {
			key: 'toggle',
			value: function toggle() {
				if (this.maxxed) this.minimize();else this.maximize();
			}
		}, {
			key: 'maxxed',
			get: function get() {
				return this.sticky.getAttribute('data-maximized') != false;
			}
	
			// INTERNAL -----------------------------------------------------------
	
		}]);
	
		return StickyBuilder;
	}(_Builder3.default);
	
	// STATIC PRIVATE -----------------------------------------------------------
	
	var _initialiseProps = function _initialiseProps() {
		var _this2 = this;
	
		this.sticky = null;
		this.button = null;
		this.init = null;
	
		this._onResize2 = function (evt) {
			// track the width needed for the builder, or height since that's needed for mobile one
			_this2.cont.setAttribute('data-width', evt.data.width);
			_this2.cont.setAttribute('data-height', evt.data.height);
		};
	
		this._onFirstResize = function (evt) {
			var init = _this2.init;
	
			// create the container and contents of the poll builder button
			var btn = _this2.button = document.createElement('div');
			btn.style.cssText = _this2.mobile ? init.mobileButtonStyles : init.buttonStyles;
			btn.className = 'pollbuilder-button pollbuilder-button-hidden';
			btn.id = 'pollbuilder-button-' + _this2.index;
			btn.addEventListener('click', pollBuilder.toggleSticky.bind(null, _this2.index));
			setTimeout(function () {
				btn.className = 'pollbuilder-button';
			}, init.buttonDelay);
	
			// fill that container based on the method from the init object
			if (init.buttonMarkup) {
				btn.innerHTML = init.buttonMarkup;
			} else if (init.buttonImage) {
				var attr2xMain = init.buttonImages2x ? 'onload="pollBuilder.utils.halfenImage(this);this.style.opacity=1;"' : 'onload="this.style.opacity=1;"';
				var attr2x = init.buttonImages2x ? 'onload="pollBuilder.utils.halfenImage(this);"' : '';
				btn.innerHTML = '<img src="' + init.buttonImage + '" class="pollbuilder-button-state pollbuilder-button-normal" ' + attr2xMain + '/>';
	
				if (init.buttonImageHover) btn.innerHTML += '<img src="' + init.buttonImageHover + '" class="pollbuilder-button-state pollbuilder-button-hover" ' + attr2x + '/>';
				if (init.buttonImageActive) btn.innerHTML += '<img src="' + init.buttonImageActive + '" class="pollbuilder-button-state pollbuilder-button-active" ' + attr2x + '/>';
			} else {
				console.warn('No button image or markup was given for the poll builder!');
			}
	
			btn.innerHTML += cssToAdd();
			btn.innerHTML += '\n\t\t\t<style>\n\t\t\t\t#pollbuilder-sticky-' + _this2.index + ' {\n\t\t\t\t\tposition: ' + init.position + ';\n\t\t\t\t\tbackground-color: ' + init.backgroundColor + ';\n\t\t\t\t\tz-index: ' + init.zIndex + ';\n\t\t\t\t}\n\t\t\t\t#pollbuilder-sticky-' + _this2.index + ':not(.pollbuilder-sticky-mobile) {\n\t\t\t\t\tborder-radius: 6px;\n\t\t\t\t}\n\t\t\t\t#pollbuilder-button-' + _this2.index + ' {\n\t\t\t\t\tposition: ' + init.position + ';\n\t\t\t\t\t' + (init.side === 'left' ? 'left' : 'right') + ': ' + (0, _utils.cssUnit)(init.buttonOffsetY) + ';\n\t\t\t\t\t' + (init.side === 'left' ? 'right' : 'left') + ': auto;\n\t\t\t\t\t' + (init.fromTop ? 'top' : 'bottom') + ': ' + (0, _utils.cssUnit)(init.buttonOffsetX) + ';\n\t\t\t\t\t' + (init.fromTop ? 'bottom' : 'top') + ': auto;\n\t\t\t\t\ttransition: opacity 200ms;\n\t\t\t\t\tz-index: ' + init.zIndex + ';\n\t\t\t\t}\n\t\t\t\t#pollbuilder-button-' + _this2.index + '[data-maximized="1"],\n\t\t\t\t#pollbuilder-button-' + _this2.index + '.pollbuilder-button-hidden {\n\t\t\t\t\topacity: 0 !important;\n\t\t\t\t\tpointer-events: none;\n\t\t\t\t}\n\t\t\t</style>'; // Normal CSS, seperate because of init options making each builder different
			if (_this2.mobile) {
				btn.innerHTML += '\n\t\t\t<style>\n\t\t\t\t\n\t\t\t</style>'; // Mobile CSS, separate to make it only apply to mobile ones, and future applying of init options
			} else {
				btn.innerHTML += '\n\t\t\t<style>\n\t\t\t\t#pollbuilder-sticky-' + _this2.index + '[data-maximized="1"] { opacity: 1; transition: opacity 300ms ease 150ms; }\n\t\t\t\t#pollbuilder-sticky-' + _this2.index + '[data-maximized="0"] { opacity: 0; transition: opacity 300ms; }\n\t\t\t\t#pollbuilder-sticky-' + _this2.index + ' {\n\t\t\t\t\t' + (init.side === 'left' ? 'left' : 'right') + ': ' + (0, _utils.cssUnit)(init.builderOffsetY) + ';\n\t\t\t\t\t' + (init.side === 'left' ? 'right' : 'left') + ': auto;\n\t\t\t\t\t' + (init.fromTop ? 'top' : 'bottom') + ': ' + (0, _utils.cssUnit)(init.builderOffsetX) + ';\n\t\t\t\t\t' + (init.fromTop ? 'bottom' : 'top') + ': auto;\n\t\t\t\t}\n\t\t\t</style>'; // Desktop CSS, only applies to desktop
			}
	
			document.body.insertBefore(btn, _this2.sticky);
	
			// remove listener
			_this2.removeEventListener('pb:sizechange', _this2._onFirstResize);
		};
	};
	
	exports.default = StickyBuilder;
	function handleDefaults(init, metadata) {
		init = init || {};
		init.side = (0, _utils.def)(init.side, 'right');
		init.fromTop = (0, _utils.def)(init.fromTop, false);
		init.buttonOffsetX = (0, _utils.def)(init.buttonOffsetX, 20);
		init.buttonOffsetY = (0, _utils.def)(init.buttonOffsetY, 20);
		init.builderOffsetX = (0, _utils.def)(init.builderOffsetX, 20);
		init.builderOffsetY = (0, _utils.def)(init.builderOffsetY, 20);
		init.position = (0, _utils.def)(init.position, 'fixed');
		init.zIndex = (0, _utils.def)(init.zIndex, 99);
		init.buttonImage = (0, _utils.def)(init.buttonImage, null);
		init.buttonImageHover = (0, _utils.def)(init.buttonImageHover, null);
		init.buttonImageActive = (0, _utils.def)(init.buttonImageActive, null);
		init.buttonImages2x = (0, _utils.def)(init.buttonImages2x, false);
		init.buttonMarkup = (0, _utils.def)(init.buttonMarkup, null);
		init.backgroundColor = (0, _utils.def)(init.backgroundColor, '#fff');
		init.addButtons = (0, _utils.def)(init.addButtons, false);
		init.useMobile = (0, _utils.def)(init.useMobile, null);
		init.buttonColor = (0, _utils.def)(init.buttonColor, metadata.theme.buttonColor || (!init.highlight ? '#fff' : init.highlight));
		init.invertButton = (0, _utils.def)(init.invertButton, isEmpty(metadata.theme.invertButton) ? !!init.highlight : metadata.theme.invertButton);
		init.highlight = (0, _utils.def)(init.highlight, metadata.theme.highlight || '#000');
		init.buttonStyles = (0, _utils.def)(init.buttonStyles, 'box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);');
		init.builderStyles = (0, _utils.def)(init.builderStyles, 'box-shadow: 1px 0 1px ' + init.highlight + ',-1px 0 1px ' + init.highlight + ',0 1px 1px ' + init.highlight + ',0 -1px 1px ' + init.highlight + ', 3px 3px 3px rgba(0, 0, 0, 0.15); border-radius: 6px;');
		init.mobileButtonStyles = (0, _utils.def)(init.mobileButtonStyles, init.buttonStyles);
		init.mobileBuilderStyles = (0, _utils.def)(init.mobileBuilderStyles, 'box-shadow: 1px 0 1px ' + init.highlight + ',-1px 0 1px ' + init.highlight + ',0 1px 1px ' + init.highlight + ',0 -1px 1px ' + init.highlight + ', 0 0 6px 0 rgba(0, 0, 0, 0.15);');
		init.buttonDelay = (0, _utils.def)(init.buttonDelay, 0);
	
		// if button is not set at all by user, then use default values
		if (!init.buttonImage && !init.buttonImageHover && !init.buttonImageActive && !init.buttonImages2x && !init.buttonMarkup) {
			init.buttonMarkup = new _SVGButton2.default('pollbuilder-button-normal', init.buttonColor, 0, !init.invertButton) + new _SVGButton2.default('pollbuilder-button-hover', init.buttonColor, 0.3, !init.invertButton);
			init.buttonStyles += 'border-radius: 999px; opacity: 0;';
			init.mobileButtonStyles += 'border-radius: 999px; opacity: 0;';
		}
	
		return init;
	}
	
	function isEmpty(val) {
		return typeof val === 'undefined' || val === null;
	}
	
	var cssAdded = false;
	function cssToAdd() {
		if (!cssAdded) {
			cssAdded = true;
			return '\n\t\t\t<style>\n\t\t\t\t.pollbuilder-button {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\twidth: 80px;\n\t\t\t\t\theight: 80px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.pollbuilder-button .pollbuilder-button-state-cont {\n\t\t\t\t\ttransition: opacity 300ms;\n\t\t\t\t\topacity: 1;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t}\n\t\t\t\t.pollbuilder-button .pollbuilder-button-state-cont.pollbuilder-button-state-loading {\n\t\t\t\t\topacity: 0 !important;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.pollbuilder-button .pollbuilder-button-state {\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\tmax-width: none;\n\t\t\t\t\tmax-height: none;\n\t\t\t\t\twidth: auto;\n\t\t\t\t\theight: auto;\n\t\t\t\t\ttransition: opacity 200ms;\n\t\t\t\t}\n\t\t\t\t.pollbuilder-button svg.pollbuilder-button-state {\n\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t.pollbuilder-button .pollbuilder-button-normal {\n\t\t\t\t\topacity: 1;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.pollbuilder-button .pollbuilder-button-state.pollbuilder-button-hover,\n\t\t\t\t.pollbuilder-button .pollbuilder-button-state.pollbuilder-button-active {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\topacity: 0;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.pollbuilder-button:hover .pollbuilder-button-state.pollbuilder-button-hover { opacity:1; }\n\t\t\t\t.pollbuilder-button:active .pollbuilder-button-state.pollbuilder-button-active { opacity:1; }\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t.pollbuilder-sticky-mobile {\n\t\t\t\t\ttop: auto !important;\n\t\t\t\t\tbottom: 0px !important;\n\t\t\t\t\tmin-width: 320px;\n\t\t\t\t}\n\t\t\t\t@media screen and (max-width: 440px) {\n\t\t\t\t\t.pollbuilder-sticky-mobile {\n\t\t\t\t\t\twidth: 100% !important;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t@media screen and (min-width: 441px) {\n\t\t\t\t\t.pollbuilder-sticky-mobile {\n\t\t\t\t\t\twidth: 440px !important;\n\t\t\t\t\t\tleft: 50%;\n\t\t\t\t\t\ttransform: translateX(-50%);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t</style>';
		} else {
			return '';
		}
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SVGButton = function () {
		function SVGButton(className) {
			var circleBackground = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#fff';
			var washPercent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
			var blackText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
			var fadeBackground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#fff';
	
			_classCallCheck(this, SVGButton);
	
			this.className = className;
			this.circleBackground = circleBackground;
			this.washPercent = washPercent;
			this.blackText = blackText;console.log('black:', blackText);
			this.fadeBackground = fadeBackground;
		}
	
		_createClass(SVGButton, [{
			key: 'toString',
			value: function toString() {
				return '\n\t\t<div class="pollbuilder-button-state-cont pollbuilder-button-state-loading">\n\t\t\t<svg class="pollbuilder-button-state ' + this.className + '" viewBox="0 0 80 80" style="background-color:#ffffff00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width="80px" height="80px">\n\t\t\t\t<circle cx="40" cy="40" r="40" fill="' + this.fadeBackground + '" />\n\t\t\t\t<circle cx="40" cy="40" r="38.5" fill="' + this.circleBackground + '" stroke="' + (this.blackText ? '#000' : '#fff') + '" stroke-width="1.5" opacity="' + (1 - this.washPercent) + '" />\n\t\t\t</svg>\n\t\t\t<img style="position:absolute; top:27px; left:13px; width:56px; height:29px; opacity:' + (1 - this.washPercent) + ';" src="' + pollBuilder._pollBuilderURL + '/assets/other/poll_your_friends-' + (this.blackText ? 'black' : 'white') + '.png" onload="' + this.imgLoadCode() + '"/>\n\t\t</div>';
			}
		}, {
			key: 'imgLoadCode',
			value: function imgLoadCode() {
				// removes the 'pollbuilder-button-state-loading' class once the image is loaded, and sets the opacity of the main button container to 1 (since it starts at 0 when using default sticker)
				return 'this.parentNode.setAttribute(\'class\', this.parentNode.getAttribute(\'class\').replace(/ pollbuilder-button-state-loading/, \'\')); if(this.parentNode.parentNode) this.parentNode.parentNode.style.opacity = 1;';
			}
		}]);
	
		return SVGButton;
	}();
	
	exports.default = SVGButton;

/***/ },
/* 9 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate))

/***/ },
/* 10 */
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
	__webpack_require__(11);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;

/***/ },
/* 11 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(12)))

/***/ },
/* 12 */
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