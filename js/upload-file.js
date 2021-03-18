import {isEscEvent} from './util.js';
import {changeScale} from './scale.js';
import {changeEffect} from './effects.js';
import {clearForm, formValidation} from './validation-form.js';

const uploadImgInput = document.querySelector('.img-upload__input');
const uploadImg = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const bodyElement = document.body;

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

export {showUploadImg, onUploadEscDown, closeUpload};
