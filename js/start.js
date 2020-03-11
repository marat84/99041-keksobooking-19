'use strict';

(function () {
  var INTERACTIVE_ELEMENT = 'input, button, select, textarea';

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');
  var mapFilterForm = map.querySelector('.map__filters');
  var mainForm = document.querySelector('.ad-form');
  var mainFormElements = mainForm.querySelectorAll(INTERACTIVE_ELEMENT);
  var mapFilterFormElements = mapFilterForm.querySelectorAll(INTERACTIVE_ELEMENT);
  var inputAddress = mainForm.querySelector('#address');

  var setDisabledToFormElements = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  var mapPinMouseDownHandler = function (evt) {
    if (evt.button === window.utils.keyMouse) {
      activatedPage();
    }
  };

  var mapPinKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEnter) {
      activatedPage();
    }
  };

  var deActivatedPage = function () {
    var pinPosition = {
      x: Math.round(parseInt(mapPin.style.left, 10) - (window.utils.mainPinWidth / 2)),
      y: Math.round(parseInt(mapPin.style.top, 10) - (window.utils.mainPinHeight / 2))
    };

    inputAddress.value = pinPosition.x + ', ' + pinPosition.y;

    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');

    setDisabledToFormElements(mainFormElements, true);
    setDisabledToFormElements(mapFilterFormElements, true);

    mapPin.addEventListener('mousedown', mapPinMouseDownHandler);
    mapPin.addEventListener('keydown', mapPinKeyDownHandler);
  };

  deActivatedPage();

  var cardData = [];
  var activatedPage = function () {

    window.load.loadData(onLoad, window.message.showMessage);

    setDisabledToFormElements(mainFormElements, false);
    setDisabledToFormElements(mapFilterFormElements, false);

    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');

    mapPin.removeEventListener('mousedown', mapPinMouseDownHandler);
    mapPin.removeEventListener('keydown', mapPinKeyDownHandler);
  };

  var onLoad = function (data) {
    cardData = data;

    window.pins.renderPins(cardData);
  };

  window.start = {
    deActivatedPage: deActivatedPage
  };
})();
