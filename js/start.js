'use strict';

(function () {
  // var MAIN_PIN_TAIL_HEIGHT = 22;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
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
      x: Math.round(parseInt(mapPin.style.left, 10) - (MAIN_PIN_WIDTH / 2)),
      y: Math.round(parseInt(mapPin.style.top, 10) - (MAIN_PIN_HEIGHT / 2))
    };

    setDisabledToFormElements(mainFormElements, true);
    setDisabledToFormElements(mapFilterFormElements, true);

    inputAddress.value = pinPosition.x + ', ' + pinPosition.y;
  };

  deActivatedPage();

  var activatedPage = function () {
    window.card.renderCard(window.data.generateData(8)[0]);
    window.pins.renderPins(window.data.generateData(8));

    setDisabledToFormElements(mainFormElements, false);
    setDisabledToFormElements(mapFilterFormElements, false);

    document.querySelector('.map').classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (current) {
      current.addEventListener('click', window.popup.openCard);
      current.addEventListener('keydown', window.popup.mapPinKeyDownHandler);
    });

  };

  mapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utils.keyMouse) {
      activatedPage();
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.keyEnter) {
      activatedPage();
    }
  });
})();
