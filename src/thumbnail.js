/* Thumbnail: the small images of the grid. each thumbnail has 
 * the full size image recorded as a data attribute for the lightbox 
 */
'use strict';

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
}