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
      posts.forEach(function(post) {
        var lang = window.navigator.userLanguage || window.navigator.language || post.lang;

        html += '<div class="media">';
        if (post.thumbnailImageUrl) {
          html += '<div class="media-left">';
          html += '<a class="link-unstyled" href="' + (post.link || post.permalink) + '">';
          html += '<img class="media-image" src="' + post.thumbnailImageUrl + '" width="90" height="90"/>';
          html += '</a>';
          html += '</div>';
        }

        html += '<div class="media-body">';
        html += '<a class="link-unstyled" href="' + (post.link || post.permalink) + '">';
        html += '<h3 class="media-heading">' + post.title + '</h3>';
        html += '</a>';
        html += '<span class="media-meta">';
        html += '<span class="media-date text-small">';
        html += moment(post.date).locale(lang).format('ll');
        html += '</span>';
        html += '</span>';
        html += '<div class="media-content hide-xs font-merryweather">' + post.excerpt + '</div>';
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
      } else if (count === 1) {
        string = this.resultsCount.dataset.messageOne;
        if (this.noResults) this.noResults.style.display = 'none';
      } else if (count > 1) {
        string = this.resultsCount.dataset.messageOther.replace(/\{n\}/, count);
        if (this.noResults) this.noResults.style.display = 'none';
      }
      this.resultsCount.innerHTML = string;
    },

    showOverlay: function() {
      var overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
      overlay.offsetHeight;
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    },

    hideOverlay: function() {
      var overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(function() {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          document.body.style.overflow = 'auto';
        }, 300);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (typeof algoliaIndex !== 'undefined') {
      var searchModal = new SearchModal();
      searchModal.run();
    }
  });
})();
