'use strict';

describe("Heading", function() {

  beforeEach(function() {
    Heading.init(res.photoset);
  });

  afterEach(function() {
    var gallery = document.getElementById('gallery');
    var header = document.getElementsByTagName('header');
    gallery.removeChild(header[0]);
  });

  it("should add the heading to page", function() {
    var header = document.getElementsByTagName('header');
    expect(header.length).toEqual(1);
  });

  it("should show the name of the photoset", function() {
    var h1 = document.getElementsByTagName('h1');
    expect(h1[0].innerHTML).toEqual('"Vintage Signs"');
  });

  it("should credit the photographer", function() {
    var h2 = document.getElementsByTagName('h2');
    expect(h2[0].innerHTML).toEqual('By Paula Wirth');
  });

});