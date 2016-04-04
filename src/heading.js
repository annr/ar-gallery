'use strict';

var Heading = {

  init: function(photoset) {
    var header = this.makeTarget();
    var heading = Helper.utils.newElem('h1', header);
    heading.innerHTML = '"' + photoset.title + '"';
    var subHeading = Helper.utils.newElem('h2', header);
    subHeading.innerHTML = 'By ' + photoset.ownername;
  },

  makeTarget: function() {
    return Helper.utils.newElem('header', document.body);
  }

};