'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  // var houseType = filterForm.querySelector('#housing-type');

  var resetFilterElement = function () {
    filterForm.reset();
  };

  var filterHouseType = function (data) {
    var houseTypeChangeHandler = function (evt) {
      var typeFilter = evt.target;
      var selectedHouseType = typeFilter.options[typeFilter.selectedIndex].value;

      var array = data.filter(function (current) {
        return (current.offer.type === selectedHouseType);
      });

      var resultArray = (selectedHouseType === 'any') ? data : array;

      window.card.resetCard();
      window.pins.resetPins();
      window.pins.renderPins(resultArray);
    };

    filterForm.addEventListener('change', houseTypeChangeHandler);
  };

  window.filter = {
    filterHouseType: filterHouseType,
    resetFilterElement: resetFilterElement
  };
})();
