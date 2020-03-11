'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapWithPins = document.querySelector('.map__pins');

  var removePinActiveClass = function () {
    var activePin = mapWithPins.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var removePins = function () {
    mapWithPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (current) {
      current.remove();
    });
  };

  var createPinElement = function (pin) {
    var clonePin = templatePin.cloneNode(true);

    clonePin.style.top = pin.location.y - window.utils.smallPinHeight + 'px';
    clonePin.style.left = pin.location.x - (window.utils.smallPinWidth / 2) + 'px';

    clonePin.querySelector('img').src = pin.author.avatar;
    clonePin.querySelector('img').alt = pin.offer.title;

    clonePin.addEventListener('click', function () {
      removePinActiveClass();

      clonePin.classList.add('map__pin--active');

      window.card.renderCard(pin);
    });

    return clonePin;
  };

  var renderPins = function (pins) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer) {
        fragmentPin.appendChild(createPinElement(pins[i]));
      }
    }

    mapWithPins.appendChild(fragmentPin);
  };

  window.pins = {
    removePinActiveClass: removePinActiveClass,
    resetPins: removePins,
    renderPins: renderPins
  };
})();
