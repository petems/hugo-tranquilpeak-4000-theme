(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    function initLightbox() {
      // Initialize GLightbox on elements with class 'fancybox'
      // GLightbox uses 'glightbox' class by default, so we configure the selector
      var lightbox = GLightbox({
        selector: '.fancybox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: false
      });
    }

    initLightbox();

    window.smartresize(function() {
      initLightbox();
    });
  });
})();
