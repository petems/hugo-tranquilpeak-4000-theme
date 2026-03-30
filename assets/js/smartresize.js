(() => {
  'use strict';

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  function debounce(func, threshold, execAsap) {
    let timeout;
    return function (...args) {
      const delayed = () => {
        if (!execAsap) {
          func.apply(this, args);
        }
        timeout = null;
      };
      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(this, args);
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  }

  window.smartresize = (fn) => {
    if (fn) {
      window.addEventListener('resize', debounce(fn));
    }
  };
})();
