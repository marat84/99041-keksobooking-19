'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var selectRoomAmount = mainForm.querySelector('#room_number');
  var selectCapacity = mainForm.querySelector('#capacity');
  var resetButton = mainForm.querySelector('.ad-form__reset');

  var resetFormElement = function () {
    mainForm.reset();
  };

  // Валидация. Привязка количества комнат к числу гостей
  var RoomCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  var selectChangeHandler = function () {
    var selectArray = RoomCapacity[selectRoomAmount.value];
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

  selectRoomAmount.addEventListener('change', selectChangeHandler);

  // Валидация. Привязка типа жилья к цене
  var TypePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var placeTypeSelect = mainForm.querySelector('#type');
  var priceTypeInput = mainForm.querySelector('#price');
  var defaultPrice = priceTypeInput.placeholder;
  var defaultMinPrice = priceTypeInput.min;

  var resetPrice = function () {
    priceTypeInput.placeholder = defaultPrice;
    priceTypeInput.min = defaultMinPrice;
  };

  var placeTypeSelectChangeHandler = function () {
    var price = TypePrice[
      placeTypeSelect.options[
        placeTypeSelect.selectedIndex
      ].value
    ];

    priceTypeInput.placeholder = price;
    priceTypeInput.min = price;
  };

  placeTypeSelect.addEventListener('change', placeTypeSelectChangeHandler);

  // Валидация. Привязка времени заезда к времени отъезда
  var selectTimeIn = mainForm.querySelector('#timein');
  var selectTimeOut = mainForm.querySelector('#timeout');

  var selectTimeInChangeHandler = function () {
    var timeIndex = selectTimeIn.selectedIndex;

    selectTimeOut.options[timeIndex].selected = true;
  };

  var selectTimeOutChangeHandler = function () {
    var timeIndex = selectTimeOut.selectedIndex;

    selectTimeIn.options[timeIndex].selected = true;
  };

  selectTimeIn.addEventListener('change', selectTimeInChangeHandler);
  selectTimeOut.addEventListener('change', selectTimeOutChangeHandler);

  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(mainForm);

    window.backend.send(data, window.message.success, window.message.error);
  });

  resetButton.addEventListener('click', function () {
    window.start.deActivatedPage();
  });

  var IMAGE_EXTENSIONS = ['jpg', 'png', 'gif'];
  var imageUserInput = mainForm.querySelector('#avatar');
  var photoUserInput = mainForm.querySelector('#images');
  var avatarDefaultImage = mainForm.querySelector('.ad-form-header__preview img');
  var imageBlock;

  var resetAvatarImage = function () {
    var uploadedImages = mainForm.querySelectorAll('.' + window.fileUpload.imageClass);

    Array.from(uploadedImages).forEach(function (current) {
      window.utils.removeElementIfExist(current);
    });

    mainForm.querySelector('.ad-form-header__preview').appendChild(avatarDefaultImage);
  };

  var checkFileName = function (file) {
    var fileName = file.name.toLowerCase();

    return IMAGE_EXTENSIONS.some(function (current) {
      return (fileName.endsWith(current));
    });
  };

  var uploadImage = function (file) {
    if (file && checkFileName(file)) {
      avatarDefaultImage.remove();

      window.fileUpload.setUploadedImage(file, imageBlock);
    }
  };

  imageUserInput.addEventListener('change', function (evt) {
    imageBlock = mainForm.querySelector('.ad-form-header__preview');

    uploadImage(evt.target.files[0]);
  });

  photoUserInput.addEventListener('change', function (evt) {
    imageBlock = document.querySelector('.ad-form__photo');

    uploadImage(evt.target.files[0]);
  });

  window.form = {
    resetElement: resetFormElement,
    resetAvatarImage: resetAvatarImage,
    resetPriceInput: resetPrice
  };
})();
