'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  // var houseType = filterForm.querySelector('#housing-type');

  var resetFilterElement = function () {
    filterForm.reset();
    filterForm.removeEventListener('change', houseTypeChangeHandler);
  };

  var x;
  var filterHouseType = function (data) {
    x = data;
  };

  var houseTypeChangeHandler = function (evt) {
    var typeFilter = evt.target;
    var selectedHouseType = typeFilter.options[typeFilter.selectedIndex].value;

    var array = x.filter(function (current) {
      return (current.offer.type === selectedHouseType);
    });

    var resultArray = (selectedHouseType === 'any') ? x : array;

    window.card.resetCard();
    window.pins.resetPins();
    window.pins.renderPins(resultArray);
  };

  var filterEventAdd = function () {
    filterForm.addEventListener('change', houseTypeChangeHandler);
  };

  window.filter = {
    filterHouseType: filterHouseType,
    filterEventAdd: filterEventAdd,
    resetFilterElement: resetFilterElement
  };
})();
