;(function( window, undefined ){ 
 'use strict';/* Carousel 
 *
 * Photo lightbox with next, previous and close buttons
 * Handles hide and show photo
 */

var Carousel = {
  init: function() {
    Carousel.buildModal();
  },

  nextPhoto: function() {
    // type conversion FTW!
    if((Carousel.currentPhotoIndex() + 1) == ImageGrid.imagesCount) {
     Carousel.selectPhoto(0);
    } else {
      Carousel.selectPhoto(Carousel.currentPhotoIndex() + 1);
    }
  },

  prevPhoto: function() {
    if(Carousel.currentPhotoIndex() == 0) {
     Carousel.selectPhoto(ImageGrid.imagesCount - 1);
    } else {
      Carousel.selectPhoto(Carousel.currentPhotoIndex() - 1);
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
    Carousel.modal = Helper.utils.newElem('div', document.body, {
      'class': 'modal',
      'id': 'modal'
    });

    Carousel.modalContents = Helper.utils.newElem('div', modal, {
      'class': 'modalContents',
      'id': 'modalContents'
    });

    Carousel.modalImage = Helper.utils.newElem('img', modalContents, {
      'alt': 'currentPhoto',
      'id': 'currentPhoto',
      'class': 'modalImage'
    });

    Carousel.modalTitle = Helper.utils.newElem('figcaption', modalContents);

    var close = new CloseButton();
    close.init(modalContents);
    ['viewNext','viewPrev'].forEach(function(item) {
      var button = new NavigationButton();
      button.init(item, Carousel.modal);
    });

    window.addEventListener("keydown", function(e){
      // PREV
      if(e.keyCode == 37) Carousel.prevPhoto();

      // NEXT
      if(e.keyCode == 39) Carousel.nextPhoto();

      // ESC
      if(e.keyCode == 27) Carousel.hidePhoto();
    });

  },

  hidePhoto: function() {
    Carousel.modal.style.display = 'none';
    document.body.removeChild(Carousel.modalOverlay);
  },

  currentPhotoIndex: function() {
    return new Number(Carousel.modalImage.getAttribute('data-index'));
  },

  selectPhoto: function(index) {
    var thumb = document.getElementById(index);
    Carousel.modalImage.setAttribute('src', thumb.getAttribute('data-image-souce'));
    Carousel.modalTitle.innerHTML = thumb.getAttribute('data-title');
    Carousel.modalImage.setAttribute('data-index', index);
  },

  showPhoto: function(id) {
    // To-DO: make accessor function so you can simplify this code
    var thumb = document.getElementById(id);
    Carousel.modalImage.setAttribute('src', thumb.getAttribute('data-image-souce'));
    Carousel.modalImage.setAttribute('data-index', id);
    Carousel.modal.style.display = 'inline-block';

    Carousel.modalTitle.innerHTML = thumb.getAttribute('data-title');
    Carousel.modalOverlay = Helper.utils.newElem('div', document.body, {
      'class': 'modalOverlay'
    });
  }

};


function CloseButton() {

  this.init = function(target) {
    var close = this.makeButton(target);
    close.innerHTML = 'X';
    close.addEventListener("click", function(e) {
      Carousel.hidePhoto();
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

};


function NavigationButton() {

  this.init = function(direction, target) {

    var arrow = '&lt;';
    var button = Helper.utils.newElem('button', target, {
      'alt': direction,
      'class': 'photoNav ' + direction + ' galleryButton'
    });

    if (direction === 'viewNext') {
      arrow = '&gt;';
    }

    button.innerHTML = arrow;

    button.addEventListener("click", function(e) {
      (direction === 'viewNext') ? Carousel.nextPhoto() : Carousel.prevPhoto();
    });
  };

  return this;
}
/* 
 * Flickr Settings: move this out into it's own file.
 */

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
/* Launch point, maybe */
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
/* Helper.utils
 */

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
/*
 * NativeXHR
 */

function transferComplete(evt) {
  var res = JSON.parse(evt.target.response);
  // one image grid and one carousel.
  Heading.init(res.photoset);
  ImageGrid.init(res.photoset);
  Carousel.init();
}

var req = new XMLHttpRequest();
req.addEventListener("load", transferComplete);
req.open("GET", FlickrSettings.url());
req.send();
/* Thumbnails show small images in the grid, but each thumbnail also has 
 * the full size image recorded as a data attribute for the lightbox 
 */

function Thumbnail() {

  this.options = {
    flickrCDN:  "https://c6.staticflickr.com/",
    srcExtLarge: "_m.jpg",
    srcExtSmall: "_n.jpg"
  };

  this.init = function(index, opts) {

    var el;
    var item = opts.model;

    var smallSrc = "https://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + this.options.srcExtLarge;
    var largeSrc = this.options.flickrCDN + item.farm + "/" + item.server + "/" + item.id + "_" + item.secret + this.options.srcExtLarge;

    this.options.target = opts.target;

    el = Helper.utils.newElem('div', this.options.target, {
      'alt': 'thumbnail',
      'id': index,
      'class': 'thumbnail',
      'data-image-souce': largeSrc,
      'data-title': item.title,
      'data-id': item.id,
      'title': item.title
    });

    el.style.backgroundImage = "url(" + smallSrc + ")";

    el.addEventListener("click", function(e) {
      Carousel.showPhoto(e.target.getAttribute('id'));
    });
    
  };
  return this;
}}( window ));