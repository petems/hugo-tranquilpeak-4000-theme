(() => {
  'use strict';

  class PostBottomBar {
    constructor() {
      this.postBottomBar = document.querySelector('.post-bottom-bar');
      this.postFooter = document.querySelector('.post-actions-wrap');
      this.header = document.getElementById('header');
      this.delta = 15;
      this.lastScrollTop = 0;
      this.lastScrollDownPos = 0;
      this.lastScrollUpPos = 0;
    }

    run() {
      let didScroll;

      this.swipePostBottomBar();

      window.addEventListener('scroll', () => {
        didScroll = true;
      });

      setInterval(() => {
        if (didScroll) {
          this.swipePostBottomBar();
          didScroll = false;
        }
      }, 250);
    }

    swipePostBottomBar() {
      if (!this.postBottomBar || !this.postFooter || !this.header) {
        return;
      }

      const scrollTop = window.scrollY;
      const postFooterRect = this.postFooter.getBoundingClientRect();
      const postFooterOffsetTop = postFooterRect.top + scrollTop;

      if (this.lastScrollTop > scrollTop) {
        if (
          Math.abs(this.lastScrollDownPos - scrollTop) > this.delta &&
          (postFooterOffsetTop + this.postFooter.offsetHeight > scrollTop + window.innerHeight ||
            postFooterOffsetTop < scrollTop + this.header.offsetHeight)
        ) {
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
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (
      document.querySelector('.post-bottom-bar') &&
      document.querySelector('.post-actions-wrap') &&
      document.getElementById('header')
    ) {
      const postBottomBar = new PostBottomBar();
      postBottomBar.run();
    }
  });
})();
