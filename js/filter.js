'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseType = filterForm.querySelector('#housing-type');

  var resetFilterElement = function () {
    filterForm.reset();
  };

  var filterType = function (current) {
    return (houseType.value === 'any') ? true : (current.offer.type === houseType.value);
  };
  filterForm.addEventListener('change', function () {

    var array = window.start.getOnLoadData()
      .filter(filterType);

    window.card.resetCard();
    window.pins.resetPins();
    window.pins.renderPins(array);
  });

  window.filter = {
    resetFilterElement: resetFilterElement
  };
})();
