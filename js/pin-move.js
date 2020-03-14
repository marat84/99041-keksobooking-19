'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapPin = document.querySelector('.map__pins');
  var inputAddress = document.querySelector('#address');

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

        if (shiftX >= (window.utils.halfPinWidth * -1) && shiftX <= (window.utils.mapWidth - window.utils.halfPinWidth)) {
          mainPin.style.left = shiftX + 'px';
        }

        if ((shiftY + window.utils.pinHeightWithTail) >= window.utils.mapMinHeight && (shiftY + window.utils.pinHeightWithTail) <= window.utils.mapMaxHeight) {
          mainPin.style.top = shiftY + 'px';
        }

        pinCoordinates = {
          x: mouseMove.clientX,
          y: mouseMove.clientY
        };
      };

      var windowMouseUpHandler = function () {

        inputAddress.value = (window.utils.getPinPosition(mainPin).x + window.utils.halfPinWidth) + ', ' + (window.utils.getPinPosition(mainPin).y + window.utils.pinHeightWithTail);

        mapPin.removeEventListener('mousemove', mapPinMouseMoveHandler);
        window.removeEventListener('mouseup', windowMouseUpHandler);
      };

      mapPin.addEventListener('mousemove', mapPinMouseMoveHandler);
      window.addEventListener('mouseup', windowMouseUpHandler);
    }
  });

})();
