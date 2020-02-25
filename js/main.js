'use strict';

var ENTER_KEY = 'Enter';
var MOUSE_KEY = 0;
var MAIN_PIN_TAIL_HEIGHT = 22;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var SMALL_PIN_HEIGHT = 70;
var SMALL_PIN_WIDTH = 50;
var MAP_WIDTH = 1200;

var OFFER_TITLE_DATA = [
  'Аренда шикарной 2х комнатной квартиры',
  'Квартира в восхитительной новостройке',
  'Просторная и комфортабельная квартира сдаётся на посуточную аренду',
  'Евро квартира посуточно',
  'Сдается квартира хостел',
  'Сдается в аренду с новым ремонтом и новой мебелью',
  'Сдаётся одна комнатная квартира',
  'Сдаётся квартира в центре'
];
var STUDIO_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TIMES_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var TIMES_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
var STUDIO_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var OFFER_DESCRIPTION = [
  'Квартира для Вашей семьи. Мы приглашаем вас окунуться в сказочный мир в прямом смысле этого слова. Эта не проста квартира, только здесь вы поймете, как выглядит просторная квартира толка в этой квартиры вы оцените настоящий домашний комфорт и уют. Именно эту квартиру очень легко влюбиться и невозможно разлюбить агентства недвижимости которую вы щас позвоните более 20 лет на рынке. Эксперты работают лучшей базой элитных квартир по центру города Токио. С нами вы найдете квартиру надежно, легко и быстро',
  'Квартира для Вашей семьи. Именно эту квартиру очень легко влюбиться и невозможно разлюбить агентства недвижимости которую вы щас позвоните более 20 лет на рынке.',
  'Эта не проста квартира, только здесь вы поймете, как выглядит просторная квартира толка в этой квартиры вы оцените настоящий домашний комфорт и уют.',
  'Мы приглашаем вас окунуться в сказочный мир в прямом смысле этого слова. Эксперты работают лучшей базой элитных квартир по центру города Токио. С нами вы найдете квартиру надежно, легко и быстро',
  'Хороший ремонт. Мебель + техника. Предоплата за 2месяца.',
  'Новый современный ремонт. Тихий спокойный район. Заходи и живи.',
  'Аренда квартира долгосрочная с мебелю и техникой. Только для иностранцев',
  'Тихий спокойный район. Только для семьи',
];
var STUDIO_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomSlicedArray = function (array) {
  return array.slice(0, getRandomNumber(1, array.length));
};

var generateData = function (count) {
  var resultArray = [];

  for (var i = 0; i < count; i++) {
    var xAxis = getRandomNumber(SMALL_PIN_WIDTH, (MAP_WIDTH - SMALL_PIN_WIDTH));
    var yAxis = getRandomNumber(130, 630);

    resultArray.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png',
          },
          'offer': {
            'title': OFFER_TITLE_DATA[i],
            'address': (xAxis + ', ' + yAxis),
            'price': getRandomNumber(1000, 9000),
            'type': getRandomValue(STUDIO_TYPES),
            'rooms': getRandomNumber(1, 6),
            'guests': getRandomNumber(1, 8),
            'checkin': getRandomValue(TIMES_CHECKIN),
            'checkout': getRandomValue(TIMES_CHECKOUT),
            'features': getRandomSlicedArray(STUDIO_FEATURES),
            'description': OFFER_DESCRIPTION[i],
            'photos': getRandomSlicedArray(STUDIO_PHOTOS)
          },
          'location': {
            'x': xAxis,
            'y': yAxis
          }
        }
    );
  }

  return resultArray;
};

var offerData = generateData(8);

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var createPinElement = function (pin) {
  var clonePin = templatePin.cloneNode(true);

  clonePin.style.top = pin.location.y - SMALL_PIN_HEIGHT + 'px';
  clonePin.style.left = pin.location.x - (SMALL_PIN_WIDTH / 2) + 'px';

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
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(cards));

  // elementBeforePlacedCard.insertAdjacentHTML('beforebegin', cardFragment.querySelector('.popup'));

  elementBeforePlacedCard.before(cardFragment);
};

var mapPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');
var mainFormElements = mainForm.querySelectorAll('input, button, select, textarea');
var inputAddress = mainForm.querySelector('#address');

var deActivatedPage = function () {
  var pinPosition = {
    x: Math.round(parseInt(mapPin.style.left, 10) - (MAIN_PIN_WIDTH / 2)),
    y: Math.round(parseInt(mapPin.style.top, 10) - (MAIN_PIN_HEIGHT / 2))
  };

  for (var i = 0; i < mainFormElements.length; i++) {
    mainFormElements[i].disabled = true;
  }

  inputAddress.value = pinPosition.x + ', ' + pinPosition.y;
};

deActivatedPage();

var activatedPage = function () {
  renderCard(offerData[0]);
  renderPins(offerData);

  for (var i = 0; i < mainFormElements.length; i++) {
    mainFormElements[i].disabled = false;
  }

  document.querySelector('.map').classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
};

mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_KEY) {
    activatedPage();
  }
});
mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatedPage();
  }
});

var selectRoomAmout = mainForm.querySelector('#room_number');
var selectCapacity = mainForm.querySelector('#capacity');

var RoomCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

var selectChangeHandler = function () {
  var selectArray = RoomCapacity[selectRoomAmout.options[selectRoomAmout.selectedIndex].value];
  var selectItems = Array.from(selectCapacity.options);

  selectItems.forEach(function (current) {
    current.disabled = true;

    for (var i = 0; i < selectArray.length; i++) {
      if (selectArray[i] === current.value) {
        current.disabled = false;
        current.selected = true;

        break;
      }
    }
  });
};

selectRoomAmout.addEventListener('change', selectChangeHandler);
