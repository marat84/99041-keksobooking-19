'use strict';

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var AUTHOR_AVATAR_DATA = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
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
var STUDIO_ADDRESS = [
  '600, 350',
  '500, 250',
  '550, 150',
  '400, 300',
  '520, 310',
  '300, 120',
  '440, 230',
  '450, 100'
];
var STUDIO_PRICES = [
  5000,
  3000,
  4999,
  8000,
  9000,
  1644,
  1888,
  9000
];
var STUDIO_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var STUDIO_ROOMS = [
  3,
  2,
  1,
  2,
  2,
  1,
  1,
  2
];
var STUDIO_GUESTS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
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
  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['dishwasher', 'parking', 'washer', 'conditioner'],
  ['wifi', 'dishwasher', 'washer', 'conditioner']
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
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel3.jpg']
];
var PIN_X_AXIS = [
  800,
  600,
  400,
  548,
  971,
  151,
  1054,
  687,
  798
];
var PIN_Y_AXIS = [
  130,
  600,
  158,
  348,
  271,
  451,
  554,
  217,
  608,
  388
];

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var generateData = function (count) {
  var resultArray = [];

  for (var i = 0; i < count; i++) {
    resultArray.push(
        {
          'author': {
            'avatar': AUTHOR_AVATAR_DATA[i]
          },
          'offer': {
            'title': OFFER_TITLE_DATA[i],
            'address': STUDIO_ADDRESS[i],
            'price': STUDIO_PRICES[i],
            'type': getRandomValue(STUDIO_TYPES),
            'rooms': STUDIO_ROOMS[i],
            'guests': STUDIO_GUESTS[i],
            'checkin': getRandomValue(TIMES_CHECKIN),
            'checkout': getRandomValue(TIMES_CHECKOUT),
            'features': getRandomValue(STUDIO_FEATURES),
            'description': OFFER_DESCRIPTION[i],
            'photos': getRandomValue(STUDIO_PHOTOS)
          },
          'location': {
            'x': getRandomValue(PIN_X_AXIS),
            'y': getRandomValue(PIN_Y_AXIS)
          }
        }
    );
  }

  return resultArray;
};

var offerData = generateData(8);

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var setPin = function (pin) {
  var clonePin = templatePin.cloneNode(true);

  clonePin.style.top = pin.location.y - PIN_HEIGHT + 'px';
  clonePin.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';

  clonePin.querySelector('img').src = pin.author.avatar;
  clonePin.querySelector('img').alt = pin.offer.title;

  return clonePin;
};

var appendPinInToFragment = function (pins) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragmentPin.appendChild(setPin(pins[i]));
  }

  return fragmentPin;
};

var mapWithPins = document.querySelector('.map__pins');

mapWithPins.appendChild(appendPinInToFragment(offerData));

document.querySelector('.map').classList.remove('map--faded');
