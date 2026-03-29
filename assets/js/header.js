(() => {
  'use strict';

  class Header {
    constructor() {
      this.header = document.getElementById('header');
      this.headerHeight = this.header ? this.header.offsetHeight : 0;
      this.headerUpCSSClass = 'header-up';
      this.delta = 15;
      this.lastScrollTop = 0;
    }

    run() {
      if (!this.header) {
        return;
      }

      let didScroll;

      window.addEventListener('scroll', () => {
        didScroll = true;
      });

      setInterval(() => {
        if (didScroll) {
          this.animate();
          didScroll = false;
        }
      }, 250);
    }

    animate() {
      const scrollTop = window.scrollY;

      if (Math.abs(this.lastScrollTop - scrollTop) <= this.delta) {
        return;
      }

      if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
        this.header.classList.add(this.headerUpCSSClass);
      } else if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
        this.header.classList.remove(this.headerUpCSSClass);
      }

      this.lastScrollTop = scrollTop;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const header = new Header();
    header.run();
  });
})();
