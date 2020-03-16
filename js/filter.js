'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseType = filterForm.querySelector('#housing-type');
  var housePrice = filterForm.querySelector('#housing-price');
  var houseRoom = filterForm.querySelector('#housing-rooms');
  var houseGuest = filterForm.querySelector('#housing-guests');
  var houseWifi = filterForm.querySelector('#filter-wifi');
  var houseDishwasher = filterForm.querySelector('#filter-dishwasher');
  var houseParking = filterForm.querySelector('#filter-parking');
  var houseWasher = filterForm.querySelector('#filter-washer');
  var houseElevator = filterForm.querySelector('#filter-elevator');
  var houseConditioner = filterForm.querySelector('#filter-conditioner');

  var resetFilterElement = function () {
    filterForm.reset();
  };

  var checkFeatures = function (feature, current) {
    if (feature.checked) {
      return current.offer.features.some(function (currentFeature) {
        return (currentFeature === feature.value);
      });
    } else {
      return true;
    }
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

  var filterWifi = function (current) {
    return checkFeatures(houseWifi, current);
    // return (houseWifi.checked) ? (current.offer.features[0] === houseWifi.value) : true;
  };
  var filterDishwasher = function (current) {
    return checkFeatures(houseDishwasher, current);
  };
  var filterParking = function (current) {
    return checkFeatures(houseParking, current);
  };
  var filterWasher = function (current) {
    return checkFeatures(houseWasher, current);
  };
  var filterElevator = function (current) {
    return checkFeatures(houseElevator, current);
  };
  var filterConditioner = function (current) {
    return checkFeatures(houseConditioner, current);
  };

  filterForm.addEventListener('change', function () {

    var array = window.start.getOnLoadData()
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(filterWifi)
      .filter(filterDishwasher)
      .filter(filterParking)
      .filter(filterWasher)
      .filter(filterElevator)
      .filter(filterConditioner);

    window.card.resetCard();
    window.pins.resetPins();
    window.pins.renderPins(array);
  });

  window.filter = {
    resetFilterElement: resetFilterElement
  };
})();
