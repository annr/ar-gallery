;(function( window, undefined ){/* Carousel 
 *
 * Photo lightbox with next, previous and close buttons
 * Handles hide and show photo
 */

var Helper = Helper || {};

'use strict';

function CloseButton() {

  'use strict';

  this.init = function(carousel) {
    var close = this.makeButton(carousel.modalContents);
    close.innerHTML = 'X';
    close.addEventListener("click", function() {
      carousel.hidePhoto();
    });
  };

  this.makeButton = function(target) {
    return Helper.utils.newElem('button', target, {
      'alt': 'close lightbox',
      'id': 'close',
      'class': 'modalClose galleryButton'
    });
  };

  return this;

}


function NavigationButton() {

  'use strict';

  this.init = function(direction, carousel) {

    var arrow = '&lt;';
    var button = Helper.utils.newElem('button', carousel.modalContents, {
      'alt': direction,
      'class': 'photoNav ' + direction + ' galleryButton'
    });

    if (direction === 'viewNext') {
      arrow = '&gt;';
    }

    button.innerHTML = arrow;

    button.addEventListener("click", function() {
      direction === 'viewNext' ? carousel.nextPhoto() : carousel.prevPhoto();
    });
  };

  return this;
}

function Carousel() {

  'use strict';
  return {

    init: function(opts) {

      var _self = this;
      this.imagesCount = opts.imagesCount;
      this.buildModal();

      // add click handler to thumbnails

      var thumbnails = document.getElementsByClassName('thumbnail');

      Array.prototype.forEach.call(thumbnails, function(thumb) {
        thumb.addEventListener("click", function(e) {
          _self.showPhoto(e.target.getAttribute('id'));
        });
      });

    },

    nextPhoto: function() {
      if((this.currentPhotoIndex() + 1) === this.imagesCount) {
        this.selectPhoto(0);
      } else {
        this.selectPhoto(this.currentPhotoIndex() + 1);
      }
    },

    prevPhoto: function() {
      if(this.currentPhotoIndex() === 0) {
        this.selectPhoto(this.imagesCount - 1);
      } else {
        this.selectPhoto(this.currentPhotoIndex() - 1);
      }
    },

    buildModal: function() {
      //
      //  - modal
      //    - modal-contents
      //      - modal-close
      //      - modal-img
      //
      //  - modal-overlay
      //
      this.gallery = document.getElementById('gallery');

      this.modal = Helper.utils.newElem('div', gallery, {
        'class': 'modal',
        'id': 'modal'
      });

      this.modalContents = Helper.utils.newElem('div', this.modal, {
        'class': 'modalContents',
        'id': 'modalContents'
      });

      this.modalImage = Helper.utils.newElem('img', this.modalContents, {
        'alt': 'currentPhoto',
        'id': 'currentPhoto',
        'class': 'modalImage'
      });

      this.modalTitle = Helper.utils.newElem('figcaption', this.modalContents);

      var close = new CloseButton();
      close.init(this);
      ['viewNext','viewPrev'].forEach(function(item) {
        var button = new NavigationButton();
        button.init(item, this);
      }, this);

    },

    hidePhoto: function() {
      this.modal.style.display = 'none';
      this.gallery.removeChild(this.modalOverlay);
    },

    currentPhotoIndex: function() {
      return parseInt(this.modalImage.getAttribute('data-index'), 10);
    },

    selectPhoto: function(index) {
      var thumb = document.getElementById(index);
      this.modalImage.setAttribute('src', thumb.getAttribute('data-image-souce'));
      this.modalTitle.innerHTML = thumb.getAttribute('data-title');
      this.modalImage.setAttribute('data-index', index);
    },

    showPhoto: function(id) {
      // To-DO: make accessor function so you can simplify this code
      var thumb = document.getElementById(id);
      this.modalImage.setAttribute('src', thumb.getAttribute('data-image-souce'));
      this.modalImage.setAttribute('data-index', id);
      this.modal.style.display = 'inline-block';

      this.modalTitle.innerHTML = thumb.getAttribute('data-title');
      this.modalOverlay = Helper.utils.newElem('div', this.gallery, {
        'class': 'modalOverlay'
      });
    }
  };
}
/*
 * Flickr Settings: move this out into it's own file.
 */
'use strict';

var setIds = [
  //'1047939', // Vintage signs, from the East Bay, I think.
  '72157604010317412' // Wow Yosemite
];

var FlickrSettings = (function (setId) {

  var apiKey = '4fb7a02e3fbe80e509aa1719b82f23fd'; // This is mine, get your own. :P
  var pageLimit = 30;

  return {
    url: function() {
      return "https://api.flickr.com/services/rest/" + // API base URL
        "?method=flickr.photosets.getPhotos" +
        "&api_key=" + apiKey +  // Personal flickr API key
        "&photoset_id=" + setId +
        "&privacy_filter=1" +
        "&per_page=" + pageLimit +
        "&format=json&nojsoncallback=1";
    }
  };
})(setIds[Math.floor(Math.random()*setIds.length)]); // get one of the setIds at random
/*
 * Gallery launch point
 */
'use strict';

var Heading = Heading || {};
var ImageGrid = ImageGrid || {};

function loadGrid(evt) {
  var res = JSON.parse(evt.target.response);
  var grid;
  // one image grid and one carousel.
  Heading.init(res.photoset);
  ImageGrid.init(res.photoset);
  var carousel = new Carousel();
  carousel.init({'imagesCount': ImageGrid.imagesCount});

  window.addEventListener("keyup", function(e) {
    // PREV
    if(e.keyCode === 37) carousel.prevPhoto();

    // NEXT
    if(e.keyCode === 39) carousel.nextPhoto();

    // ESC
    if(e.keyCode === 27) carousel.hidePhoto();
  });

}

var req = new XMLHttpRequest();
req.addEventListener("load", loadGrid);
req.open("GET", FlickrSettings.url());
req.send();
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
/* Thumbnail: the small images of the grid. each thumbnail has 
 * the full size image recorded as a data attribute for the lightbox 
 */
'use strict';

function Thumbnail() {

  this.options = {
    cdn:  "https://c6.staticflickr.com/",
    srcExt1: "_n.jpg",
    srcExt2: "_z.jpg"
  };

  this.init = function(index, opts) {
    var item = opts.model;

    var srcBase = this.options.cdn + item.farm + "/" + item.server + "/";
    var smallSrc = srcBase + item.id + "_" + item.secret + this.options.srcExt1;
    var largeSrc = srcBase + item.id + "_" + item.secret + this.options.srcExt2;

    this.options.target = opts.target;

    this.el = Helper.utils.newElem('div', this.options.target, {
      'alt': 'thumbnail',
      'id': index,
      'class': 'thumbnail',
      'data-image-souce': largeSrc,
      'data-title': item.title,
      'data-id': item.id,
      'title': item.title
    });

    this.el.style.backgroundImage = "url(" + smallSrc + ")";
    
  };
  return this;
}}( window ));