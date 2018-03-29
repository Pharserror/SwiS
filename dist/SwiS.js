(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["SwiS"] = factory(require("lodash"));
	else
		root["SwiS"] = factory(root["lodash"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gatherFormData = undefined;

var _forms = __webpack_require__(2);

exports.gatherFormData = _forms.gatherFormData;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gatherFormData = gatherFormData;

var _lodash = __webpack_require__(3);

/*
 * +===========+
 * |== FORMS ==|
 * +===========+
 */

/* buildFormData()
 *
 * For a form with elements with name attributes in the style of
 * "prop1[prop2][...][propN]"
 * buildFormData() will augment data as:
 * data = { prop1: { prop2: { ...: { propN: value } } } }
 *
 * It can also handle arrays with a given naming scheme in the style of
 * "prop1[0][prop2][...][propN]"
 * buildFormData will augment data as:
 * data = { prop1: [{ prop2: { ...: { propN: value } } }, ...] }
 *
 * @param value [Object] the current value to assign to propN
 *
 * @param props [Array] the properties "path" that determines the structure of data
 *
 * @param allData [Object] the entire data set for the form, used to find arrays
 *                         and augment the objects they contain
 * @param data [Object] an object to store the form data in
 *
 * @return null
 */
var buildFormData = function buildFormData(value, props, allData) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var intProp = void 0,
      nextProp = void 0;

  // If there are no more props then return
  if (props.length === 0) {
    return value;
  }

  /* We need to check if the next prop to get/set is an integer b/c then we need
   * to deal with an array */
  nextProp = props.pop();
  intProp = parseInt(nextProp);

  /* This will ensure we have an integer b/c parseInt will return NaN for
   * any arg that is not an integer and NaN !=== NaN */
  if (intProp === intProp) {
    /* If we already have an object in the array for the given prop (index) then
     * we want to mutate that object so we check if it exists, if not we assign
     * a blank array */
    data = (0, _lodash.get)(allData, props) || [];

    if ((0, _lodash.isEmpty)(data)) {
      /* If we just assigned a blank array then we just push the value onto it
       * and go to the next cycle */
      data.push(value);

      return buildFormData(data, props, allData);
    } else {
      /* If something already exists at the index then we merge what's there
       * and the value into a new object */
      data[intProp] = (0, _lodash.merge)({}, data[intProp], value);

      return;
    }
  } else {
    /* If we aren't dealing with an array then we can simply assign the value to
     * an object property and move on */
    data[nextProp] = value;

    return buildFormData(data, props, allData);
  }
};

/* gatherFormData()
 *
 * For an onSubmit event of a form, gatherFormData() will create a nested data
 * structure using buildFormData()
 *
 * @param event [Event] the onSubmit event
 *
 * @param initialDataValue [Object] initial Object to pass to reduce()
 *
 * @return [Object] the data object representing the form data, usually to be
 * sent to an API via a POST request
 */
function gatherFormData(event, initialDataValue) {
  var elementNames = void 0;

  /* The main mechanism here is reduce(): we iterate over the elements of the
   * form, split their names up into a "property path" array, and use that
   * "property path" to determine how to structure the data that will be sent
   * to the API - finally we merge that data structure with an initialDataValue */
  return (0, _lodash.merge)(initialDataValue, (0, _lodash.reduce)(event.target.elements, function (data, element) {
    // Don't submit checkboxes that aren't checked
    if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
      return data;
    }

    elementNames = element.name.split(/\W/).filter(function (value) {
      return !(0, _lodash.isEmpty)(value);
    });

    if (!(0, _lodash.isEmpty)(elementNames)) {
      // We want to merge the data we already have with the data for the next element
      data = (0, _lodash.merge)({}, data, buildFormData(element.value, elementNames, data));
    }

    return data;
  }, {}));
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});