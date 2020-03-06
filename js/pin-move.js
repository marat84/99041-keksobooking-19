'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapPin = document.querySelector('.map__pins');
  var inputAddress = document.querySelector('#address');
  var halfPinWidth = window.utils.mainPinWidth / 2;
  var pinHeight = window.utils.mainPinHeight + window.utils.mainPinTailHeight;

  var getPinPosition = function () {
    return {
      x: parseInt(mainPin.style.left, 10),
      y: parseInt(mainPin.style.top, 10)
    };
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utils.keyMouse) {
      var pinCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mapPinMouseMoveHandler = function (mouseMove) {
        var pinMoveCoordinates = {
          x: pinCoordinates.x - mouseMove.clientX,
          y: pinCoordinates.y - mouseMove.clientY
        };
        var shiftX = mainPin.offsetLeft - pinMoveCoordinates.x;
        var shiftY = mainPin.offsetTop - pinMoveCoordinates.y;

        if (shiftX >= (halfPinWidth * -1) && shiftX <= (window.utils.mapWidth - halfPinWidth)) {
          mainPin.style.left = shiftX + 'px';
        }

        if ((shiftY + pinHeight) >= window.utils.mapMinHeight && shiftY <= window.utils.mapMaxHeight) {
          mainPin.style.top = shiftY + 'px';
        }

        pinCoordinates = {
          x: mouseMove.clientX,
          y: mouseMove.clientY
        };
      };

      var windowMouseUpHandler = function () {

        inputAddress.value = (getPinPosition().x + halfPinWidth) + ', ' + (getPinPosition().y + pinHeight);

        mapPin.removeEventListener('mousemove', mapPinMouseMoveHandler);
        window.removeEventListener('mouseup', windowMouseUpHandler);
      };

      mapPin.addEventListener('mousemove', mapPinMouseMoveHandler);
      window.addEventListener('mouseup', windowMouseUpHandler);
    }
  });

})();
