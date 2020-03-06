'use strict';

(function () {
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

  var generateData = function (count) {
    var resultArray = [];

    for (var i = 0; i < count; i++) {
      var xAxis = window.utils.getRandomNumber(window.utils.smallPinWidth, (window.utils.mapWidth - window.utils.smallPinWidth));
      var yAxis = window.utils.getRandomNumber(window.utils.mapMinHeight, window.utils.mapMaxHeight);

      resultArray.push(
          {
            'author': {
              'avatar': 'img/avatars/user0' + (i + 1) + '.png',
            },
            'offer': {
              'title': OFFER_TITLE_DATA[i],
              'address': (xAxis + ', ' + yAxis),
              'price': window.utils.getRandomNumber(1000, 9000),
              'type': window.utils.getRandomValue(STUDIO_TYPES),
              'rooms': window.utils.getRandomNumber(1, 6),
              'guests': window.utils.getRandomNumber(1, 8),
              'checkin': window.utils.getRandomValue(TIMES_CHECKIN),
              'checkout': window.utils.getRandomValue(TIMES_CHECKOUT),
              'features': window.utils.getRandomSlicedArray(STUDIO_FEATURES),
              'description': OFFER_DESCRIPTION[i],
              'photos': window.utils.getRandomSlicedArray(STUDIO_PHOTOS)
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

  var getData = function (data) {
    return (data);
  };

  window.load.loadData(getData);

  window.data = {
    generateData: generateData
  };
})();
