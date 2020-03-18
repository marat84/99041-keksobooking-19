'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var elementBeforePlacedCard = document.querySelector('.map__filters-container');

  var cardClone;

  var documentKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEscape) {
      closeCard(cardClone);
    }
  };

  var closeCard = function (card) {
    card.remove();

    window.pins.removePinActiveClass();

    document.removeEventListener('keydown', documentKeyDownHandler);
  };

  var getOfferType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Под открытым небом';
    }
  };

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var creatList = document.createElement('li');
      creatList.classList.add('popup__feature');
      creatList.classList.add('popup__feature--' + features[i]);

      fragment.appendChild(creatList);
    }

    return fragment;
  };

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var cloneImage = cardTemplate.querySelector('.popup__photo').cloneNode();
      cloneImage.src = photos[i];

      fragment.appendChild(cloneImage);
    }

    return fragment;
  };

  var createCard = function (card) {
    cardClone = cardTemplate.cloneNode(true);

    var popupCardClose = cardClone.querySelector('.popup__close');

    document.addEventListener('keydown', documentKeyDownHandler);

    popupCardClose.addEventListener('click', function () {
      closeCard(cardClone);
    });

    cardClone.querySelector('.popup__title').textContent = card.offer.title;
    cardClone.querySelector('.popup__text--address').textContent = card.offer.address;
    cardClone.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = getOfferType(card.offer.type);
    cardClone.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var cardFeature = cardClone.querySelector('.popup__features');
    if (card.offer.features.length > 0) {
      cardFeature.innerHTML = '';
      cardFeature.appendChild(renderFeatures(card.offer.features));
    } else {
      cardFeature.remove();
    }

    cardClone.querySelector('.popup__description').textContent = card.offer.description;

    var cardPhoto = cardClone.querySelector('.popup__photos');
    if (card.offer.features.length > 0) {
      cardPhoto.innerHTML = '';
      cardPhoto.appendChild(renderPhotos(card.offer.photos));
    } else {
      cardPhoto.remove();
    }

    cardClone.querySelector('.popup__avatar').src = card.author.avatar;

    return cardClone;
  };

  var removeCard = function () {
    window.utils.removeElementIfExist(cardClone);
  };

  var renderCard = function (cards) {
    removeCard();

    elementBeforePlacedCard.before(createCard(cards));
  };

  window.card = {
    renderCard: renderCard,
    resetCard: removeCard
  };
})();
