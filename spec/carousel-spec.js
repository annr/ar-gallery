'use strict';

describe("Carousel", function() {
  var carousel;

  beforeEach(function() {

    ImageGrid.init(res.photoset);
    carousel = new Carousel();
    carousel.init({ 'imagesCount': ImageGrid.imagesCount });
    carousel.selectPhoto(1);

  });

  afterEach(function() {

    var gallery = document.getElementById('gallery');
    var modal = document.getElementById('modal');
    gallery.removeChild(modal);

  });

  it("should have imagesCount set", function() {
    expect(carousel.imagesCount).toEqual(30);
  });

  it("selects a photo", function() {
    var current = carousel.currentPhotoIndex();
    expect(carousel.currentPhotoIndex()).toEqual(1);
  });

  it("navigates to the next photo", function() {
    var current = carousel.currentPhotoIndex();
    carousel.nextPhoto();
    expect(carousel.currentPhotoIndex()).toEqual(current + 1);

    carousel.selectPhoto(29);
    carousel.nextPhoto();
    expect(carousel.currentPhotoIndex()).toEqual(0);
  });

  it("navigates to the previous photo", function() {
    var current = carousel.currentPhotoIndex();
    carousel.prevPhoto();
    expect(carousel.currentPhotoIndex()).toEqual(current - 1);

    carousel.selectPhoto(0);
    carousel.prevPhoto();
    expect(carousel.currentPhotoIndex()).toEqual(29);
  });

});