'use strict';

var ImageGrid = {

  'imagesCount': undefined,

  init: function(photoset) {
    // make a grid of thumbnails
    var grid = this.makeTarget();
    photoset.photo.forEach(function(item, i) {
      var thumb = new Thumbnail();
      thumb.init(i, { 'model': item, 'target': grid });
    });
    this.imagesCount = photoset.photo.length;
  },

  makeTarget: function() {
    return Helper.utils.newElem('div', document.body, {
      'class': 'grid',
      'id': 'grid'
    });
  }
};