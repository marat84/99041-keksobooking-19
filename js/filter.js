'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseType = filterForm.querySelector('#housing-type');
  var housePrice = filterForm.querySelector('#housing-price');
  var houseRoom = filterForm.querySelector('#housing-rooms');
  var houseGuest = filterForm.querySelector('#housing-guests');

  var resetFilterElement = function () {
    filterForm.reset();
  };

  var filterType = function (current) {
    return (houseType.value === 'any') ? true : (current.offer.type === houseType.value);
  };

  var filterPrice = function (current) {
    var price = current.offer.price;

    switch (housePrice.value) {
      case 'middle':
        return (price > 10000 && price < 50000);
      case 'low':
        return (price < 10000);
      case 'high':
        return (price > 50000);
      default:
        return true;
    }
  };

  var filterRoom = function (current) {
    return (houseRoom.value === 'any') ? true : (current.offer.rooms === +houseRoom.value);
  };

  var filterGuest = function (current) {
    return (houseGuest.value === 'any') ? true : (current.offer.guests === +houseGuest.value);
  };

  var filterFeatures = function () {
    var checkedFeatures = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'));

    return function (it) {
      return checkedFeatures.every(function (feature) {
        return it.offer.features.includes(feature.value);
      });
    };
  };

  var filterFormChangeHandler = function () {
    var array = window.start.getOnLoadData()
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(filterFeatures());

    window.card.resetCard();
    window.pins.resetPins();
    window.pins.renderPins(array);
  };

  filterForm.addEventListener('change', window.utils.debounce(filterFormChangeHandler));

  window.filter = {
    resetFilterElement: resetFilterElement
  };
})();
