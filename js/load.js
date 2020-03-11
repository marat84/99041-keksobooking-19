'use strict';

(function () {
  var getErrorStatus = function (status) {
    switch (status) {
      case 500:
        return 'Сервер обнаружил непредвиденное состояние, которое не позволило ему выполнить запрос';
      case 400:
      case 404:
      case 410:
        return 'Не возможно получить доступ к странице! Возможно, введён некорректный адрес или страница была удалена';
      case 401:
      case 403:
      case 407:
        return 'У вас нет доступа! Попробуйте сбросить кэш браузера и очистить cookies';
      case 405:
      case 411:
      case 412:
      case 413:
      case 414:
      case 415:
      case 416:
      case 417:
      case 501:
        return 'Некорректно указанный запрос! Проверте правильность запроса';
      case 503:
        return 'Сервер не доступен! Попробуйте зайти позже';
      case 419:
      case 504:
        return 'Время на выполнение запроса истекло! Попробуйте зайти позже';
      default:
        return 'Неизвестный статус: ' + status + '! Проверте правильность запроса';
    }
  };

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = 'json';
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(getErrorStatus(xhr.status));
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен');
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения! Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение');
    });

    xhr.send();
  };

  window.load = {
    loadData: loadData
  };
})();
