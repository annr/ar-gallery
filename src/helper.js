/* Helper.utils
 */
'use strict';

var Helper = {};

Helper.utils = (function () {
  return {
    newElem: function(tag, target, obj) {
      var el = document.createElement(tag || 'div');
      for (var prop in obj) {
        el.setAttribute(prop, obj[prop]);
      }
      if (!target) {
        return el;
      }
      return target.appendChild(el);
    }
  };
})();