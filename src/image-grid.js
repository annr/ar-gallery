'use strict';

var ImageGrid = {

  'imagesCount': undefined,

  init: function(photoset) {
    // make a grid of thumbnails
    var gallery = document.getElementById('gallery');
    var grid = this.makeTarget(gallery);
    photoset.photo.forEach(function(item, i) {
      var thumb = new Thumbnail();
      thumb.init(i, { 'model': item, 'target': grid });
    });
    this.imagesCount = photoset.photo.length;
  },

  makeTarget: function(target) {
    return Helper.utils.newElem('div', target, {
      'class': 'grid',
      'id': 'grid'
    });
  }
};