'use strict';

(function () {
  var UPLOADED_IMAGE_CLASS = 'uploaded-image';

  var setUploadedImage = function (file, imageBlock) {
    var newImage = document.createElement('img');
    newImage.classList.add(UPLOADED_IMAGE_CLASS);
    newImage.setAttribute('width', '100%');
    newImage.style.minWidth = '40px';
    newImage.style.maxHeight = '100%';

    window.utils.removeElementIfExist(imageBlock.querySelector('.' + UPLOADED_IMAGE_CLASS));

    imageBlock.appendChild(newImage);

    var readFile = new FileReader();
    readFile.addEventListener('load', function (fileEvt) {
      newImage.src = fileEvt.target.result;
    });
    readFile.readAsDataURL(file);
  };

  window.fileUpload = {
    uploadedImageClass: UPLOADED_IMAGE_CLASS,
    setUploadedImage: setUploadedImage
  };
})();
