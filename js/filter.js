'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  var resetFilterElement = function () {
    filterForm.reset();
  };

  window.filter = {
    resetFilterElement: resetFilterElement
  };
})();
