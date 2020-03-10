'use strict';

(function () {
  var ERROR_COLOR = 'orangeRed';
  var ERROR_SHOW_TIME = 6000;
  var TRANSITION_DURATION = 0.5;

  var getErrorStatus = function (status) {
    switch (status) {
      case 500:
        return {
          title: 'Сервер обнаружил непредвиденное состояние, которое не позволило ему выполнить запрос',
          text: 'Попробуйте зайти позже'
        };
      case 400:
      case 404:
      case 410:
        return {
          title: 'Не возможно получить доступ к странице',
          text: 'Возможно, введён некорректный адрес или страница была удалена'
        };
      case 401:
      case 403:
      case 407:
        return {
          title: 'У вас нет доступа',
          text: 'Попробуйте сбросить кэш браузера и очистить cookies'
        };
      case 405:
      case 411:
      case 412:
      case 413:
      case 414:
      case 415:
      case 416:
      case 417:
      case 501:
        return {
          title: 'Некорректно указанный запрос',
          text: 'Проверте правильность запроса'
        };
      case 503:
        return {
          title: 'Сервер не доступен',
          text: 'Попробуйте зайти позже'
        };
      case 419:
      case 504:
        return {
          title: 'Время на выполнение запроса истекло',
          text: 'Попробуйте зайти позже'
        };
      default:
        return {
          title: 'Неизвестный статус: ' + status,
          text: 'Проверте правильность запроса'
        };
    }
  };

  var hideTimeoutMessage = function (block) {
    var timerBlock = document.createElement('div');
    var pointOfStart = 100;

    timerBlock.setAttribute('style', 'position:absolute; left:0; top:0; height:4px; width:100%; background-color: ' + ERROR_COLOR + ';');

    var interval = setInterval(function () {
      pointOfStart--;

      timerBlock.style.width = pointOfStart + '%';
    }, ERROR_SHOW_TIME / pointOfStart);

    setTimeout(function () {
      clearInterval(interval);

      block.style.top = '-50%';

      setTimeout(function () {
        block.remove();
      }, TRANSITION_DURATION * 1000);

    }, ERROR_SHOW_TIME);

    block.appendChild(timerBlock);
  };

  var showMessage = function (message) {
    var wrapBlockError = document.createElement('section');
    var titleErrorMessage = document.createElement('h2');
    var textErrorMessage = document.createElement('p');

    wrapBlockError.setAttribute('style', 'position: absolute; top:-50%; left:calc(50% - 300px); width: 600px; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.7); text-align: center; padding: 30px; background-color: white; color: ' + ERROR_COLOR + '; z-index: 10; transition: all ' + TRANSITION_DURATION + 's;');
    titleErrorMessage.setAttribute('style', 'text-shadow: none;');

    titleErrorMessage.textContent = message.title;
    textErrorMessage.textContent = message.text;

    wrapBlockError.appendChild(titleErrorMessage);
    wrapBlockError.appendChild(textErrorMessage);

    document.body.appendChild(wrapBlockError);

    setTimeout(function () {
      wrapBlockError.style.top = '10px';
    }, 100);

    hideTimeoutMessage(wrapBlockError);
  };

  window.message = {
    showMessage: showMessage,
    getErrorStatus: getErrorStatus
  };

})();

