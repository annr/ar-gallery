
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

/* Carousel 
 *
 * Photo lightbox with next, previous and close buttons
 * Handles hide and show photo
 */

var Carousel = {
  init: function(elem) {
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

    var close = new CloseButton();
    close.init(modalContents);
    ['viewNext','viewPrev'].forEach(function(item) {
      var button = new NavigationButton();
      button.init(item, Carousel.modal);
    });

    window.addEventListener("keyup", function(e){
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
    Carousel.modalImage.setAttribute('data-index', index);
  },

  showPhoto: function(id) {
    // To-DO: make accessor function so you can simplify this code
    var thumb = document.getElementById(id);
    Carousel.modalImage.setAttribute('src', thumb.getAttribute('data-image-souce'));
    Carousel.modalImage.setAttribute('data-index', id);
    Carousel.modal.style.display = 'inline-block';

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
      'class': 'modalClose'
    });
  };

  return this;

};


function NavigationButton() {

  this.init = function(direction, target) {

    var arrow = '&lt;';
    var button = Helper.utils.newElem('button', target, {
      'alt': direction,
      'class': 'photoNav ' + direction
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
      'data-id': item.id
    });

    el.style.backgroundImage = "url(" + smallSrc + ")";

    el.addEventListener("click", function(e) {
      Carousel.showPhoto(e.target.getAttribute('id'));
    });
    
  };
  return this;
}

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

var rawRes = '{"photoset":{"id":"1047939","primary":"71973493","owner":"22653270@N00","ownername":"Paula Wirth","photo":[{"id":"5076508681","secret":"0cae33ea31","server":"4089","farm":5,"title":"feeling lucky?","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4790859508","secret":"9c062ea0b8","server":"4096","farm":5,"title":"Discoland Records","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4790223857","secret":"6d0f46ef15","server":"4115","farm":5,"title":"Ricci\'s Liquors","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4790855816","secret":"1790e83368","server":"4102","farm":5,"title":"SANCHEZ","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4790131203","secret":"9f7e1c3441","server":"4118","farm":5,"title":"the real deal","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4729015651","secret":"9586e6b372","server":"1342","farm":2,"title":"Parkway Theater","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4660252010","secret":"f58eeb82e2","server":"4029","farm":5,"title":"Bow & Arrow Motel","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4540125298","secret":"59f73aa975","server":"2713","farm":3,"title":"new customer","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4539489761","secret":"595a3ffce4","server":"4025","farm":5,"title":"Hofbrau","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4532907300","secret":"b69e769d97","server":"4068","farm":5,"title":"Madonna Inn","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4335401974","secret":"aceba2faca","server":"4012","farm":5,"title":"Oakland Fox Theatre","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4327375030","secret":"01992f0d4f","server":"2790","farm":3,"title":"renewing","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4286425468","secret":"f6117d20f0","server":"4072","farm":5,"title":"Carol\'s Apts","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"4262759899","secret":"a829bd0708","server":"4011","farm":5,"title":"giant value on mission","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3628476926","secret":"59c414fa1a","server":"3333","farm":4,"title":"EAT","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3627664771","secret":"001fb6b799","server":"2480","farm":3,"title":"IMG_5308","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3627664067","secret":"6e49bba9fe","server":"3032","farm":4,"title":"IMG_5301","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3628475170","secret":"cc61953a66","server":"2480","farm":3,"title":"IMG_5300","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3627662979","secret":"99239be708","server":"3611","farm":4,"title":"IMG_5299","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3609410907","secret":"fe8e8d8810","server":"3620","farm":4,"title":"he\'s got moxie","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3548284164","secret":"aa8bfdb28f","server":"3574","farm":4,"title":"it\'s a sign","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3488387016","secret":"7eb529c0b0","server":"3066","farm":4,"title":"Electric cherry","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3488382094","secret":"da68ee2379","server":"3614","farm":4,"title":"IMG_3658","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3488381592","secret":"056e7930ba","server":"3538","farm":4,"title":"IMG_3656","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3488381086","secret":"aa9d5b19c4","server":"3600","farm":4,"title":"IMG_3655","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3469803607","secret":"9bf63a5a91","server":"3629","farm":4,"title":"Homestyle","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3469733719","secret":"c337cbf296","server":"3521","farm":4,"title":"Real Homestyle Cooking","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3465175134","secret":"ecd8fc2802","server":"3624","farm":4,"title":"EAT","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3465125784","secret":"46ce1d4e65","server":"3593","farm":4,"title":"EAT","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"3464309847","secret":"e2dee6c8a7","server":"3616","farm":4,"title":"EAT","isprimary":"0","ispublic":1,"isfriend":0,"isfamily":0}],"page":1,"per_page":"30","perpage":"30","pages":14,"total":"415","title":"Vintage Signs"},"stat":"ok"}';

var res = JSON.parse(rawRes);

// one image grid and one carousel.

ImageGrid.init(res.photoset);
Carousel.init();