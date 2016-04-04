/* Thumbnail: the small images of the grid. each thumbnail has 
 * the full size image recorded as a data attribute for the lightbox 
 */
'use strict';

function Thumbnail() {

  this.options = {
    cdn:  "https://c6.staticflickr.com/",
    srcExt1: "_n.jpg",
    srcExt2: "_z.jpg"
  };

  this.init = function(index, opts) {
    var item = opts.model;

    var srcBase = this.options.cdn + item.farm + "/" + item.server + "/";
    var smallSrc = srcBase + item.id + "_" + item.secret + this.options.srcExt1;
    var largeSrc = srcBase + item.id + "_" + item.secret + this.options.srcExt2;

    this.options.target = opts.target;

    this.el = Helper.utils.newElem('div', this.options.target, {
      'alt': 'thumbnail',
      'id': index,
      'class': 'thumbnail',
      'data-image-souce': largeSrc,
      'data-title': item.title,
      'data-id': item.id,
      'title': item.title
    });

    this.el.style.backgroundImage = "url(" + smallSrc + ")";
    
  };
  return this;
}