!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("lodash")):"function"==typeof define&&define.amd?define(["lodash"],t):"object"==typeof exports?exports.SwiS=t(require("lodash")):e.SwiS=t(e.lodash)}(window,function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=6)}([function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0}),t.scrapeParams=function(e){return(e||window.location).search.substr(1).split("&").map(function(e){return e.split("=")}).reduce(function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){n(e,t,r[t])})}return e}(n({},t[0],t[1]),e)})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.promiseBlock=function(){var e=Array.prototype.slice.call(arguments);return new Promise(function(t,r){e.reduce(function(e,t){return e.then(t).catch(function(e){r(e)})},e.shift()()).then(t)})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.promises=void 0;var n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(1));t.promises=n},function(t,r){t.exports=e},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.gatherFormData=function(e,t){var r;return(0,n.merge)(t,(0,n.reduce)(e.target.elements,function(e,t){return"checkbox"!==t.type&&"radio"!==t.type||t.checked?(r=t.name.split(/\W/).filter(function(e){return!(0,n.isEmpty)(e)}),(0,n.isEmpty)(r)||(e=(0,n.merge)({},e,o(t.value,r,e))),e):e},{}))};var n=r(3),o=function e(t,r,o){var u,i,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return 0===r.length?t:(i=r.pop(),(u=parseInt(i))==u?(c=(0,n.get)(o,r)||[],(0,n.isEmpty)(c)?(c.push(t),e(c,r,o)):void(c[u]=(0,n.merge)({},c[u],t))):(c[i]=t,e(c,r,o)))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"gatherFormData",{enumerable:!0,get:function(){return n.gatherFormData}}),Object.defineProperty(t,"promises",{enumerable:!0,get:function(){return o.promises}}),Object.defineProperty(t,"scrapeParams",{enumerable:!0,get:function(){return u.scrapeParams}});var n=r(4),o=r(2),u=r(0)},function(e,t,r){e.exports=r(5)}])});