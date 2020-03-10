'use strict';

(function () {
  var xhr = new XMLHttpRequest();

  var loadData = function (onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        window.message.showMessage(window.message.getErrorStatus(xhr.status));
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
