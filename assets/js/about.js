(function() {
  'use strict';

  var AboutCard = function() {
    this.openBtns = document.querySelectorAll('#sidebar a[href*="#about"], #header a[href*="#about"]');
    this.closeBtn = document.getElementById('about-btn-close');
    this.blog = document.getElementById('blog');
    this.about = document.getElementById('about');
    this.aboutCard = document.getElementById('about-card');
  };

  AboutCard.prototype = {
    run: function() {
      var self = this;

      self.openBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          self.play();
        });
      });

      if (self.closeBtn) {
        self.closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          self.playBack();
        });
      }

      if (self.about) {
        self.about.addEventListener('click', function(e) {
          e.preventDefault();
          self.playBack();
        });
      }

      if (self.aboutCard) {
        self.aboutCard.addEventListener('click', function(event) {
          event.stopPropagation();
        });
      }
    },

    play: function() {
      var self = this;
      // Fade out the blog
      if (self.blog) {
        self.blog.style.transition = 'opacity 0.3s ease';
        self.blog.style.opacity = '0';
        setTimeout(function() {
          self.blog.style.display = 'none';
        }, 300);
      }
      // Fade in the about overlay
      if (self.about) {
        self.about.style.display = 'block';
        self.about.style.transition = 'opacity 0.3s ease';
        self.about.style.opacity = '0';
        // Force reflow
        self.about.offsetHeight;
        self.about.style.opacity = '1';
      }
      // Drop the about card after fade
      setTimeout(function() {
        self.dropAboutCard();
      }, 300);
    },

    playBack: function() {
      var self = this;
      self.liftAboutCard();
      setTimeout(function() {
        // Fade in blog
        if (self.blog) {
          self.blog.style.display = 'block';
          self.blog.style.opacity = '0';
          // Force reflow
          self.blog.offsetHeight;
          self.blog.style.opacity = '1';
        }
        // Fade out about overlay
        if (self.about) {
          self.about.style.opacity = '0';
          setTimeout(function() {
            self.about.style.display = 'none';
          }, 300);
        }
      }, 500);
    },

    dropAboutCard: function() {
      var self = this;
      if (!self.aboutCard) return;

      var aboutCardHeight = self.aboutCard.clientHeight;
      var offsetTop = (window.innerHeight / 2) - (aboutCardHeight / 2) + aboutCardHeight;

      if (aboutCardHeight + 30 > window.innerHeight) {
        offsetTop = aboutCardHeight;
      }

      self.aboutCard.style.transition = 'none';
      self.aboutCard.style.top = '-' + aboutCardHeight + 'px';
      self.aboutCard.style.display = 'block';
      // Force reflow
      self.aboutCard.offsetHeight;
      self.aboutCard.style.transition = 'top 0.5s ease';
      self.aboutCard.style.top = (offsetTop - aboutCardHeight) + 'px';
    },

    liftAboutCard: function() {
      var self = this;
      if (!self.aboutCard) return;

      var aboutCardHeight = self.aboutCard.clientHeight;
      var offsetTop = (window.innerHeight / 2) - (aboutCardHeight / 2) + aboutCardHeight;

      if (aboutCardHeight + 30 > window.innerHeight) {
        offsetTop = aboutCardHeight;
      }

      self.aboutCard.style.transition = 'top 0.5s ease';
      var currentTop = parseInt(self.aboutCard.style.top, 10) || 0;
      self.aboutCard.style.top = (currentTop - offsetTop) + 'px';

      setTimeout(function() {
        self.aboutCard.style.display = 'none';
        self.aboutCard.removeAttribute('style');
      }, 500);
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    var aboutCard = new AboutCard();
    aboutCard.run();
  });
})();
