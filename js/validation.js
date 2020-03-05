'use strict';

(function () {
  // Валидация. Привязка количества комнат к числу гостей
  var mainForm = document.querySelector('.ad-form');
  var selectRoomAmout = mainForm.querySelector('#room_number');
  var selectCapacity = mainForm.querySelector('#capacity');

  var RoomCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  var selectChangeHandler = function () {
    var selectArray = RoomCapacity[
      selectRoomAmout.options[
        selectRoomAmout.selectedIndex
      ].value
    ];
    var selectItems = Array.from(selectCapacity.options);

    selectItems.forEach(function (current) {
      current.disabled = true;

      for (var i = 0; i < selectArray.length; i++) {
        if (selectArray[i] === current.value) {
          current.disabled = false;
          current.selected = true;

          break;
        }
      }
    });
  };

  selectRoomAmout.addEventListener('change', selectChangeHandler);

  // Валидация. Привязка типа жилья к цене
  var TypePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var placeTypeSelect = mainForm.querySelector('#type');
  var priceTypeInput = mainForm.querySelector('#price');

  var placeTypeSelectChangeHandler = function () {
    var price = TypePrice[
      placeTypeSelect.options[
        placeTypeSelect.selectedIndex
      ].value
    ];

    priceTypeInput.placeholder = price;
    priceTypeInput.min = price;
  };

  placeTypeSelect.addEventListener('change', placeTypeSelectChangeHandler);

  // Валидация. Привязка времени заезда к времени отъезда
  var selectTimeIn = mainForm.querySelector('#timein');
  var selectTimeOut = mainForm.querySelector('#timeout');

  var selectTimeInChangeHandler = function () {
    var timeIndex = selectTimeIn.selectedIndex;

    selectTimeOut.options[timeIndex].selected = true;
  };

  var selectTimeOutChangeHandler = function () {
    var timeIndex = selectTimeOut.selectedIndex;

    selectTimeIn.options[timeIndex].selected = true;
  };

  selectTimeIn.addEventListener('change', selectTimeInChangeHandler);
  selectTimeOut.addEventListener('change', selectTimeOutChangeHandler);
})();
