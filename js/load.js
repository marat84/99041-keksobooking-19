'use strict';

(function () {
  var xhr = new XMLHttpRequest();

  var loadData = function (onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
  };

  window.load = {
    loadData: loadData
  };
})();
