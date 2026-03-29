(function() {
  'use strict';

  // Filter posts by using their date on archives page : `/archives`

  /**
   * ArchivesFilter
   * @param {String} archivesElem
   * @constructor
   */
  var ArchivesFilter = function(archivesElem) {
    var container = document.querySelector(archivesElem);
    this.form = container.querySelector('#filter-form');
    this.searchInput = container.querySelector('input[name=date]');
    this.archiveResult = container.querySelector('.archive-result');
    this.postsYear = container.querySelectorAll('.archive-year');
    this.postsMonth = container.querySelectorAll('.archive-month');
    this.postsDay = container.querySelectorAll('.archive-day');
    this.containerSelector = archivesElem;
    this.messages = {
      zero: this.archiveResult.dataset.messageZero,
      one: this.archiveResult.dataset.messageOne,
      other: this.archiveResult.dataset.messageOther
    };
  };

  ArchivesFilter.prototype = {

    /**
     * Run ArchivesFilter feature
     * @return {void}
     */
    run: function() {
      var self = this;

      self.searchInput.addEventListener('keyup', function() {
        self.filter(self.sliceDate(self.getSearch()));
      });

      // Block submit action
      self.form.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    },

    /**
     * Get Filter entered by user
     * @returns {String} The date entered by the user
     */
    getSearch: function() {
      return this.searchInput.value.replace(/([\/|.|-])/g, '').toLowerCase();
    },

    /**
     * Slice the date by year, month and day
     * @param {String} date - The date of the post
     * @returns {Array} The date of the post splitted in a list
     */
    sliceDate: function(date) {
      return [
        date.slice(0, 4),
        date.slice(4, 6),
        date.slice(6)
      ];
    },

    /**
     * Show related posts and hide others
     * @param {String} date - The date of the post
     * @returns {void}
     */
    filter: function(date) {
      var numberPosts;

      // Check if the search is empty
      if (date[0] === '') {
        this.showAll();
        this.showResult(-1);
      }
      else {
        numberPosts = this.countPosts(date);

        this.hideAll();
        this.showResult(numberPosts);

        if (numberPosts > 0) {
          this.showPosts(date);
        }
      }
    },

    /**
     * Display results
     * @param {Number} numbPosts - The number of posts found
     * @returns {void}
     */
    showResult: function(numbPosts) {
      if (numbPosts === -1) {
        this.archiveResult.innerHTML = '';
        this.archiveResult.style.display = 'none';
      }
      else if (numbPosts === 0) {
        this.archiveResult.innerHTML = this.messages.zero;
        this.archiveResult.style.display = '';
      }
      else if (numbPosts === 1) {
        this.archiveResult.innerHTML = this.messages.one;
        this.archiveResult.style.display = '';
      }
      else {
        this.archiveResult.innerHTML = this.messages.other.replace(/\{n\}/, numbPosts);
        this.archiveResult.style.display = '';
      }
    },

    /**
     * Count number of posts
     * @param {String} date - The date of the post
     * @returns {Number} The number of posts found
     */
    countPosts: function(date) {
      var selector = this.containerSelector + ' .archive-day[data-date^="' + date[0] + date[1] + date[2] + '"]';
      return document.querySelectorAll(selector).length;
    },

    /**
     * Show all posts from a date
     * @param {String} date - The date of the post
     * @returns {void}
     */
    showPosts: function(date) {
      var sel = this.containerSelector;
      document.querySelectorAll(sel + ' .archive-year[data-date^="' + date[0] + '"]').forEach(function(el) {
        el.style.display = '';
      });
      document.querySelectorAll(sel + ' .archive-month[data-date^="' + date[0] + date[1] + '"]').forEach(function(el) {
        el.style.display = '';
      });
      document.querySelectorAll(sel + ' .archive-day[data-date^="' + date[0] + date[1] + date[2] + '"]').forEach(function(el) {
        el.style.display = '';
      });
    },

    /**
     * Show all posts
     * @returns {void}
     */
    showAll: function() {
      this.postsYear.forEach(function(el) { el.style.display = ''; });
      this.postsMonth.forEach(function(el) { el.style.display = ''; });
      this.postsDay.forEach(function(el) { el.style.display = ''; });
    },

    /**
     * Hide all posts
     * @returns {void}
     */
    hideAll: function() {
      this.postsYear.forEach(function(el) { el.style.display = 'none'; });
      this.postsMonth.forEach(function(el) { el.style.display = 'none'; });
      this.postsDay.forEach(function(el) { el.style.display = 'none'; });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('archives')) {
      var archivesFilter = new ArchivesFilter('#archives');
      archivesFilter.run();
    }
  });
})();
