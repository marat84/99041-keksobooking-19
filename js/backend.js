'use strict';

(function () {
  var XHR_TIMEOUT = 10000;
  var XHR_LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_SEND_URL = 'https://js.dump.academy/keksobooking';

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

  var xhrCreate = function () {
    var request = new XMLHttpRequest();
    request.timeout = XHR_TIMEOUT;
    return request;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrCreate();

    xhr.responseType = 'json';
    xhr.open('GET', XHR_LOAD_URL);

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

  var send = function (data, onLoad, onError) {
    var xhr = xhrCreate();

    xhr.open('POST', XHR_SEND_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
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

    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
