(() => {
  'use strict';

  class CodeBlockResizer {
    constructor(selector) {
      this.codeBlocks = document.querySelectorAll(selector);
    }

    run() {
      this.resize();
      window.smartresize(() => {
        this.resize();
      });
    }

    resize() {
      this.codeBlocks.forEach((block) => {
        const gutter = block.querySelector('.gutter');
        const code = block.querySelector('.code');
        if (!gutter || !code) return;

        const codePaddings = code.offsetWidth - code.clientWidth;
        const width = block.offsetWidth - gutter.offsetWidth + codePaddings;

        code.style.width = width + 'px';
        const pre = code.querySelector('pre');
        if (pre) {
          pre.style.width = width + 'px';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const resizer = new CodeBlockResizer('figure.highlight');
    resizer.run();
  });
})();
