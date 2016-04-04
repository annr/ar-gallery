/*
 * NativeXHR
 */
'use strict';

function loadGrid(evt) {
  var res = JSON.parse(evt.target.response);
  var grid;
  // one image grid and one carousel.
  Heading.init(res.photoset);
  grid = ImageGrid.init(res.photoset);
  Carousel.init({'grid': grid});
}

var req = new XMLHttpRequest();
req.addEventListener("load", loadGrid);
req.open("GET", FlickrSettings.url());
req.send();