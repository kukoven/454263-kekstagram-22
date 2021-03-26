import {isEscEvent} from './util.js';
import {changeScale, resetScale} from './scale.js';
import {changeEffect, resetEffectValue} from './effects.js';
import {formValidation} from './validation-form.js';

const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
const uploadForm =document.querySelector('.img-upload__form')
const uploadImgInput = uploadForm.querySelector('.img-upload__input');
const uploadImgPreview = uploadForm.querySelector('.img-upload__preview > img');
const uploadImg = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const commentText = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const bodyElement = document.body;
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessage = successTemplate.cloneNode(true);

const openUpload = () => {
  uploadImg.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscDown);

  changeScale();
  changeEffect();
  formValidation();
};

const closeUpload = () => {
  uploadImg.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  clearForm();
  document.removeEventListener('keydown', onUploadEscDown);
};

const onUploadEscDown = (evt) => {
  if (isEscEvent(evt)) {
    closeUpload();
  }
};

const showUploadImg = () => {
  uploadImgInput.addEventListener('change', openUpload);
  uploadCloseButton.addEventListener('click', closeUpload);
};

const clearForm = () => {
  uploadForm.reset();
  resetScale();
  resetEffectValue();
  commentText.value = '';
  hashtagInput.value = '';
  uploadImgInput.value = '';
};

const closeSuccessPostMessage = () => {
  successMessage.remove();
  clearForm();
  uploadImg.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onSuccessPostMessageEsc);
}

const onSuccessPostMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessPostMessage();
  }
};

const successPostMessage = () => {
  document.querySelector('main').appendChild(successMessage);
  successMessage.style.zIndex = '2';

  document.addEventListener('keydown', onSuccessPostMessageEsc);
  document.querySelector('.success__button').addEventListener('click', closeSuccessPostMessage);
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      closeSuccessPostMessage();
    }
  });
};

uploadImgInput.addEventListener('change', () => {
  const file = uploadImgInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((currentValue) => {
    return fileName.endsWith(currentValue);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadImgPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export {showUploadImg, onUploadEscDown, closeUpload, successPostMessage};
