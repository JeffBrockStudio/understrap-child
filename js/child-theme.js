/*!
  * Understrap v1.1.0 (https://understrap.com)
  * Copyright 2013-2022 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}, global.jQuery));
})(this, (function (exports, require$$0$1) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$1 = {exports: {}};

	var util = {exports: {}};

	/*!
	  * Bootstrap index.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  factory(exports) ;
	})(commonjsGlobal, (function (exports) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MAX_UID = 1000000;
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

	  const toType = object => {
	    if (object === null || object === undefined) {
	      return `${object}`;
	    }

	    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };
	  /**
	   * Public Util API
	   */


	  const getUID = prefix => {
	    do {
	      prefix += Math.floor(Math.random() * MAX_UID);
	    } while (document.getElementById(prefix));

	    return prefix;
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
	        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
	      }

	      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
	    }

	    return selector;
	  };

	  const getSelectorFromElement = element => {
	    const selector = getSelector(element);

	    if (selector) {
	      return document.querySelector(selector) ? selector : null;
	    }

	    return null;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = object => {
	    if (!object || typeof object !== 'object') {
	      return false;
	    }

	    if (typeof object.jquery !== 'undefined') {
	      object = object[0];
	    }

	    return typeof object.nodeType !== 'undefined';
	  };

	  const getElement = object => {
	    // it's a jQuery object or a node element
	    if (isElement(object)) {
	      return object.jquery ? object[0] : object;
	    }

	    if (typeof object === 'string' && object.length > 0) {
	      return document.querySelector(object);
	    }

	    return null;
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

	    const closedDetails = element.closest('details:not([open])');

	    if (!closedDetails) {
	      return elementIsVisible;
	    }

	    if (closedDetails !== element) {
	      const summary = element.closest('summary');

	      if (summary && summary.parentNode !== closedDetails) {
	        return false;
	      }

	      if (summary === null) {
	        return false;
	      }
	    }

	    return elementIsVisible;
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  const findShadowRoot = element => {
	    if (!document.documentElement.attachShadow) {
	      return null;
	    } // Can find the shadow root otherwise it'll return the document


	    if (typeof element.getRootNode === 'function') {
	      const root = element.getRootNode();
	      return root instanceof ShadowRoot ? root : null;
	    }

	    if (element instanceof ShadowRoot) {
	      return element;
	    } // when we don't find a shadow root


	    if (!element.parentNode) {
	      return null;
	    }

	    return findShadowRoot(element.parentNode);
	  };

	  const noop = () => {};
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    element.offsetHeight; // eslint-disable-line no-unused-expressions
	  };

	  const getjQuery = () => {
	    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return window.jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          for (const callback of DOMContentLoadedCallbacks) {
	            callback();
	          }
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };
	  /**
	   * Return the previous/next element of a list.
	   *
	   * @param {array} list    The list of elements
	   * @param activeElement   The active element
	   * @param shouldGetNext   Choose to get next or previous element
	   * @param isCycleAllowed
	   * @return {Element|elem} The proper element
	   */


	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	    const listLength = list.length;
	    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
	    // depending on the direction and if cycle is allowed

	    if (index === -1) {
	      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
	    }

	    index += shouldGetNext ? 1 : -1;

	    if (isCycleAllowed) {
	      index = (index + listLength) % listLength;
	    }

	    return list[Math.max(0, Math.min(index, listLength - 1))];
	  };

	  exports.defineJQueryPlugin = defineJQueryPlugin;
	  exports.execute = execute;
	  exports.executeAfterTransition = executeAfterTransition;
	  exports.findShadowRoot = findShadowRoot;
	  exports.getElement = getElement;
	  exports.getElementFromSelector = getElementFromSelector;
	  exports.getNextActiveElement = getNextActiveElement;
	  exports.getSelectorFromElement = getSelectorFromElement;
	  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
	  exports.getUID = getUID;
	  exports.getjQuery = getjQuery;
	  exports.isDisabled = isDisabled;
	  exports.isElement = isElement;
	  exports.isRTL = isRTL;
	  exports.isVisible = isVisible;
	  exports.noop = noop;
	  exports.onDOMContentLoaded = onDOMContentLoaded;
	  exports.reflow = reflow;
	  exports.toType = toType;
	  exports.triggerTransitionEnd = triggerTransitionEnd;

	  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

	}));

	}(util, util.exports));

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports) ;
	})(commonjsGlobal, (function (index) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): dom/event-handler.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	  const stripNameRegex = /\..*/;
	  const stripUidRegex = /::\d+$/;
	  const eventRegistry = {}; // Events storage

	  let uidEvent = 1;
	  const customEvents = {
	    mouseenter: 'mouseover',
	    mouseleave: 'mouseout'
	  };
	  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	  /**
	   * Private methods
	   */

	  function makeEventUid(element, uid) {
	    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	  }

	  function getElementEvents(element) {
	    const uid = makeEventUid(element);
	    element.uidEvent = uid;
	    eventRegistry[uid] = eventRegistry[uid] || {};
	    return eventRegistry[uid];
	  }

	  function bootstrapHandler(element, fn) {
	    return function handler(event) {
	      hydrateObj(event, {
	        delegateTarget: element
	      });

	      if (handler.oneOff) {
	        EventHandler.off(element, event.type, fn);
	      }

	      return fn.apply(element, [event]);
	    };
	  }

	  function bootstrapDelegationHandler(element, selector, fn) {
	    return function handler(event) {
	      const domElements = element.querySelectorAll(selector);

	      for (let {
	        target
	      } = event; target && target !== this; target = target.parentNode) {
	        for (const domElement of domElements) {
	          if (domElement !== target) {
	            continue;
	          }

	          hydrateObj(event, {
	            delegateTarget: target
	          });

	          if (handler.oneOff) {
	            EventHandler.off(element, event.type, selector, fn);
	          }

	          return fn.apply(target, [event]);
	        }
	      }
	    };
	  }

	  function findHandler(events, callable, delegationSelector = null) {
	    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
	  }

	  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
	    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

	    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
	    let typeEvent = getTypeEvent(originalTypeEvent);

	    if (!nativeEvents.has(typeEvent)) {
	      typeEvent = originalTypeEvent;
	    }

	    return [isDelegated, callable, typeEvent];
	  }

	  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }

	    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

	    if (originalTypeEvent in customEvents) {
	      const wrapFunction = fn => {
	        return function (event) {
	          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	            return fn.call(this, event);
	          }
	        };
	      };

	      callable = wrapFunction(callable);
	    }

	    const events = getElementEvents(element);
	    const handlers = events[typeEvent] || (events[typeEvent] = {});
	    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

	    if (previousFunction) {
	      previousFunction.oneOff = previousFunction.oneOff && oneOff;
	      return;
	    }

	    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
	    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
	    fn.delegationSelector = isDelegated ? handler : null;
	    fn.callable = callable;
	    fn.oneOff = oneOff;
	    fn.uidEvent = uid;
	    handlers[uid] = fn;
	    element.addEventListener(typeEvent, fn, isDelegated);
	  }

	  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	    const fn = findHandler(events[typeEvent], handler, delegationSelector);

	    if (!fn) {
	      return;
	    }

	    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	    delete events[typeEvent][fn.uidEvent];
	  }

	  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	    const storeElementEvent = events[typeEvent] || {};

	    for (const handlerKey of Object.keys(storeElementEvent)) {
	      if (handlerKey.includes(namespace)) {
	        const event = storeElementEvent[handlerKey];
	        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
	      }
	    }
	  }

	  function getTypeEvent(event) {
	    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	    event = event.replace(stripNameRegex, '');
	    return customEvents[event] || event;
	  }

	  const EventHandler = {
	    on(element, event, handler, delegationFunction) {
	      addHandler(element, event, handler, delegationFunction, false);
	    },

	    one(element, event, handler, delegationFunction) {
	      addHandler(element, event, handler, delegationFunction, true);
	    },

	    off(element, originalTypeEvent, handler, delegationFunction) {
	      if (typeof originalTypeEvent !== 'string' || !element) {
	        return;
	      }

	      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
	      const inNamespace = typeEvent !== originalTypeEvent;
	      const events = getElementEvents(element);
	      const storeElementEvent = events[typeEvent] || {};
	      const isNamespace = originalTypeEvent.startsWith('.');

	      if (typeof callable !== 'undefined') {
	        // Simplest case: handler is passed, remove that listener ONLY.
	        if (!Object.keys(storeElementEvent).length) {
	          return;
	        }

	        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
	        return;
	      }

	      if (isNamespace) {
	        for (const elementEvent of Object.keys(events)) {
	          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	        }
	      }

	      for (const keyHandlers of Object.keys(storeElementEvent)) {
	        const handlerKey = keyHandlers.replace(stripUidRegex, '');

	        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	          const event = storeElementEvent[keyHandlers];
	          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
	        }
	      }
	    },

	    trigger(element, event, args) {
	      if (typeof event !== 'string' || !element) {
	        return null;
	      }

	      const $ = index.getjQuery();
	      const typeEvent = getTypeEvent(event);
	      const inNamespace = event !== typeEvent;
	      let jQueryEvent = null;
	      let bubbles = true;
	      let nativeDispatch = true;
	      let defaultPrevented = false;

	      if (inNamespace && $) {
	        jQueryEvent = $.Event(event, args);
	        $(element).trigger(jQueryEvent);
	        bubbles = !jQueryEvent.isPropagationStopped();
	        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	        defaultPrevented = jQueryEvent.isDefaultPrevented();
	      }

	      let evt = new Event(event, {
	        bubbles,
	        cancelable: true
	      });
	      evt = hydrateObj(evt, args);

	      if (defaultPrevented) {
	        evt.preventDefault();
	      }

	      if (nativeDispatch) {
	        element.dispatchEvent(evt);
	      }

	      if (evt.defaultPrevented && jQueryEvent) {
	        jQueryEvent.preventDefault();
	      }

	      return evt;
	    }

	  };

	  function hydrateObj(obj, meta) {
	    for (const [key, value] of Object.entries(meta || {})) {
	      try {
	        obj[key] = value;
	      } catch (_unused) {
	        Object.defineProperty(obj, key, {
	          configurable: true,

	          get() {
	            return value;
	          }

	        });
	      }
	    }

	    return obj;
	  }

	  return EventHandler;

	}));

	}(eventHandler));

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): dom/data.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  /**
	   * Constants
	   */
	  const elementMap = new Map();
	  const data = {
	    set(element, key, instance) {
	      if (!elementMap.has(element)) {
	        elementMap.set(element, new Map());
	      }

	      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
	      // can be removed later when multiple key/instances are fine to be used

	      if (!instanceMap.has(key) && instanceMap.size !== 0) {
	        // eslint-disable-next-line no-console
	        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
	        return;
	      }

	      instanceMap.set(key, instance);
	    },

	    get(element, key) {
	      if (elementMap.has(element)) {
	        return elementMap.get(element).get(key) || null;
	      }

	      return null;
	    },

	    remove(element, key) {
	      if (!elementMap.has(element)) {
	        return;
	      }

	      const instanceMap = elementMap.get(element);
	      instanceMap.delete(key); // free up element references if there are no instances left for an element

	      if (instanceMap.size === 0) {
	        elementMap.delete(element);
	      }
	    }

	  };

	  return data;

	}));

	}(data));

	var config = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): dom/manipulator.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  function normalizeData(value) {
	    if (value === 'true') {
	      return true;
	    }

	    if (value === 'false') {
	      return false;
	    }

	    if (value === Number(value).toString()) {
	      return Number(value);
	    }

	    if (value === '' || value === 'null') {
	      return null;
	    }

	    if (typeof value !== 'string') {
	      return value;
	    }

	    try {
	      return JSON.parse(decodeURIComponent(value));
	    } catch (_unused) {
	      return value;
	    }
	  }

	  function normalizeDataKey(key) {
	    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
	  }

	  const Manipulator = {
	    setDataAttribute(element, key, value) {
	      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	    },

	    removeDataAttribute(element, key) {
	      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	    },

	    getDataAttributes(element) {
	      if (!element) {
	        return {};
	      }

	      const attributes = {};
	      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

	      for (const key of bsKeys) {
	        let pureKey = key.replace(/^bs/, '');
	        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	        attributes[pureKey] = normalizeData(element.dataset[key]);
	      }

	      return attributes;
	    },

	    getDataAttribute(element, key) {
	      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	    }

	  };

	  return Manipulator;

	}));

	}(manipulator));

	/*!
	  * Bootstrap config.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, manipulator.exports) ;
	})(commonjsGlobal, (function (index, Manipulator) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/config.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Class definition
	   */

	  class Config {
	    // Getters
	    static get Default() {
	      return {};
	    }

	    static get DefaultType() {
	      return {};
	    }

	    static get NAME() {
	      throw new Error('You have to implement the static method "NAME", for each component!');
	    }

	    _getConfig(config) {
	      config = this._mergeConfigObj(config);
	      config = this._configAfterMerge(config);

	      this._typeCheckConfig(config);

	      return config;
	    }

	    _configAfterMerge(config) {
	      return config;
	    }

	    _mergeConfigObj(config, element) {
	      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

	      return { ...this.constructor.Default,
	        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
	        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
	        ...(typeof config === 'object' ? config : {})
	      };
	    }

	    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
	      for (const property of Object.keys(configTypes)) {
	        const expectedTypes = configTypes[property];
	        const value = config[property];
	        const valueType = index.isElement(value) ? 'element' : index.toType(value);

	        if (!new RegExp(expectedTypes).test(valueType)) {
	          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	        }
	      }
	    }

	  }

	  return Config;

	}));

	}(config));

	/*!
	  * Bootstrap base-component.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(data.exports, util.exports, eventHandler.exports, config.exports) ;
	})(commonjsGlobal, (function (Data, index, EventHandler, Config) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): base-component.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const VERSION = '5.2.2';
	  /**
	   * Class definition
	   */

	  class BaseComponent extends Config__default.default {
	    constructor(element, config) {
	      super();
	      element = index.getElement(element);

	      if (!element) {
	        return;
	      }

	      this._element = element;
	      this._config = this._getConfig(config);
	      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
	    } // Public


	    dispose() {
	      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
	      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);

	      for (const propertyName of Object.getOwnPropertyNames(this)) {
	        this[propertyName] = null;
	      }
	    }

	    _queueCallback(callback, element, isAnimated = true) {
	      index.executeAfterTransition(callback, element, isAnimated);
	    }

	    _getConfig(config) {
	      config = this._mergeConfigObj(config, this._element);
	      config = this._configAfterMerge(config);

	      this._typeCheckConfig(config);

	      return config;
	    } // Static


	    static getInstance(element) {
	      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
	    }

	    static getOrCreateInstance(element, config = {}) {
	      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	    }

	    static get VERSION() {
	      return VERSION;
	    }

	    static get DATA_KEY() {
	      return `bs.${this.NAME}`;
	    }

	    static get EVENT_KEY() {
	      return `.${this.DATA_KEY}`;
	    }

	    static eventName(name) {
	      return `${name}${this.EVENT_KEY}`;
	    }

	  }

	  return BaseComponent;

	}));

	}(baseComponent));

	var componentFunctions = {exports: {}};

	/*!
	  * Bootstrap component-functions.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  factory(exports, eventHandler.exports, util.exports) ;
	})(commonjsGlobal, (function (exports, EventHandler, index) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (index.isDisabled(this)) {
	        return;
	      }

	      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  exports.enableDismissTrigger = enableDismissTrigger;

	  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

	}));

	}(componentFunctions, componentFunctions.exports));

	/*!
	  * Bootstrap alert.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, baseComponent.exports, componentFunctions.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, BaseComponent, componentFunctions) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): alert.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'alert';
	  const DATA_KEY = 'bs.alert';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_CLOSE = `close${EVENT_KEY}`;
	  const EVENT_CLOSED = `closed${EVENT_KEY}`;
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  /**
	   * Class definition
	   */

	  class Alert extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    close() {
	      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);

	      if (closeEvent.defaultPrevented) {
	        return;
	      }

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
	    } // Private


	    _destroyElement() {
	      this._element.remove();

	      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
	      this.dispose();
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Alert.getOrCreateInstance(this);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  componentFunctions.enableDismissTrigger(Alert, 'close');
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Alert);

	  return Alert;

	}));

	}(alert$1));

	var alert = alert$1.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): button.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'button';
	  const DATA_KEY = 'bs.button';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  /**
	   * Class definition
	   */

	  class Button extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Button.getOrCreateInstance(this);

	        if (config === 'toggle') {
	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
	    event.preventDefault();
	    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
	    const data = Button.getOrCreateInstance(button);
	    data.toggle();
	  });
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Button);

	  return Button;

	}));

	}(button$1));

	var button = button$1.exports;

	var carousel = {exports: {}};

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports) ;
	})(commonjsGlobal, (function (index) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): dom/selector-engine.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const SelectorEngine = {
	    find(selector, element = document.documentElement) {
	      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	    },

	    findOne(selector, element = document.documentElement) {
	      return Element.prototype.querySelector.call(element, selector);
	    },

	    children(element, selector) {
	      return [].concat(...element.children).filter(child => child.matches(selector));
	    },

	    parents(element, selector) {
	      const parents = [];
	      let ancestor = element.parentNode.closest(selector);

	      while (ancestor) {
	        parents.push(ancestor);
	        ancestor = ancestor.parentNode.closest(selector);
	      }

	      return parents;
	    },

	    prev(element, selector) {
	      let previous = element.previousElementSibling;

	      while (previous) {
	        if (previous.matches(selector)) {
	          return [previous];
	        }

	        previous = previous.previousElementSibling;
	      }

	      return [];
	    },

	    // TODO: this is now unused; remove later along with prev()
	    next(element, selector) {
	      let next = element.nextElementSibling;

	      while (next) {
	        if (next.matches(selector)) {
	          return [next];
	        }

	        next = next.nextElementSibling;
	      }

	      return [];
	    },

	    focusableChildren(element) {
	      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
	      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
	    }

	  };

	  return SelectorEngine;

	}));

	}(selectorEngine));

	var swipe = {exports: {}};

	/*!
	  * Bootstrap swipe.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(config.exports, eventHandler.exports, util.exports) ;
	})(commonjsGlobal, (function (Config, EventHandler, index) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/swipe.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'swipe';
	  const EVENT_KEY = '.bs.swipe';
	  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
	  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
	  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
	  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
	  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
	  const POINTER_TYPE_TOUCH = 'touch';
	  const POINTER_TYPE_PEN = 'pen';
	  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	  const SWIPE_THRESHOLD = 40;
	  const Default = {
	    endCallback: null,
	    leftCallback: null,
	    rightCallback: null
	  };
	  const DefaultType = {
	    endCallback: '(function|null)',
	    leftCallback: '(function|null)',
	    rightCallback: '(function|null)'
	  };
	  /**
	   * Class definition
	   */

	  class Swipe extends Config__default.default {
	    constructor(element, config) {
	      super();
	      this._element = element;

	      if (!element || !Swipe.isSupported()) {
	        return;
	      }

	      this._config = this._getConfig(config);
	      this._deltaX = 0;
	      this._supportPointerEvents = Boolean(window.PointerEvent);

	      this._initEvents();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    dispose() {
	      EventHandler__default.default.off(this._element, EVENT_KEY);
	    } // Private


	    _start(event) {
	      if (!this._supportPointerEvents) {
	        this._deltaX = event.touches[0].clientX;
	        return;
	      }

	      if (this._eventIsPointerPenTouch(event)) {
	        this._deltaX = event.clientX;
	      }
	    }

	    _end(event) {
	      if (this._eventIsPointerPenTouch(event)) {
	        this._deltaX = event.clientX - this._deltaX;
	      }

	      this._handleSwipe();

	      index.execute(this._config.endCallback);
	    }

	    _move(event) {
	      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
	    }

	    _handleSwipe() {
	      const absDeltaX = Math.abs(this._deltaX);

	      if (absDeltaX <= SWIPE_THRESHOLD) {
	        return;
	      }

	      const direction = absDeltaX / this._deltaX;
	      this._deltaX = 0;

	      if (!direction) {
	        return;
	      }

	      index.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
	    }

	    _initEvents() {
	      if (this._supportPointerEvents) {
	        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
	        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => this._end(event));

	        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	      } else {
	        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => this._end(event));
	      }
	    }

	    _eventIsPointerPenTouch(event) {
	      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	    } // Static


	    static isSupported() {
	      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	    }

	  }

	  return Swipe;

	}));

	}(swipe));

	/*!
	  * Bootstrap carousel.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, manipulator.exports, selectorEngine.exports, swipe.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, Manipulator, SelectorEngine, Swipe, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Swipe__default = /*#__PURE__*/_interopDefaultLegacy(Swipe);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): carousel.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'carousel';
	  const DATA_KEY = 'bs.carousel';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ARROW_LEFT_KEY = 'ArrowLeft';
	  const ARROW_RIGHT_KEY = 'ArrowRight';
	  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	  const ORDER_NEXT = 'next';
	  const ORDER_PREV = 'prev';
	  const DIRECTION_LEFT = 'left';
	  const DIRECTION_RIGHT = 'right';
	  const EVENT_SLIDE = `slide${EVENT_KEY}`;
	  const EVENT_SLID = `slid${EVENT_KEY}`;
	  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
	  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
	  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
	  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_CAROUSEL = 'carousel';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_SLIDE = 'slide';
	  const CLASS_NAME_END = 'carousel-item-end';
	  const CLASS_NAME_START = 'carousel-item-start';
	  const CLASS_NAME_NEXT = 'carousel-item-next';
	  const CLASS_NAME_PREV = 'carousel-item-prev';
	  const SELECTOR_ACTIVE = '.active';
	  const SELECTOR_ITEM = '.carousel-item';
	  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
	  const SELECTOR_ITEM_IMG = '.carousel-item img';
	  const SELECTOR_INDICATORS = '.carousel-indicators';
	  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	  const KEY_TO_DIRECTION = {
	    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
	    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
	  };
	  const Default = {
	    interval: 5000,
	    keyboard: true,
	    pause: 'hover',
	    ride: false,
	    touch: true,
	    wrap: true
	  };
	  const DefaultType = {
	    interval: '(number|boolean)',
	    // TODO:v6 remove boolean support
	    keyboard: 'boolean',
	    pause: '(string|boolean)',
	    ride: '(boolean|string)',
	    touch: 'boolean',
	    wrap: 'boolean'
	  };
	  /**
	   * Class definition
	   */

	  class Carousel extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config);
	      this._interval = null;
	      this._activeElement = null;
	      this._isSliding = false;
	      this.touchTimeout = null;
	      this._swipeHelper = null;
	      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);

	      this._addEventListeners();

	      if (this._config.ride === CLASS_NAME_CAROUSEL) {
	        this.cycle();
	      }
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    next() {
	      this._slide(ORDER_NEXT);
	    }

	    nextWhenVisible() {
	      // FIXME TODO use `document.visibilityState`
	      // Don't call next when the page isn't visible
	      // or the carousel or its parent isn't visible
	      if (!document.hidden && index.isVisible(this._element)) {
	        this.next();
	      }
	    }

	    prev() {
	      this._slide(ORDER_PREV);
	    }

	    pause() {
	      if (this._isSliding) {
	        index.triggerTransitionEnd(this._element);
	      }

	      this._clearInterval();
	    }

	    cycle() {
	      this._clearInterval();

	      this._updateInterval();

	      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	    }

	    _maybeEnableCycle() {
	      if (!this._config.ride) {
	        return;
	      }

	      if (this._isSliding) {
	        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.cycle());
	        return;
	      }

	      this.cycle();
	    }

	    to(index) {
	      const items = this._getItems();

	      if (index > items.length - 1 || index < 0) {
	        return;
	      }

	      if (this._isSliding) {
	        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
	        return;
	      }

	      const activeIndex = this._getItemIndex(this._getActive());

	      if (activeIndex === index) {
	        return;
	      }

	      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

	      this._slide(order, items[index]);
	    }

	    dispose() {
	      if (this._swipeHelper) {
	        this._swipeHelper.dispose();
	      }

	      super.dispose();
	    } // Private


	    _configAfterMerge(config) {
	      config.defaultInterval = config.interval;
	      return config;
	    }

	    _addEventListeners() {
	      if (this._config.keyboard) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	      }

	      if (this._config.pause === 'hover') {
	        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, () => this.pause());
	        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
	      }

	      if (this._config.touch && Swipe__default.default.isSupported()) {
	        this._addTouchEventListeners();
	      }
	    }

	    _addTouchEventListeners() {
	      for (const img of SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element)) {
	        EventHandler__default.default.on(img, EVENT_DRAG_START, event => event.preventDefault());
	      }

	      const endCallBack = () => {
	        if (this._config.pause !== 'hover') {
	          return;
	        } // If it's a touch-enabled device, mouseenter/leave are fired as
	        // part of the mouse compatibility events on first tap - the carousel
	        // would stop cycling until user tapped out of it;
	        // here, we listen for touchend, explicitly pause the carousel
	        // (as if it's the second time we tap on it, mouseenter compat event
	        // is NOT fired) and after a timeout (to allow for mouse compatibility
	        // events to fire) we explicitly restart cycling


	        this.pause();

	        if (this.touchTimeout) {
	          clearTimeout(this.touchTimeout);
	        }

	        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	      };

	      const swipeConfig = {
	        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
	        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
	        endCallback: endCallBack
	      };
	      this._swipeHelper = new Swipe__default.default(this._element, swipeConfig);
	    }

	    _keydown(event) {
	      if (/input|textarea/i.test(event.target.tagName)) {
	        return;
	      }

	      const direction = KEY_TO_DIRECTION[event.key];

	      if (direction) {
	        event.preventDefault();

	        this._slide(this._directionToOrder(direction));
	      }
	    }

	    _getItemIndex(element) {
	      return this._getItems().indexOf(element);
	    }

	    _setActiveIndicatorElement(index) {
	      if (!this._indicatorsElement) {
	        return;
	      }

	      const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
	      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
	      activeIndicator.removeAttribute('aria-current');
	      const newActiveIndicator = SelectorEngine__default.default.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);

	      if (newActiveIndicator) {
	        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
	        newActiveIndicator.setAttribute('aria-current', 'true');
	      }
	    }

	    _updateInterval() {
	      const element = this._activeElement || this._getActive();

	      if (!element) {
	        return;
	      }

	      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
	      this._config.interval = elementInterval || this._config.defaultInterval;
	    }

	    _slide(order, element = null) {
	      if (this._isSliding) {
	        return;
	      }

	      const activeElement = this._getActive();

	      const isNext = order === ORDER_NEXT;
	      const nextElement = element || index.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);

	      if (nextElement === activeElement) {
	        return;
	      }

	      const nextElementIndex = this._getItemIndex(nextElement);

	      const triggerEvent = eventName => {
	        return EventHandler__default.default.trigger(this._element, eventName, {
	          relatedTarget: nextElement,
	          direction: this._orderToDirection(order),
	          from: this._getItemIndex(activeElement),
	          to: nextElementIndex
	        });
	      };

	      const slideEvent = triggerEvent(EVENT_SLIDE);

	      if (slideEvent.defaultPrevented) {
	        return;
	      }

	      if (!activeElement || !nextElement) {
	        // Some weirdness is happening, so we bail
	        // todo: change tests that use empty divs to avoid this check
	        return;
	      }

	      const isCycling = Boolean(this._interval);
	      this.pause();
	      this._isSliding = true;

	      this._setActiveIndicatorElement(nextElementIndex);

	      this._activeElement = nextElement;
	      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
	      nextElement.classList.add(orderClassName);
	      index.reflow(nextElement);
	      activeElement.classList.add(directionalClassName);
	      nextElement.classList.add(directionalClassName);

	      const completeCallBack = () => {
	        nextElement.classList.remove(directionalClassName, orderClassName);
	        nextElement.classList.add(CLASS_NAME_ACTIVE);
	        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
	        this._isSliding = false;
	        triggerEvent(EVENT_SLID);
	      };

	      this._queueCallback(completeCallBack, activeElement, this._isAnimated());

	      if (isCycling) {
	        this.cycle();
	      }
	    }

	    _isAnimated() {
	      return this._element.classList.contains(CLASS_NAME_SLIDE);
	    }

	    _getActive() {
	      return SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	    }

	    _getItems() {
	      return SelectorEngine__default.default.find(SELECTOR_ITEM, this._element);
	    }

	    _clearInterval() {
	      if (this._interval) {
	        clearInterval(this._interval);
	        this._interval = null;
	      }
	    }

	    _directionToOrder(direction) {
	      if (index.isRTL()) {
	        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	      }

	      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	    }

	    _orderToDirection(order) {
	      if (index.isRTL()) {
	        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	      }

	      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Carousel.getOrCreateInstance(this, config);

	        if (typeof config === 'number') {
	          data.to(config);
	          return;
	        }

	        if (typeof config === 'string') {
	          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
	    const target = index.getElementFromSelector(this);

	    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	      return;
	    }

	    event.preventDefault();
	    const carousel = Carousel.getOrCreateInstance(target);
	    const slideIndex = this.getAttribute('data-bs-slide-to');

	    if (slideIndex) {
	      carousel.to(slideIndex);

	      carousel._maybeEnableCycle();

	      return;
	    }

	    if (Manipulator__default.default.getDataAttribute(this, 'slide') === 'next') {
	      carousel.next();

	      carousel._maybeEnableCycle();

	      return;
	    }

	    carousel.prev();

	    carousel._maybeEnableCycle();
	  });
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);

	    for (const carousel of carousels) {
	      Carousel.getOrCreateInstance(carousel);
	    }
	  });
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Carousel);

	  return Carousel;

	}));

	}(carousel));

	var carousel_1 = carousel.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): collapse.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'collapse';
	  const DATA_KEY = 'bs.collapse';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_COLLAPSE = 'collapse';
	  const CLASS_NAME_COLLAPSING = 'collapsing';
	  const CLASS_NAME_COLLAPSED = 'collapsed';
	  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
	  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
	  const WIDTH = 'width';
	  const HEIGHT = 'height';
	  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
	  const Default = {
	    parent: null,
	    toggle: true
	  };
	  const DefaultType = {
	    parent: '(null|element)',
	    toggle: 'boolean'
	  };
	  /**
	   * Class definition
	   */

	  class Collapse extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config);
	      this._isTransitioning = false;
	      this._triggerArray = [];
	      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

	      for (const elem of toggleList) {
	        const selector = index.getSelectorFromElement(elem);
	        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);

	        if (selector !== null && filterElement.length) {
	          this._triggerArray.push(elem);
	        }
	      }

	      this._initializeChildren();

	      if (!this._config.parent) {
	        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
	      }

	      if (this._config.toggle) {
	        this.toggle();
	      }
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      if (this._isShown()) {
	        this.hide();
	      } else {
	        this.show();
	      }
	    }

	    show() {
	      if (this._isTransitioning || this._isShown()) {
	        return;
	      }

	      let activeChildren = []; // find active children

	      if (this._config.parent) {
	        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
	          toggle: false
	        }));
	      }

	      if (activeChildren.length && activeChildren[0]._isTransitioning) {
	        return;
	      }

	      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

	      if (startEvent.defaultPrevented) {
	        return;
	      }

	      for (const activeInstance of activeChildren) {
	        activeInstance.hide();
	      }

	      const dimension = this._getDimension();

	      this._element.classList.remove(CLASS_NAME_COLLAPSE);

	      this._element.classList.add(CLASS_NAME_COLLAPSING);

	      this._element.style[dimension] = 0;

	      this._addAriaAndCollapsedClass(this._triggerArray, true);

	      this._isTransitioning = true;

	      const complete = () => {
	        this._isTransitioning = false;

	        this._element.classList.remove(CLASS_NAME_COLLAPSING);

	        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

	        this._element.style[dimension] = '';
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
	      };

	      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	      const scrollSize = `scroll${capitalizedDimension}`;

	      this._queueCallback(complete, this._element, true);

	      this._element.style[dimension] = `${this._element[scrollSize]}px`;
	    }

	    hide() {
	      if (this._isTransitioning || !this._isShown()) {
	        return;
	      }

	      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (startEvent.defaultPrevented) {
	        return;
	      }

	      const dimension = this._getDimension();

	      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
	      index.reflow(this._element);

	      this._element.classList.add(CLASS_NAME_COLLAPSING);

	      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

	      for (const trigger of this._triggerArray) {
	        const element = index.getElementFromSelector(trigger);

	        if (element && !this._isShown(element)) {
	          this._addAriaAndCollapsedClass([trigger], false);
	        }
	      }

	      this._isTransitioning = true;

	      const complete = () => {
	        this._isTransitioning = false;

	        this._element.classList.remove(CLASS_NAME_COLLAPSING);

	        this._element.classList.add(CLASS_NAME_COLLAPSE);

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._element.style[dimension] = '';

	      this._queueCallback(complete, this._element, true);
	    }

	    _isShown(element = this._element) {
	      return element.classList.contains(CLASS_NAME_SHOW);
	    } // Private


	    _configAfterMerge(config) {
	      config.toggle = Boolean(config.toggle); // Coerce string values

	      config.parent = index.getElement(config.parent);
	      return config;
	    }

	    _getDimension() {
	      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	    }

	    _initializeChildren() {
	      if (!this._config.parent) {
	        return;
	      }

	      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);

	      for (const element of children) {
	        const selected = index.getElementFromSelector(element);

	        if (selected) {
	          this._addAriaAndCollapsedClass([element], this._isShown(selected));
	        }
	      }
	    }

	    _getFirstLevelChildren(selector) {
	      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

	      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
	    }

	    _addAriaAndCollapsedClass(triggerArray, isOpen) {
	      if (!triggerArray.length) {
	        return;
	      }

	      for (const element of triggerArray) {
	        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
	        element.setAttribute('aria-expanded', isOpen);
	      }
	    } // Static


	    static jQueryInterface(config) {
	      const _config = {};

	      if (typeof config === 'string' && /show|hide/.test(config)) {
	        _config.toggle = false;
	      }

	      return this.each(function () {
	        const data = Collapse.getOrCreateInstance(this, _config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	      event.preventDefault();
	    }

	    const selector = index.getSelectorFromElement(this);
	    const selectorElements = SelectorEngine__default.default.find(selector);

	    for (const element of selectorElements) {
	      Collapse.getOrCreateInstance(element, {
	        toggle: false
	      }).toggle();
	    }
	  });
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Collapse);

	  return Collapse;

	}));

	}(collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;

	  if (uaData != null && uaData.brands) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }

	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }

	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }

	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;

	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }

	  var _ref = isElement(element) ? getWindow(element) : window,
	      visualViewport = _ref.visualViewport;

	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	      x = _offsets$x === void 0 ? 0 : _offsets$x,
	      _offsets$y = offsets.y,
	      y = _offsets$y === void 0 ? 0 : _offsets$y;

	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref4.x;
	  y = _ref4.y;

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref5) {
	  var state = _ref5.state,
	      options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();

	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$strategy = _options.strategy,
	      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });

	        for (var index = 0; index < state.orderedModifiers.length; index++) {

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(require$$0, util.exports, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  function _interopNamespace(e) {
	    if (e && e.__esModule) return e;
	    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
	    if (e) {
	      for (const k in e) {
	        if (k !== 'default') {
	          const d = Object.getOwnPropertyDescriptor(e, k);
	          Object.defineProperty(n, k, d.get ? d : {
	            enumerable: true,
	            get: () => e[k]
	          });
	        }
	      }
	    }
	    n.default = e;
	    return Object.freeze(n);
	  }

	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): dropdown.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'dropdown';
	  const DATA_KEY = 'bs.dropdown';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const TAB_KEY = 'Tab';
	  const ARROW_UP_KEY = 'ArrowUp';
	  const ARROW_DOWN_KEY = 'ArrowDown';
	  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_DROPUP = 'dropup';
	  const CLASS_NAME_DROPEND = 'dropend';
	  const CLASS_NAME_DROPSTART = 'dropstart';
	  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
	  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
	  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
	  const SELECTOR_MENU = '.dropdown-menu';
	  const SELECTOR_NAVBAR = '.navbar';
	  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
	  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
	  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
	  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
	  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
	  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
	  const PLACEMENT_TOPCENTER = 'top';
	  const PLACEMENT_BOTTOMCENTER = 'bottom';
	  const Default = {
	    autoClose: true,
	    boundary: 'clippingParents',
	    display: 'dynamic',
	    offset: [0, 2],
	    popperConfig: null,
	    reference: 'toggle'
	  };
	  const DefaultType = {
	    autoClose: '(boolean|string)',
	    boundary: '(string|element)',
	    display: 'string',
	    offset: '(array|string|function)',
	    popperConfig: '(null|object|function)',
	    reference: '(string|element|object)'
	  };
	  /**
	   * Class definition
	   */

	  class Dropdown extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config);
	      this._popper = null;
	      this._parent = this._element.parentNode; // dropdown wrapper
	      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

	      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
	      this._inNavbar = this._detectNavbar();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      return this._isShown() ? this.hide() : this.show();
	    }

	    show() {
	      if (index.isDisabled(this._element) || this._isShown()) {
	        return;
	      }

	      const relatedTarget = {
	        relatedTarget: this._element
	      };
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._createPopper(); // If this is a touch-enabled device we add extra
	      // empty mouseover listeners to the body's immediate children;
	      // only needed because of broken event delegation on iOS
	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
	        for (const element of [].concat(...document.body.children)) {
	          EventHandler__default.default.on(element, 'mouseover', index.noop);
	        }
	      }

	      this._element.focus();

	      this._element.setAttribute('aria-expanded', true);

	      this._menu.classList.add(CLASS_NAME_SHOW);

	      this._element.classList.add(CLASS_NAME_SHOW);

	      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
	    }

	    hide() {
	      if (index.isDisabled(this._element) || !this._isShown()) {
	        return;
	      }

	      const relatedTarget = {
	        relatedTarget: this._element
	      };

	      this._completeHide(relatedTarget);
	    }

	    dispose() {
	      if (this._popper) {
	        this._popper.destroy();
	      }

	      super.dispose();
	    }

	    update() {
	      this._inNavbar = this._detectNavbar();

	      if (this._popper) {
	        this._popper.update();
	      }
	    } // Private


	    _completeHide(relatedTarget) {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);

	      if (hideEvent.defaultPrevented) {
	        return;
	      } // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support


	      if ('ontouchstart' in document.documentElement) {
	        for (const element of [].concat(...document.body.children)) {
	          EventHandler__default.default.off(element, 'mouseover', index.noop);
	        }
	      }

	      if (this._popper) {
	        this._popper.destroy();
	      }

	      this._menu.classList.remove(CLASS_NAME_SHOW);

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._element.setAttribute('aria-expanded', 'false');

	      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
	      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
	    }

	    _getConfig(config) {
	      config = super._getConfig(config);

	      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	        // Popper virtual elements require a getBoundingClientRect method
	        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
	      }

	      return config;
	    }

	    _createPopper() {
	      if (typeof Popper__namespace === 'undefined') {
	        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	      }

	      let referenceElement = this._element;

	      if (this._config.reference === 'parent') {
	        referenceElement = this._parent;
	      } else if (index.isElement(this._config.reference)) {
	        referenceElement = index.getElement(this._config.reference);
	      } else if (typeof this._config.reference === 'object') {
	        referenceElement = this._config.reference;
	      }

	      const popperConfig = this._getPopperConfig();

	      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
	    }

	    _isShown() {
	      return this._menu.classList.contains(CLASS_NAME_SHOW);
	    }

	    _getPlacement() {
	      const parentDropdown = this._parent;

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	        return PLACEMENT_RIGHT;
	      }

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	        return PLACEMENT_LEFT;
	      }

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
	        return PLACEMENT_TOPCENTER;
	      }

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
	        return PLACEMENT_BOTTOMCENTER;
	      } // We need to trim the value because custom properties can also include spaces


	      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	      }

	      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	    }

	    _detectNavbar() {
	      return this._element.closest(SELECTOR_NAVBAR) !== null;
	    }

	    _getOffset() {
	      const {
	        offset
	      } = this._config;

	      if (typeof offset === 'string') {
	        return offset.split(',').map(value => Number.parseInt(value, 10));
	      }

	      if (typeof offset === 'function') {
	        return popperData => offset(popperData, this._element);
	      }

	      return offset;
	    }

	    _getPopperConfig() {
	      const defaultBsPopperConfig = {
	        placement: this._getPlacement(),
	        modifiers: [{
	          name: 'preventOverflow',
	          options: {
	            boundary: this._config.boundary
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }]
	      }; // Disable Popper if we have a static display or Dropdown is in Navbar

	      if (this._inNavbar || this._config.display === 'static') {
	        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

	        defaultBsPopperConfig.modifiers = [{
	          name: 'applyStyles',
	          enabled: false
	        }];
	      }

	      return { ...defaultBsPopperConfig,
	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	      };
	    }

	    _selectMenuItem({
	      key,
	      target
	    }) {
	      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));

	      if (!items.length) {
	        return;
	      } // if target isn't included in items (e.g. when expanding the dropdown)
	      // allow cycling to get the last item in case key equals ARROW_UP_KEY


	      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Dropdown.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	    static clearMenus(event) {
	      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
	        return;
	      }

	      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);

	      for (const toggle of openToggles) {
	        const context = Dropdown.getInstance(toggle);

	        if (!context || context._config.autoClose === false) {
	          continue;
	        }

	        const composedPath = event.composedPath();
	        const isMenuTarget = composedPath.includes(context._menu);

	        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
	          continue;
	        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


	        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
	          continue;
	        }

	        const relatedTarget = {
	          relatedTarget: context._element
	        };

	        if (event.type === 'click') {
	          relatedTarget.clickEvent = event;
	        }

	        context._completeHide(relatedTarget);
	      }
	    }

	    static dataApiKeydownHandler(event) {
	      // If not an UP | DOWN | ESCAPE key => not a dropdown command
	      // If input/textarea && if key is other than ESCAPE => not a dropdown command
	      const isInput = /input|textarea/i.test(event.target.tagName);
	      const isEscapeEvent = event.key === ESCAPE_KEY;
	      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);

	      if (!isUpOrDownEvent && !isEscapeEvent) {
	        return;
	      }

	      if (isInput && !isEscapeEvent) {
	        return;
	      }

	      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

	      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
	      const instance = Dropdown.getOrCreateInstance(getToggleButton);

	      if (isUpOrDownEvent) {
	        event.stopPropagation();
	        instance.show();

	        instance._selectMenuItem(event);

	        return;
	      }

	      if (instance._isShown()) {
	        // else is escape and we check if it is shown
	        event.stopPropagation();
	        instance.hide();
	        getToggleButton.focus();
	      }
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
	  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
	  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    event.preventDefault();
	    Dropdown.getOrCreateInstance(this).toggle();
	  });
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Dropdown);

	  return Dropdown;

	}));

	}(dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal$1 = {exports: {}};

	var scrollbar = {exports: {}};

	/*!
	  * Bootstrap scrollbar.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(selectorEngine.exports, manipulator.exports, util.exports) ;
	})(commonjsGlobal, (function (SelectorEngine, Manipulator, index) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';
	  const PROPERTY_PADDING = 'padding-right';
	  const PROPERTY_MARGIN = 'margin-right';
	  /**
	   * Class definition
	   */

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    } // Public


	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, PROPERTY_PADDING);

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    } // Private


	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProperty, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProperty);

	        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
	        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _saveInitialAttribute(element, styleProperty) {
	      const actualValue = element.style.getPropertyValue(styleProperty);

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProperty) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

	        if (value === null) {
	          element.style.removeProperty(styleProperty);
	          return;
	        }

	        Manipulator__default.default.removeDataAttribute(element, styleProperty);
	        element.style.setProperty(styleProperty, value);
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (index.isElement(selector)) {
	        callBack(selector);
	        return;
	      }

	      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
	        callBack(sel);
	      }
	    }

	  }

	  return ScrollBarHelper;

	}));

	}(scrollbar));

	var backdrop = {exports: {}};

	/*!
	  * Bootstrap backdrop.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, util.exports, config.exports) ;
	})(commonjsGlobal, (function (EventHandler, index, Config) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'backdrop';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
	  const Default = {
	    className: 'modal-backdrop',
	    clickCallback: null,
	    isAnimated: false,
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    rootElement: 'body' // give the choice to place backdrop under different elements

	  };
	  const DefaultType = {
	    className: 'string',
	    clickCallback: '(function|null)',
	    isAnimated: 'boolean',
	    isVisible: 'boolean',
	    rootElement: '(element|string)'
	  };
	  /**
	   * Class definition
	   */

	  class Backdrop extends Config__default.default {
	    constructor(config) {
	      super();
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    show(callback) {
	      if (!this._config.isVisible) {
	        index.execute(callback);
	        return;
	      }

	      this._append();

	      const element = this._getElement();

	      if (this._config.isAnimated) {
	        index.reflow(element);
	      }

	      element.classList.add(CLASS_NAME_SHOW);

	      this._emulateAnimation(() => {
	        index.execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        index.execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW);

	      this._emulateAnimation(() => {
	        this.dispose();
	        index.execute(callback);
	      });
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _configAfterMerge(config) {
	      // use getElement() with the default "body" to get a fresh Element on each instantiation
	      config.rootElement = index.getElement(config.rootElement);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      const element = this._getElement();

	      this._config.rootElement.append(element);

	      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
	        index.execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    _emulateAnimation(callback) {
	      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  return Backdrop;

	}));

	}(backdrop));

	var focustrap = {exports: {}};

	/*!
	  * Bootstrap focustrap.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, selectorEngine.exports, config.exports) ;
	})(commonjsGlobal, (function (EventHandler, SelectorEngine, Config) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'focustrap';
	  const DATA_KEY = 'bs.focustrap';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';
	  const Default = {
	    autofocus: true,
	    trapElement: null // The element to trap focus inside of

	  };
	  const DefaultType = {
	    autofocus: 'boolean',
	    trapElement: 'element'
	  };
	  /**
	   * Class definition
	   */

	  class FocusTrap extends Config__default.default {
	    constructor(config) {
	      super();
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    activate() {
	      if (this._isActive) {
	        return;
	      }

	      if (this._config.autofocus) {
	        this._config.trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        trapElement
	      } = this._config;

	      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	  }

	  return FocusTrap;

	}));

	}(focustrap));

	/*!
	  * Bootstrap modal.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, selectorEngine.exports, scrollbar.exports, baseComponent.exports, backdrop.exports, focustrap.exports, componentFunctions.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
	  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
	  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): modal.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'modal';
	  const DATA_KEY = 'bs.modal';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_RESIZE = `resize${EVENT_KEY}`;
	  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_OPEN = 'modal-open';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_STATIC = 'modal-static';
	  const OPEN_SELECTOR = '.modal.show';
	  const SELECTOR_DIALOG = '.modal-dialog';
	  const SELECTOR_MODAL_BODY = '.modal-body';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
	  const Default = {
	    backdrop: true,
	    focus: true,
	    keyboard: true
	  };
	  const DefaultType = {
	    backdrop: '(boolean|string)',
	    focus: 'boolean',
	    keyboard: 'boolean'
	  };
	  /**
	   * Class definition
	   */

	  class Modal extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config);
	      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();
	      this._isShown = false;
	      this._isTransitioning = false;
	      this._scrollBar = new ScrollBarHelper__default.default();

	      this._addEventListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown || this._isTransitioning) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;
	      this._isTransitioning = true;

	      this._scrollBar.hide();

	      document.body.classList.add(CLASS_NAME_OPEN);

	      this._adjustDialog();

	      this._backdrop.show(() => this._showElement(relatedTarget));
	    }

	    hide() {
	      if (!this._isShown || this._isTransitioning) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = false;
	      this._isTransitioning = true;

	      this._focustrap.deactivate();

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
	    }

	    dispose() {
	      for (const htmlElement of [window, this._dialog]) {
	        EventHandler__default.default.off(htmlElement, EVENT_KEY);
	      }

	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    }

	    handleUpdate() {
	      this._adjustDialog();
	    } // Private


	    _initializeBackDrop() {
	      return new Backdrop__default.default({
	        isVisible: Boolean(this._config.backdrop),
	        // 'static' option will be translated to true, and booleans will keep their value,
	        isAnimated: this._isAnimated()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap__default.default({
	        trapElement: this._element
	      });
	    }

	    _showElement(relatedTarget) {
	      // try to append dynamic modal
	      if (!document.body.contains(this._element)) {
	        document.body.append(this._element);
	      }

	      this._element.style.display = 'block';

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.scrollTop = 0;
	      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);

	      if (modalBody) {
	        modalBody.scrollTop = 0;
	      }

	      index.reflow(this._element);

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const transitionComplete = () => {
	        if (this._config.focus) {
	          this._focustrap.activate();
	        }

	        this._isTransitioning = false;
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
	    }

	    _addEventListeners() {
	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	        if (event.key !== ESCAPE_KEY) {
	          return;
	        }

	        if (this._config.keyboard) {
	          event.preventDefault();
	          this.hide();
	          return;
	        }

	        this._triggerBackdropTransition();
	      });
	      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
	        if (this._isShown && !this._isTransitioning) {
	          this._adjustDialog();
	        }
	      });
	      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
	        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
	        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
	          if (this._element !== event.target || this._element !== event2.target) {
	            return;
	          }

	          if (this._config.backdrop === 'static') {
	            this._triggerBackdropTransition();

	            return;
	          }

	          if (this._config.backdrop) {
	            this.hide();
	          }
	        });
	      });
	    }

	    _hideModal() {
	      this._element.style.display = 'none';

	      this._element.setAttribute('aria-hidden', true);

	      this._element.removeAttribute('aria-modal');

	      this._element.removeAttribute('role');

	      this._isTransitioning = false;

	      this._backdrop.hide(() => {
	        document.body.classList.remove(CLASS_NAME_OPEN);

	        this._resetAdjustments();

	        this._scrollBar.reset();

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      });
	    }

	    _isAnimated() {
	      return this._element.classList.contains(CLASS_NAME_FADE);
	    }

	    _triggerBackdropTransition() {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
	      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

	      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
	        return;
	      }

	      if (!isModalOverflowing) {
	        this._element.style.overflowY = 'hidden';
	      }

	      this._element.classList.add(CLASS_NAME_STATIC);

	      this._queueCallback(() => {
	        this._element.classList.remove(CLASS_NAME_STATIC);

	        this._queueCallback(() => {
	          this._element.style.overflowY = initialOverflowY;
	        }, this._dialog);
	      }, this._dialog);

	      this._element.focus();
	    }
	    /**
	     * The following methods are used to handle overflowing modals
	     */


	    _adjustDialog() {
	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	      const scrollbarWidth = this._scrollBar.getWidth();

	      const isBodyOverflowing = scrollbarWidth > 0;

	      if (isBodyOverflowing && !isModalOverflowing) {
	        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
	        this._element.style[property] = `${scrollbarWidth}px`;
	      }

	      if (!isBodyOverflowing && isModalOverflowing) {
	        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
	        this._element.style[property] = `${scrollbarWidth}px`;
	      }
	    }

	    _resetAdjustments() {
	      this._element.style.paddingLeft = '';
	      this._element.style.paddingRight = '';
	    } // Static


	    static jQueryInterface(config, relatedTarget) {
	      return this.each(function () {
	        const data = Modal.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](relatedTarget);
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = index.getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
	      if (showEvent.defaultPrevented) {
	        // only register focus restorer if modal will actually get shown
	        return;
	      }

	      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	        if (index.isVisible(this)) {
	          this.focus();
	        }
	      });
	    }); // avoid conflict when clicking modal toggler while another one is open

	    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (alreadyOpen) {
	      Modal.getInstance(alreadyOpen).hide();
	    }

	    const data = Modal.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  componentFunctions.enableDismissTrigger(Modal);
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Modal);

	  return Modal;

	}));

	}(modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, scrollbar.exports, eventHandler.exports, baseComponent.exports, selectorEngine.exports, backdrop.exports, focustrap.exports, componentFunctions.exports) ;
	})(commonjsGlobal, (function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
	  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): offcanvas.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'offcanvas';
	  const DATA_KEY = 'bs.offcanvas';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const ESCAPE_KEY = 'Escape';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_SHOWING = 'showing';
	  const CLASS_NAME_HIDING = 'hiding';
	  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	  const OPEN_SELECTOR = '.offcanvas.show';
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_RESIZE = `resize${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    scroll: false
	  };
	  const DefaultType = {
	    backdrop: '(boolean|string)',
	    keyboard: 'boolean',
	    scroll: 'boolean'
	  };
	  /**
	   * Class definition
	   */

	  class Offcanvas extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config);
	      this._isShown = false;
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();

	      this._addEventListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;

	      this._backdrop.show();

	      if (!this._config.scroll) {
	        new ScrollBarHelper__default.default().hide();
	      }

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.classList.add(CLASS_NAME_SHOWING);

	      const completeCallBack = () => {
	        if (!this._config.scroll || this._config.backdrop) {
	          this._focustrap.activate();
	        }

	        this._element.classList.add(CLASS_NAME_SHOW);

	        this._element.classList.remove(CLASS_NAME_SHOWING);

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(completeCallBack, this._element, true);
	    }

	    hide() {
	      if (!this._isShown) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._focustrap.deactivate();

	      this._element.blur();

	      this._isShown = false;

	      this._element.classList.add(CLASS_NAME_HIDING);

	      this._backdrop.hide();

	      const completeCallback = () => {
	        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);

	        this._element.removeAttribute('aria-modal');

	        this._element.removeAttribute('role');

	        if (!this._config.scroll) {
	          new ScrollBarHelper__default.default().reset();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._queueCallback(completeCallback, this._element, true);
	    }

	    dispose() {
	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    } // Private


	    _initializeBackDrop() {
	      const clickCallback = () => {
	        if (this._config.backdrop === 'static') {
	          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
	          return;
	        }

	        this.hide();
	      }; // 'static' option will be translated to true, and booleans will keep their value


	      const isVisible = Boolean(this._config.backdrop);
	      return new Backdrop__default.default({
	        className: CLASS_NAME_BACKDROP,
	        isVisible,
	        isAnimated: true,
	        rootElement: this._element.parentNode,
	        clickCallback: isVisible ? clickCallback : null
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap__default.default({
	        trapElement: this._element
	      });
	    }

	    _addEventListeners() {
	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	        if (event.key !== ESCAPE_KEY) {
	          return;
	        }

	        if (!this._config.keyboard) {
	          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
	          return;
	        }

	        this.hide();
	      });
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Offcanvas.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = index.getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (index.isDisabled(this)) {
	      return;
	    }

	    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	      // focus on trigger when it is closed
	      if (index.isVisible(this)) {
	        this.focus();
	      }
	    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

	    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (alreadyOpen && alreadyOpen !== target) {
	      Offcanvas.getInstance(alreadyOpen).hide();
	    }

	    const data = Offcanvas.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
	      Offcanvas.getOrCreateInstance(selector).show();
	    }
	  });
	  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
	    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
	      if (getComputedStyle(element).position !== 'fixed') {
	        Offcanvas.getOrCreateInstance(element).hide();
	      }
	    }
	  });
	  componentFunctions.enableDismissTrigger(Offcanvas);
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Offcanvas);

	  return Offcanvas;

	}));

	}(offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	var sanitizer = {exports: {}};

	/*!
	  * Bootstrap sanitizer.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  factory(exports) ;
	})(commonjsGlobal, (function (exports) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/sanitizer.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	  /**
	   * A pattern that recognizes a commonly useful subset of URLs that are safe.
	   *
	   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
	  /**
	   * A pattern that matches safe data URLs. Only matches image, video and audio types.
	   *
	   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	  const allowedAttribute = (attribute, allowedAttributeList) => {
	    const attributeName = attribute.nodeName.toLowerCase();

	    if (allowedAttributeList.includes(attributeName)) {
	      if (uriAttributes.has(attributeName)) {
	        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
	      }

	      return true;
	    } // Check if a regular expression validates the attribute.


	    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
	  };

	  const DefaultAllowlist = {
	    // Global attributes allowed on any supplied element below.
	    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	    a: ['target', 'href', 'title', 'rel'],
	    area: [],
	    b: [],
	    br: [],
	    col: [],
	    code: [],
	    div: [],
	    em: [],
	    hr: [],
	    h1: [],
	    h2: [],
	    h3: [],
	    h4: [],
	    h5: [],
	    h6: [],
	    i: [],
	    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	    li: [],
	    ol: [],
	    p: [],
	    pre: [],
	    s: [],
	    small: [],
	    span: [],
	    sub: [],
	    sup: [],
	    strong: [],
	    u: [],
	    ul: []
	  };
	  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
	    if (!unsafeHtml.length) {
	      return unsafeHtml;
	    }

	    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
	      return sanitizeFunction(unsafeHtml);
	    }

	    const domParser = new window.DOMParser();
	    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

	    for (const element of elements) {
	      const elementName = element.nodeName.toLowerCase();

	      if (!Object.keys(allowList).includes(elementName)) {
	        element.remove();
	        continue;
	      }

	      const attributeList = [].concat(...element.attributes);
	      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

	      for (const attribute of attributeList) {
	        if (!allowedAttribute(attribute, allowedAttributes)) {
	          element.removeAttribute(attribute.nodeName);
	        }
	      }
	    }

	    return createdDocument.body.innerHTML;
	  }

	  exports.DefaultAllowlist = DefaultAllowlist;
	  exports.sanitizeHtml = sanitizeHtml;

	  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

	}));

	}(sanitizer, sanitizer.exports));

	var templateFactory = {exports: {}};

	/*!
	  * Bootstrap template-factory.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(sanitizer.exports, util.exports, selectorEngine.exports, config.exports) ;
	})(commonjsGlobal, (function (sanitizer, index, SelectorEngine, Config) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): util/template-factory.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'TemplateFactory';
	  const Default = {
	    allowList: sanitizer.DefaultAllowlist,
	    content: {},
	    // { selector : text ,  selector2 : text2 , }
	    extraClass: '',
	    html: false,
	    sanitize: true,
	    sanitizeFn: null,
	    template: '<div></div>'
	  };
	  const DefaultType = {
	    allowList: 'object',
	    content: 'object',
	    extraClass: '(string|function)',
	    html: 'boolean',
	    sanitize: 'boolean',
	    sanitizeFn: '(null|function)',
	    template: 'string'
	  };
	  const DefaultContentType = {
	    entry: '(string|element|function|null)',
	    selector: '(string|element)'
	  };
	  /**
	   * Class definition
	   */

	  class TemplateFactory extends Config__default.default {
	    constructor(config) {
	      super();
	      this._config = this._getConfig(config);
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    getContent() {
	      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
	    }

	    hasContent() {
	      return this.getContent().length > 0;
	    }

	    changeContent(content) {
	      this._checkContent(content);

	      this._config.content = { ...this._config.content,
	        ...content
	      };
	      return this;
	    }

	    toHtml() {
	      const templateWrapper = document.createElement('div');
	      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

	      for (const [selector, text] of Object.entries(this._config.content)) {
	        this._setContent(templateWrapper, text, selector);
	      }

	      const template = templateWrapper.children[0];

	      const extraClass = this._resolvePossibleFunction(this._config.extraClass);

	      if (extraClass) {
	        template.classList.add(...extraClass.split(' '));
	      }

	      return template;
	    } // Private


	    _typeCheckConfig(config) {
	      super._typeCheckConfig(config);

	      this._checkContent(config.content);
	    }

	    _checkContent(arg) {
	      for (const [selector, content] of Object.entries(arg)) {
	        super._typeCheckConfig({
	          selector,
	          entry: content
	        }, DefaultContentType);
	      }
	    }

	    _setContent(template, content, selector) {
	      const templateElement = SelectorEngine__default.default.findOne(selector, template);

	      if (!templateElement) {
	        return;
	      }

	      content = this._resolvePossibleFunction(content);

	      if (!content) {
	        templateElement.remove();
	        return;
	      }

	      if (index.isElement(content)) {
	        this._putElementInTemplate(index.getElement(content), templateElement);

	        return;
	      }

	      if (this._config.html) {
	        templateElement.innerHTML = this._maybeSanitize(content);
	        return;
	      }

	      templateElement.textContent = content;
	    }

	    _maybeSanitize(arg) {
	      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
	    }

	    _resolvePossibleFunction(arg) {
	      return typeof arg === 'function' ? arg(this) : arg;
	    }

	    _putElementInTemplate(element, templateElement) {
	      if (this._config.html) {
	        templateElement.innerHTML = '';
	        templateElement.append(element);
	        return;
	      }

	      templateElement.textContent = element.textContent;
	    }

	  }

	  return TemplateFactory;

	}));

	}(templateFactory));

	/*!
	  * Bootstrap tooltip.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(require$$0, util.exports, sanitizer.exports, eventHandler.exports, manipulator.exports, baseComponent.exports, templateFactory.exports) ;
	})(commonjsGlobal, (function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  function _interopNamespace(e) {
	    if (e && e.__esModule) return e;
	    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
	    if (e) {
	      for (const k in e) {
	        if (k !== 'default') {
	          const d = Object.getOwnPropertyDescriptor(e, k);
	          Object.defineProperty(n, k, d.get ? d : {
	            enumerable: true,
	            get: () => e[k]
	          });
	        }
	      }
	    }
	    n.default = e;
	    return Object.freeze(n);
	  }

	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
	  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): tooltip.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'tooltip';
	  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_MODAL = 'modal';
	  const CLASS_NAME_SHOW = 'show';
	  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
	  const EVENT_MODAL_HIDE = 'hide.bs.modal';
	  const TRIGGER_HOVER = 'hover';
	  const TRIGGER_FOCUS = 'focus';
	  const TRIGGER_CLICK = 'click';
	  const TRIGGER_MANUAL = 'manual';
	  const EVENT_HIDE = 'hide';
	  const EVENT_HIDDEN = 'hidden';
	  const EVENT_SHOW = 'show';
	  const EVENT_SHOWN = 'shown';
	  const EVENT_INSERTED = 'inserted';
	  const EVENT_CLICK = 'click';
	  const EVENT_FOCUSIN = 'focusin';
	  const EVENT_FOCUSOUT = 'focusout';
	  const EVENT_MOUSEENTER = 'mouseenter';
	  const EVENT_MOUSELEAVE = 'mouseleave';
	  const AttachmentMap = {
	    AUTO: 'auto',
	    TOP: 'top',
	    RIGHT: index.isRTL() ? 'left' : 'right',
	    BOTTOM: 'bottom',
	    LEFT: index.isRTL() ? 'right' : 'left'
	  };
	  const Default = {
	    allowList: sanitizer.DefaultAllowlist,
	    animation: true,
	    boundary: 'clippingParents',
	    container: false,
	    customClass: '',
	    delay: 0,
	    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	    html: false,
	    offset: [0, 0],
	    placement: 'top',
	    popperConfig: null,
	    sanitize: true,
	    sanitizeFn: null,
	    selector: false,
	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	    title: '',
	    trigger: 'hover focus'
	  };
	  const DefaultType = {
	    allowList: 'object',
	    animation: 'boolean',
	    boundary: '(string|element)',
	    container: '(string|element|boolean)',
	    customClass: '(string|function)',
	    delay: '(number|object)',
	    fallbackPlacements: 'array',
	    html: 'boolean',
	    offset: '(array|string|function)',
	    placement: '(string|function)',
	    popperConfig: '(null|object|function)',
	    sanitize: 'boolean',
	    sanitizeFn: '(null|function)',
	    selector: '(string|boolean)',
	    template: 'string',
	    title: '(string|element|function)',
	    trigger: 'string'
	  };
	  /**
	   * Class definition
	   */

	  class Tooltip extends BaseComponent__default.default {
	    constructor(element, config) {
	      if (typeof Popper__namespace === 'undefined') {
	        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	      }

	      super(element, config); // Private

	      this._isEnabled = true;
	      this._timeout = 0;
	      this._isHovered = null;
	      this._activeTrigger = {};
	      this._popper = null;
	      this._templateFactory = null;
	      this._newContent = null; // Protected

	      this.tip = null;

	      this._setListeners();

	      if (!this._config.selector) {
	        this._fixTitle();
	      }
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    enable() {
	      this._isEnabled = true;
	    }

	    disable() {
	      this._isEnabled = false;
	    }

	    toggleEnabled() {
	      this._isEnabled = !this._isEnabled;
	    }

	    toggle() {
	      if (!this._isEnabled) {
	        return;
	      }

	      this._activeTrigger.click = !this._activeTrigger.click;

	      if (this._isShown()) {
	        this._leave();

	        return;
	      }

	      this._enter();
	    }

	    dispose() {
	      clearTimeout(this._timeout);
	      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	      if (this.tip) {
	        this.tip.remove();
	      }

	      if (this._element.getAttribute('data-bs-original-title')) {
	        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
	      }

	      this._disposePopper();

	      super.dispose();
	    }

	    show() {
	      if (this._element.style.display === 'none') {
	        throw new Error('Please use show on visible elements');
	      }

	      if (!(this._isWithContent() && this._isEnabled)) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
	      const shadowRoot = index.findShadowRoot(this._element);

	      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

	      if (showEvent.defaultPrevented || !isInTheDom) {
	        return;
	      } // todo v6 remove this OR make it optional


	      if (this.tip) {
	        this.tip.remove();
	        this.tip = null;
	      }

	      const tip = this._getTipElement();

	      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));

	      const {
	        container
	      } = this._config;

	      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	        container.append(tip);
	        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
	      }

	      if (this._popper) {
	        this._popper.update();
	      } else {
	        this._popper = this._createPopper(tip);
	      }

	      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
	      // empty mouseover listeners to the body's immediate children;
	      // only needed because of broken event delegation on iOS
	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

	      if ('ontouchstart' in document.documentElement) {
	        for (const element of [].concat(...document.body.children)) {
	          EventHandler__default.default.on(element, 'mouseover', index.noop);
	        }
	      }

	      const complete = () => {
	        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));

	        if (this._isHovered === false) {
	          this._leave();
	        }

	        this._isHovered = false;
	      };

	      this._queueCallback(complete, this.tip, this._isAnimated());
	    }

	    hide() {
	      if (!this._isShown()) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const tip = this._getTipElement();

	      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support

	      if ('ontouchstart' in document.documentElement) {
	        for (const element of [].concat(...document.body.children)) {
	          EventHandler__default.default.off(element, 'mouseover', index.noop);
	        }
	      }

	      this._activeTrigger[TRIGGER_CLICK] = false;
	      this._activeTrigger[TRIGGER_FOCUS] = false;
	      this._activeTrigger[TRIGGER_HOVER] = false;
	      this._isHovered = null; // it is a trick to support manual triggering

	      const complete = () => {
	        if (this._isWithActiveTrigger()) {
	          return;
	        }

	        if (!this._isHovered) {
	          tip.remove();
	        }

	        this._element.removeAttribute('aria-describedby');

	        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));

	        this._disposePopper();
	      };

	      this._queueCallback(complete, this.tip, this._isAnimated());
	    }

	    update() {
	      if (this._popper) {
	        this._popper.update();
	      }
	    } // Protected


	    _isWithContent() {
	      return Boolean(this._getTitle());
	    }

	    _getTipElement() {
	      if (!this.tip) {
	        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
	      }

	      return this.tip;
	    }

	    _createTipElement(content) {
	      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6


	      if (!tip) {
	        return null;
	      }

	      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

	      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
	      const tipId = index.getUID(this.constructor.NAME).toString();
	      tip.setAttribute('id', tipId);

	      if (this._isAnimated()) {
	        tip.classList.add(CLASS_NAME_FADE);
	      }

	      return tip;
	    }

	    setContent(content) {
	      this._newContent = content;

	      if (this._isShown()) {
	        this._disposePopper();

	        this.show();
	      }
	    }

	    _getTemplateFactory(content) {
	      if (this._templateFactory) {
	        this._templateFactory.changeContent(content);
	      } else {
	        this._templateFactory = new TemplateFactory__default.default({ ...this._config,
	          // the `content` var has to be after `this._config`
	          // to override config.content in case of popover
	          content,
	          extraClass: this._resolvePossibleFunction(this._config.customClass)
	        });
	      }

	      return this._templateFactory;
	    }

	    _getContentForTemplate() {
	      return {
	        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
	      };
	    }

	    _getTitle() {
	      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
	    } // Private


	    _initializeOnDelegatedTarget(event) {
	      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	    }

	    _isAnimated() {
	      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
	    }

	    _isShown() {
	      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
	    }

	    _createPopper(tip) {
	      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
	      const attachment = AttachmentMap[placement.toUpperCase()];
	      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
	    }

	    _getOffset() {
	      const {
	        offset
	      } = this._config;

	      if (typeof offset === 'string') {
	        return offset.split(',').map(value => Number.parseInt(value, 10));
	      }

	      if (typeof offset === 'function') {
	        return popperData => offset(popperData, this._element);
	      }

	      return offset;
	    }

	    _resolvePossibleFunction(arg) {
	      return typeof arg === 'function' ? arg.call(this._element) : arg;
	    }

	    _getPopperConfig(attachment) {
	      const defaultBsPopperConfig = {
	        placement: attachment,
	        modifiers: [{
	          name: 'flip',
	          options: {
	            fallbackPlacements: this._config.fallbackPlacements
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }, {
	          name: 'preventOverflow',
	          options: {
	            boundary: this._config.boundary
	          }
	        }, {
	          name: 'arrow',
	          options: {
	            element: `.${this.constructor.NAME}-arrow`
	          }
	        }, {
	          name: 'preSetPlacement',
	          enabled: true,
	          phase: 'beforeMain',
	          fn: data => {
	            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
	            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
	            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
	          }
	        }]
	      };
	      return { ...defaultBsPopperConfig,
	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	      };
	    }

	    _setListeners() {
	      const triggers = this._config.trigger.split(' ');

	      for (const trigger of triggers) {
	        if (trigger === 'click') {
	          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
	            const context = this._initializeOnDelegatedTarget(event);

	            context.toggle();
	          });
	        } else if (trigger !== TRIGGER_MANUAL) {
	          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
	          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
	          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
	            const context = this._initializeOnDelegatedTarget(event);

	            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

	            context._enter();
	          });
	          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
	            const context = this._initializeOnDelegatedTarget(event);

	            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

	            context._leave();
	          });
	        }
	      }

	      this._hideModalHandler = () => {
	        if (this._element) {
	          this.hide();
	        }
	      };

	      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
	    }

	    _fixTitle() {
	      const title = this._element.getAttribute('title');

	      if (!title) {
	        return;
	      }

	      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
	        this._element.setAttribute('aria-label', title);
	      }

	      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility


	      this._element.removeAttribute('title');
	    }

	    _enter() {
	      if (this._isShown() || this._isHovered) {
	        this._isHovered = true;
	        return;
	      }

	      this._isHovered = true;

	      this._setTimeout(() => {
	        if (this._isHovered) {
	          this.show();
	        }
	      }, this._config.delay.show);
	    }

	    _leave() {
	      if (this._isWithActiveTrigger()) {
	        return;
	      }

	      this._isHovered = false;

	      this._setTimeout(() => {
	        if (!this._isHovered) {
	          this.hide();
	        }
	      }, this._config.delay.hide);
	    }

	    _setTimeout(handler, timeout) {
	      clearTimeout(this._timeout);
	      this._timeout = setTimeout(handler, timeout);
	    }

	    _isWithActiveTrigger() {
	      return Object.values(this._activeTrigger).includes(true);
	    }

	    _getConfig(config) {
	      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);

	      for (const dataAttribute of Object.keys(dataAttributes)) {
	        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
	          delete dataAttributes[dataAttribute];
	        }
	      }

	      config = { ...dataAttributes,
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      config = this._mergeConfigObj(config);
	      config = this._configAfterMerge(config);

	      this._typeCheckConfig(config);

	      return config;
	    }

	    _configAfterMerge(config) {
	      config.container = config.container === false ? document.body : index.getElement(config.container);

	      if (typeof config.delay === 'number') {
	        config.delay = {
	          show: config.delay,
	          hide: config.delay
	        };
	      }

	      if (typeof config.title === 'number') {
	        config.title = config.title.toString();
	      }

	      if (typeof config.content === 'number') {
	        config.content = config.content.toString();
	      }

	      return config;
	    }

	    _getDelegateConfig() {
	      const config = {};

	      for (const key in this._config) {
	        if (this.constructor.Default[key] !== this._config[key]) {
	          config[key] = this._config[key];
	        }
	      }

	      config.selector = false;
	      config.trigger = 'manual'; // In the future can be replaced with:
	      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
	      // `Object.fromEntries(keysWithDifferentValues)`

	      return config;
	    }

	    _disposePopper() {
	      if (this._popper) {
	        this._popper.destroy();

	        this._popper = null;
	      }
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tooltip.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	  }
	  /**
	   * jQuery
	   */


	  index.defineJQueryPlugin(Tooltip);

	  return Tooltip;

	}));

	}(tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, tooltip$1.exports) ;
	})(commonjsGlobal, (function (index, Tooltip) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): popover.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'popover';
	  const SELECTOR_TITLE = '.popover-header';
	  const SELECTOR_CONTENT = '.popover-body';
	  const Default = { ...Tooltip__default.default.Default,
	    content: '',
	    offset: [0, 8],
	    placement: 'right',
	    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
	    trigger: 'click'
	  };
	  const DefaultType = { ...Tooltip__default.default.DefaultType,
	    content: '(null|string|element|function)'
	  };
	  /**
	   * Class definition
	   */

	  class Popover extends Tooltip__default.default {
	    // Getters
	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Overrides


	    _isWithContent() {
	      return this._getTitle() || this._getContent();
	    } // Private


	    _getContentForTemplate() {
	      return {
	        [SELECTOR_TITLE]: this._getTitle(),
	        [SELECTOR_CONTENT]: this._getContent()
	      };
	    }

	    _getContent() {
	      return this._resolvePossibleFunction(this._config.content);
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Popover.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	  }
	  /**
	   * jQuery
	   */


	  index.defineJQueryPlugin(Popover);

	  return Popover;

	}));

	}(popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): scrollspy.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'scrollspy';
	  const DATA_KEY = 'bs.scrollspy';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
	  const EVENT_CLICK = `click${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	  const SELECTOR_TARGET_LINKS = '[href]';
	  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	  const SELECTOR_NAV_LINKS = '.nav-link';
	  const SELECTOR_NAV_ITEMS = '.nav-item';
	  const SELECTOR_LIST_ITEMS = '.list-group-item';
	  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
	  const SELECTOR_DROPDOWN = '.dropdown';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const Default = {
	    offset: null,
	    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
	    rootMargin: '0px 0px -25%',
	    smoothScroll: false,
	    target: null,
	    threshold: [0.1, 0.5, 1]
	  };
	  const DefaultType = {
	    offset: '(number|null)',
	    // TODO v6 @deprecated, keep it for backwards compatibility reasons
	    rootMargin: 'string',
	    smoothScroll: 'boolean',
	    target: 'element',
	    threshold: 'array'
	  };
	  /**
	   * Class definition
	   */

	  class ScrollSpy extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

	      this._targetLinks = new Map();
	      this._observableSections = new Map();
	      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
	      this._activeTarget = null;
	      this._observer = null;
	      this._previousScrollData = {
	        visibleEntryTop: 0,
	        parentScrollTop: 0
	      };
	      this.refresh(); // initialize
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    refresh() {
	      this._initializeTargetsAndObservables();

	      this._maybeEnableSmoothScroll();

	      if (this._observer) {
	        this._observer.disconnect();
	      } else {
	        this._observer = this._getNewObserver();
	      }

	      for (const section of this._observableSections.values()) {
	        this._observer.observe(section);
	      }
	    }

	    dispose() {
	      this._observer.disconnect();

	      super.dispose();
	    } // Private


	    _configAfterMerge(config) {
	      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
	      config.target = index.getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

	      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;

	      if (typeof config.threshold === 'string') {
	        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
	      }

	      return config;
	    }

	    _maybeEnableSmoothScroll() {
	      if (!this._config.smoothScroll) {
	        return;
	      } // unregister any previous listeners


	      EventHandler__default.default.off(this._config.target, EVENT_CLICK);
	      EventHandler__default.default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
	        const observableSection = this._observableSections.get(event.target.hash);

	        if (observableSection) {
	          event.preventDefault();
	          const root = this._rootElement || window;
	          const height = observableSection.offsetTop - this._element.offsetTop;

	          if (root.scrollTo) {
	            root.scrollTo({
	              top: height,
	              behavior: 'smooth'
	            });
	            return;
	          } // Chrome 60 doesn't support `scrollTo`


	          root.scrollTop = height;
	        }
	      });
	    }

	    _getNewObserver() {
	      const options = {
	        root: this._rootElement,
	        threshold: this._config.threshold,
	        rootMargin: this._config.rootMargin
	      };
	      return new IntersectionObserver(entries => this._observerCallback(entries), options);
	    } // The logic of selection


	    _observerCallback(entries) {
	      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);

	      const activate = entry => {
	        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;

	        this._process(targetElement(entry));
	      };

	      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
	      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
	      this._previousScrollData.parentScrollTop = parentScrollTop;

	      for (const entry of entries) {
	        if (!entry.isIntersecting) {
	          this._activeTarget = null;

	          this._clearActiveClass(targetElement(entry));

	          continue;
	        }

	        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

	        if (userScrollsDown && entryIsLowerThanPrevious) {
	          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

	          if (!parentScrollTop) {
	            return;
	          }

	          continue;
	        } // if we are scrolling up, pick the smallest offsetTop


	        if (!userScrollsDown && !entryIsLowerThanPrevious) {
	          activate(entry);
	        }
	      }
	    }

	    _initializeTargetsAndObservables() {
	      this._targetLinks = new Map();
	      this._observableSections = new Map();
	      const targetLinks = SelectorEngine__default.default.find(SELECTOR_TARGET_LINKS, this._config.target);

	      for (const anchor of targetLinks) {
	        // ensure that the anchor has an id and is not disabled
	        if (!anchor.hash || index.isDisabled(anchor)) {
	          continue;
	        }

	        const observableSection = SelectorEngine__default.default.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

	        if (index.isVisible(observableSection)) {
	          this._targetLinks.set(anchor.hash, anchor);

	          this._observableSections.set(anchor.hash, observableSection);
	        }
	      }
	    }

	    _process(target) {
	      if (this._activeTarget === target) {
	        return;
	      }

	      this._clearActiveClass(this._config.target);

	      this._activeTarget = target;
	      target.classList.add(CLASS_NAME_ACTIVE);

	      this._activateParents(target);

	      EventHandler__default.default.trigger(this._element, EVENT_ACTIVATE, {
	        relatedTarget: target
	      });
	    }

	    _activateParents(target) {
	      // Activate dropdown parents
	      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
	        return;
	      }

	      for (const listGroup of SelectorEngine__default.default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
	        // Set triggered links parents as active
	        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
	        for (const item of SelectorEngine__default.default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
	          item.classList.add(CLASS_NAME_ACTIVE);
	        }
	      }
	    }

	    _clearActiveClass(parent) {
	      parent.classList.remove(CLASS_NAME_ACTIVE);
	      const activeNodes = SelectorEngine__default.default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);

	      for (const node of activeNodes) {
	        node.classList.remove(CLASS_NAME_ACTIVE);
	      }
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = ScrollSpy.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    for (const spy of SelectorEngine__default.default.find(SELECTOR_DATA_SPY)) {
	      ScrollSpy.getOrCreateInstance(spy);
	    }
	  });
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(ScrollSpy);

	  return ScrollSpy;

	}));

	}(scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): tab.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'tab';
	  const DATA_KEY = 'bs.tab';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
	  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
	  const ARROW_LEFT_KEY = 'ArrowLeft';
	  const ARROW_RIGHT_KEY = 'ArrowRight';
	  const ARROW_UP_KEY = 'ArrowUp';
	  const ARROW_DOWN_KEY = 'ArrowDown';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_DROPDOWN = 'dropdown';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
	  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
	  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
	  const SELECTOR_OUTER = '.nav-item, .list-group-item';
	  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

	  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
	  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
	  /**
	   * Class definition
	   */

	  class Tab extends BaseComponent__default.default {
	    constructor(element) {
	      super(element);
	      this._parent = this._element.closest(SELECTOR_TAB_PANEL);

	      if (!this._parent) {
	        return; // todo: should Throw exception on v6
	        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
	      } // Set up initial aria attributes


	      this._setInitialAttributes(this._parent, this._getChildren());

	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	    } // Getters


	    static get NAME() {
	      return NAME;
	    } // Public


	    show() {
	      // Shows this elem and deactivate the active sibling if exists
	      const innerElem = this._element;

	      if (this._elemIsActive(innerElem)) {
	        return;
	      } // Search for active tab on same parent to deactivate it


	      const active = this._getActiveElem();

	      const hideEvent = active ? EventHandler__default.default.trigger(active, EVENT_HIDE, {
	        relatedTarget: innerElem
	      }) : null;
	      const showEvent = EventHandler__default.default.trigger(innerElem, EVENT_SHOW, {
	        relatedTarget: active
	      });

	      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
	        return;
	      }

	      this._deactivate(active, innerElem);

	      this._activate(innerElem, active);
	    } // Private


	    _activate(element, relatedElem) {
	      if (!element) {
	        return;
	      }

	      element.classList.add(CLASS_NAME_ACTIVE);

	      this._activate(index.getElementFromSelector(element)); // Search and activate/show the proper section


	      const complete = () => {
	        if (element.getAttribute('role') !== 'tab') {
	          element.classList.add(CLASS_NAME_SHOW);
	          return;
	        }

	        element.removeAttribute('tabindex');
	        element.setAttribute('aria-selected', true);

	        this._toggleDropDown(element, true);

	        EventHandler__default.default.trigger(element, EVENT_SHOWN, {
	          relatedTarget: relatedElem
	        });
	      };

	      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
	    }

	    _deactivate(element, relatedElem) {
	      if (!element) {
	        return;
	      }

	      element.classList.remove(CLASS_NAME_ACTIVE);
	      element.blur();

	      this._deactivate(index.getElementFromSelector(element)); // Search and deactivate the shown section too


	      const complete = () => {
	        if (element.getAttribute('role') !== 'tab') {
	          element.classList.remove(CLASS_NAME_SHOW);
	          return;
	        }

	        element.setAttribute('aria-selected', false);
	        element.setAttribute('tabindex', '-1');

	        this._toggleDropDown(element, false);

	        EventHandler__default.default.trigger(element, EVENT_HIDDEN, {
	          relatedTarget: relatedElem
	        });
	      };

	      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
	    }

	    _keydown(event) {
	      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
	        return;
	      }

	      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

	      event.preventDefault();
	      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
	      const nextActiveElement = index.getNextActiveElement(this._getChildren().filter(element => !index.isDisabled(element)), event.target, isNext, true);

	      if (nextActiveElement) {
	        nextActiveElement.focus({
	          preventScroll: true
	        });
	        Tab.getOrCreateInstance(nextActiveElement).show();
	      }
	    }

	    _getChildren() {
	      // collection of inner elements
	      return SelectorEngine__default.default.find(SELECTOR_INNER_ELEM, this._parent);
	    }

	    _getActiveElem() {
	      return this._getChildren().find(child => this._elemIsActive(child)) || null;
	    }

	    _setInitialAttributes(parent, children) {
	      this._setAttributeIfNotExists(parent, 'role', 'tablist');

	      for (const child of children) {
	        this._setInitialAttributesOnChild(child);
	      }
	    }

	    _setInitialAttributesOnChild(child) {
	      child = this._getInnerElement(child);

	      const isActive = this._elemIsActive(child);

	      const outerElem = this._getOuterElement(child);

	      child.setAttribute('aria-selected', isActive);

	      if (outerElem !== child) {
	        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
	      }

	      if (!isActive) {
	        child.setAttribute('tabindex', '-1');
	      }

	      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too


	      this._setInitialAttributesOnTargetPanel(child);
	    }

	    _setInitialAttributesOnTargetPanel(child) {
	      const target = index.getElementFromSelector(child);

	      if (!target) {
	        return;
	      }

	      this._setAttributeIfNotExists(target, 'role', 'tabpanel');

	      if (child.id) {
	        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
	      }
	    }

	    _toggleDropDown(element, open) {
	      const outerElem = this._getOuterElement(element);

	      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
	        return;
	      }

	      const toggle = (selector, className) => {
	        const element = SelectorEngine__default.default.findOne(selector, outerElem);

	        if (element) {
	          element.classList.toggle(className, open);
	        }
	      };

	      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
	      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
	      outerElem.setAttribute('aria-expanded', open);
	    }

	    _setAttributeIfNotExists(element, attribute, value) {
	      if (!element.hasAttribute(attribute)) {
	        element.setAttribute(attribute, value);
	      }
	    }

	    _elemIsActive(elem) {
	      return elem.classList.contains(CLASS_NAME_ACTIVE);
	    } // Try to get the inner element (usually the .nav-link)


	    _getInnerElement(elem) {
	      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine__default.default.findOne(SELECTOR_INNER_ELEM, elem);
	    } // Try to get the outer element (usually the .nav-item)


	    _getOuterElement(elem) {
	      return elem.closest(SELECTOR_OUTER) || elem;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tab.getOrCreateInstance(this);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (index.isDisabled(this)) {
	      return;
	    }

	    Tab.getOrCreateInstance(this).show();
	  });
	  /**
	   * Initialize on focus
	   */

	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    for (const element of SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
	      Tab.getOrCreateInstance(element);
	    }
	  });
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Tab);

	  return Tab;

	}));

	}(tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.2.2 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(util.exports, eventHandler.exports, baseComponent.exports, componentFunctions.exports) ;
	})(commonjsGlobal, (function (index, EventHandler, BaseComponent, componentFunctions) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.2.2): toast.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * Constants
	   */

	  const NAME = 'toast';
	  const DATA_KEY = 'bs.toast';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
	  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
	  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_SHOWING = 'showing';
	  const DefaultType = {
	    animation: 'boolean',
	    autohide: 'boolean',
	    delay: 'number'
	  };
	  const Default = {
	    animation: true,
	    autohide: true,
	    delay: 5000
	  };
	  /**
	   * Class definition
	   */

	  class Toast extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element, config);
	      this._timeout = null;
	      this._hasMouseInteraction = false;
	      this._hasKeyboardInteraction = false;

	      this._setListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    show() {
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._clearTimeout();

	      if (this._config.animation) {
	        this._element.classList.add(CLASS_NAME_FADE);
	      }

	      const complete = () => {
	        this._element.classList.remove(CLASS_NAME_SHOWING);

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);

	        this._maybeScheduleHide();
	      };

	      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


	      index.reflow(this._element);

	      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);

	      this._queueCallback(complete, this._element, this._config.animation);
	    }

	    hide() {
	      if (!this.isShown()) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const complete = () => {
	        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


	        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._element.classList.add(CLASS_NAME_SHOWING);

	      this._queueCallback(complete, this._element, this._config.animation);
	    }

	    dispose() {
	      this._clearTimeout();

	      if (this.isShown()) {
	        this._element.classList.remove(CLASS_NAME_SHOW);
	      }

	      super.dispose();
	    }

	    isShown() {
	      return this._element.classList.contains(CLASS_NAME_SHOW);
	    } // Private


	    _maybeScheduleHide() {
	      if (!this._config.autohide) {
	        return;
	      }

	      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
	        return;
	      }

	      this._timeout = setTimeout(() => {
	        this.hide();
	      }, this._config.delay);
	    }

	    _onInteraction(event, isInteracting) {
	      switch (event.type) {
	        case 'mouseover':
	        case 'mouseout':
	          {
	            this._hasMouseInteraction = isInteracting;
	            break;
	          }

	        case 'focusin':
	        case 'focusout':
	          {
	            this._hasKeyboardInteraction = isInteracting;
	            break;
	          }
	      }

	      if (isInteracting) {
	        this._clearTimeout();

	        return;
	      }

	      const nextElement = event.relatedTarget;

	      if (this._element === nextElement || this._element.contains(nextElement)) {
	        return;
	      }

	      this._maybeScheduleHide();
	    }

	    _setListeners() {
	      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
	      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
	      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
	      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
	    }

	    _clearTimeout() {
	      clearTimeout(this._timeout);
	      this._timeout = null;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Toast.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config](this);
	        }
	      });
	    }

	  }
	  /**
	   * Data API implementation
	   */


	  componentFunctions.enableDismissTrigger(Toast);
	  /**
	   * jQuery
	   */

	  index.defineJQueryPlugin(Toast);

	  return Toast;

	}));

	}(toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	var jquery_gridder_min = {exports: {}};

	/*
	 *  gridder - v1.4.2
	 *  A jQuery plugin that displays a thumbnail grid expanding preview similar to the effect seen on Google Images.
	 *  http://www.oriongunning.com/
	 *
	 *  Made by Orion Gunning
	 *  Under MIT License
	 */

	(function (module, exports) {
	!function (a) {
	  module.exports = a(require$$0__default["default"]) ;
	}(function (a) {
	  a.fn.extend(a.easing, {
	    def: "easeInOutExpo",
	    easeInOutExpo: function (a, b, c, d, e) {
	      return 0 === b ? c : b === e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
	    }
	  }), a(document).keydown(function (b) {
	    var c = b.keyCode,
	      d = a(".currentGridder"),
	      e = d.find(".gridder-show");
	    d.length && (37 === c && (e.prev().prev().trigger("click"), b.preventDefault()), 39 === c && (e.next().trigger("click"), b.preventDefault()));
	  }), a.fn.gridderExpander = function (b) {
	    var c = a.extend({}, a.fn.gridderExpander.defaults, b);
	    return this.each(function () {
	      function b(b) {
	        c.scroll && a("html, body").animate({
	          scrollTop: b.find(".selectedItem").offset().top - c.scrollOffset
	        }, {
	          duration: 200,
	          easing: c.animationEasing
	        }), g.removeClass("hasSelectedItem"), h = !1, b.find(".selectedItem").removeClass("selectedItem"), b.find(".gridder-show").slideUp(c.animationSpeed, c.animationEasing, function () {
	          b.find(".gridder-show").remove(), c.onClosed(b);
	        }), a(".currentGridder").removeClass("currentGridder");
	      }
	      function d(d) {
	        if (a(".currentGridder").removeClass("currentGridder"), g.addClass("currentGridder"), d.hasClass("selectedItem")) return void b(g);
	        g.find(".selectedItem").removeClass("selectedItem"), d.addClass("selectedItem"), g.find(".gridder-show").remove(), g.hasClass("hasSelectedItem") || g.addClass("hasSelectedItem");
	        var h = a('<div class="gridder-show loading"></div>');
	        f = h.insertAfter(d);
	        var i = "";
	        0 === d.data("griddercontent").indexOf("#") ? (i = a(d.data("griddercontent")).html(), e(d, i)) : a.ajax({
	          type: "GET",
	          url: d.data("griddercontent"),
	          success: function (a) {
	            i = a, e(d, i);
	          },
	          error: function (a) {
	            i = a.responseText, e(d, i);
	          }
	        });
	      }
	      function e(b, d) {
	        var e = '<div class="gridder-padding">';
	        if (c.showNav) {
	          var g = a(".selectedItem").prev(),
	            i = a(".selectedItem").next().next();
	          e += '<div class="gridder-navigation">', e += '<a href="#" class="gridder-close">' + c.closeText + "</a>", e += '<a href="#" class="gridder-nav prev ' + (g.length ? "" : "disabled") + '">' + c.prevText + "</a>", e += '<a href="#" class="gridder-nav next ' + (i.length ? "" : "disabled") + '">' + c.nextText + "</a>", e += "</div>";
	        }
	        if (e += '<div class="gridder-expanded-content">', e += d, e += "</div>", e += "</div>", h ? (f.html(e), f.find(".gridder-padding").fadeIn(c.animationSpeed, c.animationEasing, function () {
	          h = !0, "function" == typeof c.onContent && c.onContent(f);
	        })) : f.hide().append(e).slideDown(c.animationSpeed, c.animationEasing, function () {
	          h = !0, "function" == typeof c.onContent && c.onContent(f);
	        }), c.scroll) {
	          var j = "panel" === c.scrollTo ? b.offset().top + b.height() - c.scrollOffset : b.offset().top - c.scrollOffset;
	          a("html, body").animate({
	            scrollTop: j
	          }, {
	            duration: c.animationSpeed,
	            easing: c.animationEasing
	          });
	        }
	        f.removeClass("loading");
	      }
	      var f,
	        g = a(this),
	        h = !1;
	      c.onStart(g), g.on("click", ".gridder-list", function (b) {
	        b.preventDefault();
	        var c = a(this);
	        d(c);
	      }), g.on("click", ".gridder-nav.next", function (b) {
	        b.preventDefault(), a(this).parents(".gridder-show").next().trigger("click");
	      }), g.on("click", ".gridder-nav.prev", function (b) {
	        b.preventDefault(), a(this).parents(".gridder-show").prev().prev().trigger("click");
	      }), g.on("click", ".gridder-close", function (a) {
	        a.preventDefault(), b(g);
	      });
	    });
	  }, a.fn.gridderExpander.defaults = {
	    scroll: !0,
	    scrollOffset: 30,
	    scrollTo: "panel",
	    animationSpeed: 400,
	    animationEasing: "easeInOutExpo",
	    showNav: !0,
	    nextText: "Next",
	    prevText: "Previous",
	    closeText: "Close",
	    onStart: function () {},
	    onContent: function () {},
	    onClosed: function () {}
	  };
	});
	}(jquery_gridder_min));

	var imagesloaded_pkgd_min = {exports: {}};

	var evEmitter = {exports: {}};

	/**
	 * EvEmitter v1.1.0
	 * Lil' event emitter
	 * MIT License
	 */

	(function (module) {
	/* jshint unused: true, undef: true, strict: true */

	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, window */
	  if ( module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function() {

	function EvEmitter() {}

	var proto = EvEmitter.prototype;

	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }

	  return this;
	};

	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;

	  return this;
	};

	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }

	  return this;
	};

	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  // copy over to avoid interference if .off() in listener
	  listeners = listeners.slice(0);
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

	  for ( var i=0; i < listeners.length; i++ ) {
	    var listener = listeners[i];
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	  }

	  return this;
	};

	proto.allOff = function() {
	  delete this._events;
	  delete this._onceEvents;
	};

	return EvEmitter;

	}));
	}(evEmitter));

	/*!
	 * imagesLoaded PACKAGED v4.1.4
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	 */

	(function (module) {
	!function (e, t) {
	  module.exports ? module.exports = t() : e.EvEmitter = t();
	}("undefined" != typeof window ? window : commonjsGlobal, function () {
	  function e() {}
	  var t = e.prototype;
	  return t.on = function (e, t) {
	    if (e && t) {
	      var i = this._events = this._events || {},
	        n = i[e] = i[e] || [];
	      return n.indexOf(t) == -1 && n.push(t), this;
	    }
	  }, t.once = function (e, t) {
	    if (e && t) {
	      this.on(e, t);
	      var i = this._onceEvents = this._onceEvents || {},
	        n = i[e] = i[e] || {};
	      return n[t] = !0, this;
	    }
	  }, t.off = function (e, t) {
	    var i = this._events && this._events[e];
	    if (i && i.length) {
	      var n = i.indexOf(t);
	      return n != -1 && i.splice(n, 1), this;
	    }
	  }, t.emitEvent = function (e, t) {
	    var i = this._events && this._events[e];
	    if (i && i.length) {
	      i = i.slice(0), t = t || [];
	      for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
	        var r = i[o],
	          s = n && n[r];
	        s && (this.off(e, r), delete n[r]), r.apply(this, t);
	      }
	      return this;
	    }
	  }, t.allOff = function () {
	    delete this._events, delete this._onceEvents;
	  }, e;
	}), function (e, t) {

	  module.exports ? module.exports = t(e, evEmitter.exports) : e.imagesLoaded = t(e, e.EvEmitter);
	}("undefined" != typeof window ? window : commonjsGlobal, function (e, t) {
	  function i(e, t) {
	    for (var i in t) e[i] = t[i];
	    return e;
	  }
	  function n(e) {
	    if (Array.isArray(e)) return e;
	    var t = "object" == typeof e && "number" == typeof e.length;
	    return t ? d.call(e) : [e];
	  }
	  function o(e, t, r) {
	    if (!(this instanceof o)) return new o(e, t, r);
	    var s = e;
	    return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred()), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e));
	  }
	  function r(e) {
	    this.img = e;
	  }
	  function s(e, t) {
	    this.url = e, this.element = t, this.img = new Image();
	  }
	  var h = e.jQuery,
	    a = e.console,
	    d = Array.prototype.slice;
	  o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
	    this.images = [], this.elements.forEach(this.addElementImages, this);
	  }, o.prototype.addElementImages = function (e) {
	    "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
	    var t = e.nodeType;
	    if (t && u[t]) {
	      for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
	        var o = i[n];
	        this.addImage(o);
	      }
	      if ("string" == typeof this.options.background) {
	        var r = e.querySelectorAll(this.options.background);
	        for (n = 0; n < r.length; n++) {
	          var s = r[n];
	          this.addElementBackgroundImages(s);
	        }
	      }
	    }
	  };
	  var u = {
	    1: !0,
	    9: !0,
	    11: !0
	  };
	  return o.prototype.addElementBackgroundImages = function (e) {
	    var t = getComputedStyle(e);
	    if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
	      var o = n && n[2];
	      o && this.addBackground(o, e), n = i.exec(t.backgroundImage);
	    }
	  }, o.prototype.addImage = function (e) {
	    var t = new r(e);
	    this.images.push(t);
	  }, o.prototype.addBackground = function (e, t) {
	    var i = new s(e, t);
	    this.images.push(i);
	  }, o.prototype.check = function () {
	    function e(e, i, n) {
	      setTimeout(function () {
	        t.progress(e, i, n);
	      });
	    }
	    var t = this;
	    return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
	      t.once("progress", e), t.check();
	    }) : void this.complete();
	  }, o.prototype.progress = function (e, t, i) {
	    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t);
	  }, o.prototype.complete = function () {
	    var e = this.hasAnyBroken ? "fail" : "done";
	    if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
	      var t = this.hasAnyBroken ? "reject" : "resolve";
	      this.jqDeferred[t](this);
	    }
	  }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
	    var e = this.getIsImageComplete();
	    return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
	  }, r.prototype.getIsImageComplete = function () {
	    return this.img.complete && this.img.naturalWidth;
	  }, r.prototype.confirm = function (e, t) {
	    this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]);
	  }, r.prototype.handleEvent = function (e) {
	    var t = "on" + e.type;
	    this[t] && this[t](e);
	  }, r.prototype.onload = function () {
	    this.confirm(!0, "onload"), this.unbindEvents();
	  }, r.prototype.onerror = function () {
	    this.confirm(!1, "onerror"), this.unbindEvents();
	  }, r.prototype.unbindEvents = function () {
	    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
	  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
	    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
	    var e = this.getIsImageComplete();
	    e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
	  }, s.prototype.unbindEvents = function () {
	    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
	  }, s.prototype.confirm = function (e, t) {
	    this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]);
	  }, o.makeJQueryPlugin = function (t) {
	    t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
	      var i = new o(this, e, t);
	      return i.jqDeferred.promise(h(this));
	    });
	  }, o.makeJQueryPlugin(), o;
	});
	}(imagesloaded_pkgd_min));

	var lazysizes_min = {exports: {}};

	/*! lazysizes - v5.3.2 */

	(function (module) {
	!function (e) {
	  var t = function (u, D, f) {

	    var k, H;
	    if (function () {
	      var e;
	      var t = {
	        lazyClass: "lazyload",
	        loadedClass: "lazyloaded",
	        loadingClass: "lazyloading",
	        preloadClass: "lazypreload",
	        errorClass: "lazyerror",
	        autosizesClass: "lazyautosizes",
	        fastLoadedClass: "ls-is-cached",
	        iframeLoadMode: 0,
	        srcAttr: "data-src",
	        srcsetAttr: "data-srcset",
	        sizesAttr: "data-sizes",
	        minSize: 40,
	        customMedia: {},
	        init: true,
	        expFactor: 1.5,
	        hFac: .8,
	        loadMode: 2,
	        loadHidden: true,
	        ricTimeout: 0,
	        throttleDelay: 125
	      };
	      H = u.lazySizesConfig || u.lazysizesConfig || {};
	      for (e in t) {
	        if (!(e in H)) {
	          H[e] = t[e];
	        }
	      }
	    }(), !D || !D.getElementsByClassName) {
	      return {
	        init: function () {},
	        cfg: H,
	        noSupport: true
	      };
	    }
	    var O = D.documentElement,
	      i = u.HTMLPictureElement,
	      P = "addEventListener",
	      $ = "getAttribute",
	      q = u[P].bind(u),
	      I = u.setTimeout,
	      U = u.requestAnimationFrame || I,
	      o = u.requestIdleCallback,
	      j = /^picture$/i,
	      r = ["load", "error", "lazyincluded", "_lazyloaded"],
	      a = {},
	      G = Array.prototype.forEach,
	      J = function (e, t) {
	        if (!a[t]) {
	          a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)");
	        }
	        return a[t].test(e[$]("class") || "") && a[t];
	      },
	      K = function (e, t) {
	        if (!J(e, t)) {
	          e.setAttribute("class", (e[$]("class") || "").trim() + " " + t);
	        }
	      },
	      Q = function (e, t) {
	        var a;
	        if (a = J(e, t)) {
	          e.setAttribute("class", (e[$]("class") || "").replace(a, " "));
	        }
	      },
	      V = function (t, a, e) {
	        var i = e ? P : "removeEventListener";
	        if (e) {
	          V(t, a);
	        }
	        r.forEach(function (e) {
	          t[i](e, a);
	        });
	      },
	      X = function (e, t, a, i, r) {
	        var n = D.createEvent("Event");
	        if (!a) {
	          a = {};
	        }
	        a.instance = k;
	        n.initEvent(t, !i, !r);
	        n.detail = a;
	        e.dispatchEvent(n);
	        return n;
	      },
	      Y = function (e, t) {
	        var a;
	        if (!i && (a = u.picturefill || H.pf)) {
	          if (t && t.src && !e[$]("srcset")) {
	            e.setAttribute("srcset", t.src);
	          }
	          a({
	            reevaluate: true,
	            elements: [e]
	          });
	        } else if (t && t.src) {
	          e.src = t.src;
	        }
	      },
	      Z = function (e, t) {
	        return (getComputedStyle(e, null) || {})[t];
	      },
	      s = function (e, t, a) {
	        a = a || e.offsetWidth;
	        while (a < H.minSize && t && !e._lazysizesWidth) {
	          a = t.offsetWidth;
	          t = t.parentNode;
	        }
	        return a;
	      },
	      ee = function () {
	        var a, i;
	        var t = [];
	        var r = [];
	        var n = t;
	        var s = function () {
	          var e = n;
	          n = t.length ? r : t;
	          a = true;
	          i = false;
	          while (e.length) {
	            e.shift()();
	          }
	          a = false;
	        };
	        var e = function (e, t) {
	          if (a && !t) {
	            e.apply(this, arguments);
	          } else {
	            n.push(e);
	            if (!i) {
	              i = true;
	              (D.hidden ? I : U)(s);
	            }
	          }
	        };
	        e._lsFlush = s;
	        return e;
	      }(),
	      te = function (a, e) {
	        return e ? function () {
	          ee(a);
	        } : function () {
	          var e = this;
	          var t = arguments;
	          ee(function () {
	            a.apply(e, t);
	          });
	        };
	      },
	      ae = function (e) {
	        var a;
	        var i = 0;
	        var r = H.throttleDelay;
	        var n = H.ricTimeout;
	        var t = function () {
	          a = false;
	          i = f.now();
	          e();
	        };
	        var s = o && n > 49 ? function () {
	          o(t, {
	            timeout: n
	          });
	          if (n !== H.ricTimeout) {
	            n = H.ricTimeout;
	          }
	        } : te(function () {
	          I(t);
	        }, true);
	        return function (e) {
	          var t;
	          if (e = e === true) {
	            n = 33;
	          }
	          if (a) {
	            return;
	          }
	          a = true;
	          t = r - (f.now() - i);
	          if (t < 0) {
	            t = 0;
	          }
	          if (e || t < 9) {
	            s();
	          } else {
	            I(s, t);
	          }
	        };
	      },
	      ie = function (e) {
	        var t, a;
	        var i = 99;
	        var r = function () {
	          t = null;
	          e();
	        };
	        var n = function () {
	          var e = f.now() - a;
	          if (e < i) {
	            I(n, i - e);
	          } else {
	            (o || r)(r);
	          }
	        };
	        return function () {
	          a = f.now();
	          if (!t) {
	            t = I(n, i);
	          }
	        };
	      },
	      e = function () {
	        var v, m, c, h, e;
	        var y, z, g, p, C, b, A;
	        var n = /^img$/i;
	        var d = /^iframe$/i;
	        var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
	        var _ = 0;
	        var w = 0;
	        var M = 0;
	        var N = -1;
	        var L = function (e) {
	          M--;
	          if (!e || M < 0 || !e.target) {
	            M = 0;
	          }
	        };
	        var x = function (e) {
	          if (A == null) {
	            A = Z(D.body, "visibility") == "hidden";
	          }
	          return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden");
	        };
	        var W = function (e, t) {
	          var a;
	          var i = e;
	          var r = x(e);
	          g -= t;
	          b += t;
	          p -= t;
	          C += t;
	          while (r && (i = i.offsetParent) && i != D.body && i != O) {
	            r = (Z(i, "opacity") || 1) > 0;
	            if (r && Z(i, "overflow") != "visible") {
	              a = i.getBoundingClientRect();
	              r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1;
	            }
	          }
	          return r;
	        };
	        var t = function () {
	          var e, t, a, i, r, n, s, o, l, u, f, c;
	          var d = k.elements;
	          if ((h = H.loadMode) && M < 8 && (e = d.length)) {
	            t = 0;
	            N++;
	            for (; t < e; t++) {
	              if (!d[t] || d[t]._lazyRace) {
	                continue;
	              }
	              if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
	                R(d[t]);
	                continue;
	              }
	              if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
	                n = w;
	              }
	              if (!u) {
	                u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
	                k._defEx = u;
	                f = u * H.expFactor;
	                c = H.hFac;
	                A = null;
	                if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
	                  w = f;
	                  N = 0;
	                } else if (h > 1 && N > 1 && M < 6) {
	                  w = u;
	                } else {
	                  w = _;
	                }
	              }
	              if (l !== n) {
	                y = innerWidth + n * c;
	                z = innerHeight + n;
	                s = n * -1;
	                l = n;
	              }
	              a = d[t].getBoundingClientRect();
	              if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
	                R(d[t]);
	                r = true;
	                if (M > 9) {
	                  break;
	                }
	              } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
	                i = v[0] || d[t];
	              }
	            }
	            if (i && !r) {
	              R(i);
	            }
	          }
	        };
	        var a = ae(t);
	        var S = function (e) {
	          var t = e.target;
	          if (t._lazyCache) {
	            delete t._lazyCache;
	            return;
	          }
	          L(e);
	          K(t, H.loadedClass);
	          Q(t, H.loadingClass);
	          V(t, B);
	          X(t, "lazyloaded");
	        };
	        var i = te(S);
	        var B = function (e) {
	          i({
	            target: e.target
	          });
	        };
	        var T = function (e, t) {
	          var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
	          if (a == 0) {
	            e.contentWindow.location.replace(t);
	          } else if (a == 1) {
	            e.src = t;
	          }
	        };
	        var F = function (e) {
	          var t;
	          var a = e[$](H.srcsetAttr);
	          if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
	            e.setAttribute("media", t);
	          }
	          if (a) {
	            e.setAttribute("srcset", a);
	          }
	        };
	        var s = te(function (t, e, a, i, r) {
	          var n, s, o, l, u, f;
	          if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
	            if (i) {
	              if (a) {
	                K(t, H.autosizesClass);
	              } else {
	                t.setAttribute("sizes", i);
	              }
	            }
	            s = t[$](H.srcsetAttr);
	            n = t[$](H.srcAttr);
	            if (r) {
	              o = t.parentNode;
	              l = o && j.test(o.nodeName || "");
	            }
	            f = e.firesLoad || "src" in t && (s || n || l);
	            u = {
	              target: t
	            };
	            K(t, H.loadingClass);
	            if (f) {
	              clearTimeout(c);
	              c = I(L, 2500);
	              V(t, B, true);
	            }
	            if (l) {
	              G.call(o.getElementsByTagName("source"), F);
	            }
	            if (s) {
	              t.setAttribute("srcset", s);
	            } else if (n && !l) {
	              if (d.test(t.nodeName)) {
	                T(t, n);
	              } else {
	                t.src = n;
	              }
	            }
	            if (r && (s || l)) {
	              Y(t, {
	                src: n
	              });
	            }
	          }
	          if (t._lazyRace) {
	            delete t._lazyRace;
	          }
	          Q(t, H.lazyClass);
	          ee(function () {
	            var e = t.complete && t.naturalWidth > 1;
	            if (!f || e) {
	              if (e) {
	                K(t, H.fastLoadedClass);
	              }
	              S(u);
	              t._lazyCache = true;
	              I(function () {
	                if ("_lazyCache" in t) {
	                  delete t._lazyCache;
	                }
	              }, 9);
	            }
	            if (t.loading == "lazy") {
	              M--;
	            }
	          }, true);
	        });
	        var R = function (e) {
	          if (e._lazyRace) {
	            return;
	          }
	          var t;
	          var a = n.test(e.nodeName);
	          var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
	          var r = i == "auto";
	          if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
	            return;
	          }
	          t = X(e, "lazyunveilread").detail;
	          if (r) {
	            re.updateElem(e, true, e.offsetWidth);
	          }
	          e._lazyRace = true;
	          M++;
	          s(e, t, r, i, a);
	        };
	        var r = ie(function () {
	          H.loadMode = 3;
	          a();
	        });
	        var o = function () {
	          if (H.loadMode == 3) {
	            H.loadMode = 2;
	          }
	          r();
	        };
	        var l = function () {
	          if (m) {
	            return;
	          }
	          if (f.now() - e < 999) {
	            I(l, 999);
	            return;
	          }
	          m = true;
	          H.loadMode = 3;
	          a();
	          q("scroll", o, true);
	        };
	        return {
	          _: function () {
	            e = f.now();
	            k.elements = D.getElementsByClassName(H.lazyClass);
	            v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
	            q("scroll", a, true);
	            q("resize", a, true);
	            q("pageshow", function (e) {
	              if (e.persisted) {
	                var t = D.querySelectorAll("." + H.loadingClass);
	                if (t.length && t.forEach) {
	                  U(function () {
	                    t.forEach(function (e) {
	                      if (e.complete) {
	                        R(e);
	                      }
	                    });
	                  });
	                }
	              }
	            });
	            if (u.MutationObserver) {
	              new MutationObserver(a).observe(O, {
	                childList: true,
	                subtree: true,
	                attributes: true
	              });
	            } else {
	              O[P]("DOMNodeInserted", a, true);
	              O[P]("DOMAttrModified", a, true);
	              setInterval(a, 999);
	            }
	            q("hashchange", a, true);
	            ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (e) {
	              D[P](e, a, true);
	            });
	            if (/d$|^c/.test(D.readyState)) {
	              l();
	            } else {
	              q("load", l);
	              D[P]("DOMContentLoaded", a);
	              I(l, 2e4);
	            }
	            if (k.elements.length) {
	              t();
	              ee._lsFlush();
	            } else {
	              a();
	            }
	          },
	          checkElems: a,
	          unveil: R,
	          _aLSL: o
	        };
	      }(),
	      re = function () {
	        var a;
	        var n = te(function (e, t, a, i) {
	          var r, n, s;
	          e._lazysizesWidth = i;
	          i += "px";
	          e.setAttribute("sizes", i);
	          if (j.test(t.nodeName || "")) {
	            r = t.getElementsByTagName("source");
	            for (n = 0, s = r.length; n < s; n++) {
	              r[n].setAttribute("sizes", i);
	            }
	          }
	          if (!a.detail.dataAttr) {
	            Y(e, a.detail);
	          }
	        });
	        var i = function (e, t, a) {
	          var i;
	          var r = e.parentNode;
	          if (r) {
	            a = s(e, r, a);
	            i = X(e, "lazybeforesizes", {
	              width: a,
	              dataAttr: !!t
	            });
	            if (!i.defaultPrevented) {
	              a = i.detail.width;
	              if (a && a !== e._lazysizesWidth) {
	                n(e, r, i, a);
	              }
	            }
	          }
	        };
	        var e = function () {
	          var e;
	          var t = a.length;
	          if (t) {
	            e = 0;
	            for (; e < t; e++) {
	              i(a[e]);
	            }
	          }
	        };
	        var t = ie(e);
	        return {
	          _: function () {
	            a = D.getElementsByClassName(H.autosizesClass);
	            q("resize", t);
	          },
	          checkElems: t,
	          updateElem: i
	        };
	      }(),
	      t = function () {
	        if (!t.i && D.getElementsByClassName) {
	          t.i = true;
	          re._();
	          e._();
	        }
	      };
	    return I(function () {
	      H.init && t();
	    }), k = {
	      cfg: H,
	      autoSizer: re,
	      loader: e,
	      init: t,
	      uP: Y,
	      aC: K,
	      rC: Q,
	      hC: J,
	      fire: X,
	      gW: s,
	      rAF: ee
	    };
	  }(e, e.document, Date);
	  e.lazySizes = t, module.exports && (module.exports = t);
	}("undefined" != typeof window ? window : {});
	}(lazysizes_min));

	var jquery_matchHeightMin = {exports: {}};

	/*
	* jquery-match-height 0.7.2 by @liabru
	* http://brm.io/jquery-match-height/
	* License MIT
	*/

	(function (module) {
	!function (t) {

	  module.exports ? module.exports = t(require$$0__default["default"]) : t(jQuery);
	}(function (t) {
	  var e = -1,
	    o = -1,
	    n = function (t) {
	      return parseFloat(t) || 0;
	    },
	    a = function (e) {
	      var o = 1,
	        a = t(e),
	        i = null,
	        r = [];
	      return a.each(function () {
	        var e = t(this),
	          a = e.offset().top - n(e.css("margin-top")),
	          s = r.length > 0 ? r[r.length - 1] : null;
	        null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a;
	      }), r;
	    },
	    i = function (e) {
	      var o = {
	        byRow: !0,
	        property: "height",
	        target: null,
	        remove: !1
	      };
	      return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o);
	    },
	    r = t.fn.matchHeight = function (e) {
	      var o = i(e);
	      if (o.remove) {
	        var n = this;
	        return this.css(o.property, ""), t.each(r._groups, function (t, e) {
	          e.elements = e.elements.not(n);
	        }), this;
	      }
	      return this.length <= 1 && !o.target ? this : (r._groups.push({
	        elements: this,
	        options: o
	      }), r._apply(this, o), this);
	    };
	  r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function (e, o) {
	    var s = i(o),
	      h = t(e),
	      l = [h],
	      c = t(window).scrollTop(),
	      p = t("html").outerHeight(!0),
	      u = h.parents().filter(":hidden");
	    return u.each(function () {
	      var e = t(this);
	      e.data("style-cache", e.attr("style"));
	    }), u.css("display", "block"), s.byRow && !s.target && (h.each(function () {
	      var e = t(this),
	        o = e.css("display");
	      "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
	        display: o,
	        "padding-top": "0",
	        "padding-bottom": "0",
	        "margin-top": "0",
	        "margin-bottom": "0",
	        "border-top-width": "0",
	        "border-bottom-width": "0",
	        height: "100px",
	        overflow: "hidden"
	      });
	    }), l = a(h), h.each(function () {
	      var e = t(this);
	      e.attr("style", e.data("style-cache") || "");
	    })), t.each(l, function (e, o) {
	      var a = t(o),
	        i = 0;
	      if (s.target) i = s.target.outerHeight(!1);else {
	        if (s.byRow && a.length <= 1) return void a.css(s.property, "");
	        a.each(function () {
	          var e = t(this),
	            o = e.attr("style"),
	            n = e.css("display");
	          "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
	          var a = {
	            display: n
	          };
	          a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "");
	        });
	      }
	      a.each(function () {
	        var e = t(this),
	          o = 0;
	        s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"));
	      });
	    }), u.each(function () {
	      var e = t(this);
	      e.attr("style", e.data("style-cache") || null);
	    }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)), this;
	  }, r._applyDataApi = function () {
	    var e = {};
	    t("[data-match-height], [data-mh]").each(function () {
	      var o = t(this),
	        n = o.attr("data-mh") || o.attr("data-match-height");
	      n in e ? e[n] = e[n].add(o) : e[n] = o;
	    }), t.each(e, function () {
	      this.matchHeight(!0);
	    });
	  };
	  var s = function (e) {
	    r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
	      r._apply(this.elements, this.options);
	    }), r._afterUpdate && r._afterUpdate(e, r._groups);
	  };
	  r._update = function (n, a) {
	    if (a && "resize" === a.type) {
	      var i = t(window).width();
	      if (i === e) return;
	      e = i;
	    }
	    n ? o === -1 && (o = setTimeout(function () {
	      s(a), o = -1;
	    }, r._throttle)) : s(a);
	  }, t(r._applyDataApi);
	  var h = t.fn.on ? "on" : "bind";
	  t(window)[h]("load", function (t) {
	    r._update(!1, t);
	  }), t(window)[h]("resize orientationchange", function (t) {
	    r._update(!0, t);
	  });
	});
	}(jquery_matchHeightMin));

	/*!
	 * modernizr v3.12.0
	 * Build https://modernizr.com/download?-mq-dontmin
	 *
	 * Copyright (c)
	 *  Faruk Ates
	 *  Paul Irish
	 *  Alex Sexton
	 *  Ryan Seddon
	 *  Patrick Kettner
	 *  Stu Cox
	 *  Richard Herrera
	 *  Veeck

	 * MIT License
	 */
	(function (scriptGlobalObject, window, document, undefined$1) {
	  var tests = [];

	  /**
	   * ModernizrProto is the constructor for Modernizr
	   *
	   * @class
	   * @access public
	   */
	  var ModernizrProto = {
	    _version: '3.12.0',
	    // Any settings that don't work as separate modules
	    // can go in here as configuration.
	    _config: {
	      'classPrefix': '',
	      'enableClasses': true,
	      'enableJSClass': true,
	      'usePrefixes': true
	    },
	    // Queue of tests
	    _q: [],
	    // Stub these for people who are listening
	    on: function (test, cb) {
	      // I don't really think people should do this, but we can
	      // safe guard it a bit.
	      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
	      // This is in case people listen to synchronous tests. I would leave it out,
	      // but the code to *disallow* sync tests in the real version of this
	      // function is actually larger than this.
	      var self = this;
	      setTimeout(function () {
	        cb(self[test]);
	      }, 0);
	    },
	    addTest: function (name, fn, options) {
	      tests.push({
	        name: name,
	        fn: fn,
	        options: options
	      });
	    },
	    addAsyncTest: function (fn) {
	      tests.push({
	        name: null,
	        fn: fn
	      });
	    }
	  };

	  // Fake some of Object.create so we can force non test results to be non "own" properties.
	  var Modernizr = function () {};
	  Modernizr.prototype = ModernizrProto;

	  // Leak modernizr globally when you `require` it rather than force it here.
	  // Overwrite name so constructor name is nicer :D
	  Modernizr = new Modernizr();
	  var classes = [];

	  /**
	   * is returns a boolean if the typeof an obj is exactly type.
	   *
	   * @access private
	   * @function is
	   * @param {*} obj - A thing we want to check the type of
	   * @param {string} type - A string to compare the typeof against
	   * @returns {boolean} true if the typeof the first parameter is exactly the specified type, false otherwise
	   */
	  function is(obj, type) {
	    return typeof obj === type;
	  }

	  /**
	   * Run through all tests and detect their support in the current UA.
	   *
	   * @access private
	   * @returns {void}
	   */
	  function testRunner() {
	    var featureNames;
	    var feature;
	    var aliasIdx;
	    var result;
	    var nameIdx;
	    var featureName;
	    var featureNameSplit;
	    for (var featureIdx in tests) {
	      if (tests.hasOwnProperty(featureIdx)) {
	        featureNames = [];
	        feature = tests[featureIdx];
	        // run the test, throw the return value into the Modernizr,
	        // then based on that boolean, define an appropriate className
	        // and push it into an array of classes we'll join later.
	        //
	        // If there is no name, it's an 'async' test that is run,
	        // but not directly added to the object. That should
	        // be done with a post-run addTest call.
	        if (feature.name) {
	          featureNames.push(feature.name.toLowerCase());
	          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
	            // Add all the aliases into the names list
	            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
	              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
	            }
	          }
	        }

	        // Run the test, or use the raw value if it's not a function
	        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

	        // Set each of the names on the Modernizr object
	        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
	          featureName = featureNames[nameIdx];
	          // Support dot properties as sub tests. We don't do checking to make sure
	          // that the implied parent tests have been added. You must call them in
	          // order (either in the test, or make the parent test a dependency).
	          //
	          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
	          // hashtag famous last words
	          featureNameSplit = featureName.split('.');
	          if (featureNameSplit.length === 1) {
	            Modernizr[featureNameSplit[0]] = result;
	          } else {
	            // cast to a Boolean, if not one already or if it doesnt exist yet (like inputtypes)
	            if (!Modernizr[featureNameSplit[0]] || Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	            }
	            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
	          }
	          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
	        }
	      }
	    }
	  }

	  /**
	   * docElement is a convenience wrapper to grab the root element of the document
	   *
	   * @access private
	   * @returns {HTMLElement|SVGElement} The root element of the document
	   */
	  var docElement = document.documentElement;

	  /**
	   * A convenience helper to check if the document we are running in is an SVG document
	   *
	   * @access private
	   * @returns {boolean}
	   */
	  var isSVG = docElement.nodeName.toLowerCase() === 'svg';

	  /**
	   * createElement is a convenience wrapper around document.createElement. Since we
	   * use createElement all over the place, this allows for (slightly) smaller code
	   * as well as abstracting away issues with creating elements in contexts other than
	   * HTML documents (e.g. SVG documents).
	   *
	   * @access private
	   * @function createElement
	   * @returns {HTMLElement|SVGElement} An HTML or SVG element
	   */
	  function createElement() {
	    if (typeof document.createElement !== 'function') {
	      // This is the case in IE7, where the type of createElement is "object".
	      // For this reason, we cannot call apply() as Object is not a Function.
	      return document.createElement(arguments[0]);
	    } else if (isSVG) {
	      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	    } else {
	      return document.createElement.apply(document, arguments);
	    }
	  }

	  /**
	   * getBody returns the body of a document, or an element that can stand in for
	   * the body if a real body does not exist
	   *
	   * @access private
	   * @function getBody
	   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	   * artificially created element that stands in for the body
	   */
	  function getBody() {
	    // After page load injecting a fake body doesn't work so check if body exists
	    var body = document.body;
	    if (!body) {
	      // Can't use the real body create a fake one.
	      body = createElement(isSVG ? 'svg' : 'body');
	      body.fake = true;
	    }
	    return body;
	  }

	  /**
	   * injectElementWithStyles injects an element with style element and some CSS rules
	   *
	   * @access private
	   * @function injectElementWithStyles
	   * @param {string} rule - String representing a css rule
	   * @param {Function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean} the result of the specified callback test
	   */
	  function injectElementWithStyles(rule, callback, nodes, testnames) {
	    var mod = 'modernizr';
	    var style;
	    var ret;
	    var node;
	    var docOverflow;
	    var div = createElement('div');
	    var body = getBody();
	    if (parseInt(nodes, 10)) {
	      // In order not to give false positives we create a node for each test
	      // This also allows the method to scale for unspecified uses
	      while (nodes--) {
	        node = createElement('div');
	        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	        div.appendChild(node);
	      }
	    }
	    style = createElement('style');
	    style.type = 'text/css';
	    style.id = 's' + mod;

	    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	    (!body.fake ? div : body).appendChild(style);
	    body.appendChild(div);
	    if (style.styleSheet) {
	      style.styleSheet.cssText = rule;
	    } else {
	      style.appendChild(document.createTextNode(rule));
	    }
	    div.id = mod;
	    if (body.fake) {
	      //avoid crashing IE8, if background image is used
	      body.style.background = '';
	      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	      body.style.overflow = 'hidden';
	      docOverflow = docElement.style.overflow;
	      docElement.style.overflow = 'hidden';
	      docElement.appendChild(body);
	    }
	    ret = callback(div, rule);
	    // If this is done after page load we don't want to remove the body so check if body exists
	    if (body.fake && body.parentNode) {
	      body.parentNode.removeChild(body);
	      docElement.style.overflow = docOverflow;
	      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
	      // eslint-disable-next-line
	      docElement.offsetHeight;
	    } else {
	      div.parentNode.removeChild(div);
	    }
	    return !!ret;
	  }

	  /**
	   * wrapper around getComputedStyle, to fix issues with Firefox returning null when
	   * called inside of a hidden iframe
	   *
	   * @access private
	   * @function computedStyle
	   * @param {HTMLElement|SVGElement} elem - The element we want to find the computed styles of
	   * @param {string|null} [pseudo] - An optional pseudo element selector (e.g. :before), of null if none
	   * @param {string} prop - A CSS property
	   * @returns {CSSStyleDeclaration} the value of the specified CSS property
	   */
	  function computedStyle(elem, pseudo, prop) {
	    var result;
	    if ('getComputedStyle' in window) {
	      result = getComputedStyle.call(window, elem, pseudo);
	      var console = window.console;
	      if (result !== null) {
	        if (prop) {
	          result = result.getPropertyValue(prop);
	        }
	      } else {
	        if (console) {
	          var method = console.error ? 'error' : 'log';
	          console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
	        }
	      }
	    } else {
	      result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
	    }
	    return result;
	  }

	  /**
	   * Modernizr.mq tests a given media query, live against the current state of the window
	   * adapted from matchMedia polyfill by Scott Jehl and Paul Irish
	   * gist.github.com/786768
	   *
	   * @memberOf Modernizr
	   * @name Modernizr.mq
	   * @optionName Modernizr.mq()
	   * @optionProp mq
	   * @access public
	   * @function mq
	   * @param {string} mq - String of the media query we want to test
	   * @returns {boolean}
	   * @example
	   * Modernizr.mq allows for you to programmatically check if the current browser
	   * window state matches a media query.
	   *
	   * ```js
	   *  var query = Modernizr.mq('(min-width: 900px)');
	   *
	   *  if (query) {
	   *    // the browser window is larger than 900px
	   *  }
	   * ```
	   *
	   * Only valid media queries are supported, therefore you must always include values
	   * with your media query
	   *
	   * ```js
	   * // good
	   *  Modernizr.mq('(min-width: 900px)');
	   *
	   * // bad
	   *  Modernizr.mq('min-width');
	   * ```
	   *
	   * If you would just like to test that media queries are supported in general, use
	   *
	   * ```js
	   *  Modernizr.mq('only all'); // true if MQ are supported, false if not
	   * ```
	   *
	   * Note that if the browser does not support media queries (e.g. old IE) mq will
	   * always return false.
	   */
	  var mq = function () {
	    var matchMedia = window.matchMedia || window.msMatchMedia;
	    if (matchMedia) {
	      return function (mq) {
	        var mql = matchMedia(mq);
	        return mql && mql.matches || false;
	      };
	    }
	    return function (mq) {
	      var bool = false;
	      injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function (node) {
	        bool = computedStyle(node, null, 'position') === 'absolute';
	      });
	      return bool;
	    };
	  }();
	  ModernizrProto.mq = mq;

	  // Run each test
	  testRunner();
	  delete ModernizrProto.addTest;
	  delete ModernizrProto.addAsyncTest;

	  // Run the things that are supposed to run after the tests
	  for (var i = 0; i < Modernizr._q.length; i++) {
	    Modernizr._q[i]();
	  }

	  // Leak Modernizr namespace
	  scriptGlobalObject.Modernizr = Modernizr;
	})(window, window, document);

	/*!
	 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
	 * @copyright 2016 PixelCog, Inc.
	 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
	 */
	!function (t, i, e, s) {
	  function o(i, e) {
	    var h = this;
	    "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
	    var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
	    if (r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), "top" != r[0] && "bottom" != r[0] && "left" != r[1] && "right" != r[1] || (r = [r[1], r[0]]), this.positionX !== s && (r[0] = this.positionX.toLowerCase()), this.positionY !== s && (r[1] = this.positionY.toLowerCase()), h.positionX = r[0], h.positionY = r[1], "left" != this.positionX && "right" != this.positionX && (isNaN(parseInt(this.positionX)) ? this.positionX = "center" : this.positionX = parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (isNaN(parseInt(this.positionY)) ? this.positionY = "center" : this.positionY = parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
	      backgroundImage: 'url("' + this.imageSrc + '")',
	      backgroundSize: "cover",
	      backgroundPosition: this.position
	    }), this;
	    if (navigator.userAgent.match(/(Android)/)) return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
	      backgroundImage: 'url("' + this.imageSrc + '")',
	      backgroundSize: "cover",
	      backgroundPosition: this.position
	    }), this;
	    this.$mirror = t("<div />").prependTo(this.mirrorContainer);
	    var a = this.$element.find(">.parallax-slider"),
	      n = !1;
	    0 == a.length ? this.$slider = t("<img />").prependTo(this.$mirror) : (this.$slider = a.prependTo(this.$mirror), n = !0), this.$mirror.addClass("parallax-mirror").css({
	      visibility: "hidden",
	      zIndex: this.zIndex,
	      position: "fixed",
	      top: 0,
	      left: 0,
	      overflow: "hidden"
	    }), this.$slider.addClass("parallax-slider").one("load", function () {
	      h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender();
	    }), n || (this.$slider[0].src = this.imageSrc), (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || a.length > 0) && this.$slider.trigger("load");
	  }
	  !function () {
	    for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
	    i.requestAnimationFrame || (i.requestAnimationFrame = function (e) {
	      var s = new Date().getTime(),
	        o = Math.max(0, 16 - (s - t)),
	        h = i.setTimeout(function () {
	          e(s + o);
	        }, o);
	      return t = s + o, h;
	    }), i.cancelAnimationFrame || (i.cancelAnimationFrame = function (t) {
	      clearTimeout(t);
	    });
	  }(), t.extend(o.prototype, {
	    speed: .2,
	    bleed: 0,
	    zIndex: -100,
	    iosFix: !0,
	    androidFix: !0,
	    position: "center",
	    overScrollFix: !1,
	    mirrorContainer: "body",
	    refresh: function () {
	      this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
	      var t,
	        i = o.winHeight,
	        e = o.docHeight,
	        s = Math.min(this.boxOffsetTop, e - i),
	        h = Math.max(this.boxOffsetTop + this.boxHeight - i, 0),
	        r = this.boxHeight + (s - h) * (1 - this.speed) | 0,
	        a = (this.boxOffsetTop - s) * (1 - this.speed) | 0;
	      r * this.aspectRatio >= this.boxWidth ? (this.imageWidth = r * this.aspectRatio | 0, this.imageHeight = r, this.offsetBaseTop = a, t = this.imageWidth - this.boxWidth, "left" == this.positionX ? this.offsetLeft = 0 : "right" == this.positionX ? this.offsetLeft = -t : isNaN(this.positionX) ? this.offsetLeft = -t / 2 | 0 : this.offsetLeft = Math.max(this.positionX, -t)) : (this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0, t = this.imageHeight - r, "top" == this.positionY ? this.offsetBaseTop = a : "bottom" == this.positionY ? this.offsetBaseTop = a - t : isNaN(this.positionY) ? this.offsetBaseTop = a - t / 2 | 0 : this.offsetBaseTop = a + Math.max(this.positionY, -t));
	    },
	    render: function () {
	      var t = o.scrollTop,
	        i = o.scrollLeft,
	        e = this.overScrollFix ? o.overScroll : 0,
	        s = t + o.winHeight;
	      this.boxOffsetBottom > t && this.boxOffsetTop <= s ? (this.visibility = "visible", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - i, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden", this.$mirror.css({
	        transform: "translate3d(" + this.mirrorLeft + "px, " + (this.mirrorTop - e) + "px, 0px)",
	        visibility: this.visibility,
	        height: this.boxHeight,
	        width: this.boxWidth
	      }), this.$slider.css({
	        transform: "translate3d(" + this.offsetLeft + "px, " + this.offsetTop + "px, 0px)",
	        position: "absolute",
	        height: this.imageHeight,
	        width: this.imageWidth,
	        maxWidth: "none"
	      });
	    }
	  }), t.extend(o, {
	    scrollTop: 0,
	    scrollLeft: 0,
	    winHeight: 0,
	    winWidth: 0,
	    docHeight: 1 << 30,
	    docWidth: 1 << 30,
	    sliders: [],
	    isReady: !1,
	    isFresh: !1,
	    isBusy: !1,
	    setup: function () {
	      function s() {
	        if (p == i.pageYOffset) return i.requestAnimationFrame(s), !1;
	        p = i.pageYOffset, h.render(), i.requestAnimationFrame(s);
	      }
	      if (!this.isReady) {
	        var h = this,
	          r = t(e),
	          a = t(i),
	          n = function () {
	            o.winHeight = a.height(), o.winWidth = a.width(), o.docHeight = r.height(), o.docWidth = r.width();
	          },
	          l = function () {
	            var t = a.scrollTop(),
	              i = o.docHeight - o.winHeight,
	              e = o.docWidth - o.winWidth;
	            o.scrollTop = Math.max(0, Math.min(i, t)), o.scrollLeft = Math.max(0, Math.min(e, a.scrollLeft())), o.overScroll = Math.max(t - i, Math.min(t, 0));
	          };
	        a.on("resize.px.parallax load.px.parallax", function () {
	          n(), h.refresh(), o.isFresh = !1, o.requestRender();
	        }).on("scroll.px.parallax load.px.parallax", function () {
	          l(), o.requestRender();
	        }), n(), l(), this.isReady = !0;
	        var p = -1;
	        s();
	      }
	    },
	    configure: function (i) {
	      "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i));
	    },
	    refresh: function () {
	      t.each(this.sliders, function () {
	        this.refresh();
	      }), this.isFresh = !0;
	    },
	    render: function () {
	      this.isFresh || this.refresh(), t.each(this.sliders, function () {
	        this.render();
	      });
	    },
	    requestRender: function () {
	      var t = this;
	      t.render(), t.isBusy = !1;
	    },
	    destroy: function (e) {
	      var s,
	        h = t(e).data("px.parallax");
	      for (h.$mirror.remove(), s = 0; s < this.sliders.length; s += 1) this.sliders[s] == h && this.sliders.splice(s, 1);
	      t(e).data("px.parallax", !1), 0 === this.sliders.length && (t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"), this.isReady = !1, o.isSetup = !1);
	    }
	  });
	  var h = t.fn.parallax;
	  t.fn.parallax = function (s) {
	    return this.each(function () {
	      var h = t(this),
	        r = "object" == typeof s && s;
	      this == i || this == e || h.is("body") ? o.configure(r) : h.data("px.parallax") ? "object" == typeof s && t.extend(h.data("px.parallax"), r) : (r = t.extend({}, h.data(), r), h.data("px.parallax", new o(this, r))), "string" == typeof s && ("destroy" == s ? o.destroy(this) : o[s]());
	    });
	  }, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function () {
	    return t.fn.parallax = h, this;
	  }, t(function () {
	    t('[data-parallax="scroll"]').parallax();
	  });
	}(jQuery, window, document);

	/*!
	 * jQuery Pretty Dropdowns Plugin v4.17.0 by T. H. Doan (https://thdoan.github.io/pretty-dropdowns/)
	 *
	 * jQuery Pretty Dropdowns by T. H. Doan is licensed under the MIT License.
	 * Read a copy of the license in the LICENSE file or at https://choosealicense.com/licenses/mit/
	 */

	(function ($) {
	  $.fn.prettyDropdown = function (oOptions) {
	    // Default options
	    oOptions = $.extend({
	      classic: false,
	      customClass: 'arrow',
	      width: null,
	      height: 50,
	      hoverIntent: 200,
	      multiDelimiter: '; ',
	      multiVerbosity: 99,
	      selectedMarker: '&#10003;',
	      afterLoad: function () {}
	    }, oOptions);
	    oOptions.selectedMarker = '<span aria-hidden="true" class="checked"> ' + oOptions.selectedMarker + '</span>';
	    // Validate options
	    if (isNaN(oOptions.width) && !/^\d+%$/.test(oOptions.width)) oOptions.width = null;
	    if (isNaN(oOptions.height)) oOptions.height = 50;else if (oOptions.height < 8) oOptions.height = 8;
	    if (isNaN(oOptions.hoverIntent)) oOptions.hoverIntent = 200;
	    if (isNaN(oOptions.multiVerbosity)) oOptions.multiVerbosity = 99;

	    // Translatable strings
	    var MULTI_NONE = 'None selected',
	      MULTI_PREFIX = 'Selected: ',
	      MULTI_POSTFIX = ' selected';

	    // Globals
	    var $current,
	      aKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',,,,,,,, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	      nCount,
	      nHoverIndex,
	      nLastIndex,
	      nTimer,
	      nTimestamp,
	      // Initiate pretty drop-downs
	      init = function (elSel) {
	        var $select = $(elSel),
	          nSize = elSel.size,
	          sId = elSel.name || elSel.id || '',
	          sLabelId;
	        // Exit if widget has already been initiated
	        if ($select.data('loaded')) return;
	        // Remove 'size' attribute to it doesn't affect vertical alignment
	        $select.data('size', nSize).removeAttr('size');
	        // Set <select> height to reserve space for <div> container
	        $select.css('visibility', 'hidden').outerHeight(oOptions.height);
	        nTimestamp = performance.now() * 100000000000000;
	        // Test whether to add 'aria-labelledby'
	        if (elSel.id) {
	          // Look for <label>
	          var $label = $('label[for=' + elSel.id + ']');
	          if ($label.length) {
	            // Add 'id' to <label> if necessary
	            if ($label.attr('id') && !/^menu\d{13,}$/.test($label.attr('id'))) sLabelId = $label.attr('id');else $label.attr('id', sLabelId = 'menu' + nTimestamp);
	          }
	        }
	        nCount = 0;
	        var $items = $('optgroup, option', $select),
	          $selected = $items.filter(':selected'),
	          bMultiple = elSel.multiple,
	          // Height - 2px for borders
	          sHtml = '<ul' + (elSel.disabled ? '' : ' tabindex="0"') + ' role="listbox"' + (elSel.title ? ' title="' + elSel.title + '" aria-label="' + elSel.title + '"' : '') + (sLabelId ? ' aria-labelledby="' + sLabelId + '"' : '') + ' aria-activedescendant="item' + nTimestamp + '-1" aria-expanded="false"' + ' style="max-height:' + (oOptions.height - 2) + 'px;margin:'
	          // NOTE: $select.css('margin') returns an empty string in Firefox, so we have to get
	          // each margin individually. See https://github.com/jquery/jquery/issues/3383
	          + $select.css('margin-top') + ' ' + $select.css('margin-right') + ' ' + $select.css('margin-bottom') + ' ' + $select.css('margin-left') + ';">';
	        if (bMultiple) {
	          sHtml += renderItem(null, 'selected');
	          $items.each(function () {
	            if (this.selected) {
	              sHtml += renderItem(this, '', true);
	            } else {
	              sHtml += renderItem(this);
	            }
	          });
	        } else {
	          if (oOptions.classic) {
	            $items.each(function () {
	              sHtml += renderItem(this);
	            });
	          } else {
	            sHtml += renderItem($selected[0], 'selected');
	            $items.filter(':not(:selected)').each(function () {
	              sHtml += renderItem(this);
	            });
	          }
	        }
	        sHtml += '</ul>';
	        $select.wrap('<div ' + (sId ? 'id="prettydropdown-' + sId + '" ' : '') + 'class="prettydropdown ' + (oOptions.classic ? 'classic ' : '') + (elSel.disabled ? 'disabled ' : '') + (bMultiple ? 'multiple ' : '') + oOptions.customClass + ' loading"'
	        // NOTE: For some reason, the container height is larger by 1px if the <select> has the
	        // 'multiple' attribute or 'size' attribute with a value larger than 1. To fix this, we
	        // have to inline the height.
	        + (bMultiple || nSize > 1 ? ' style="height:' + oOptions.height + 'px;"' : '') + '></div>').before(sHtml).data('loaded', true);
	        var $dropdown = $select.parent().children('ul'),
	          nWidth = $dropdown.outerWidth(true),
	          nOuterWidth;
	        $items = $dropdown.children();
	        // Update default selected values for multi-select menu
	        if (bMultiple) updateSelected($dropdown);else if (oOptions.classic) $('[data-value="' + $selected.val() + '"]', $dropdown).addClass('selected').append(oOptions.selectedMarker);
	        // Calculate width if initially hidden
	        if ($dropdown.width() <= 0) {
	          var $clone = $dropdown.parent().clone().css({
	            position: 'absolute',
	            top: '-100%'
	          });
	          $('body').append($clone);
	          nWidth = $clone.children('ul').outerWidth(true);
	          $('li', $clone).width(nWidth);
	          nOuterWidth = $clone.children('ul').outerWidth(true);
	          $clone.remove();
	        }
	        // Set dropdown width and event handler
	        // NOTE: Setting width using width(), then css() because width() only can return a float,
	        // which can result in a missing right border when there is a scrollbar.
	        $items.width(nWidth).css('width', $items.css('width'));
	        if (oOptions.width) {
	          $dropdown.parent().css('min-width', $items.css('width'));
	          $dropdown.css('width', '100%');
	          $items.css('width', '100%');
	        }
	        $items.click(function () {
	          var $li = $(this),
	            $selected = $dropdown.children('.selected');
	          // Ignore disabled menu
	          if ($dropdown.parent().hasClass('disabled')) return;
	          // Only update if not disabled, not a label, and a different value selected
	          if ($dropdown.hasClass('active') && !$li.hasClass('disabled') && !$li.hasClass('label') && $li.data('value') !== $selected.data('value')) {
	            // Select highlighted item
	            if (bMultiple) {
	              if ($li.children('span.checked').length) $li.children('span.checked').remove();else $li.append(oOptions.selectedMarker);
	              // Sync <select> element
	              $dropdown.children(':not(.selected)').each(function (nIndex) {
	                $('optgroup, option', $select).eq(nIndex).prop('selected', $(this).children('span.checked').length > 0);
	              });
	              // Update selected values for multi-select menu
	              updateSelected($dropdown);
	            } else {
	              $selected.removeClass('selected').children('span.checked').remove();
	              $li.addClass('selected').append(oOptions.selectedMarker);
	              if (!oOptions.classic) $dropdown.prepend($li);
	              $dropdown.removeClass('reverse').attr('aria-activedescendant', $li.attr('id'));
	              if ($selected.data('group') && !oOptions.classic) $dropdown.children('.label').filter(function () {
	                return $(this).text() === $selected.data('group');
	              }).after($selected);
	              // Sync <select> element
	              $('optgroup, option', $select).filter(function () {
	                // <option>: this.value = this.text, $li.data('value') = $li.contents()
	                // <option value="">: this.value = "", $li.data('value') = undefined
	                return this.value + '|' + this.text === ($li.data('value') || '') + '|' + $li.contents().filter(function () {
	                  // Filter out selected marker
	                  return this.nodeType === 3;
	                }).text();
	              }).prop('selected', true);
	            }
	            $select.trigger('change');
	          }
	          if ($li.hasClass('selected') || !bMultiple) {
	            $dropdown.toggleClass('active');
	            $dropdown.attr('aria-expanded', $dropdown.hasClass('active'));
	          }
	          // Try to keep drop-down menu within viewport
	          if ($dropdown.hasClass('active')) {
	            // Close any other open menus
	            if ($('.prettydropdown > ul.active').length > 1) resetDropdown($('.prettydropdown > ul.active').not($dropdown)[0]);
	            var nWinHeight = window.innerHeight,
	              nMaxHeight,
	              nOffsetTop = $dropdown.offset().top,
	              nScrollTop = $(document).scrollTop(),
	              nDropdownHeight = $dropdown.outerHeight();
	            if (nSize) {
	              nMaxHeight = nSize * (oOptions.height - 2);
	              if (nMaxHeight < nDropdownHeight - 2) nDropdownHeight = nMaxHeight + 2;
	            }
	            var nDropdownBottom = nOffsetTop - nScrollTop + nDropdownHeight;
	            if (nDropdownBottom > nWinHeight) {
	              // Expand to direction that has the most space
	              if (nOffsetTop - nScrollTop > nWinHeight - (nOffsetTop - nScrollTop + oOptions.height)) {
	                $dropdown.addClass('reverse');
	                if (!oOptions.classic) $dropdown.append($selected);
	                if (nOffsetTop - nScrollTop + oOptions.height < nDropdownHeight) {
	                  $dropdown.outerHeight(nOffsetTop - nScrollTop + oOptions.height);
	                  // Ensure the selected item is in view
	                  $dropdown.scrollTop(nDropdownHeight);
	                }
	              } else {
	                $dropdown.height($dropdown.height() - (nDropdownBottom - nWinHeight));
	              }
	            }
	            if (nMaxHeight && nMaxHeight < $dropdown.height()) $dropdown.css('height', nMaxHeight + 'px');
	            // Ensure the selected item is in view
	            if (oOptions.classic) $dropdown.scrollTop($selected.index() * (oOptions.height - 2));
	          } else {
	            $dropdown.data('clicked', true);
	            resetDropdown($dropdown[0]);
	          }
	        });
	        $dropdown.on({
	          focusin: function () {
	            // Unregister any existing handlers first to prevent duplicate firings
	            $(window).off('keydown', handleKeypress).on('keydown', handleKeypress);
	          },
	          focusout: function () {
	            $(window).off('keydown', handleKeypress);
	          },
	          mouseenter: function () {
	            $dropdown.data('hover', true);
	          },
	          mouseleave: resetDropdown,
	          mousemove: hoverDropdownItem
	        });
	        if (oOptions.hoverIntent < 0) {
	          $(document).click(function (e) {
	            if ($dropdown.data('hover') && !$dropdown[0].contains(e.target)) resetDropdown($dropdown[0]);
	          });
	        }
	        // Put focus on menu when user clicks on label
	        if (sLabelId) $('#' + sLabelId).off('click', handleFocus).click(handleFocus);
	        // Done with everything!
	        $dropdown.parent().width(oOptions.width || nOuterWidth || $dropdown.outerWidth(true)).removeClass('loading');
	        oOptions.afterLoad();
	      },
	      // Manage widget focusing
	      handleFocus = function (e) {
	        $('ul[aria-labelledby=' + e.target.id + ']').focus();
	      },
	      // Manage keyboard navigation
	      handleKeypress = function (e) {
	        var $dropdown = $('.prettydropdown > ul.active, .prettydropdown > ul:focus');
	        if (!$dropdown.length) return;
	        if (e.which === 9) {
	          // Tab
	          resetDropdown($dropdown[0]);
	          return;
	        } else {
	          // Intercept non-Tab keys only
	          e.preventDefault();
	          e.stopPropagation();
	        }
	        var $items = $dropdown.children(),
	          bOpen = $dropdown.hasClass('active'),
	          nItemsHeight = $dropdown.height() / (oOptions.height - 2),
	          nItemsPerPage = nItemsHeight % 1 < 0.5 ? Math.floor(nItemsHeight) : Math.ceil(nItemsHeight),
	          sKey;
	        nHoverIndex = Math.max(0, $dropdown.children('.hover').index());
	        nLastIndex = $items.length - 1;
	        $current = $items.eq(nHoverIndex);
	        $dropdown.data('lastKeypress', +new Date());
	        switch (e.which) {
	          case 13:
	            // Enter
	            if (!bOpen) {
	              $current = $items.filter('.selected');
	              toggleHover($current, 1);
	            }
	            $current.click();
	            break;
	          case 27:
	            // Esc
	            if (bOpen) resetDropdown($dropdown[0]);
	            break;
	          case 32:
	            // Space
	            if (bOpen) {
	              sKey = ' ';
	            } else {
	              $current = $items.filter('.selected');
	              toggleHover($current, 1);
	              $current.click();
	            }
	            break;
	          case 33:
	            // Page Up
	            if (bOpen) {
	              toggleHover($current, 0);
	              toggleHover($items.eq(Math.max(nHoverIndex - nItemsPerPage - 1, 0)), 1);
	            }
	            break;
	          case 34:
	            // Page Down
	            if (bOpen) {
	              toggleHover($current, 0);
	              toggleHover($items.eq(Math.min(nHoverIndex + nItemsPerPage - 1, nLastIndex)), 1);
	            }
	            break;
	          case 35:
	            // End
	            if (bOpen) {
	              toggleHover($current, 0);
	              toggleHover($items.eq(nLastIndex), 1);
	            }
	            break;
	          case 36:
	            // Home
	            if (bOpen) {
	              toggleHover($current, 0);
	              toggleHover($items.eq(0), 1);
	            }
	            break;
	          case 38:
	            // Up
	            if (bOpen) {
	              toggleHover($current, 0);
	              // If not already key-navigated or first item is selected, cycle to the last item; or
	              // else select the previous item
	              toggleHover(nHoverIndex ? $items.eq(nHoverIndex - 1) : $items.eq(nLastIndex), 1);
	            }
	            break;
	          case 40:
	            // Down
	            if (bOpen) {
	              toggleHover($current, 0);
	              // If last item is selected, cycle to the first item; or else select the next item
	              toggleHover(nHoverIndex === nLastIndex ? $items.eq(0) : $items.eq(nHoverIndex + 1), 1);
	            }
	            break;
	          default:
	            if (bOpen) sKey = aKeys[e.which - 48];
	        }
	        if (sKey) {
	          // Alphanumeric key pressed
	          clearTimeout(nTimer);
	          $dropdown.data('keysPressed', $dropdown.data('keysPressed') === undefined ? sKey : $dropdown.data('keysPressed') + sKey);
	          nTimer = setTimeout(function () {
	            $dropdown.removeData('keysPressed');
	            // NOTE: Windows keyboard repeat delay is 250-1000 ms. See
	            // https://technet.microsoft.com/en-us/library/cc978658.aspx
	          }, 300);
	          // Build index of matches
	          var aMatches = [],
	            nCurrentIndex = $current.index();
	          $items.each(function (nIndex) {
	            if ($(this).text().toLowerCase().indexOf($dropdown.data('keysPressed')) === 0) aMatches.push(nIndex);
	          });
	          if (aMatches.length) {
	            // Cycle through items matching key(s) pressed
	            for (var i = 0; i < aMatches.length; ++i) {
	              if (aMatches[i] > nCurrentIndex) {
	                toggleHover($items, 0);
	                toggleHover($items.eq(aMatches[i]), 1);
	                break;
	              }
	              if (i === aMatches.length - 1) {
	                toggleHover($items, 0);
	                toggleHover($items.eq(aMatches[0]), 1);
	              }
	            }
	          }
	        }
	      },
	      // Highlight menu item
	      hoverDropdownItem = function (e) {
	        var $dropdown = $(e.currentTarget);
	        if (e.target.nodeName !== 'LI' || !$dropdown.hasClass('active') || new Date() - $dropdown.data('lastKeypress') < 200) return;
	        toggleHover($dropdown.children(), 0, 1);
	        toggleHover($(e.target), 1, 1);
	      },
	      // Construct menu item
	      // elOpt is null for first item in multi-select menus
	      renderItem = function (elOpt, sClass, bSelected) {
	        var sGroup = '',
	          sText = '',
	          sTitle;
	        sClass = sClass || '';
	        if (elOpt) {
	          switch (elOpt.nodeName) {
	            case 'OPTION':
	              if (elOpt.parentNode.nodeName === 'OPTGROUP') sGroup = elOpt.parentNode.getAttribute('label');
	              sText = (elOpt.getAttribute('data-prefix') || '') + elOpt.text + (elOpt.getAttribute('data-suffix') || '');
	              break;
	            case 'OPTGROUP':
	              sClass += ' label';
	              sText = (elOpt.getAttribute('data-prefix') || '') + elOpt.getAttribute('label') + (elOpt.getAttribute('data-suffix') || '');
	              break;
	          }
	          if (elOpt.disabled || sGroup && elOpt.parentNode.disabled) sClass += ' disabled';
	          sTitle = elOpt.title;
	          if (sGroup && !sTitle) sTitle = elOpt.parentNode.title;
	        }
	        ++nCount;
	        return '<li id="item' + nTimestamp + '-' + nCount + '"' + (sGroup ? ' data-group="' + sGroup + '"' : '') + (elOpt && (elOpt.value || oOptions.classic) ? ' data-value="' + elOpt.value + '"' : '') + (elOpt && elOpt.nodeName === 'OPTION' ? ' role="option"' : '') + (sTitle ? ' title="' + sTitle + '" aria-label="' + sTitle + '"' : '') + (sClass ? ' class="' + $.trim(sClass) + '"' : '') + (oOptions.height !== 50 ? ' style="height:' + (oOptions.height - 2) + 'px;line-height:' + (oOptions.height - 4) + 'px;"' : '') + '>' + sText + (bSelected || sClass === 'selected' ? oOptions.selectedMarker : '') + '</li>';
	      },
	      // Reset menu state
	      // @param o Event or Element object
	      resetDropdown = function (o) {
	        if (oOptions.hoverIntent < 0 && o.type === 'mouseleave') return;
	        var $dropdown = $(o.currentTarget || o);
	        $dropdown.data('hover', false);
	        clearTimeout(nTimer);
	        nTimer = setTimeout(function () {
	          if ($dropdown.data('hover')) return;
	          if ($dropdown.hasClass('reverse') && !oOptions.classic) $dropdown.prepend($dropdown.children(':last-child'));
	          $dropdown.removeClass('active reverse').removeData('clicked').attr('aria-expanded', 'false').css('height', '');
	          $dropdown.children().removeClass('hover nohover');
	          // Update focus for NVDA screen readers
	          $dropdown.attr('aria-activedescendant', $dropdown.children('.selected').attr('id'));
	        }, o.type === 'mouseleave' && !$dropdown.data('clicked') ? oOptions.hoverIntent : 0);
	      },
	      // Set menu item hover state
	      // bNoScroll set on hoverDropdownItem()
	      toggleHover = function ($li, bOn, bNoScroll) {
	        if (bOn) {
	          var $dropdown = $li.parent();
	          $li.removeClass('nohover').addClass('hover');
	          // Update focus for NVDA screen readers
	          $dropdown.attr('aria-activedescendant', $li.attr('id'));
	          if ($li.length === 1 && $current && !bNoScroll) {
	            // Ensure items are always in view
	            var nDropdownHeight = $dropdown.outerHeight(),
	              nItemOffset = $li.offset().top - $dropdown.offset().top - 1; // -1px for top border
	            if ($li.index() === 0) {
	              $dropdown.scrollTop(0);
	            } else if ($li.index() === nLastIndex) {
	              $dropdown.scrollTop($dropdown.children().length * oOptions.height);
	            } else {
	              if (nItemOffset + oOptions.height > nDropdownHeight) $dropdown.scrollTop($dropdown.scrollTop() + oOptions.height + nItemOffset - nDropdownHeight);else if (nItemOffset < 0) $dropdown.scrollTop($dropdown.scrollTop() + nItemOffset);
	            }
	          }
	        } else {
	          $li.removeClass('hover').addClass('nohover');
	        }
	      },
	      // Update selected values for multi-select menu
	      updateSelected = function ($dropdown) {
	        var $select = $dropdown.parent().children('select'),
	          aSelected = $('option', $select).map(function () {
	            if (this.selected) return this.text;
	          }).get(),
	          sSelected;
	        if (oOptions.multiVerbosity >= aSelected.length) sSelected = aSelected.join(oOptions.multiDelimiter) || MULTI_NONE;else sSelected = aSelected.length + '/' + $('option', $select).length + MULTI_POSTFIX;
	        if (sSelected) {
	          var sTitle = ($select.attr('title') ? $select.attr('title') : '') + (aSelected.length ? '\n' + MULTI_PREFIX + aSelected.join(oOptions.multiDelimiter) : '');
	          $dropdown.children('.selected').text(sSelected);
	          $dropdown.attr({
	            'title': sTitle,
	            'aria-label': sTitle
	          });
	        } else {
	          $dropdown.children('.selected').empty();
	          $dropdown.attr({
	            'title': $select.attr('title'),
	            'aria-label': $select.attr('title')
	          });
	        }
	      };

	    /**
	     * Public Functions
	     */

	    // Resync the menu with <select> to reflect state changes
	    this.refresh = function (oOptions) {
	      return this.each(function () {
	        var $select = $(this);
	        $select.prevAll('ul').remove();
	        $select.unwrap().data('loaded', false);
	        this.size = $select.data('size');
	        init(this);
	      });
	    };
	    return this.each(function () {
	      init(this);
	    });
	  };
	})(jQuery);

	var slick_min = {exports: {}};

	(function (module, exports) {
	!function (i) {

	  module.exports = i(require$$0__default["default"]) ;
	}(function (i) {

	  var e = window.Slick || {};
	  (e = function () {
	    var e = 0;
	    return function (t, o) {
	      var s,
	        n = this;
	      n.defaults = {
	        accessibility: !0,
	        adaptiveHeight: !1,
	        appendArrows: i(t),
	        appendDots: i(t),
	        arrows: !0,
	        asNavFor: null,
	        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
	        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
	        autoplay: !1,
	        autoplaySpeed: 3e3,
	        centerMode: !1,
	        centerPadding: "50px",
	        cssEase: "ease",
	        customPaging: function (e, t) {
	          return i('<button type="button" />').text(t + 1);
	        },
	        dots: !1,
	        dotsClass: "slick-dots",
	        draggable: !0,
	        easing: "linear",
	        edgeFriction: .35,
	        fade: !1,
	        focusOnSelect: !1,
	        focusOnChange: !1,
	        infinite: !0,
	        initialSlide: 0,
	        lazyLoad: "ondemand",
	        mobileFirst: !1,
	        pauseOnHover: !0,
	        pauseOnFocus: !0,
	        pauseOnDotsHover: !1,
	        respondTo: "window",
	        responsive: null,
	        rows: 1,
	        rtl: !1,
	        slide: "",
	        slidesPerRow: 1,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        speed: 500,
	        swipe: !0,
	        swipeToSlide: !1,
	        touchMove: !0,
	        touchThreshold: 5,
	        useCSS: !0,
	        useTransform: !0,
	        variableWidth: !1,
	        vertical: !1,
	        verticalSwiping: !1,
	        waitForAnimate: !0,
	        zIndex: 1e3
	      }, n.initials = {
	        animating: !1,
	        dragging: !1,
	        autoPlayTimer: null,
	        currentDirection: 0,
	        currentLeft: null,
	        currentSlide: 0,
	        direction: 1,
	        $dots: null,
	        listWidth: null,
	        listHeight: null,
	        loadIndex: 0,
	        $nextArrow: null,
	        $prevArrow: null,
	        scrolling: !1,
	        slideCount: null,
	        slideWidth: null,
	        $slideTrack: null,
	        $slides: null,
	        sliding: !1,
	        slideOffset: 0,
	        swipeLeft: null,
	        swiping: !1,
	        $list: null,
	        touchObject: {},
	        transformsEnabled: !1,
	        unslicked: !1
	      }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0);
	    };
	  }()).prototype.activateADA = function () {
	    this.$slideTrack.find(".slick-active").attr({
	      "aria-hidden": "false"
	    }).find("a, input, button, select").attr({
	      tabindex: "0"
	    });
	  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
	    var s = this;
	    if ("boolean" == typeof t) o = t, t = null;else if (t < 0 || t >= s.slideCount) return !1;
	    s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
	      i(t).attr("data-slick-index", e);
	    }), s.$slidesCache = s.$slides, s.reinit();
	  }, e.prototype.animateHeight = function () {
	    var i = this;
	    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
	      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
	      i.$list.animate({
	        height: e
	      }, i.options.speed);
	    }
	  }, e.prototype.animateSlide = function (e, t) {
	    var o = {},
	      s = this;
	    s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
	      left: e
	    }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
	      top: e
	    }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
	      animStart: s.currentLeft
	    }).animate({
	      animStart: e
	    }, {
	      duration: s.options.speed,
	      easing: s.options.easing,
	      step: function (i) {
	        i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o));
	      },
	      complete: function () {
	        t && t.call();
	      }
	    })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
	      s.disableTransition(), t.call();
	    }, s.options.speed));
	  }, e.prototype.getNavTarget = function () {
	    var e = this,
	      t = e.options.asNavFor;
	    return t && null !== t && (t = i(t).not(e.$slider)), t;
	  }, e.prototype.asNavFor = function (e) {
	    var t = this.getNavTarget();
	    null !== t && "object" == typeof t && t.each(function () {
	      var t = i(this).slick("getSlick");
	      t.unslicked || t.slideHandler(e, !0);
	    });
	  }, e.prototype.applyTransition = function (i) {
	    var e = this,
	      t = {};
	    !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
	  }, e.prototype.autoPlay = function () {
	    var i = this;
	    i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
	  }, e.prototype.autoPlayClear = function () {
	    var i = this;
	    i.autoPlayTimer && clearInterval(i.autoPlayTimer);
	  }, e.prototype.autoPlayIterator = function () {
	    var i = this,
	      e = i.currentSlide + i.options.slidesToScroll;
	    i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e));
	  }, e.prototype.buildArrows = function () {
	    var e = this;
	    !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
	      "aria-disabled": "true",
	      tabindex: "-1"
	    }));
	  }, e.prototype.buildDots = function () {
	    var e,
	      t,
	      o = this;
	    if (!0 === o.options.dots) {
	      for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
	      o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
	    }
	  }, e.prototype.buildOut = function () {
	    var e = this;
	    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
	      i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "");
	    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable");
	  }, e.prototype.buildRows = function () {
	    var i,
	      e,
	      t,
	      o,
	      s,
	      n,
	      r,
	      l = this;
	    if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
	      for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
	        var d = document.createElement("div");
	        for (e = 0; e < l.options.rows; e++) {
	          var a = document.createElement("div");
	          for (t = 0; t < l.options.slidesPerRow; t++) {
	            var c = i * r + (e * l.options.slidesPerRow + t);
	            n.get(c) && a.appendChild(n.get(c));
	          }
	          d.appendChild(a);
	        }
	        o.appendChild(d);
	      }
	      l.$slider.empty().append(o), l.$slider.children().children().children().css({
	        width: 100 / l.options.slidesPerRow + "%",
	        display: "inline-block"
	      });
	    }
	  }, e.prototype.checkResponsive = function (e, t) {
	    var o,
	      s,
	      n,
	      r = this,
	      l = !1,
	      d = r.$slider.width(),
	      a = window.innerWidth || i(window).width();
	    if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
	      s = null;
	      for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
	      null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
	    }
	  }, e.prototype.changeSlide = function (e, t) {
	    var o,
	      s,
	      n,
	      r = this,
	      l = i(e.currentTarget);
	    switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
	      case "previous":
	        s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
	        break;
	      case "next":
	        s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
	        break;
	      case "index":
	        var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
	        r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
	        break;
	      default:
	        return;
	    }
	  }, e.prototype.checkNavigable = function (i) {
	    var e, t;
	    if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];else for (var o in e) {
	      if (i < e[o]) {
	        i = t;
	        break;
	      }
	      t = e[o];
	    }
	    return i;
	  }, e.prototype.cleanUpEvents = function () {
	    var e = this;
	    e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
	  }, e.prototype.cleanUpSlideEvents = function () {
	    var e = this;
	    e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
	  }, e.prototype.cleanUpRows = function () {
	    var i,
	      e = this;
	    e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
	  }, e.prototype.clickHandler = function (i) {
	    !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
	  }, e.prototype.destroy = function (e) {
	    var t = this;
	    t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
	      i(this).attr("style", i(this).data("originalStyling"));
	    }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]);
	  }, e.prototype.disableTransition = function (i) {
	    var e = this,
	      t = {};
	    t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
	  }, e.prototype.fadeSlide = function (i, e) {
	    var t = this;
	    !1 === t.cssTransitions ? (t.$slides.eq(i).css({
	      zIndex: t.options.zIndex
	    }), t.$slides.eq(i).animate({
	      opacity: 1
	    }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
	      opacity: 1,
	      zIndex: t.options.zIndex
	    }), e && setTimeout(function () {
	      t.disableTransition(i), e.call();
	    }, t.options.speed));
	  }, e.prototype.fadeSlideOut = function (i) {
	    var e = this;
	    !1 === e.cssTransitions ? e.$slides.eq(i).animate({
	      opacity: 0,
	      zIndex: e.options.zIndex - 2
	    }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
	      opacity: 0,
	      zIndex: e.options.zIndex - 2
	    }));
	  }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
	    var e = this;
	    null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
	  }, e.prototype.focusHandler = function () {
	    var e = this;
	    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
	      t.stopImmediatePropagation();
	      var o = i(this);
	      setTimeout(function () {
	        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay());
	      }, 0);
	    });
	  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
	    return this.currentSlide;
	  }, e.prototype.getDotCount = function () {
	    var i = this,
	      e = 0,
	      t = 0,
	      o = 0;
	    if (!0 === i.options.infinite) {
	      if (i.slideCount <= i.options.slidesToShow) ++o;else for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
	    } else if (!0 === i.options.centerMode) o = i.slideCount;else if (i.options.asNavFor) for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
	    return o - 1;
	  }, e.prototype.getLeft = function (i) {
	    var e,
	      t,
	      o,
	      s,
	      n = this,
	      r = 0;
	    return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e;
	  }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
	    return this.options[i];
	  }, e.prototype.getNavigableIndexes = function () {
	    var i,
	      e = this,
	      t = 0,
	      o = 0,
	      s = [];
	    for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
	    return s;
	  }, e.prototype.getSlick = function () {
	    return this;
	  }, e.prototype.getSlideCount = function () {
	    var e,
	      t,
	      o = this;
	    return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
	      if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1;
	    }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
	  }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
	    this.changeSlide({
	      data: {
	        message: "index",
	        index: parseInt(i)
	      }
	    }, e);
	  }, e.prototype.init = function (e) {
	    var t = this;
	    i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay());
	  }, e.prototype.initADA = function () {
	    var e = this,
	      t = Math.ceil(e.slideCount / e.options.slidesToShow),
	      o = e.getNavigableIndexes().filter(function (i) {
	        return i >= 0 && i < e.slideCount;
	      });
	    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
	      "aria-hidden": "true",
	      tabindex: "-1"
	    }).find("a, input, button, select").attr({
	      tabindex: "-1"
	    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
	      var s = o.indexOf(t);
	      i(this).attr({
	        role: "tabpanel",
	        id: "slick-slide" + e.instanceUid + t,
	        tabindex: -1
	      }), -1 !== s && i(this).attr({
	        "aria-describedby": "slick-slide-control" + e.instanceUid + s
	      });
	    }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
	      var n = o[s];
	      i(this).attr({
	        role: "presentation"
	      }), i(this).find("button").first().attr({
	        role: "tab",
	        id: "slick-slide-control" + e.instanceUid + s,
	        "aria-controls": "slick-slide" + e.instanceUid + n,
	        "aria-label": s + 1 + " of " + t,
	        "aria-selected": null,
	        tabindex: "-1"
	      });
	    }).eq(e.currentSlide).find("button").attr({
	      "aria-selected": "true",
	      tabindex: "0"
	    }).end());
	    for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
	    e.activateADA();
	  }, e.prototype.initArrowEvents = function () {
	    var i = this;
	    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
	      message: "previous"
	    }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
	      message: "next"
	    }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
	  }, e.prototype.initDotEvents = function () {
	    var e = this;
	    !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
	      message: "index"
	    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
	  }, e.prototype.initSlideEvents = function () {
	    var e = this;
	    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
	  }, e.prototype.initializeEvents = function () {
	    var e = this;
	    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
	      action: "start"
	    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
	      action: "move"
	    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
	      action: "end"
	    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
	      action: "end"
	    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition);
	  }, e.prototype.initUI = function () {
	    var i = this;
	    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
	  }, e.prototype.keyHandler = function (i) {
	    var e = this;
	    i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
	      data: {
	        message: !0 === e.options.rtl ? "next" : "previous"
	      }
	    }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
	      data: {
	        message: !0 === e.options.rtl ? "previous" : "next"
	      }
	    }));
	  }, e.prototype.lazyLoad = function () {
	    function e(e) {
	      i("img[data-lazy]", e).each(function () {
	        var e = i(this),
	          t = i(this).attr("data-lazy"),
	          o = i(this).attr("data-srcset"),
	          s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
	          r = document.createElement("img");
	        r.onload = function () {
	          e.animate({
	            opacity: 0
	          }, 100, function () {
	            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
	              opacity: 1
	            }, 200, function () {
	              e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
	            }), n.$slider.trigger("lazyLoaded", [n, e, t]);
	          });
	        }, r.onerror = function () {
	          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
	        }, r.src = t;
	      });
	    }
	    var t,
	      o,
	      s,
	      n = this;
	    if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
	    e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
	  }, e.prototype.loadSlider = function () {
	    var i = this;
	    i.setPosition(), i.$slideTrack.css({
	      opacity: 1
	    }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
	  }, e.prototype.next = e.prototype.slickNext = function () {
	    this.changeSlide({
	      data: {
	        message: "next"
	      }
	    });
	  }, e.prototype.orientationChange = function () {
	    var i = this;
	    i.checkResponsive(), i.setPosition();
	  }, e.prototype.pause = e.prototype.slickPause = function () {
	    var i = this;
	    i.autoPlayClear(), i.paused = !0;
	  }, e.prototype.play = e.prototype.slickPlay = function () {
	    var i = this;
	    i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1;
	  }, e.prototype.postSlide = function (e) {
	    var t = this;
	    t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
	  }, e.prototype.prev = e.prototype.slickPrev = function () {
	    this.changeSlide({
	      data: {
	        message: "previous"
	      }
	    });
	  }, e.prototype.preventDefault = function (i) {
	    i.preventDefault();
	  }, e.prototype.progressiveLazyLoad = function (e) {
	    e = e || 1;
	    var t,
	      o,
	      s,
	      n,
	      r,
	      l = this,
	      d = i("img[data-lazy]", l.$slider);
	    d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
	      s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad();
	    }, r.onerror = function () {
	      e < 3 ? setTimeout(function () {
	        l.progressiveLazyLoad(e + 1);
	      }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
	    }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]);
	  }, e.prototype.refresh = function (e) {
	    var t,
	      o,
	      s = this;
	    o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
	      currentSlide: t
	    }), s.init(), e || s.changeSlide({
	      data: {
	        message: "index",
	        index: t
	      }
	    }, !1);
	  }, e.prototype.registerBreakpoints = function () {
	    var e,
	      t,
	      o,
	      s = this,
	      n = s.options.responsive || null;
	    if ("array" === i.type(n) && n.length) {
	      s.respondTo = s.options.respondTo || "window";
	      for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
	        for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
	        s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings;
	      }
	      s.breakpoints.sort(function (i, e) {
	        return s.options.mobileFirst ? i - e : e - i;
	      });
	    }
	  }, e.prototype.reinit = function () {
	    var e = this;
	    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]);
	  }, e.prototype.resize = function () {
	    var e = this;
	    i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
	      e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition();
	    }, 50));
	  }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
	    var o = this;
	    if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
	    o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
	  }, e.prototype.setCSS = function (i) {
	    var e,
	      t,
	      o = this,
	      s = {};
	    !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)));
	  }, e.prototype.setDimensions = function () {
	    var i = this;
	    !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
	      padding: "0px " + i.options.centerPadding
	    }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
	      padding: i.options.centerPadding + " 0px"
	    })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
	    var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
	    !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
	  }, e.prototype.setFade = function () {
	    var e,
	      t = this;
	    t.$slides.each(function (o, s) {
	      e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
	        position: "relative",
	        right: e,
	        top: 0,
	        zIndex: t.options.zIndex - 2,
	        opacity: 0
	      }) : i(s).css({
	        position: "relative",
	        left: e,
	        top: 0,
	        zIndex: t.options.zIndex - 2,
	        opacity: 0
	      });
	    }), t.$slides.eq(t.currentSlide).css({
	      zIndex: t.options.zIndex - 1,
	      opacity: 1
	    });
	  }, e.prototype.setHeight = function () {
	    var i = this;
	    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
	      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
	      i.$list.css("height", e);
	    }
	  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
	    var e,
	      t,
	      o,
	      s,
	      n,
	      r = this,
	      l = !1;
	    if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;else if ("multiple" === n) i.each(o, function (i, e) {
	      r.options[i] = e;
	    });else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];else {
	      for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
	      r.options.responsive.push(s[t]);
	    }
	    l && (r.unload(), r.reinit());
	  }, e.prototype.setPosition = function () {
	    var i = this;
	    i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
	  }, e.prototype.setProps = function () {
	    var i = this,
	      e = document.body.style;
	    i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType;
	  }, e.prototype.setSlideClasses = function (i) {
	    var e,
	      t,
	      o,
	      s,
	      n = this;
	    if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
	      var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
	      e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center");
	    } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
	    "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad();
	  }, e.prototype.setupInfinite = function () {
	    var e,
	      t,
	      o,
	      s = this;
	    if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
	      for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
	      for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
	      s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
	        i(this).attr("id", "");
	      });
	    }
	  }, e.prototype.interrupt = function (i) {
	    var e = this;
	    i || e.autoPlay(), e.interrupted = i;
	  }, e.prototype.selectHandler = function (e) {
	    var t = this,
	      o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
	      s = parseInt(o.attr("data-slick-index"));
	    s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
	  }, e.prototype.slideHandler = function (i, e, t) {
	    var o,
	      s,
	      n,
	      r,
	      l,
	      d = null,
	      a = this;
	    if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
	      a.postSlide(o);
	    }) : a.postSlide(o));else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
	      a.postSlide(o);
	    }) : a.postSlide(o));else {
	      if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
	        a.postSlide(s);
	      })) : a.postSlide(s), void a.animateHeight();
	      !0 !== t ? a.animateSlide(d, function () {
	        a.postSlide(s);
	      }) : a.postSlide(s);
	    }
	  }, e.prototype.startLoad = function () {
	    var i = this;
	    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading");
	  }, e.prototype.swipeDirection = function () {
	    var i,
	      e,
	      t,
	      o,
	      s = this;
	    return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical";
	  }, e.prototype.swipeEnd = function (i) {
	    var e,
	      t,
	      o = this;
	    if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
	    if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
	    if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
	      switch (t = o.swipeDirection()) {
	        case "left":
	        case "down":
	          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
	          break;
	        case "right":
	        case "up":
	          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1;
	      }
	      "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]));
	    } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {});
	  }, e.prototype.swipeHandler = function (i) {
	    var e = this;
	    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
	      case "start":
	        e.swipeStart(i);
	        break;
	      case "move":
	        e.swipeMove(i);
	        break;
	      case "end":
	        e.swipeEnd(i);
	    }
	  }, e.prototype.swipeMove = function (i) {
	    var e,
	      t,
	      o,
	      s,
	      n,
	      r,
	      l = this;
	    return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))));
	  }, e.prototype.swipeStart = function (i) {
	    var e,
	      t = this;
	    if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
	    void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0;
	  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
	    var i = this;
	    null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
	  }, e.prototype.unload = function () {
	    var e = this;
	    i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
	  }, e.prototype.unslick = function (i) {
	    var e = this;
	    e.$slider.trigger("unslick", [e, i]), e.destroy();
	  }, e.prototype.updateArrows = function () {
	    var i = this;
	    Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
	  }, e.prototype.updateDots = function () {
	    var i = this;
	    null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
	  }, e.prototype.visibility = function () {
	    var i = this;
	    i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1);
	  }, i.fn.slick = function () {
	    var i,
	      t,
	      o = this,
	      s = arguments[0],
	      n = Array.prototype.slice.call(arguments, 1),
	      r = o.length;
	    for (i = 0; i < r; i++) if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
	    return o;
	  };
	});
	}(slick_min));

	var smoothScroll_min = {exports: {}};

	/*! smooth-scroll v16.1.3 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */

	(function (module, exports) {
	!function (e, t) {
	  module.exports = t(e) ;
	}("undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof window ? window : commonjsGlobal, function (C) {

	  var w = {
	      ignore: "[data-scroll-ignore]",
	      header: null,
	      topOnEmptyHash: !0,
	      speed: 500,
	      speedAsDuration: !1,
	      durationMax: null,
	      durationMin: null,
	      clip: !0,
	      offset: 0,
	      easing: "easeInOutCubic",
	      customEasing: null,
	      updateURL: !0,
	      popstate: !0,
	      emitEvents: !0
	    },
	    L = function () {
	      var n = {};
	      return Array.prototype.forEach.call(arguments, function (e) {
	        for (var t in e) {
	          if (!e.hasOwnProperty(t)) return;
	          n[t] = e[t];
	        }
	      }), n;
	    },
	    r = function (e) {
	      "#" === e.charAt(0) && (e = e.substr(1));
	      for (var t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
	        if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
	        1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a);
	      }
	      return "#" + r;
	    },
	    H = function () {
	      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
	    },
	    q = function (e) {
	      return e ? (t = e, parseInt(C.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
	      var t;
	    },
	    x = function (e, t, n) {
	      0 === e && document.body.focus(), n || (e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), C.scrollTo(0, t));
	    },
	    Q = function (e, t, n, o) {
	      if (t.emitEvents && "function" == typeof C.CustomEvent) {
	        var a = new CustomEvent(e, {
	          bubbles: !0,
	          detail: {
	            anchor: n,
	            toggle: o
	          }
	        });
	        document.dispatchEvent(a);
	      }
	    };
	  return function (o, e) {
	    var O,
	      a,
	      I,
	      M,
	      A = {};
	    A.cancelScroll = function (e) {
	      cancelAnimationFrame(M), M = null, e || Q("scrollCancel", O);
	    }, A.animateScroll = function (a, r, e) {
	      A.cancelScroll();
	      var i = L(O || w, e || {}),
	        s = "[object Number]" === Object.prototype.toString.call(a),
	        t = s || !a.tagName ? null : a;
	      if (s || t) {
	        var c = C.pageYOffset;
	        i.header && !I && (I = document.querySelector(i.header));
	        var n,
	          o,
	          u,
	          l,
	          d,
	          f,
	          m,
	          h,
	          p = q(I),
	          g = s ? a : function (e, t, n, o) {
	            var a = 0;
	            if (e.offsetParent) for (; a += e.offsetTop, e = e.offsetParent;);
	            return a = Math.max(a - t - n, 0), o && (a = Math.min(a, H() - C.innerHeight)), a;
	          }(t, p, parseInt("function" == typeof i.offset ? i.offset(a, r) : i.offset, 10), i.clip),
	          y = g - c,
	          v = H(),
	          S = 0,
	          E = (n = y, u = (o = i).speedAsDuration ? o.speed : Math.abs(n / 1e3 * o.speed), o.durationMax && u > o.durationMax ? o.durationMax : o.durationMin && u < o.durationMin ? o.durationMin : parseInt(u, 10)),
	          b = function (e) {
	            var t, n, o;
	            l || (l = e), S += e - l, f = c + y * (n = d = 1 < (d = 0 === E ? 0 : S / E) ? 1 : d, "easeInQuad" === (t = i).easing && (o = n * n), "easeOutQuad" === t.easing && (o = n * (2 - n)), "easeInOutQuad" === t.easing && (o = n < .5 ? 2 * n * n : (4 - 2 * n) * n - 1), "easeInCubic" === t.easing && (o = n * n * n), "easeOutCubic" === t.easing && (o = --n * n * n + 1), "easeInOutCubic" === t.easing && (o = n < .5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1), "easeInQuart" === t.easing && (o = n * n * n * n), "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n), "easeInOutQuart" === t.easing && (o = n < .5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === t.easing && (o = n * n * n * n * n), "easeOutQuint" === t.easing && (o = 1 + --n * n * n * n * n), "easeInOutQuint" === t.easing && (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n), t.customEasing && (o = t.customEasing(n)), o || n), C.scrollTo(0, Math.floor(f)), function (e, t) {
	              var n = C.pageYOffset;
	              if (e == t || n == t || (c < t && C.innerHeight + n) >= v) return A.cancelScroll(!0), x(a, t, s), Q("scrollStop", i, a, r), !(M = l = null);
	            }(f, g) || (M = C.requestAnimationFrame(b), l = e);
	          };
	        0 === C.pageYOffset && C.scrollTo(0, 0), m = a, h = i, s || history.pushState && h.updateURL && history.pushState({
	          smoothScroll: JSON.stringify(h),
	          anchor: m.id
	        }, document.title, m === document.documentElement ? "#top" : "#" + m.id), "matchMedia" in C && C.matchMedia("(prefers-reduced-motion)").matches ? x(a, Math.floor(g), !1) : (Q("scrollStart", i, a, r), A.cancelScroll(!0), C.requestAnimationFrame(b));
	      }
	    };
	    var t = function (e) {
	        if (!e.defaultPrevented && !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) && "closest" in e.target && (a = e.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e.target.closest(O.ignore) && a.hostname === C.location.hostname && a.pathname === C.location.pathname && /#/.test(a.href)) {
	          var t, n;
	          try {
	            t = r(decodeURIComponent(a.hash));
	          } catch (e) {
	            t = r(a.hash);
	          }
	          if ("#" === t) {
	            if (!O.topOnEmptyHash) return;
	            n = document.documentElement;
	          } else n = document.querySelector(t);
	          (n = n || "#top" !== t ? n : document.documentElement) && (e.preventDefault(), function (e) {
	            if (history.replaceState && e.updateURL && !history.state) {
	              var t = C.location.hash;
	              t = t || "", history.replaceState({
	                smoothScroll: JSON.stringify(e),
	                anchor: t || C.pageYOffset
	              }, document.title, t || C.location.href);
	            }
	          }(O), A.animateScroll(n, a));
	        }
	      },
	      n = function (e) {
	        if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(O)) {
	          var t = history.state.anchor;
	          "string" == typeof t && t && !(t = document.querySelector(r(history.state.anchor))) || A.animateScroll(t, null, {
	            updateURL: !1
	          });
	        }
	      };
	    A.destroy = function () {
	      O && (document.removeEventListener("click", t, !1), C.removeEventListener("popstate", n, !1), A.cancelScroll(), M = I = a = O = null);
	    };
	    return function () {
	      if (!("querySelector" in document && "addEventListener" in C && "requestAnimationFrame" in C && "closest" in C.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
	      A.destroy(), O = L(w, e || {}), I = O.header ? document.querySelector(O.header) : null, document.addEventListener("click", t, !1), O.updateURL && O.popstate && C.addEventListener("popstate", n, !1);
	    }(), A;
	  };
	});
	}(smoothScroll_min));

	var jquery_sticky = {exports: {}};

	(function (module) {
	// Sticky Plugin v1.0.4 for jQuery
	// =============
	// Author: Anthony Garand
	// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
	// Improvements by Leonardo C. Daronco (daronco)
	// Created: 02/14/2011
	// Date: 07/20/2015
	// Website: http://stickyjs.com/
	// Description: Makes an element on the page stick on the screen as you scroll
	//              It will only set the 'top' and 'position' of your element, you
	//              might need to adjust the width in some cases.

	(function (factory) {
	  if (module.exports) {
	    // Node/CommonJS
	    module.exports = factory(require$$0__default["default"]);
	  } else {
	    // Browser globals
	    factory(jQuery);
	  }
	})(function ($) {
	  var slice = Array.prototype.slice; // save ref to original slice()
	  var splice = Array.prototype.splice; // save ref to original slice()

	  var defaults = {
	      topSpacing: 0,
	      bottomSpacing: 0,
	      className: 'is-sticky',
	      wrapperClassName: 'sticky-wrapper',
	      center: false,
	      getWidthFrom: '',
	      widthFromWrapper: true,
	      // works only when .getWidthFrom is empty
	      responsiveWidth: false,
	      zIndex: 'auto'
	    },
	    $window = $(window),
	    $document = $(document),
	    sticked = [],
	    windowHeight = $window.height(),
	    scroller = function () {
	      var scrollTop = $window.scrollTop(),
	        documentHeight = $document.height(),
	        dwh = documentHeight - windowHeight,
	        extra = scrollTop > dwh ? dwh - scrollTop : 0;
	      for (var i = 0, l = sticked.length; i < l; i++) {
	        var s = sticked[i],
	          elementTop = s.stickyWrapper.offset().top,
	          etse = elementTop - s.topSpacing - extra;

	        //update height in case of dynamic content
	        s.stickyWrapper.css('height', s.stickyElement.outerHeight());
	        if (scrollTop <= etse) {
	          if (s.currentTop !== null) {
	            s.stickyElement.css({
	              'width': '',
	              'position': '',
	              'top': '',
	              'z-index': ''
	            });
	            s.stickyElement.parent().removeClass(s.className);
	            s.stickyElement.trigger('sticky-end', [s]);
	            s.currentTop = null;
	          }
	        } else {
	          var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
	          if (newTop < 0) {
	            newTop = newTop + s.topSpacing;
	          } else {
	            newTop = s.topSpacing;
	          }
	          if (s.currentTop !== newTop) {
	            var newWidth;
	            if (s.getWidthFrom) {
	              newWidth = $(s.getWidthFrom).width() || null;
	            } else if (s.widthFromWrapper) {
	              newWidth = s.stickyWrapper.width();
	            }
	            if (newWidth == null) {
	              newWidth = s.stickyElement.width();
	            }
	            s.stickyElement.css('width', newWidth).css('position', 'fixed').css('top', newTop).css('z-index', s.zIndex);
	            s.stickyElement.parent().addClass(s.className);
	            if (s.currentTop === null) {
	              s.stickyElement.trigger('sticky-start', [s]);
	            } else {
	              // sticky is started but it have to be repositioned
	              s.stickyElement.trigger('sticky-update', [s]);
	            }
	            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
	              // just reached bottom || just started to stick but bottom is already reached
	              s.stickyElement.trigger('sticky-bottom-reached', [s]);
	            } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
	              // sticky is started && sticked at topSpacing && overflowing from top just finished
	              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
	            }
	            s.currentTop = newTop;
	          }

	          // Check if sticky has reached end of container and stop sticking
	          var stickyWrapperContainer = s.stickyWrapper.parent();
	          var unstick = s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight() && s.stickyElement.offset().top <= s.topSpacing;
	          if (unstick) {
	            s.stickyElement.css('position', 'absolute').css('top', '').css('bottom', 0).css('z-index', '');
	          } else {
	            s.stickyElement.css('position', 'fixed').css('top', newTop).css('bottom', '').css('z-index', s.zIndex);
	          }
	        }
	      }
	    },
	    resizer = function () {
	      windowHeight = $window.height();
	      for (var i = 0, l = sticked.length; i < l; i++) {
	        var s = sticked[i];
	        var newWidth = null;
	        if (s.getWidthFrom) {
	          if (s.responsiveWidth) {
	            newWidth = $(s.getWidthFrom).width();
	          }
	        } else if (s.widthFromWrapper) {
	          newWidth = s.stickyWrapper.width();
	        }
	        if (newWidth != null) {
	          s.stickyElement.css('width', newWidth);
	        }
	      }
	    },
	    methods = {
	      init: function (options) {
	        var o = $.extend({}, defaults, options);
	        return this.each(function () {
	          var stickyElement = $(this);
	          var stickyId = stickyElement.attr('id');
	          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
	          var wrapper = $('<div></div>').attr('id', wrapperId).addClass(o.wrapperClassName);
	          stickyElement.wrapAll(wrapper);
	          var stickyWrapper = stickyElement.parent();
	          if (o.center) {
	            stickyWrapper.css({
	              width: stickyElement.outerWidth(),
	              marginLeft: "auto",
	              marginRight: "auto"
	            });
	          }
	          if (stickyElement.css("float") === "right") {
	            stickyElement.css({
	              "float": "none"
	            }).parent().css({
	              "float": "right"
	            });
	          }
	          o.stickyElement = stickyElement;
	          o.stickyWrapper = stickyWrapper;
	          o.currentTop = null;
	          sticked.push(o);
	          methods.setWrapperHeight(this);
	          methods.setupChangeListeners(this);
	        });
	      },
	      setWrapperHeight: function (stickyElement) {
	        var element = $(stickyElement);
	        var stickyWrapper = element.parent();
	        if (stickyWrapper) {
	          stickyWrapper.css('height', element.outerHeight());
	        }
	      },
	      setupChangeListeners: function (stickyElement) {
	        if (window.MutationObserver) {
	          var mutationObserver = new window.MutationObserver(function (mutations) {
	            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
	              methods.setWrapperHeight(stickyElement);
	            }
	          });
	          mutationObserver.observe(stickyElement, {
	            subtree: true,
	            childList: true
	          });
	        } else {
	          stickyElement.addEventListener('DOMNodeInserted', function () {
	            methods.setWrapperHeight(stickyElement);
	          }, false);
	          stickyElement.addEventListener('DOMNodeRemoved', function () {
	            methods.setWrapperHeight(stickyElement);
	          }, false);
	        }
	      },
	      update: scroller,
	      unstick: function (options) {
	        return this.each(function () {
	          var that = this;
	          var unstickyElement = $(that);
	          var removeIdx = -1;
	          var i = sticked.length;
	          while (i-- > 0) {
	            if (sticked[i].stickyElement.get(0) === that) {
	              splice.call(sticked, i, 1);
	              removeIdx = i;
	            }
	          }
	          if (removeIdx !== -1) {
	            unstickyElement.unwrap();
	            unstickyElement.css({
	              'width': '',
	              'position': '',
	              'top': '',
	              'float': '',
	              'z-index': ''
	            });
	          }
	        });
	      }
	    };

	  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
	  if (window.addEventListener) {
	    window.addEventListener('scroll', scroller, false);
	    window.addEventListener('resize', resizer, false);
	  } else if (window.attachEvent) {
	    window.attachEvent('onscroll', scroller);
	    window.attachEvent('onresize', resizer);
	  }
	  $.fn.sticky = function (method) {
	    if (methods[method]) {
	      return methods[method].apply(this, slice.call(arguments, 1));
	    } else if (typeof method === 'object' || !method) {
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error('Method ' + method + ' does not exist on jQuery.sticky');
	    }
	  };
	  $.fn.unstick = function (method) {
	    if (methods[method]) {
	      return methods[method].apply(this, slice.call(arguments, 1));
	    } else if (typeof method === 'object' || !method) {
	      return methods.unstick.apply(this, arguments);
	    } else {
	      $.error('Method ' + method + ' does not exist on jQuery.sticky');
	    }
	  };
	  $(function () {
	    setTimeout(scroller, 0);
	  });
	});
	}(jquery_sticky));

	var jquery_touchSwipe_min = {exports: {}};

	/*!
	 * @fileOverview TouchSwipe - jQuery Plugin
	 * @version 1.6.18
	 *
	 * @author Matt Bryson http://www.github.com/mattbryson
	 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
	 * @see http://labs.rampinteractive.co.uk/touchSwipe/
	 * @see http://plugins.jquery.com/project/touchSwipe
	 * @license
	 * Copyright (c) 2010-2015 Matt Bryson
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 *
	 */

	(function (module) {
	!function (factory) {
	  factory(module.exports ? require$$0__default["default"] : jQuery);
	}(function ($) {

	  function init(options) {
	    return !options || void 0 !== options.allowPageScroll || void 0 === options.swipe && void 0 === options.swipeStatus || (options.allowPageScroll = NONE), void 0 !== options.click && void 0 === options.tap && (options.tap = options.click), options || (options = {}), options = $.extend({}, $.fn.swipe.defaults, options), this.each(function () {
	      var $this = $(this),
	        plugin = $this.data(PLUGIN_NS);
	      plugin || (plugin = new TouchSwipe(this, options), $this.data(PLUGIN_NS, plugin));
	    });
	  }
	  function TouchSwipe(element, options) {
	    function touchStart(jqEvent) {
	      if (!(getTouchInProgress() || $(jqEvent.target).closest(options.excludedElements, $element).length > 0)) {
	        var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
	        if (!event.pointerType || "mouse" != event.pointerType || 0 != options.fallbackToMouseEvents) {
	          var ret,
	            touches = event.touches,
	            evt = touches ? touches[0] : event;
	          return phase = PHASE_START, touches ? fingerCount = touches.length : options.preventDefaultEvents !== !1 && jqEvent.preventDefault(), distance = 0, direction = null, currentDirection = null, pinchDirection = null, duration = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, maximumsMap = createMaximumsData(), cancelMultiFingerRelease(), createFingerData(0, evt), !touches || fingerCount === options.fingers || options.fingers === ALL_FINGERS || hasPinches() ? (startTime = getTimeStamp(), 2 == fingerCount && (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)), (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase))) : ret = !1, ret === !1 ? (phase = PHASE_CANCEL, triggerHandler(event, phase), ret) : (options.hold && (holdTimeout = setTimeout($.proxy(function () {
	            $element.trigger("hold", [event.target]), options.hold && (ret = options.hold.call($element, event, event.target));
	          }, this), options.longTapThreshold)), setTouchInProgress(!0), null);
	        }
	      }
	    }
	    function touchMove(jqEvent) {
	      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
	      if (phase !== PHASE_END && phase !== PHASE_CANCEL && !inMultiFingerRelease()) {
	        var ret,
	          touches = event.touches,
	          evt = touches ? touches[0] : event,
	          currentFinger = updateFingerData(evt);
	        if (endTime = getTimeStamp(), touches && (fingerCount = touches.length), options.hold && clearTimeout(holdTimeout), phase = PHASE_MOVE, 2 == fingerCount && (0 == startTouchesDistance ? (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)) : (updateFingerData(touches[1]), endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end), pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end)), pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance), pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance)), fingerCount === options.fingers || options.fingers === ALL_FINGERS || !touches || hasPinches()) {
	          if (direction = calculateDirection(currentFinger.start, currentFinger.end), currentDirection = calculateDirection(currentFinger.last, currentFinger.end), validateDefaultEvent(jqEvent, currentDirection), distance = calculateDistance(currentFinger.start, currentFinger.end), duration = calculateDuration(), setMaxDistance(direction, distance), ret = triggerHandler(event, phase), !options.triggerOnTouchEnd || options.triggerOnTouchLeave) {
	            var inBounds = !0;
	            if (options.triggerOnTouchLeave) {
	              var bounds = getbounds(this);
	              inBounds = isInBounds(currentFinger.end, bounds);
	            }
	            !options.triggerOnTouchEnd && inBounds ? phase = getNextPhase(PHASE_MOVE) : options.triggerOnTouchLeave && !inBounds && (phase = getNextPhase(PHASE_END)), phase != PHASE_CANCEL && phase != PHASE_END || triggerHandler(event, phase);
	          }
	        } else phase = PHASE_CANCEL, triggerHandler(event, phase);
	        ret === !1 && (phase = PHASE_CANCEL, triggerHandler(event, phase));
	      }
	    }
	    function touchEnd(jqEvent) {
	      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
	        touches = event.touches;
	      if (touches) {
	        if (touches.length && !inMultiFingerRelease()) return startMultiFingerRelease(event), !0;
	        if (touches.length && inMultiFingerRelease()) return !0;
	      }
	      return inMultiFingerRelease() && (fingerCount = fingerCountAtRelease), endTime = getTimeStamp(), duration = calculateDuration(), didSwipeBackToCancel() || !validateSwipeDistance() ? (phase = PHASE_CANCEL, triggerHandler(event, phase)) : options.triggerOnTouchEnd || options.triggerOnTouchEnd === !1 && phase === PHASE_MOVE ? (options.preventDefaultEvents !== !1 && jqEvent.cancelable !== !1 && jqEvent.preventDefault(), phase = PHASE_END, triggerHandler(event, phase)) : !options.triggerOnTouchEnd && hasTap() ? (phase = PHASE_END, triggerHandlerForGesture(event, phase, TAP)) : phase === PHASE_MOVE && (phase = PHASE_CANCEL, triggerHandler(event, phase)), setTouchInProgress(!1), null;
	    }
	    function touchCancel() {
	      fingerCount = 0, endTime = 0, startTime = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, cancelMultiFingerRelease(), setTouchInProgress(!1);
	    }
	    function touchLeave(jqEvent) {
	      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
	      options.triggerOnTouchLeave && (phase = getNextPhase(PHASE_END), triggerHandler(event, phase));
	    }
	    function removeListeners() {
	      $element.off(START_EV, touchStart), $element.off(CANCEL_EV, touchCancel), $element.off(MOVE_EV, touchMove), $element.off(END_EV, touchEnd), LEAVE_EV && $element.off(LEAVE_EV, touchLeave), setTouchInProgress(!1);
	    }
	    function getNextPhase(currentPhase) {
	      var nextPhase = currentPhase,
	        validTime = validateSwipeTime(),
	        validDistance = validateSwipeDistance(),
	        didCancel = didSwipeBackToCancel();
	      return !validTime || didCancel ? nextPhase = PHASE_CANCEL : !validDistance || currentPhase != PHASE_MOVE || options.triggerOnTouchEnd && !options.triggerOnTouchLeave ? !validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave && (nextPhase = PHASE_CANCEL) : nextPhase = PHASE_END, nextPhase;
	    }
	    function triggerHandler(event, phase) {
	      var ret,
	        touches = event.touches;
	      return (didSwipe() || hasSwipes()) && (ret = triggerHandlerForGesture(event, phase, SWIPE)), (didPinch() || hasPinches()) && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, PINCH)), didDoubleTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP) : didLongTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, LONG_TAP) : didTap() && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, TAP)), phase === PHASE_CANCEL && touchCancel(), phase === PHASE_END && (touches ? touches.length || touchCancel() : touchCancel()), ret;
	    }
	    function triggerHandlerForGesture(event, phase, gesture) {
	      var ret;
	      if (gesture == SWIPE) {
	        if ($element.trigger("swipeStatus", [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]), options.swipeStatus && (ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection), ret === !1)) return !1;
	        if (phase == PHASE_END && validateSwipe()) {
	          if (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), $element.trigger("swipe", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipe && (ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection), ret === !1)) return !1;
	          switch (direction) {
	            case LEFT:
	              $element.trigger("swipeLeft", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeLeft && (ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
	              break;
	            case RIGHT:
	              $element.trigger("swipeRight", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeRight && (ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
	              break;
	            case UP:
	              $element.trigger("swipeUp", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeUp && (ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
	              break;
	            case DOWN:
	              $element.trigger("swipeDown", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeDown && (ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
	          }
	        }
	      }
	      if (gesture == PINCH) {
	        if ($element.trigger("pinchStatus", [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchStatus && (ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData), ret === !1)) return !1;
	        if (phase == PHASE_END && validatePinch()) switch (pinchDirection) {
	          case IN:
	            $element.trigger("pinchIn", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchIn && (ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData));
	            break;
	          case OUT:
	            $element.trigger("pinchOut", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchOut && (ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData));
	        }
	      }
	      return gesture == TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), hasDoubleTap() && !inDoubleTap() ? (doubleTapStartTime = getTimeStamp(), singleTapTimeout = setTimeout($.proxy(function () {
	        doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target));
	      }, this), options.doubleTapThreshold)) : (doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target)))) : gesture == DOUBLE_TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), doubleTapStartTime = null, $element.trigger("doubletap", [event.target]), options.doubleTap && (ret = options.doubleTap.call($element, event, event.target))) : gesture == LONG_TAP && (phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), doubleTapStartTime = null, $element.trigger("longtap", [event.target]), options.longTap && (ret = options.longTap.call($element, event, event.target)))), ret;
	    }
	    function validateSwipeDistance() {
	      var valid = !0;
	      return null !== options.threshold && (valid = distance >= options.threshold), valid;
	    }
	    function didSwipeBackToCancel() {
	      var cancelled = !1;
	      return null !== options.cancelThreshold && null !== direction && (cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold), cancelled;
	    }
	    function validatePinchDistance() {
	      return null !== options.pinchThreshold ? pinchDistance >= options.pinchThreshold : !0;
	    }
	    function validateSwipeTime() {
	      return options.maxTimeThreshold ? !(duration >= options.maxTimeThreshold) : !0;
	    }
	    function validateDefaultEvent(jqEvent, direction) {
	      if (options.preventDefaultEvents !== !1) if (options.allowPageScroll === NONE) jqEvent.preventDefault();else {
	        var auto = options.allowPageScroll === AUTO;
	        switch (direction) {
	          case LEFT:
	            (options.swipeLeft && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
	            break;
	          case RIGHT:
	            (options.swipeRight && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
	            break;
	          case UP:
	            (options.swipeUp && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
	            break;
	          case DOWN:
	            (options.swipeDown && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
	            break;
	        }
	      }
	    }
	    function validatePinch() {
	      var hasCorrectFingerCount = validateFingers(),
	        hasEndPoint = validateEndPoint(),
	        hasCorrectDistance = validatePinchDistance();
	      return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
	    }
	    function hasPinches() {
	      return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
	    }
	    function didPinch() {
	      return !(!validatePinch() || !hasPinches());
	    }
	    function validateSwipe() {
	      var hasValidTime = validateSwipeTime(),
	        hasValidDistance = validateSwipeDistance(),
	        hasCorrectFingerCount = validateFingers(),
	        hasEndPoint = validateEndPoint(),
	        didCancel = didSwipeBackToCancel(),
	        valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
	      return valid;
	    }
	    function hasSwipes() {
	      return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
	    }
	    function didSwipe() {
	      return !(!validateSwipe() || !hasSwipes());
	    }
	    function validateFingers() {
	      return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH;
	    }
	    function validateEndPoint() {
	      return 0 !== fingerData[0].end.x;
	    }
	    function hasTap() {
	      return !!options.tap;
	    }
	    function hasDoubleTap() {
	      return !!options.doubleTap;
	    }
	    function hasLongTap() {
	      return !!options.longTap;
	    }
	    function validateDoubleTap() {
	      if (null == doubleTapStartTime) return !1;
	      var now = getTimeStamp();
	      return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold;
	    }
	    function inDoubleTap() {
	      return validateDoubleTap();
	    }
	    function validateTap() {
	      return (1 === fingerCount || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold);
	    }
	    function validateLongTap() {
	      return duration > options.longTapThreshold && DOUBLE_TAP_THRESHOLD > distance;
	    }
	    function didTap() {
	      return !(!validateTap() || !hasTap());
	    }
	    function didDoubleTap() {
	      return !(!validateDoubleTap() || !hasDoubleTap());
	    }
	    function didLongTap() {
	      return !(!validateLongTap() || !hasLongTap());
	    }
	    function startMultiFingerRelease(event) {
	      previousTouchEndTime = getTimeStamp(), fingerCountAtRelease = event.touches.length + 1;
	    }
	    function cancelMultiFingerRelease() {
	      previousTouchEndTime = 0, fingerCountAtRelease = 0;
	    }
	    function inMultiFingerRelease() {
	      var withinThreshold = !1;
	      if (previousTouchEndTime) {
	        var diff = getTimeStamp() - previousTouchEndTime;
	        diff <= options.fingerReleaseThreshold && (withinThreshold = !0);
	      }
	      return withinThreshold;
	    }
	    function getTouchInProgress() {
	      return !($element.data(PLUGIN_NS + "_intouch") !== !0);
	    }
	    function setTouchInProgress(val) {
	      $element && (val === !0 ? ($element.on(MOVE_EV, touchMove), $element.on(END_EV, touchEnd), LEAVE_EV && $element.on(LEAVE_EV, touchLeave)) : ($element.off(MOVE_EV, touchMove, !1), $element.off(END_EV, touchEnd, !1), LEAVE_EV && $element.off(LEAVE_EV, touchLeave, !1)), $element.data(PLUGIN_NS + "_intouch", val === !0));
	    }
	    function createFingerData(id, evt) {
	      var f = {
	        start: {
	          x: 0,
	          y: 0
	        },
	        last: {
	          x: 0,
	          y: 0
	        },
	        end: {
	          x: 0,
	          y: 0
	        }
	      };
	      return f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX, f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY, fingerData[id] = f, f;
	    }
	    function updateFingerData(evt) {
	      var id = void 0 !== evt.identifier ? evt.identifier : 0,
	        f = getFingerData(id);
	      return null === f && (f = createFingerData(id, evt)), f.last.x = f.end.x, f.last.y = f.end.y, f.end.x = evt.pageX || evt.clientX, f.end.y = evt.pageY || evt.clientY, f;
	    }
	    function getFingerData(id) {
	      return fingerData[id] || null;
	    }
	    function setMaxDistance(direction, distance) {
	      direction != NONE && (distance = Math.max(distance, getMaxDistance(direction)), maximumsMap[direction].distance = distance);
	    }
	    function getMaxDistance(direction) {
	      return maximumsMap[direction] ? maximumsMap[direction].distance : void 0;
	    }
	    function createMaximumsData() {
	      var maxData = {};
	      return maxData[LEFT] = createMaximumVO(LEFT), maxData[RIGHT] = createMaximumVO(RIGHT), maxData[UP] = createMaximumVO(UP), maxData[DOWN] = createMaximumVO(DOWN), maxData;
	    }
	    function createMaximumVO(dir) {
	      return {
	        direction: dir,
	        distance: 0
	      };
	    }
	    function calculateDuration() {
	      return endTime - startTime;
	    }
	    function calculateTouchesDistance(startPoint, endPoint) {
	      var diffX = Math.abs(startPoint.x - endPoint.x),
	        diffY = Math.abs(startPoint.y - endPoint.y);
	      return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
	    }
	    function calculatePinchZoom(startDistance, endDistance) {
	      var percent = endDistance / startDistance * 1;
	      return percent.toFixed(2);
	    }
	    function calculatePinchDirection() {
	      return 1 > pinchZoom ? OUT : IN;
	    }
	    function calculateDistance(startPoint, endPoint) {
	      return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
	    }
	    function calculateAngle(startPoint, endPoint) {
	      var x = startPoint.x - endPoint.x,
	        y = endPoint.y - startPoint.y,
	        r = Math.atan2(y, x),
	        angle = Math.round(180 * r / Math.PI);
	      return 0 > angle && (angle = 360 - Math.abs(angle)), angle;
	    }
	    function calculateDirection(startPoint, endPoint) {
	      if (comparePoints(startPoint, endPoint)) return NONE;
	      var angle = calculateAngle(startPoint, endPoint);
	      return 45 >= angle && angle >= 0 ? LEFT : 360 >= angle && angle >= 315 ? LEFT : angle >= 135 && 225 >= angle ? RIGHT : angle > 45 && 135 > angle ? DOWN : UP;
	    }
	    function getTimeStamp() {
	      var now = new Date();
	      return now.getTime();
	    }
	    function getbounds(el) {
	      el = $(el);
	      var offset = el.offset(),
	        bounds = {
	          left: offset.left,
	          right: offset.left + el.outerWidth(),
	          top: offset.top,
	          bottom: offset.top + el.outerHeight()
	        };
	      return bounds;
	    }
	    function isInBounds(point, bounds) {
	      return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom;
	    }
	    function comparePoints(pointA, pointB) {
	      return pointA.x == pointB.x && pointA.y == pointB.y;
	    }
	    var options = $.extend({}, options),
	      useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents,
	      START_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
	      MOVE_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
	      END_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
	      LEAVE_EV = useTouchEvents ? SUPPORTS_POINTER ? "mouseleave" : null : "mouseleave",
	      CANCEL_EV = SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel" : "touchcancel",
	      distance = 0,
	      direction = null,
	      currentDirection = null,
	      duration = 0,
	      startTouchesDistance = 0,
	      endTouchesDistance = 0,
	      pinchZoom = 1,
	      pinchDistance = 0,
	      pinchDirection = 0,
	      maximumsMap = null,
	      $element = $(element),
	      phase = "start",
	      fingerCount = 0,
	      fingerData = {},
	      startTime = 0,
	      endTime = 0,
	      previousTouchEndTime = 0,
	      fingerCountAtRelease = 0,
	      doubleTapStartTime = 0,
	      singleTapTimeout = null,
	      holdTimeout = null;
	    try {
	      $element.on(START_EV, touchStart), $element.on(CANCEL_EV, touchCancel);
	    } catch (e) {
	      $.error("events not supported " + START_EV + "," + CANCEL_EV + " on jQuery.swipe");
	    }
	    this.enable = function () {
	      return this.disable(), $element.on(START_EV, touchStart), $element.on(CANCEL_EV, touchCancel), $element;
	    }, this.disable = function () {
	      return removeListeners(), $element;
	    }, this.destroy = function () {
	      removeListeners(), $element.data(PLUGIN_NS, null), $element = null;
	    }, this.option = function (property, value) {
	      if ("object" == typeof property) options = $.extend(options, property);else if (void 0 !== options[property]) {
	        if (void 0 === value) return options[property];
	        options[property] = value;
	      } else {
	        if (!property) return options;
	        $.error("Option " + property + " does not exist on jQuery.swipe.options");
	      }
	      return null;
	    };
	  }
	  var VERSION = "1.6.18",
	    LEFT = "left",
	    RIGHT = "right",
	    UP = "up",
	    DOWN = "down",
	    IN = "in",
	    OUT = "out",
	    NONE = "none",
	    AUTO = "auto",
	    SWIPE = "swipe",
	    PINCH = "pinch",
	    TAP = "tap",
	    DOUBLE_TAP = "doubletap",
	    LONG_TAP = "longtap",
	    HORIZONTAL = "horizontal",
	    VERTICAL = "vertical",
	    ALL_FINGERS = "all",
	    DOUBLE_TAP_THRESHOLD = 10,
	    PHASE_START = "start",
	    PHASE_MOVE = "move",
	    PHASE_END = "end",
	    PHASE_CANCEL = "cancel",
	    SUPPORTS_TOUCH = ("ontouchstart" in window),
	    SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.PointerEvent && !SUPPORTS_TOUCH,
	    SUPPORTS_POINTER = (window.PointerEvent || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH,
	    PLUGIN_NS = "TouchSwipe",
	    defaults = {
	      fingers: 1,
	      threshold: 75,
	      cancelThreshold: null,
	      pinchThreshold: 20,
	      maxTimeThreshold: null,
	      fingerReleaseThreshold: 250,
	      longTapThreshold: 500,
	      doubleTapThreshold: 200,
	      swipe: null,
	      swipeLeft: null,
	      swipeRight: null,
	      swipeUp: null,
	      swipeDown: null,
	      swipeStatus: null,
	      pinchIn: null,
	      pinchOut: null,
	      pinchStatus: null,
	      click: null,
	      tap: null,
	      doubleTap: null,
	      longTap: null,
	      hold: null,
	      triggerOnTouchEnd: !0,
	      triggerOnTouchLeave: !1,
	      allowPageScroll: "auto",
	      fallbackToMouseEvents: !0,
	      excludedElements: ".noSwipe",
	      preventDefaultEvents: !0
	    };
	  $.fn.swipe = function (method) {
	    var $this = $(this),
	      plugin = $this.data(PLUGIN_NS);
	    if (plugin && "string" == typeof method) {
	      if (plugin[method]) return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
	      $.error("Method " + method + " does not exist on jQuery.swipe");
	    } else if (plugin && "object" == typeof method) plugin.option.apply(plugin, arguments);else if (!(plugin || "object" != typeof method && method)) return init.apply(this, arguments);
	    return $this;
	  }, $.fn.swipe.version = VERSION, $.fn.swipe.defaults = defaults, $.fn.swipe.phases = {
	    PHASE_START: PHASE_START,
	    PHASE_MOVE: PHASE_MOVE,
	    PHASE_END: PHASE_END,
	    PHASE_CANCEL: PHASE_CANCEL
	  }, $.fn.swipe.directions = {
	    LEFT: LEFT,
	    RIGHT: RIGHT,
	    UP: UP,
	    DOWN: DOWN,
	    IN: IN,
	    OUT: OUT
	  }, $.fn.swipe.pageScroll = {
	    NONE: NONE,
	    HORIZONTAL: HORIZONTAL,
	    VERTICAL: VERTICAL,
	    AUTO: AUTO
	  }, $.fn.swipe.fingers = {
	    ONE: 1,
	    TWO: 2,
	    THREE: 3,
	    FOUR: 4,
	    FIVE: 5,
	    ALL: ALL_FINGERS
	  };
	});
	}(jquery_touchSwipe_min));

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel_1;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=child-theme.js.map
