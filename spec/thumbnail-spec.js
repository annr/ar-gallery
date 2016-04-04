'use strict';

var thumb, 
    index = 0, 
    photo = {
      "id":"5076508681",
      "secret":"0cae33ea31",
      "server":"4089",
      "farm":5,
      "title":"feeling lucky?"
    };

var gallery = document.getElementById('gallery');
var grid = document.createElement('div');

describe("Thumbnail", function() {

  beforeEach(function() {
    gallery.appendChild(grid);
    thumb = new Thumbnail();
    thumb.init(index, { 'model': photo, 'target': grid });
  });

  afterEach(function() {
    gallery.removeChild(grid);
  });

  it("should have a number of attributes set", function() {
    expect(thumb.el.getAttribute('id')).toEqual(index.toString());
    expect(thumb.el.getAttribute('alt')).toEqual('thumbnail');
    expect(thumb.el.getAttribute('class')).toEqual('thumbnail');
    expect(thumb.el.getAttribute('data-title')).toEqual(photo['title']);
    expect(thumb.el.getAttribute('title')).toEqual(photo['title']);
  });

  xit("should have a different image set for the background and data-image-source", function() {

  });

});