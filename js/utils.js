'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var MOUSE_KEY = 0;
  var MAIN_PIN_TAIL_HEIGHT = 22;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var SMALL_PIN_HEIGHT = 70;
  var SMALL_PIN_WIDTH = 50;
  var HALF_PIN_WIDTH = MAIN_PIN_WIDTH / 2;
  var PIN_HEIGHT_WITH_TAIL = MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT;
  var TIME_DEBOUNCE = 500;
  var Map = {
    WIDTH: 1200,
    MIN_HEIGHT: 130,
    MAX_HEIGHT: 630
  };
  var TIMEOUT_DEBOUNCE = 500;

  var debounce = function (cb) {
    var lastChange;

    var createDebounce = function () {
      var context = createDebounce;

      clearTimeout(lastChange);

      lastChange = setTimeout(function () {
        cb.apply(context);
      }, TIMEOUT_DEBOUNCE);
    };

    return createDebounce;
  };

  var getPinPosition = function (pin) {
    return {
      x: parseInt(pin.style.left, 10),
      y: parseInt(pin.style.top, 10)
    };
  };

  var removeElementIfExist = function (element) {
    if (element) {
      element.remove();
    }
  };

  window.utils = {
    keyEnter: ENTER_KEY,
    keyEscape: ESCAPE_KEY,
    keyMouse: MOUSE_KEY,
    smallPinHeight: SMALL_PIN_HEIGHT,
    smallPinWidth: SMALL_PIN_WIDTH,
    mainPinTailHeight: MAIN_PIN_TAIL_HEIGHT,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    halfPinWidth: HALF_PIN_WIDTH,
    pinHeightWithTail: PIN_HEIGHT_WITH_TAIL,
    Map: Map,
    removeElementIfExist: removeElementIfExist,
    getPinPosition: getPinPosition,
    debounce: debounce
  };
})();
