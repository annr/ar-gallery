/* Carousel 
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