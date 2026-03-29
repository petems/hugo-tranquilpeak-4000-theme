(function() {
  'use strict';

  var ShareOptionsBar = function() {
    this.shareOptionsBar = document.getElementById('share-options-bar');
    this.openBtns = document.querySelectorAll('.btn-open-shareoptions');
    this.closeBtn = document.getElementById('btn-close-shareoptions');
    this.body = document.body;
  };

  ShareOptionsBar.prototype = {
    run: function() {
      var self = this;

      self.openBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (!self.shareOptionsBar.classList.contains('opened')) {
            self.openShareOptions();
            self.closeBtn.style.display = '';
          }
        });
      });

      if (self.closeBtn) {
        self.closeBtn.addEventListener('click', function() {
          if (self.shareOptionsBar.classList.contains('opened')) {
            self.closeShareOptions();
            self.closeBtn.style.display = 'none';
          }
        });
      }
    },

    openShareOptions: function() {
      var self = this;

      if (!self.shareOptionsBar.classList.contains('opened') &&
        !self.shareOptionsBar.classList.contains('processing')) {
        self.shareOptionsBar.classList.add('processing', 'opened');
        self.body.style.overflow = 'hidden';

        setTimeout(function() {
          self.shareOptionsBar.classList.remove('processing');
        }, 250);
      }
    },

    closeShareOptions: function() {
      var self = this;

      if (self.shareOptionsBar.classList.contains('opened') &&
        !self.shareOptionsBar.classList.contains('processing')) {
        self.shareOptionsBar.classList.add('processing');
        self.shareOptionsBar.classList.remove('opened');

        setTimeout(function() {
          self.shareOptionsBar.classList.remove('processing');
          self.body.style.overflow = '';
        }, 250);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    var shareOptionsBar = new ShareOptionsBar();
    shareOptionsBar.run();
  });
})();
