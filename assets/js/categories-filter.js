(() => {
  'use strict';

  // Filter posts by using their categories on categories page : `/categories`

  /**
   * CategoriesFilter
   * @param {String} categoriesArchivesElem
   * @constructor
   */
  class CategoriesFilter {
    constructor(categoriesArchivesElem) {
      const container = document.querySelector(categoriesArchivesElem);
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
    }

    /**
     * Run CategoriesFilter feature
     * @return {void}
     */
    run() {
      this.inputSearch.addEventListener('keyup', () => {
        this.filter(this.getSearch());
      });

      // Block submit action
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
      });
    }

    /**
     * Get the search entered by user
     * @returns {String} The name of the category
     */
    getSearch() {
      return this.inputSearch.value.toLowerCase();
    }

    /**
     * Escape a string for use inside a CSS attribute selector.
     * @param {String} value - Selector value to escape.
     * @returns {String} Escaped selector value.
     */
    escapeCssValue(value) {
      return value.replace(/([\\'"[\]])/g, '\\$1');
    }

    /**
     * Show related posts form a category and hide the others
     * @param {string} category - The name of the category
     * @return {void}
     */
    filter(category) {
      if (category === '') {
        this.showAll();
        this.showResult(-1);
      } else {
        this.hideAll();
        this.showPosts(category);
        this.showResult(this.countCategories(category));
      }
    }

    /**
     * Display results of the search
     * @param {Number} numbCategories - The number of categories found
     * @return {void}
     */
    showResult(numbCategories) {
      if (numbCategories === -1) {
        this.archiveResult.innerHTML = '';
        this.archiveResult.style.display = 'none';
      } else if (numbCategories === 0) {
        this.archiveResult.innerHTML = this.messages.zero;
        this.archiveResult.style.display = '';
      } else if (numbCategories === 1) {
        this.archiveResult.innerHTML = this.messages.one;
        this.archiveResult.style.display = '';
      } else {
        this.archiveResult.innerHTML = this.messages.other.replace(/\{n\}/, numbCategories);
        this.archiveResult.style.display = '';
      }
    }

    /**
     * Count number of categories
     * @param {String} category - The name of theThe date of the post category
     * @returns {Number} The number of categories found
     */
    countCategories(category) {
      const selector =
        this.containerSelector +
        ' .archive[data-' +
        this.dataCategory +
        "*='" +
        this.escapeCssValue(category) +
        "']";
      return document.querySelectorAll(selector).length;
    }

    /**
     * Show all posts from a category
     * @param {String} category - The name of the category
     * @return {void}
     */
    showPosts(category) {
      const sel = this.containerSelector;
      const catAttr = this.dataCategory;
      const parentAttr = this.dataParentCategories;
      const safeCategory = this.escapeCssValue(category);
      const categories = sel + ' .category-anchor[data-' + catAttr + "*='" + safeCategory + "']";
      const posts = sel + ' .archive[data-' + catAttr + "*='" + safeCategory + "']";

      if (this.countCategories(category) > 0) {
        // Check if selected categories have parents
        const catsWithParents = document.querySelectorAll(categories + '[data-' + parentAttr + ']');
        if (catsWithParents.length) {
          // Get all categories that matches search
          document.querySelectorAll(categories).forEach((el) => {
            // Get all its parents categories name
            const parents = el.getAttribute('data-' + parentAttr);
            if (parents) {
              // Show only the title of the parents's categories and hide their posts
              parents.split(',').forEach((parent) => {
                const dataAttr = '[data-' + catAttr + "='" + this.escapeCssValue(parent) + "']";
                document.querySelectorAll(sel + ' .category-anchor' + dataAttr).forEach((e) => {
                  e.style.display = '';
                });
                document.querySelectorAll(sel + ' .archive' + dataAttr).forEach((e) => {
                  e.style.display = '';
                });
                document
                  .querySelectorAll(
                    sel + ' .archive' + dataAttr + ' > .archive-posts > .archive-post'
                  )
                  .forEach((e) => {
                    e.style.display = 'none';
                  });
              });
            }
          });
        }
      }
      // Show categories and related posts found
      document.querySelectorAll(categories).forEach((el) => {
        el.style.display = '';
      });
      document.querySelectorAll(posts).forEach((el) => {
        el.style.display = '';
      });
      document.querySelectorAll(posts + ' > .archive-posts > .archive-post').forEach((el) => {
        el.style.display = '';
      });
    }

    /**
     * Show all categories and all posts
     * @return {void}
     */
    showAll() {
      const sel = this.containerSelector;
      this.categoryElements.forEach((el) => {
        el.style.display = '';
      });
      this.postElements.forEach((el) => {
        el.style.display = '';
      });
      document
        .querySelectorAll(sel + ' .archive > .archive-posts > .archive-post')
        .forEach((el) => {
          el.style.display = '';
        });
    }

    /**
     * Hide all categories and all posts
     * @return {void}
     */
    hideAll() {
      this.categoryElements.forEach((el) => {
        el.style.display = 'none';
      });
      this.postElements.forEach((el) => {
        el.style.display = 'none';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('categories-archives')) {
      const categoriesFilter = new CategoriesFilter('#categories-archives');
      categoriesFilter.run();
    }
  });
})();
