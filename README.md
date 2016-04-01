# ar-gallery
Example SPA photo gallery using native javascript and tests.

Features
-------------

* Keyboard-controlled infinited carousel: ESC, ARROW-LEFT, ARROW-RIGHT
* Previous / Next photo navigation
* Page title generated from photoset. Photographer credited.
* Lightbox shows photo title, thumbnail has title attribute set
* "Raw" browser javascript
* 'use strict'; Linted ES5
* Responsive un-layout
* Supports any Flickr photoset
* Shows random photoset from a short whitelist

Missing (to-do maybe)
-------------

* Bigger images required
* Add tests
* Protect global scope
* Components in individual files
* Current photo highlighted
* Uses thumb as lightbox placholder while loading larger image (hand-made progressive jpeg)
* Check IE 10+
* Click anywhere off lightbox image to close
* Accessibilize (Run Brendan McKeon's accessibility tool on gallery)
* Develop with live-reloading for speed
* Make sure that navigation buttons stay in the same place so one can click like a maniac