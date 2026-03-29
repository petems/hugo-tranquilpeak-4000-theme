(function() {
  'use strict';

  var ImageGallery = function() {
    this.photosBox = '.photo-box';
    this.images = document.querySelectorAll(this.photosBox + ' img');
  };

  ImageGallery.prototype = {
    run: function() {
      var self = this;
      self.resizeImages();
      window.smartresize(function() {
        self.resizeImages();
      });
    },

    resizeImages: function() {
      this.images.forEach(function(image) {
        var photoBox = image.parentElement.parentElement;
        var photoBoxWidth = photoBox.offsetWidth;
        var photoBoxHeight = photoBox.clientHeight;
        var imageWidth = image.offsetWidth;
        var imageHeight = image.offsetHeight;
        var imageRatio;

        if (imageHeight < photoBoxHeight) {
          imageRatio = imageWidth / imageHeight;
          image.style.height = photoBoxHeight + 'px';
          image.style.width = (photoBoxHeight * imageRatio) + 'px';
          image.parentElement.style.left = '-' + (((photoBoxHeight * imageRatio) / 2) - (photoBoxWidth / 2)) + 'px';
        }

        imageWidth = image.offsetWidth;
        imageHeight = image.offsetHeight;

        if (imageWidth < photoBoxWidth) {
          imageRatio = imageHeight / imageWidth;
          image.style.width = photoBoxWidth + 'px';
          image.style.height = (photoBoxWidth * imageRatio) + 'px';
          image.parentElement.style.top = '-' + ((imageHeight / 2) - (photoBoxHeight / 2)) + 'px';
        }

        if (imageHeight > photoBoxHeight) {
          image.parentElement.style.top = '-' + ((imageHeight / 2) - (photoBoxHeight / 2)) + 'px';
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.image-gallery')) {
      var imageGallery = new ImageGallery();
      setTimeout(function() {
        imageGallery.run();
      }, 500);
    }
  });
})();
