(function() {
  'use strict';

  // Filter posts by using their categories on categories page : `/categories`

  /**
   * TagsFilter
   * @param {String} tagsArchivesElem
   * @constructor
   */
  var TagsFilter = function(tagsArchivesElem) {
    var container = document.querySelector(tagsArchivesElem);
    this.form = container.querySelector('#filter-form');
    this.inputSearch = container.querySelector('#filter-form input[name=tag]');
    this.archiveResult = container.querySelector('.archive-result');
    this.tags = container.querySelectorAll('.tag');
    this.posts = container.querySelectorAll('.archive');
    this.containerSelector = tagsArchivesElem;
    // Html data attribute without `data-` of `.archive` element which contains the name of tag
    this.dataTag = 'tag';
    this.messages = {
      zero: this.archiveResult.dataset.messageZero,
      one: this.archiveResult.dataset.messageOne,
      other: this.archiveResult.dataset.messageOther
    };
  };

  TagsFilter.prototype = {
    /**
     * Run TagsFilter feature
     * @return {void}
     */
    run: function() {
      var self = this;

      // Detect keystroke of the user
      self.inputSearch.addEventListener('keyup', function() {
        self.filter(self.getSearch());
      });

      // Block submit action
      self.form.addEventListener('submit', function(e) {
        e.preventDefault();
      });
    },

    /**
     * Get the search entered by user
     * @returns {String} the name of tag entered by the user
     */
    getSearch: function() {
      return this.inputSearch.value.toLowerCase();
    },

    /**
     * Show related posts form a tag and hide the others
     * @param {String} tag - name of a tag
     * @return {void}
     */
    filter: function(tag) {
      if (tag === '') {
        this.showAll();
        this.showResult(-1);
      }
      else {
        this.hideAll();
        this.showPosts(tag);
        this.showResult(this.countTags(tag));
      }
    },

    /**
     * Display results of the search
     * @param {Number} numbTags - Number of tags found
     * @return {void}
     */
    showResult: function(numbTags) {
      if (numbTags === -1) {
        this.archiveResult.innerHTML = '';
        this.archiveResult.style.display = 'none';
      }
      else if (numbTags === 0) {
        this.archiveResult.innerHTML = this.messages.zero;
        this.archiveResult.style.display = '';
      }
      else if (numbTags === 1) {
        this.archiveResult.innerHTML = this.messages.one;
        this.archiveResult.style.display = '';
      }
      else {
        this.archiveResult.innerHTML = this.messages.other.replace(/\{n\}/, numbTags);
        this.archiveResult.style.display = '';
      }
    },

    /**
     * Count number of tags
     * @param {String} tag
     * @returns {Number}
     */
    countTags: function(tag) {
      var selector = this.containerSelector + ' .archive[data-' + this.dataTag + '*=\'' + tag + '\']';
      return document.querySelectorAll(selector).length;
    },

    /**
     * Show all posts from a tag
     * @param {String} tag - name of a tag
     * @return {void}
     */
    showPosts: function(tag) {
      var sel = this.containerSelector;
      var dataTag = this.dataTag;
      document.querySelectorAll(sel + ' .tag[data-' + dataTag + '*=\'' + tag + '\']').forEach(function(el) {
        el.style.display = '';
      });
      document.querySelectorAll(sel + ' .archive[data-' + dataTag + '*=\'' + tag + '\']').forEach(function(el) {
        el.style.display = '';
      });
    },

    /**
     * Show all tags and all posts
     * @return {void}
     */
    showAll: function() {
      this.tags.forEach(function(el) { el.style.display = ''; });
      this.posts.forEach(function(el) { el.style.display = ''; });
    },

    /**
     * Hide all tags and all posts
     * @return {void}
     */
    hideAll: function() {
      this.tags.forEach(function(el) { el.style.display = 'none'; });
      this.posts.forEach(function(el) { el.style.display = 'none'; });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('tags-archives')) {
      var tagsFilter = new TagsFilter('#tags-archives');
      tagsFilter.run();
    }
  });
})();
