/* Carousel 
 *
 * Photo lightbox with next, previous and close buttons
 * Handles hide and show photo
 */
'use strict';

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