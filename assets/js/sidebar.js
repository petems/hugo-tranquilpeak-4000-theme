(() => {
  'use strict';

  class Sidebar {
    constructor() {
      this.sidebar = document.getElementById('sidebar');
      this.openBtn = document.getElementById('btn-open-sidebar');
      this.closeBtns = document.querySelectorAll('#header, #main, .post-header-cover');
      this.header = document.getElementById('header');
      this.headerTitle = this.header ? this.header.querySelector('.header-title') : null;
      this.headerTitleLink = this.header ? this.header.querySelector('.header-title-link') : null;
      this.headerRightPicture = this.header
        ? this.header.querySelector('.header-right-picture')
        : null;

      // All elements that get the 'pushed' class
      const blogSelectors =
        '.post-bottom-bar, #main, .post-header-cover, .post, #bottom-bar .post-action-share';
      this.blogElements = Array.from(document.querySelectorAll(blogSelectors));
      if (this.header) this.blogElements.push(this.header);
      if (this.headerTitle) this.blogElements.push(this.headerTitle);
      if (this.headerRightPicture) this.blogElements.push(this.headerRightPicture);

      this.body = document.body;
      this.mediumScreenWidth = 768;
    }

    run() {
      if (!this.sidebar) {
        return;
      }

      if (this.openBtn) {
        this.openBtn.addEventListener('click', () => {
          if (!this.sidebar.classList.contains('pushed')) {
            this.openSidebar();
          }
        });
      }

      this.closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.sidebar.classList.contains('pushed')) {
            this.closeSidebar();
          }
        });
      });

      let xDown = null;
      let yDown = null;

      document.addEventListener('touchstart', (e) => {
        if (this.sidebar.classList.contains('pushed')) {
          const firstTouch = e.touches[0];
          xDown = firstTouch.clientX;
          yDown = firstTouch.clientY;
        }
      });

      document.addEventListener('touchmove', (e) => {
        if (xDown === null || yDown === null || !this.sidebar.classList.contains('pushed')) {
          return;
        }

        const xUp = e.touches[0].clientX;
        const yUp = e.touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            this.closeSidebar();
          }
        }

        xDown = null;
        yDown = null;
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > this.mediumScreenWidth) {
          this.resetSidebarPosition();
          this.resetBlogPosition();
          this.body.style.overflowX = 'auto';
        } else {
          this.closeSidebar();
        }
      });
    }

    openSidebar() {
      this.swipeBlogToRight();
      this.swipeSidebarToRight();
    }

    closeSidebar() {
      this.swipeSidebarToLeft();
      this.swipeBlogToLeft();
    }

    resetSidebarPosition() {
      this.sidebar.classList.remove('pushed');
    }

    resetBlogPosition() {
      this.blogElements.forEach((el) => {
        el.classList.remove('pushed');
      });
    }

    swipeSidebarToRight() {
      if (
        !this.sidebar.classList.contains('pushed') &&
        !this.sidebar.classList.contains('processing')
      ) {
        this.sidebar.classList.add('processing', 'pushed');
        this.body.style.overflowX = 'hidden';
        setTimeout(() => {
          this.sidebar.classList.remove('processing');
        }, 250);
      }
    }

    swipeSidebarToLeft() {
      if (
        this.sidebar.classList.contains('pushed') &&
        !this.sidebar.classList.contains('processing')
      ) {
        this.sidebar.classList.add('processing');
        this.sidebar.classList.remove('pushed');
        setTimeout(() => {
          this.sidebar.classList.remove('processing');
          this.body.style.overflowX = 'auto';
        }, 255);
      }
    }

    swipeBlogToRight() {
      const elements = this.blogElements.slice();

      // Check if there is enough place for title and right picture
      if (
        this.header &&
        this.headerTitleLink &&
        this.header.offsetWidth - this.sidebar.offsetWidth - this.headerTitleLink.offsetWidth < 130
      ) {
        const filtered = elements.filter((el) => {
          return el !== this.headerTitle && el !== this.headerRightPicture;
        });
        elements.length = 0;
        for (const el of filtered) {
          elements.push(el);
        }
      }

      const first = elements[0];
      if (first && !first.classList.contains('pushed') && !first.classList.contains('processing')) {
        elements.forEach((el) => {
          el.classList.add('processing', 'pushed');
        });

        setTimeout(() => {
          elements.forEach((el) => {
            el.classList.remove('processing');
          });
        }, 250);
      }
    }

    swipeBlogToLeft() {
      const first = this.blogElements[0];
      if (first && first.classList.contains('pushed') && !first.classList.contains('processing')) {
        this.blogElements.forEach((el) => {
          el.classList.add('processing');
          el.classList.remove('pushed');
        });

        setTimeout(() => {
          this.blogElements.forEach((el) => {
            el.classList.remove('processing');
          });
        }, 250);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
    sidebar.run();
  });
})();
