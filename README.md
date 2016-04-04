# ar-gallery
Example SPA photo gallery using native JavaScript and tests.

Features
-------------

* Infinite Carousel with Previous / Next photo navigation
* Keyboard controls: ESC, ARROW-LEFT, ARROW-RIGHT
* Page title generated from photoset, Photographer credited
* Lightbox shows photo title
* Thumbnail has required alt attribute
* "Raw" browser javascript
* 'use strict';, linted ES5
* Responsive un-layout
* Supports any Flickr photoset
* If no photosset passed, shows random photoset from a short whitelist
* Components neatly in individual files
* Global scope is protected

Missing (to-do maybe)
-------------

* Current photo highlighted
* Uses thumb as lightbox placholder while loading larger image (hand-made progressive jpeg)
* Loading status bar
* Check IE 10+
* Click anywhere off lightbox image to close
* Accessibilize (Run Brendan McKeon's accessibility tool on gallery)
* Develop with live-reloading for speed
* Make sure that navigation buttons stay in the same place so one can click like a maniac
* Extract Flickr settings info out of Thumbnail
* Split photo navigation: when the cursor is toward one half of the image, navigation buttons brighten
* Could make this a plugin