(function() {
  'use strict';

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  function debounce(func, threshold, execAsap) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      function delayed() {
        if (!execAsap) {
          func.apply(context, args);
        }
        timeout = null;
      }
      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(context, args);
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  }

  window.smartresize = function(fn) {
    if (fn) {
      window.addEventListener('resize', debounce(fn));
    }
  };
})();
