'use strict';

describe("ImageGrid", function() {

  beforeEach(function() {
    ImageGrid.init(res.photoset);
  });

  afterEach(function() {
    var gallery = document.getElementById('gallery');
    var imageGrid = document.getElementById('grid');
    gallery.removeChild(imageGrid);
  });

  it("should add a grid of thumbnails", function() {
    var thumbnails = document.getElementsByClassName('thumbnail');
    expect(thumbnails.length).toEqual(30);
  });

  it("should have imagesCount set", function() {
    expect(ImageGrid.imagesCount).toEqual(30);
  });

});