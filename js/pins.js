'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPinElement = function (pin) {
    var clonePin = templatePin.cloneNode(true);

    clonePin.style.top = pin.location.y - window.utils.smallPinHeight + 'px';
    clonePin.style.left = pin.location.x - (window.utils.smallPinWidth / 2) + 'px';

    clonePin.querySelector('img').src = pin.author.avatar;
    clonePin.querySelector('img').alt = pin.offer.title;

    return clonePin;
  };

  var mapWithPins = document.querySelector('.map__pins');

  var renderPins = function (pins) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragmentPin.appendChild(createPinElement(pins[i]));
    }

    mapWithPins.appendChild(fragmentPin);
  };

  window.pins = {
    renderPins: renderPins
  };
})();