/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/js/analytics.js":
/*!*********************************!*\
  !*** ./src/app/js/analytics.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  /* mision-landing-newsletter-y-masterclass */

  var $sintoniza_pensamiento_emocion_accion_action_subscribe = $('.page-id-1757 #wpforms-submit-1297');
  $sintoniza_pensamiento_emocion_accion_action_subscribe.on('click', function () {
    gtag('event', 'form_subscription', {
      'form': 'SINTONIZA PENSAMIENTO, EMOCIÓN Y ACCIÓN',
      'debug_mode': true
    });
  });

  /* newsletter-alta */

  var $inscribete_nuestra_newsletter_action_subscribe = $('.page-id-1785 #wpforms-submit-1297');
  $inscribete_nuestra_newsletter_action_subscribe.on('click', function () {
    gtag('event', 'form_subscription', {
      'form': 'INSCRÍBETE A NUESTRA NEWSLETTER',
      'debug_mode': true
    });
  });

  /*
  */
  var title = $(document).attr('title');
  var $iframe = $('iframe#mailrelay-subscription');
  if ($iframe.length) {
    $iframe.on('load', function () {
      var $button = $iframe.contents().find('#subscribe-form .submit-wrapper input');
      $button.on('click', function () {
        gtag('event', 'mailrelay_subscription', {
          'page_title': title,
          'debug_mode': true
        });
      });
    });
  }
});

/***/ }),

/***/ "./src/app/js/reservas/main.js":
/*!*************************************!*\
  !*** ./src/app/js/reservas/main.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module './login'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  Object(function webpackMissingModule() { var e = new Error("Cannot find module './login'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())($);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/app/main.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/analytics */ "./src/app/js/analytics.js");
/* harmony import */ var _js_reservas_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/reservas/main */ "./src/app/js/reservas/main.js");


(function ($) {
  (0,_js_analytics__WEBPACK_IMPORTED_MODULE_0__["default"])($);
  (0,_js_reservas_main__WEBPACK_IMPORTED_MODULE_1__["default"])($);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map