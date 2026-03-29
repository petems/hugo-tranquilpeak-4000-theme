(function() {
  'use strict';

  var PostBottomBar = function() {
    this.postBottomBar = document.querySelector('.post-bottom-bar');
    this.postFooter = document.querySelector('.post-actions-wrap');
    this.header = document.getElementById('header');
    this.delta = 15;
    this.lastScrollTop = 0;
    this.lastScrollDownPos = 0;
    this.lastScrollUpPos = 0;
  };

  PostBottomBar.prototype = {
    run: function() {
      var self = this;
      var didScroll;

      self.swipePostBottomBar();

      window.addEventListener('scroll', function() {
        didScroll = true;
      });

      setInterval(function() {
        if (didScroll) {
          self.swipePostBottomBar();
          didScroll = false;
        }
      }, 250);
    },

    swipePostBottomBar: function() {
      if (!this.postBottomBar || !this.postFooter || !this.header) {
        return;
      }

      var scrollTop = window.scrollY;
      var postFooterRect = this.postFooter.getBoundingClientRect();
      var postFooterOffsetTop = postFooterRect.top + scrollTop;

      if (this.lastScrollTop > scrollTop) {
        if (Math.abs(this.lastScrollDownPos - scrollTop) > this.delta &&
          (postFooterOffsetTop + this.postFooter.offsetHeight > scrollTop + window.innerHeight ||
            postFooterOffsetTop < scrollTop + this.header.offsetHeight)) {
          this.postBottomBar.style.display = '';
          this.postBottomBar.classList.add('visible');
          this.lastScrollUpPos = scrollTop;
        }
      }

      if (scrollTop > this.lastScrollUpPos + this.delta) {
        this.postBottomBar.classList.remove('visible');
        this.lastScrollDownPos = scrollTop;
      }

      this.lastScrollTop = scrollTop;
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.post-bottom-bar') &&
      document.querySelector('.post-actions-wrap') &&
      document.getElementById('header')) {
      var postBottomBar = new PostBottomBar();
      postBottomBar.run();
    }
  });
})();
