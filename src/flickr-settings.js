/*
 * Flickr Settings: move this out into it's own file.
 */
'use strict';

var setIds = [
  //'1047939', // Vintage signs, from the East Bay, I think.
  '72157604010317412' // Wow Yosemite
];

var FlickrSettings = (function (setId) {

  var apiKey = '4fb7a02e3fbe80e509aa1719b82f23fd'; // This is mine, get your own. :P
  var pageLimit = 30;

  return {
    url: function() {
      return "https://api.flickr.com/services/rest/" + // API base URL
        "?method=flickr.photosets.getPhotos" +
        "&api_key=" + apiKey +  // Personal flickr API key
        "&photoset_id=" + setId +
        "&privacy_filter=1" +
        "&per_page=" + pageLimit +
        "&format=json&nojsoncallback=1";
    }
  };
})(setIds[Math.floor(Math.random()*setIds.length)]); // get one of the setIds at random