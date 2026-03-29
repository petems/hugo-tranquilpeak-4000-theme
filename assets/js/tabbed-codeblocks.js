(() => {
  'use strict';

  class TabbedCodeBlock {
    constructor(selector) {
      this.tabbedCodeBlocks = document.querySelectorAll(selector);
    }

    run() {
      this.tabbedCodeBlocks.forEach((block) => {
        const tabs = block.querySelectorAll('.tab');
        tabs.forEach((tab) => {
          tab.addEventListener('click', function () {
            const codeblock = this.parentElement.parentElement.parentElement;
            const tabsContent = codeblock.querySelectorAll(
              '.tabs-content > pre, .tabs-content > .highlight'
            );

            // remove active from siblings
            Array.from(this.parentElement.children).forEach((sibling) => {
              sibling.classList.remove('active');
            });
            this.classList.add('active');

            // hide all tab contents
            tabsContent.forEach((content) => {
              content.style.display = 'none';
            });

            // show the right one
            const index = Array.from(this.parentElement.children).indexOf(this);
            if (tabsContent[index]) {
              tabsContent[index].style.display = '';
            }
          });
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const tabbedCodeBlocks = new TabbedCodeBlock('.codeblock--tabbed');
    tabbedCodeBlocks.run();
  });
})();
