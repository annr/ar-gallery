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