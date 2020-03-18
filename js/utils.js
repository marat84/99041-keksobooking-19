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
  var MAP_WIDTH = 1200;
  var MAP_MIN_HEIGHT = 130;
  var MAP_MAX_HEIGHT = 630;
  var HALF_PIN_WIDTH = MAIN_PIN_WIDTH / 2;
  var PIN_HEIGHT_WITH_TAIL = MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT;
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

  var getRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  var getRandomSlicedArray = function (array) {
    return array.slice(0, getRandomNumber(1, array.length));
  };

  var getPinPosition = function (pin) {
    return {
      x: parseInt(pin.style.left, 10),
      y: parseInt(pin.style.top, 10)
    };
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
    mapWidth: MAP_WIDTH,
    mapMinHeight: MAP_MIN_HEIGHT,
    mapMaxHeight: MAP_MAX_HEIGHT,
    halfPinWidth: HALF_PIN_WIDTH,
    pinHeightWithTail: PIN_HEIGHT_WITH_TAIL,
    getRandomValue: getRandomValue,
    getRandomNumber: getRandomNumber,
    getRandomSlicedArray: getRandomSlicedArray,
    getPinPosition: getPinPosition,
    debounce: debounce
  };
})();
