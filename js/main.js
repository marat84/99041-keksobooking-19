'use strict';

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
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
    var xAxis = getRandomNumber(PIN_WIDTH, (MAP_WIDTH - PIN_WIDTH));
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

  clonePin.style.top = pin.location.y - PIN_HEIGHT + 'px';
  clonePin.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';

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

renderPins(offerData);

document.querySelector('.map').classList.remove('map--faded');

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var cardClone = cardTemplate.cloneNode(true);
var offerType;

switch (offerData[0].offer.type) {
  case 'flat':
    offerType = 'Квартира';
    break;
  case 'bungalo':
    offerType = 'Бунгало';
    break;
  case 'house':
    offerType = 'Дом';
    break;
  case 'palace':
    offerType = 'Дворец';
    break;
  default:
    offerType = 'Под открытым небом';
}

// * Реализация с перерисовкой DOM'a была закоментирована т.к. посчитал
// что прятать элементы более производительно и по ТЗ правильнее вроде как

// var renderFeatures = function (features) {
//   var fragment = document.createDocumentFragment();
//
//   for (var i = 0; i < features.length; i++) {
//     var creatList = document.createElement('li');
//     creatList.classList.add('popup__feature');
//     creatList.classList.add('popup__feature--' + features[i]);
//
//     fragment.appendChild(creatList);
//   }
//
//   return fragment;
// };

// cardClone.querySelector('.popup__features').innerHTML = '';
// cardClone.querySelector('.popup__features').appendChild(renderFeatures(offerData[0].offer.features));

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var cloneImage = cardTemplate.querySelector('.popup__photo').cloneNode();
    cloneImage.src = photos[i];

    fragment.appendChild(cloneImage);
  }

  return fragment;
};

cardClone.querySelector('.popup__title').textContent = offerData[0].offer.title;
cardClone.querySelector('.popup__text--address').textContent = offerData[0].offer.address;
cardClone.querySelector('.popup__text--price').textContent = offerData[0].offer.price + '₽/ночь';
cardClone.querySelector('.popup__type').textContent = offerType;
cardClone.querySelector('.popup__text--capacity').textContent = offerData[0].offer.rooms + ' комнаты для ' + offerData[0].offer.guests + ' гостей';
cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData[0].offer.checkin + ', выезд до ' + offerData[0].offer.checkout;

var popupFeatures = cardClone.querySelectorAll('.popup__feature');
for (var k = 0; k < popupFeatures.length; k++) {
  if (!popupFeatures[k].classList.contains('popup__feature--' + offerData[0].offer.features[k])) {
    popupFeatures[k].style.display = 'none';
  }
}

cardClone.querySelector('.popup__description').textContent = offerData[0].offer.description;

cardClone.querySelector('.popup__photos').innerHTML = '';
cardClone.querySelector('.popup__photos').appendChild(renderPhotos(offerData[0].offer.photos));

cardClone.querySelector('.popup__avatar').src = offerData[0].author.avatar;

document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', cardClone);
