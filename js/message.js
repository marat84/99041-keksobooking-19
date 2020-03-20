'use strict';

(function () {
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var titleErrorMessage = templateError.querySelector('.error__message');
  var buttonErrorMessage = templateError.querySelector('.error__button');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');

  var clearPage = function () {
    window.start.deActivatedPage();
  };

  var closeErrorMessage = function () {
    buttonErrorMessage.removeEventListener('click', buttonErrorClickHandler);
    templateError.removeEventListener('click', templateErrorClickHandler);
    document.removeEventListener('keydown', documentKeyDownHandler);

    templateError.remove();

    clearPage();
  };

  var closeSuccessMessage = function () {
    templateSuccess.removeEventListener('click', templateSuccessClickHandler);
    document.removeEventListener('keydown', documentSuccessKeyDownHandler);

    templateSuccess.remove();

    clearPage();
  };

  var templateErrorClickHandler = function (evt) {
    var target = evt.target;
    if (target && !target.matches('.error__button')) {
      closeErrorMessage();
    }
  };

  var templateSuccessClickHandler = function () {
    closeSuccessMessage();
  };

  var documentKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEscape) {
      closeErrorMessage();
    }
  };

  var documentSuccessKeyDownHandler = function (evt) {
    if (evt.key === window.utils.keyEscape) {
      closeSuccessMessage();
    }
  };

  var buttonErrorClickHandler = function () {
    closeErrorMessage();
  };

  var errorMessage = function (message) {
    titleErrorMessage.textContent = message;

    buttonErrorMessage.addEventListener('click', buttonErrorClickHandler);
    templateError.addEventListener('click', templateErrorClickHandler);
    document.addEventListener('keydown', documentKeyDownHandler);

    document.querySelector('main').appendChild(templateError);
  };

  var successMessage = function () {
    templateSuccess.addEventListener('click', templateSuccessClickHandler);
    document.addEventListener('keydown', documentSuccessKeyDownHandler);

    document.querySelector('main').appendChild(templateSuccess);

  };

  window.message = {
    error: errorMessage,
    success: successMessage
  };

})();

