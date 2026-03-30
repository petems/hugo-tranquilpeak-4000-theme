(() => {
  'use strict';

  class SearchModal {
    constructor() {
      this.searchModal = document.getElementById('algolia-search-modal');
      this.openButtons = document.querySelectorAll('.open-algolia-search');
      this.closeButton = this.searchModal ? this.searchModal.querySelector('.close-button') : null;
      this.searchForm = document.getElementById('algolia-search-form');
      this.searchInput = document.getElementById('algolia-search-input');
      this.results = this.searchModal ? this.searchModal.querySelector('.results') : null;
      this.noResults = this.searchModal ? this.searchModal.querySelector('.no-result') : null;
      this.resultsCount = this.searchModal
        ? this.searchModal.querySelector('.results-count')
        : null;
      this.algolia = typeof algoliaIndex !== 'undefined' ? algoliaIndex : null;
    }

    run() {
      this.openButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.open();
        });
      });

      document.addEventListener('keyup', (event) => {
        const target = event.target || event.srcElement;
        const tagName = target.tagName.toUpperCase();
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
          return;
        }

        if (event.keyCode === 83 && !this.isVisible(this.searchModal)) {
          this.open();
        }
      });

      if (this.searchModal) {
        this.searchModal.addEventListener('click', (e) => {
          if (e.target === this.searchModal) {
            this.close();
          }
        });
      }

      if (this.closeButton) {
        this.closeButton.addEventListener('click', () => {
          this.close();
        });
      }

      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27 && this.isVisible(this.searchModal)) {
          this.close();
        }
      });

      if (this.searchForm) {
        this.searchForm.addEventListener('submit', (event) => {
          event.preventDefault();
          this.search(this.searchInput.value);
        });
      }
    }

    isVisible(el) {
      return el && el.style.display !== 'none' && el.offsetParent !== null;
    }

    open() {
      if (!this.searchModal || this.isVisible(this.searchModal)) {
        return;
      }

      this.showSearchModal();
      this.showOverlay();
      if (this.searchInput) this.searchInput.focus();
    }

    close() {
      this.hideSearchModal();
      this.hideOverlay();
      if (this.searchInput) this.searchInput.blur();
    }

    search(search) {
      if (!this.algolia) return;
      this.algolia.search(search, (err, content) => {
        if (!err) {
          this.showResults(content.hits);
          this.showResultsCount(content.nbHits);
        }
      });
    }

    showResults(posts) {
      let html = '';

      /**
       * Escape text content before building HTML strings.
       * @param {String} value - Untrusted text value.
       * @returns {String} Escaped HTML.
       */
      function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, (character) => {
          return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
          }[character];
        });
      }

      /**
       * Block dangerous URLs before injecting attributes.
       * @param {String} value - Candidate URL from Algolia.
       * @returns {String} Safe URL or '#'.
       */
      function sanitizeUrl(value) {
        const url = String(value || '');

        if (!url) {
          return '#';
        }

        if (/^\s*(javascript|data):/i.test(url)) {
          return '#';
        }

        return escapeHtml(url);
      }

      posts.forEach((post) => {
        const lang = window.navigator.userLanguage || window.navigator.language || post.lang;
        const permalink = sanitizeUrl(post.link || post.permalink);
        const thumbnailUrl = sanitizeUrl(post.thumbnailImageUrl);
        const title = escapeHtml(post.title);
        const excerpt = escapeHtml(post.excerpt);

        html += '<div class="media">';
        if (thumbnailUrl !== '#') {
          html += '<div class="media-left">';
          html += '<a class="link-unstyled" href="' + permalink + '">';
          html += '<img class="media-image" src="' + thumbnailUrl + '" width="90" height="90"/>';
          html += '</a>';
          html += '</div>';
        }

        html += '<div class="media-body">';
        html += '<a class="link-unstyled" href="' + permalink + '">';
        html += '<h3 class="media-heading">' + title + '</h3>';
        html += '</a>';
        html += '<span class="media-meta">';
        html += '<span class="media-date text-small">';
        html += moment(post.date).locale(lang).format('ll');
        html += '</span>';
        html += '</span>';
        html += '<div class="media-content hide-xs font-merryweather">' + excerpt + '</div>';
        html += '</div>';
        html += '<div style="clear:both;"></div>';
        html += '<hr>';
        html += '</div>';
      });
      if (this.results) this.results.innerHTML = html;
    }

    showSearchModal() {
      if (!this.searchModal) return;
      this.searchModal.style.display = '';
      this.searchModal.style.transition = 'opacity 0.3s ease';
      this.searchModal.style.opacity = '0';
      this.searchModal.offsetHeight;
      this.searchModal.style.opacity = '1';
    }

    hideSearchModal() {
      if (!this.searchModal) return;
      this.searchModal.style.opacity = '0';
      setTimeout(() => {
        this.searchModal.style.display = 'none';
      }, 300);
    }

    showResultsCount(count) {
      if (!this.resultsCount) return;
      let string = '';
      if (count < 1) {
        string = this.resultsCount.dataset.messageZero;
        if (this.noResults) this.noResults.style.display = '';
      } else if (count === 1) {
        string = this.resultsCount.dataset.messageOne;
        if (this.noResults) this.noResults.style.display = 'none';
      } else if (count > 1) {
        string = this.resultsCount.dataset.messageOther.replace(/\{n\}/, count);
        if (this.noResults) this.noResults.style.display = 'none';
      }
      this.resultsCount.innerHTML = string;
    }

    showOverlay() {
      if (document.querySelector('.overlay')) {
        document.body.style.overflow = 'hidden';
        return;
      }

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
      overlay.offsetHeight;
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    }

    hideOverlay() {
      const overlays = document.querySelectorAll('.overlay');

      overlays.forEach((overlay) => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 300);
      });

      document.body.style.overflow = 'auto';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof algoliaIndex !== 'undefined') {
      const searchModal = new SearchModal();
      searchModal.run();
    }
  });
})();
