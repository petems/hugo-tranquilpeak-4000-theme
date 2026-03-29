(function() {
  'use strict';

  var CodeBlockResizer = function(selector) {
    this.codeBlocks = document.querySelectorAll(selector);
  };

  CodeBlockResizer.prototype = {
    run: function() {
      var self = this;
      self.resize();
      window.smartresize(function() {
        self.resize();
      });
    },

    resize: function() {
      this.codeBlocks.forEach(function(block) {
        var gutter = block.querySelector('.gutter');
        var code = block.querySelector('.code');
        if (!gutter || !code) return;

        var codePaddings = code.offsetWidth - code.clientWidth;
        var width = block.offsetWidth - gutter.offsetWidth + codePaddings;

        code.style.width = width + 'px';
        var pre = code.querySelector('pre');
        if (pre) {
          pre.style.width = width + 'px';
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    var resizer = new CodeBlockResizer('figure.highlight');
    resizer.run();
  });
})();
