(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var lightbox;

    /**
     * Initialize the shared lightbox instance once.
     * @returns {Object} The GLightbox instance.
     */
    function initLightbox() {
      if (lightbox) {
        return lightbox;
      }

      // Initialize GLightbox on elements with class 'fancybox'
      // GLightbox uses 'glightbox' class by default, so we configure the selector
      // eslint-disable-next-line new-cap
      lightbox = GLightbox({
        selector: '.fancybox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: false
      });

      return lightbox;
    }

    initLightbox();

    window.smartresize(function() {
      if (lightbox && typeof lightbox.reload === 'function') {
        lightbox.reload();
      }
    });
  });
})();
