'use strict';

(function () {
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var titleErrorMessage = templateError.querySelector('.error__message');
  var buttonErrorMessage = templateError.querySelector('.error__button');

  var closeMessage = function () {
    buttonErrorMessage.removeEventListener('click', buttonErrorClickHandler);
    templateError.removeEventListener('click', templateErrorClickHandler);
    document.removeEventListener('keydown', documentKeyDownHandler);

    templateError.remove();

    window.start.deActivatedPage();
  };

  var templateErrorClickHandler = function (evt) {
    var target = evt.target;
    if (target && !target.matches('.error__button')) {
      closeMessage();
    }
  };

  var documentKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEscape) {
      closeMessage();
    }
  };

  var buttonErrorClickHandler = function () {
    closeMessage();
  };

  var showMessage = function (message) {

    titleErrorMessage.textContent = message;

    buttonErrorMessage.addEventListener('click', buttonErrorClickHandler);
    templateError.addEventListener('click', templateErrorClickHandler);
    document.addEventListener('keydown', documentKeyDownHandler);

    document.body.appendChild(templateError);
  };

  window.message = {
    showMessage: showMessage
  };

})();

