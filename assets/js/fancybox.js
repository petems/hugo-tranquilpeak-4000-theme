(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    let lightbox;

    /**
     * Initialize the shared lightbox instance once.
     * @returns {Object} The GLightbox instance.
     */
    function initLightbox() {
      if (lightbox) {
        return lightbox;
      }
      if (typeof GLightbox !== 'function') {
        return null;
      }

      lightbox = GLightbox({
        selector: '.fancybox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: false
      });

      return lightbox;
    }

    initLightbox();

    window.smartresize(() => {
      if (lightbox && typeof lightbox.reload === 'function') {
        lightbox.reload();
      }
    });
  });
})();
