'use strict';

(function () {
  var MAX_PINS_AMOUNT = 5;
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

    return function (current) {
      return checkedFeatures.every(function (feature) {
        return current.offer.features.includes(feature.value);
      });
    };
  };

  var filterFormChangeHandler = function () {
    var data = window.start.getOnLoadData();
    var array = data
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(filterFeatures());

    var amountData = array.length;
    var arrayAmount = (amountData < data.length) ? MAX_PINS_AMOUNT : amountData;

    window.card.resetCard();
    window.pins.resetPins();
    window.pins.renderPins(array.slice(0, arrayAmount));
  };

  filterForm.addEventListener('change', window.utils.debounce(filterFormChangeHandler));

  window.filter = {
    resetFilterElement: resetFilterElement
  };
})();
