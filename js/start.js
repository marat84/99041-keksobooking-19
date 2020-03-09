'use strict';

(function () {
  var INTERACTIVE_ELEMENT = 'input, button, select, textarea';

  // Активация-деактивация страницы
  var mapPin = document.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var mapFilterForm = document.querySelector('.map__filters');
  var mainFormElements = mainForm.querySelectorAll(INTERACTIVE_ELEMENT);
  var mapFilterFormElements = mapFilterForm.querySelectorAll(INTERACTIVE_ELEMENT);
  var inputAddress = mainForm.querySelector('#address');

  var setDisabledToFormElements = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  var deActivatedPage = function () {
    var pinPosition = {
      x: Math.round(parseInt(mapPin.style.left, 10) - (window.utils.mainPinWidth / 2)),
      y: Math.round(parseInt(mapPin.style.top, 10) - (window.utils.mainPinHeight / 2))
    };

    setDisabledToFormElements(mainFormElements, true);
    setDisabledToFormElements(mapFilterFormElements, true);

    inputAddress.value = pinPosition.x + ', ' + pinPosition.y;
  };

  deActivatedPage();

  var cardData = [];
  var activatedPage = function () {

    window.load.loadData(onLoad);

    setDisabledToFormElements(mainFormElements, false);
    setDisabledToFormElements(mapFilterFormElements, false);

    document.querySelector('.map').classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');

    mapPin.removeEventListener('mousedown', mapPinMouseDownHandler);
    mapPin.removeEventListener('keydown', mapPinKeyDownHandler);
  };

  var onLoad = function (data) {
    cardData = data;

    window.pins.renderPins(cardData);
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

  mapPin.addEventListener('mousedown', mapPinMouseDownHandler);
  mapPin.addEventListener('keydown', mapPinKeyDownHandler);
})();
