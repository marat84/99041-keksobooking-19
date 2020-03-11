'use strict';

(function () {
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

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(getErrorStatus(xhr.status));
      }
    });

    xhr.addEventListener('timeout', function () {
      onError({
        title: 'Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен',
        text: 'Проверте ваше интернет соединение или попробуйте зайти позже'
      });
    });

    xhr.addEventListener('error', function () {
      onError({
        title: 'Ошибка соединения',
        text: 'Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение'
      });
    });

    xhr.send();
  };

  window.load = {
    loadData: loadData
  };
})();
