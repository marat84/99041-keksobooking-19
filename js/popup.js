'use strict';

(function () {
  // Попап с событиями на пинах

  var mapPinKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEnter) {
      openCard();
    }
  };

  var documentKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEscape) {
      closeCard();
    }
  };

  var popupCardCloseKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEnter) {
      closeCard();
    }
  };

  var openCard = function () {
    var popupCard = document.querySelector('.map__card');

    var popupCardClose = popupCard.querySelector('.popup__close');
    popupCard.classList.remove('hidden');

    popupCardClose.addEventListener('click', closeCard);
    popupCardClose.addEventListener('keydown', popupCardCloseKeyDownHandler);
    document.addEventListener('keydown', documentKeyDownHandler);
  };

  var closeCard = function () {
    var popupCard = document.querySelector('.map__card');

    var popupCardClose = popupCard.querySelector('.popup__close');
    popupCard.classList.add('hidden');

    popupCardClose.removeEventListener('click', closeCard);
    popupCardClose.removeEventListener('keydown', popupCardCloseKeyDownHandler);
    document.removeEventListener('keydown', documentKeyDownHandler);
  };

  window.popup = {
    openCard: openCard,
    mapPinKeyDownHandler: mapPinKeyDownHandler
  };
})();
