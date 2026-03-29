(function() {
  'use strict';

  var TabbedCodeBlock = function(selector) {
    this.tabbedCodeBlocks = document.querySelectorAll(selector);
  };

  TabbedCodeBlock.prototype = {
    run: function() {
      this.tabbedCodeBlocks.forEach(function(block) {
        var tabs = block.querySelectorAll('.tab');
        tabs.forEach(function(tab) {
          tab.addEventListener('click', function() {
            var codeblock = this.parentElement.parentElement.parentElement;
            var tabsContent = codeblock.querySelectorAll('.tabs-content > pre, .tabs-content > .highlight');

            // remove active from siblings
            Array.from(this.parentElement.children).forEach(function(sibling) {
              sibling.classList.remove('active');
            });
            this.classList.add('active');

            // hide all tab contents
            tabsContent.forEach(function(content) {
              content.style.display = 'none';
            });

            // show the right one
            var index = Array.from(this.parentElement.children).indexOf(this);
            if (tabsContent[index]) {
              tabsContent[index].style.display = '';
            }
          });
        });
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    var tabbedCodeBlocks = new TabbedCodeBlock('.codeblock--tabbed');
    tabbedCodeBlocks.run();
  });
})();
