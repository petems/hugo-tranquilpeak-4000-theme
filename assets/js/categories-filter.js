(function() {
  'use strict';

  // Filter posts by using their categories on categories page : `/categories`

  /**
   * CategoriesFilter
   * @param {String} categoriesArchivesElem
   * @constructor
   */
  var CategoriesFilter = function(categoriesArchivesElem) {
    var container = document.querySelector(categoriesArchivesElem);
    this.form = container.querySelector('#filter-form');
    this.inputSearch = container.querySelector('input[name=category]');
    // Element where result of the filter are displayed
    this.archiveResult = container.querySelector('.archive-result');
    this.postElements = container.querySelectorAll('.archive');
    this.categoryElements = container.querySelectorAll('.category-anchor');
    this.containerSelector = categoriesArchivesElem;
    // Html data attribute without `data-` of `.archive` element
    // which contains the name of category
    this.dataCategory = 'category';
    // Html data attribute without `data-` of `.archive` element
    // which contains the name of parent's categories
    this.dataParentCategories = 'parent-categories';
    this.messages = {
      zero: this.archiveResult.dataset.messageZero,
      one: this.archiveResult.dataset.messageOne,
      other: this.archiveResult.dataset.messageOther
    };
  };

  CategoriesFilter.prototype = {

    /**
     * Run CategoriesFilter feature
     * @return {void}
     */
    run: function() {
      var self = this;

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
     * @returns {String} The name of the category
     */
    getSearch: function() {
      return this.inputSearch.value.toLowerCase();
    },

    /**
     * Show related posts form a category and hide the others
     * @param {string} category - The name of the category
     * @return {void}
     */
    filter: function(category) {
      if (category === '') {
        this.showAll();
        this.showResult(-1);
      }
      else {
        this.hideAll();
        this.showPosts(category);
        this.showResult(this.countCategories(category));
      }
    },

    /**
     * Display results of the search
     * @param {Number} numbCategories - The number of categories found
     * @return {void}
     */
    showResult: function(numbCategories) {
      if (numbCategories === -1) {
        this.archiveResult.innerHTML = '';
        this.archiveResult.style.display = 'none';
      }
      else if (numbCategories === 0) {
        this.archiveResult.innerHTML = this.messages.zero;
        this.archiveResult.style.display = '';
      }
      else if (numbCategories === 1) {
        this.archiveResult.innerHTML = this.messages.one;
        this.archiveResult.style.display = '';
      }
      else {
        this.archiveResult.innerHTML = this.messages.other.replace(/\{n\}/, numbCategories);
        this.archiveResult.style.display = '';
      }
    },

    /**
     * Count number of categories
     * @param {String} category - The name of theThe date of the post category
     * @returns {Number} The number of categories found
     */
    countCategories: function(category) {
      var selector = this.containerSelector + ' .archive[data-' + this.dataCategory + '*=\'' + category + '\']';
      return document.querySelectorAll(selector).length;
    },

    /**
     * Show all posts from a category
     * @param {String} category - The name of the category
     * @return {void}
     */
    showPosts: function(category) {
      var self = this;
      var sel = self.containerSelector;
      var catAttr = self.dataCategory;
      var parentAttr = self.dataParentCategories;
      var categories = sel + ' .category-anchor[data-' + catAttr + '*=\'' + category + '\']';
      var posts = sel + ' .archive[data-' + catAttr + '*=\'' + category + '\']';

      if (self.countCategories(category) > 0) {
        // Check if selected categories have parents
        var catsWithParents = document.querySelectorAll(categories + '[data-' + parentAttr + ']');
        if (catsWithParents.length) {
          // Get all categories that matches search
          document.querySelectorAll(categories).forEach(function(el) {
            // Get all its parents categories name
            var parents = el.getAttribute('data-' + parentAttr);
            if (parents) {
              // Show only the title of the parents's categories and hide their posts
              parents.split(',').forEach(function(parent) {
                var dataAttr = '[data-' + catAttr + '=\'' + parent + '\']';
                document.querySelectorAll(sel + ' .category-anchor' + dataAttr).forEach(function(e) {
                  e.style.display = '';
                });
                document.querySelectorAll(sel + ' .archive' + dataAttr).forEach(function(e) {
                  e.style.display = '';
                });
                document.querySelectorAll(sel + ' .archive' + dataAttr + ' > .archive-posts > .archive-post').forEach(function(e) {
                  e.style.display = 'none';
                });
              });
            }
          });
        }
      }
      // Show categories and related posts found
      document.querySelectorAll(categories).forEach(function(el) { el.style.display = ''; });
      document.querySelectorAll(posts).forEach(function(el) { el.style.display = ''; });
      document.querySelectorAll(posts + ' > .archive-posts > .archive-post').forEach(function(el) { el.style.display = ''; });
    },

    /**
     * Show all categories and all posts
     * @return {void}
     */
    showAll: function() {
      var sel = this.containerSelector;
      this.categoryElements.forEach(function(el) { el.style.display = ''; });
      this.postElements.forEach(function(el) { el.style.display = ''; });
      document.querySelectorAll(sel + ' .archive > .archive-posts > .archive-post').forEach(function(el) { el.style.display = ''; });
    },

    /**
     * Hide all categories and all posts
     * @return {void}
     */
    hideAll: function() {
      this.categoryElements.forEach(function(el) { el.style.display = 'none'; });
      this.postElements.forEach(function(el) { el.style.display = 'none'; });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('categories-archives')) {
      var categoriesFilter = new CategoriesFilter('#categories-archives');
      categoriesFilter.run();
    }
  });
})();
