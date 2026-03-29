(() => {
  'use strict';

  // Filter posts by using their categories on categories page : `/categories`

  /**
   * TagsFilter
   * @param {String} tagsArchivesElem
   * @constructor
   */
  class TagsFilter {
    constructor(tagsArchivesElem) {
      const container = document.querySelector(tagsArchivesElem);
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
    }

    /**
     * Run TagsFilter feature
     * @return {void}
     */
    run() {
      // Detect keystroke of the user
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
     * @returns {String} the name of tag entered by the user
     */
    getSearch() {
      return this.inputSearch.value.toLowerCase();
    }

    /**
     * Show related posts form a tag and hide the others
     * @param {String} tag - name of a tag
     * @return {void}
     */
    filter(tag) {
      if (tag === '') {
        this.showAll();
        this.showResult(-1);
      } else {
        this.hideAll();
        this.showPosts(tag);
        this.showResult(this.countTags(tag));
      }
    }

    /**
     * Display results of the search
     * @param {Number} numbTags - Number of tags found
     * @return {void}
     */
    showResult(numbTags) {
      if (numbTags === -1) {
        this.archiveResult.innerHTML = '';
        this.archiveResult.style.display = 'none';
      } else if (numbTags === 0) {
        this.archiveResult.innerHTML = this.messages.zero;
        this.archiveResult.style.display = '';
      } else if (numbTags === 1) {
        this.archiveResult.innerHTML = this.messages.one;
        this.archiveResult.style.display = '';
      } else {
        this.archiveResult.innerHTML = this.messages.other.replace(/\{n\}/, numbTags);
        this.archiveResult.style.display = '';
      }
    }

    /**
     * Count number of tags
     * @param {String} tag
     * @returns {Number}
     */
    countTags(tag) {
      let count = 0;

      this.posts.forEach((post) => {
        const dataValue = post.dataset[this.dataTag] || '';
        if (dataValue.toLowerCase().indexOf(tag) !== -1) {
          count++;
        }
      });

      return count;
    }

    /**
     * Show all posts from a tag
     * @param {String} tag - name of a tag
     * @return {void}
     */
    showPosts(tag) {
      this.tags.forEach((tagElement) => {
        const dataValue = tagElement.dataset[this.dataTag] || '';
        if (dataValue.toLowerCase().indexOf(tag) !== -1) {
          tagElement.style.display = '';
        }
      });

      this.posts.forEach((postElement) => {
        const dataValue = postElement.dataset[this.dataTag] || '';
        if (dataValue.toLowerCase().indexOf(tag) !== -1) {
          postElement.style.display = '';
        }
      });
    }

    /**
     * Show all tags and all posts
     * @return {void}
     */
    showAll() {
      this.tags.forEach((el) => {
        el.style.display = '';
      });
      this.posts.forEach((el) => {
        el.style.display = '';
      });
    }

    /**
     * Hide all tags and all posts
     * @return {void}
     */
    hideAll() {
      this.tags.forEach((el) => {
        el.style.display = 'none';
      });
      this.posts.forEach((el) => {
        el.style.display = 'none';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tags-archives')) {
      const tagsFilter = new TagsFilter('#tags-archives');
      tagsFilter.run();
    }
  });
})();
