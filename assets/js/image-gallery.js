(() => {
  'use strict';

  class ImageGallery {
    constructor() {
      this.photosBox = '.photo-box';
      this.images = document.querySelectorAll(this.photosBox + ' img');
    }

    run() {
      this.resizeImages();
      window.smartresize(() => {
        this.resizeImages();
      });
    }

    resizeImages() {
      this.images.forEach((image) => {
        const photoBox = image.parentElement.parentElement;
        const photoBoxWidth = photoBox.offsetWidth;
        const photoBoxHeight = photoBox.clientHeight;
        let imageWidth = image.offsetWidth;
        let imageHeight = image.offsetHeight;
        let imageRatio;

        if (imageHeight < photoBoxHeight) {
          imageRatio = imageWidth / imageHeight;
          image.style.height = photoBoxHeight + 'px';
          image.style.width = photoBoxHeight * imageRatio + 'px';
          image.parentElement.style.left =
            '-' + ((photoBoxHeight * imageRatio) / 2 - photoBoxWidth / 2) + 'px';
        }

        imageWidth = image.offsetWidth;
        imageHeight = image.offsetHeight;

        if (imageWidth < photoBoxWidth) {
          imageRatio = imageHeight / imageWidth;
          image.style.width = photoBoxWidth + 'px';
          image.style.height = photoBoxWidth * imageRatio + 'px';
          imageHeight = image.offsetHeight;
          image.parentElement.style.top = '-' + (imageHeight / 2 - photoBoxHeight / 2) + 'px';
        }

        if (imageHeight > photoBoxHeight) {
          image.parentElement.style.top = '-' + (imageHeight / 2 - photoBoxHeight / 2) + 'px';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.image-gallery')) {
      const imageGallery = new ImageGallery();
      setTimeout(() => {
        imageGallery.run();
      }, 500);
    }
  });
})();
