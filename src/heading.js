'use strict';

var Heading = {

  init: function(photoset) {
    var gallery = document.getElementById('gallery');
    var header = this.makeTarget(gallery);
    var heading = Helper.utils.newElem('h1', header);
    heading.innerHTML = '"' + photoset.title + '"';
    var subHeading = Helper.utils.newElem('h2', header);
    subHeading.innerHTML = 'By ' + photoset.ownername;
  },

  makeTarget: function(target) {
    return Helper.utils.newElem('header', target);
  }

};