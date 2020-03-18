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

      var calculatePinPosition = function () {
        return (window.utils.getPinPosition(mainPin).x + window.utils.halfPinWidth) + ', ' + (window.utils.getPinPosition(mainPin).y + window.utils.pinHeightWithTail);
      };

      var mapPinMouseMoveHandler = function (mouseMove) {
        var pinMoveCoordinates = {
          x: pinCoordinates.x - mouseMove.clientX,
          y: pinCoordinates.y - mouseMove.clientY
        };
        var shiftX = mainPin.offsetLeft - pinMoveCoordinates.x;
        var shiftY = mainPin.offsetTop - pinMoveCoordinates.y;

        if (shiftX >= (window.utils.halfPinWidth * -1) && shiftX <= (window.utils.Map.WIDTH - window.utils.halfPinWidth)) {
          mainPin.style.left = shiftX + 'px';
        }

        if ((shiftY + window.utils.pinHeightWithTail) >= window.utils.Map.MIN_HEIGHT && (shiftY + window.utils.pinHeightWithTail) <= window.utils.Map.MAX_HEIGHT) {
          mainPin.style.top = shiftY + 'px';
        }

        pinCoordinates = {
          x: mouseMove.clientX,
          y: mouseMove.clientY
        };

        inputAddress.value = calculatePinPosition();
      };

      var windowMouseUpHandler = function () {
        inputAddress.value = calculatePinPosition();

        mapPin.removeEventListener('mousemove', mapPinMouseMoveHandler);
        window.removeEventListener('mouseup', windowMouseUpHandler);
      };

      mapPin.addEventListener('mousemove', mapPinMouseMoveHandler);
      window.addEventListener('mouseup', windowMouseUpHandler);
    }
  });

})();
