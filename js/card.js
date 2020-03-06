'use strict';

(function () {
  var CARD_AMOUNT = 8;
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var elementBeforePlacedCard = document.querySelector('.map__filters-container');

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
    var cardClone = cardTemplate.cloneNode(true);

    cardClone.querySelector('.popup__title').textContent = card.offer.title;
    cardClone.querySelector('.popup__text--address').textContent = card.offer.address;
    cardClone.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = getOfferType(card.offer.type);
    cardClone.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    cardClone.querySelector('.popup__features').innerHTML = '';
    cardClone.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));

    cardClone.querySelector('.popup__description').textContent = card.offer.description;

    cardClone.querySelector('.popup__photos').innerHTML = '';
    cardClone.querySelector('.popup__photos').appendChild(renderPhotos(card.offer.photos));

    cardClone.querySelector('.popup__avatar').src = card.author.avatar;

    return cardClone;
  };

  var renderCard = function (cards) {

    for (var i = 0; i < CARD_AMOUNT; i++) {
      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(createCard(cards[i]));

      elementBeforePlacedCard.before(cardFragment);
    }

    // elementBeforePlacedCard.insertAdjacentHTML('beforebegin', cardFragment.querySelector('.popup'));
  };

  window.card = {
    renderCard: renderCard,
  };
})();
