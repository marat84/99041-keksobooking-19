'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var MOUSE_KEY = 0;
  var SMALL_PIN_HEIGHT = 70;
  var SMALL_PIN_WIDTH = 50;

  var getRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  var getRandomSlicedArray = function (array) {
    return array.slice(0, getRandomNumber(1, array.length));
  };

  window.utils = {
    keyEnter: ENTER_KEY,
    keyEscape: ESCAPE_KEY,
    keyMouse: MOUSE_KEY,
    smallPinHeight: SMALL_PIN_HEIGHT,
    smallPinWidth: SMALL_PIN_WIDTH,
    getRandomValue: getRandomValue,
    getRandomNumber: getRandomNumber,
    getRandomSlicedArray: getRandomSlicedArray,
  };
})();
