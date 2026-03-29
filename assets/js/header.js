(function() {
  'use strict';

  var Header = function() {
    this.header = document.getElementById('header');
    this.headerHeight = this.header.offsetHeight;
    this.headerUpCSSClass = 'header-up';
    this.delta = 15;
    this.lastScrollTop = 0;
  };

  Header.prototype = {
    run: function() {
      var self = this;
      var didScroll;

      window.addEventListener('scroll', function() {
        didScroll = true;
      });

      setInterval(function() {
        if (didScroll) {
          self.animate();
          didScroll = false;
        }
      }, 250);
    },

    animate: function() {
      var scrollTop = window.scrollY;

      if (Math.abs(this.lastScrollTop - scrollTop) <= this.delta) {
        return;
      }

      if ((scrollTop > this.lastScrollTop) && (scrollTop > this.headerHeight)) {
        this.header.classList.add(this.headerUpCSSClass);
      } else if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
        this.header.classList.remove(this.headerUpCSSClass);
      }

      this.lastScrollTop = scrollTop;
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    var header = new Header();
    header.run();
  });
})();
