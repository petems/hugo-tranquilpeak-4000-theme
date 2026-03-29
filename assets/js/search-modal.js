(function() {
  'use strict';

  var SearchModal = function() {
    this.searchModal = document.getElementById('algolia-search-modal');
    this.openButtons = document.querySelectorAll('.open-algolia-search');
    this.closeButton = this.searchModal ? this.searchModal.querySelector('.close-button') : null;
    this.searchForm = document.getElementById('algolia-search-form');
    this.searchInput = document.getElementById('algolia-search-input');
    this.results = this.searchModal ? this.searchModal.querySelector('.results') : null;
    this.noResults = this.searchModal ? this.searchModal.querySelector('.no-result') : null;
    this.resultsCount = this.searchModal ? this.searchModal.querySelector('.results-count') : null;
    this.algolia = typeof algoliaIndex !== 'undefined' ? algoliaIndex : null;
  };

  SearchModal.prototype = {
    run: function() {
      var self = this;

      self.openButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          self.open();
        });
      });

      document.addEventListener('keyup', function(event) {
        var target = event.target || event.srcElement;
        var tagName = target.tagName.toUpperCase();
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
          return;
        }

        if (event.keyCode === 83 && !self.isVisible(self.searchModal)) {
          self.open();
        }
      });

      if (self.searchModal) {
        self.searchModal.addEventListener('click', function(e) {
          if (e.target === this) {
            self.close();
          }
        });
      }

      if (self.closeButton) {
        self.closeButton.addEventListener('click', function() {
          self.close();
        });
      }

      document.addEventListener('keyup', function(e) {
        if (e.keyCode === 27 && self.isVisible(self.searchModal)) {
          self.close();
        }
      });

      if (self.searchForm) {
        self.searchForm.addEventListener('submit', function(event) {
          event.preventDefault();
          self.search(self.searchInput.value);
        });
      }
    },

    isVisible: function(el) {
      return el && el.style.display !== 'none' && el.offsetParent !== null;
    },

    open: function() {
      if (this.isVisible(this.searchModal)) {
        return;
      }

      this.showSearchModal();
      this.showOverlay();
      if (this.searchInput) this.searchInput.focus();
    },

    close: function() {
      this.hideSearchModal();
      this.hideOverlay();
      if (this.searchInput) this.searchInput.blur();
    },

    search: function(search) {
      var self = this;
      if (!this.algolia) return;
      this.algolia.search(search, function(err, content) {
        if (!err) {
          self.showResults(content.hits);
          self.showResultsCount(content.nbHits);
        }
      });
    },

    showResults: function(posts) {
      var html = '';

      /**
       * Escape text content before building HTML strings.
       * @param {String} value - Untrusted text value.
       * @returns {String} Escaped HTML.
       */
      function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function(character) {
          return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;'
          }[character];
        });
      }

      /**
       * Block dangerous URLs before injecting attributes.
       * @param {String} value - Candidate URL from Algolia.
       * @returns {String} Safe URL or '#'.
       */
      function sanitizeUrl(value) {
        var url = String(value || '');

        if (!url) {
          return '#';
        }

        if (/^\s*(javascript|data):/i.test(url)) {
          return '#';
        }

        return escapeHtml(url);
      }

      posts.forEach(function(post) {
        var lang = window.navigator.userLanguage || window.navigator.language || post.lang;
        var permalink = sanitizeUrl(post.link || post.permalink);
        var thumbnailUrl = sanitizeUrl(post.thumbnailImageUrl);
        var title = escapeHtml(post.title);
        var excerpt = escapeHtml(post.excerpt);

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
    },

    showSearchModal: function() {
      if (!this.searchModal) return;
      this.searchModal.style.display = '';
      this.searchModal.style.transition = 'opacity 0.3s ease';
      this.searchModal.style.opacity = '0';
      this.searchModal.offsetHeight;
      this.searchModal.style.opacity = '1';
    },

    hideSearchModal: function() {
      var self = this;
      if (!this.searchModal) return;
      this.searchModal.style.opacity = '0';
      setTimeout(function() {
        self.searchModal.style.display = 'none';
      }, 300);
    },

    showResultsCount: function(count) {
      if (!this.resultsCount) return;
      var string = '';
      if (count < 1) {
        string = this.resultsCount.dataset.messageZero;
        if (this.noResults) this.noResults.style.display = '';
      }
      else if (count === 1) {
        string = this.resultsCount.dataset.messageOne;
        if (this.noResults) this.noResults.style.display = 'none';
      }
      else if (count > 1) {
        string = this.resultsCount.dataset.messageOther.replace(/\{n\}/, count);
        if (this.noResults) this.noResults.style.display = 'none';
      }
      this.resultsCount.innerHTML = string;
    },

    showOverlay: function() {
      if (document.querySelector('.overlay')) {
        document.body.style.overflow = 'hidden';
        return;
      }

      var overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
      overlay.offsetHeight;
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    },

    hideOverlay: function() {
      var overlays = document.querySelectorAll('.overlay');

      overlays.forEach(function(overlay) {
        overlay.style.opacity = '0';
        setTimeout(function() {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 300);
      });

      document.body.style.overflow = 'auto';
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (typeof algoliaIndex !== 'undefined') {
      var searchModal = new SearchModal();
      searchModal.run();
    }
  });
})();
