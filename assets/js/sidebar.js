(function() {
  'use strict';

  var Sidebar = function() {
    this.sidebar = document.getElementById('sidebar');
    this.openBtn = document.getElementById('btn-open-sidebar');
    this.closeBtns = document.querySelectorAll('#header, #main, .post-header-cover');
    this.header = document.getElementById('header');
    this.headerTitle = this.header ? this.header.querySelector('.header-title') : null;
    this.headerTitleLink = this.header ? this.header.querySelector('.header-title-link') : null;
    this.headerRightPicture = this.header ? this.header.querySelector('.header-right-picture') : null;

    // All elements that get the 'pushed' class
    var blogSelectors = '.post-bottom-bar, #main, .post-header-cover, .post, #bottom-bar .post-action-share';
    this.blogElements = Array.from(document.querySelectorAll(blogSelectors));
    if (this.header) this.blogElements.push(this.header);
    if (this.headerTitle) this.blogElements.push(this.headerTitle);
    if (this.headerRightPicture) this.blogElements.push(this.headerRightPicture);

    this.body = document.body;
    this.mediumScreenWidth = 768;
  };

  Sidebar.prototype = {
    run: function() {
      var self = this;

      if (this.openBtn) {
        this.openBtn.addEventListener('click', function() {
          if (!self.sidebar.classList.contains('pushed')) {
            self.openSidebar();
          }
        });
      }

      self.closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (self.sidebar.classList.contains('pushed')) {
            self.closeSidebar();
          }
        });
      });

      var xDown = null;
      var yDown = null;

      document.addEventListener('touchstart', function(e) {
        if (self.sidebar.classList.contains('pushed')) {
          var firstTouch = e.touches[0];
          xDown = firstTouch.clientX;
          yDown = firstTouch.clientY;
        }
      });

      document.addEventListener('touchmove', function(e) {
        if ((!xDown || !yDown) || !self.sidebar.classList.contains('pushed')) {
          return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            self.closeSidebar();
          }
        }

        xDown = null;
        yDown = null;
      });

      window.addEventListener('resize', function() {
        if (window.innerWidth > self.mediumScreenWidth) {
          self.resetSidebarPosition();
          self.resetBlogPosition();
        } else {
          self.closeSidebar();
        }
      });
    },

    openSidebar: function() {
      this.swipeBlogToRight();
      this.swipeSidebarToRight();
    },

    closeSidebar: function() {
      this.swipeSidebarToLeft();
      this.swipeBlogToLeft();
    },

    resetSidebarPosition: function() {
      this.sidebar.classList.remove('pushed');
    },

    resetBlogPosition: function() {
      this.blogElements.forEach(function(el) {
        el.classList.remove('pushed');
      });
    },

    swipeSidebarToRight: function() {
      var self = this;
      if (!this.sidebar.classList.contains('pushed') && !this.sidebar.classList.contains('processing')) {
        this.sidebar.classList.add('processing', 'pushed');
        this.body.style.overflowX = 'hidden';
        setTimeout(function() {
          self.sidebar.classList.remove('processing');
        }, 250);
      }
    },

    swipeSidebarToLeft: function() {
      var self = this;
      if (this.sidebar.classList.contains('pushed') && !this.sidebar.classList.contains('processing')) {
        this.sidebar.classList.add('processing');
        this.sidebar.classList.remove('pushed', 'processing');
        setTimeout(function() {
          self.body.style.overflowX = 'auto';
        }, 255);
      }
    },

    swipeBlogToRight: function() {
      var self = this;
      var elements = this.blogElements.slice();

      // Check if there is enough place for title and right picture
      if (this.header && this.headerTitleLink &&
        this.header.offsetWidth - this.sidebar.offsetWidth - this.headerTitleLink.offsetWidth < 130) {
        elements = elements.filter(function(el) {
          return el !== self.headerTitle && el !== self.headerRightPicture;
        });
      }

      var first = elements[0];
      if (first && !first.classList.contains('pushed') && !first.classList.contains('processing')) {
        elements.forEach(function(el) {
          el.classList.add('processing', 'pushed');
        });

        setTimeout(function() {
          elements.forEach(function(el) {
            el.classList.remove('processing');
          });
        }, 250);
      }
    },

    swipeBlogToLeft: function() {
      var self = this;
      var first = self.blogElements[0];
      if (first && first.classList.contains('pushed') && !first.classList.contains('processing')) {
        self.blogElements.forEach(function(el) {
          el.classList.add('processing');
          el.classList.remove('pushed');
        });

        setTimeout(function() {
          self.blogElements.forEach(function(el) {
            el.classList.remove('processing');
          });
        }, 250);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    var sidebar = new Sidebar();
    sidebar.run();
  });
})();
