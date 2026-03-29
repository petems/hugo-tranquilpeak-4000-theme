(() => {
  'use strict';

  class AboutCard {
    constructor() {
      this.openBtns = document.querySelectorAll(
        '#sidebar a[href*="#about"], #header a[href*="#about"]'
      );
      this.closeBtn = document.getElementById('about-btn-close');
      this.blog = document.getElementById('blog');
      this.about = document.getElementById('about');
      this.aboutCard = document.getElementById('about-card');
    }

    run() {
      this.openBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.play();
        });
      });

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.playBack();
        });
      }

      if (this.about) {
        this.about.addEventListener('click', (e) => {
          e.preventDefault();
          this.playBack();
        });
      }

      if (this.aboutCard) {
        this.aboutCard.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }
    }

    play() {
      // Fade out the blog
      if (this.blog) {
        this.blog.style.transition = 'opacity 0.3s ease';
        this.blog.style.opacity = '0';
        setTimeout(() => {
          this.blog.style.display = 'none';
        }, 300);
      }
      // Fade in the about overlay
      if (this.about) {
        this.about.style.display = 'block';
        this.about.style.transition = 'opacity 0.3s ease';
        this.about.style.opacity = '0';
        // Force reflow
        this.about.offsetHeight;
        this.about.style.opacity = '1';
      }
      // Drop the about card after fade
      setTimeout(() => {
        this.dropAboutCard();
      }, 300);
    }

    playBack() {
      this.liftAboutCard();
      setTimeout(() => {
        // Fade in blog
        if (this.blog) {
          this.blog.style.display = 'block';
          this.blog.style.opacity = '0';
          // Force reflow
          this.blog.offsetHeight;
          this.blog.style.opacity = '1';
        }
        // Fade out about overlay
        if (this.about) {
          this.about.style.opacity = '0';
          setTimeout(() => {
            this.about.style.display = 'none';
          }, 300);
        }
      }, 500);
    }

    dropAboutCard() {
      if (!this.aboutCard) return;

      const aboutCardHeight = this.aboutCard.clientHeight;
      let offsetTop = window.innerHeight / 2 - aboutCardHeight / 2 + aboutCardHeight;

      if (aboutCardHeight + 30 > window.innerHeight) {
        offsetTop = aboutCardHeight;
      }

      this.aboutCard.style.transition = 'none';
      this.aboutCard.style.top = '-' + aboutCardHeight + 'px';
      this.aboutCard.style.display = 'block';
      // Force reflow
      this.aboutCard.offsetHeight;
      this.aboutCard.style.transition = 'top 0.5s ease';
      this.aboutCard.style.top = offsetTop - aboutCardHeight + 'px';
    }

    liftAboutCard() {
      if (!this.aboutCard) return;

      const aboutCardHeight = this.aboutCard.clientHeight;
      let offsetTop = window.innerHeight / 2 - aboutCardHeight / 2 + aboutCardHeight;

      if (aboutCardHeight + 30 > window.innerHeight) {
        offsetTop = aboutCardHeight;
      }

      this.aboutCard.style.transition = 'top 0.5s ease';
      const currentTop = parseInt(this.aboutCard.style.top, 10) || 0;
      this.aboutCard.style.top = currentTop - offsetTop + 'px';

      setTimeout(() => {
        this.aboutCard.style.display = 'none';
        this.aboutCard.removeAttribute('style');
      }, 500);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const aboutCard = new AboutCard();
    aboutCard.run();
  });
})();
