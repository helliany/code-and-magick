'use strict';

(function () {
  var request = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  };

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();

    request(xhr, onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();

    request(xhr, onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
