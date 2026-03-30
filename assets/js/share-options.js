(() => {
  'use strict';

  class ShareOptionsBar {
    constructor() {
      this.shareOptionsBar = document.getElementById('share-options-bar');
      this.openBtns = document.querySelectorAll('.btn-open-shareoptions');
      this.closeBtn = document.getElementById('btn-close-shareoptions');
      this.body = document.body;
    }

    run() {
      this.openBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!this.shareOptionsBar.classList.contains('opened')) {
            this.openShareOptions();
            if (this.closeBtn) {
              this.closeBtn.style.display = '';
            }
          }
        });
      });

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => {
          if (this.shareOptionsBar.classList.contains('opened')) {
            this.closeShareOptions();
            this.closeBtn.style.display = 'none';
          }
        });
      }
    }

    openShareOptions() {
      if (
        !this.shareOptionsBar.classList.contains('opened') &&
        !this.shareOptionsBar.classList.contains('processing')
      ) {
        this.shareOptionsBar.classList.add('processing', 'opened');
        this.body.style.overflow = 'hidden';

        setTimeout(() => {
          this.shareOptionsBar.classList.remove('processing');
        }, 250);
      }
    }

    closeShareOptions() {
      if (
        this.shareOptionsBar.classList.contains('opened') &&
        !this.shareOptionsBar.classList.contains('processing')
      ) {
        this.shareOptionsBar.classList.add('processing');
        this.shareOptionsBar.classList.remove('opened');

        setTimeout(() => {
          this.shareOptionsBar.classList.remove('processing');
          this.body.style.overflow = '';
        }, 250);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const shareOptionsBar = new ShareOptionsBar();
    if (shareOptionsBar.shareOptionsBar) {
      shareOptionsBar.run();
    }
  });
})();
