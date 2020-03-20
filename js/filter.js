'use strict';

(function () {
  var MAX_PINS_AMOUNT = 5;
  var filterForm = document.querySelector('.map__filters');
  var houseType = filterForm.querySelector('#housing-type');
  var housePrice = filterForm.querySelector('#housing-price');
  var houseRoom = filterForm.querySelector('#housing-rooms');
  var houseGuest = filterForm.querySelector('#housing-guests');

  var resetFilterForm = function () {
    filterForm.reset();
  };

  var filterType = function (current) {
    return (houseType.value === 'any') ? true : (current.offer.type === houseType.value);
  };

  var filterPrice = function (current) {
    var price = current.offer.price;

    switch (housePrice.value) {
      case 'middle':
        return (price >= 10000 && price <= 50000);
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
    var filtered = [];
    var filteredByFeatures = filterFeatures();

    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      if (!filterType(item)) {
        continue;
      } else if (!filterPrice(item)) {
        continue;
      } else if (!filterRoom(item)) {
        continue;
      } else if (!filterGuest(item)) {
        continue;
      } else if (!filteredByFeatures(item)) {
        continue;
      }

      filtered.push(item);
      if (filtered.length >= MAX_PINS_AMOUNT) {
        break;
      }

    }

    window.card.reset();
    window.pins.reset();
    window.pins.render(filtered);
  };

  filterForm.addEventListener('change', window.utils.debounce(filterFormChangeHandler));

  window.filter = {
    resetForm: resetFilterForm,
    apply: filterFormChangeHandler
  };
})();
