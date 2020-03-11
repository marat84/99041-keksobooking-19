'use strict';

(function () {
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var titleErrorMessage = templateError.querySelector('.error__message');
  var buttonErrorMessage = templateError.querySelector('.error__button');

  var buttonErrorClickHandler = function () {
    templateError.remove();
    window.start.deActivatedPage();
  };

  var showMessage = function (message) {

    titleErrorMessage.textContent = message.title;

    buttonErrorMessage.addEventListener('click', buttonErrorClickHandler);

    document.body.appendChild(templateError);
  };

  window.message = {
    showMessage: showMessage
  };

})();

