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
    var result = [];

    for (var i = 0; i < current.length; i++) {
      if (current[i].offer.type === houseType.value) {
        result.push(current[i]);

        if (result.length === 5) {
          break;
        }
      }
    }

    return result;
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
    var result = [];

    for (var i = 0; i < current.length; i++) {
      if (current[i].offer.rooms === +houseRoom.value) {
        result.push(current[i]);

        if (result.length === 5) {
          break;
        }
      }
    }

    return result;
  };

  var filterGuest = function (current) {
    return (houseGuest.value === 'any') ? true : (current.offer.guests === +houseGuest.value);
  };

  var filterFeatures = function (current) {
    var checkedFeatures = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'));

    var result = [];
    var isChecked = false;
    for (var i = 0; i < current.length; i++) {

      if (checkedFeatures.length > 0) {
        isChecked = checkedFeatures.every(function (feature) {
          return current[i].offer.features.includes(feature.value);
        });
      } else {
        result.push(current[i]);
      }

      if (isChecked) {
        result.push(current[i]);

        if (result.length === 5) {
          break;
        }
      }
    }

    return result;
  };

  var filterFormChangeHandler = function () {
    var data = window.start.getOnLoadData();

    var arrayType = (houseType.value !== 'any') ? filterType(data) : data;
    var arrayRoom = (houseRoom.value !== 'any') ? filterRoom(data) : data;

    console.log(arrayType, arrayRoom);

    // var array;
    // if (houseType.value !== 'any') {
    //   array = filterFeatures(filterType(data));
    // }
    // array = filterType(data);
    // console.log(array);

    // var data = window.start.getOnLoadData();
    // var array = data
    //   .filter(filterType)
    //   .filter(filterPrice)
    //   .filter(filterRoom)
    //   .filter(filterGuest)
    //   .filter(filterFeatures());
    //
    // var amountData = array.length;
    // var arrayAmount = (amountData < data.length) ? MAX_PINS_AMOUNT : amountData;
    //
    // window.card.reset();
    // window.pins.reset();
    // window.pins.render(array.slice(0, arrayAmount));
  };

  filterForm.addEventListener('change', window.utils.debounce(filterFormChangeHandler));

  window.filter = {
    resetForm: resetFilterForm
  };
})();
