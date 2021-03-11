import {isEscEvent} from './util.js';
import {changeScale} from './scale.js';
import {changeEffect} from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadImgInput = uploadForm.querySelector('.img-upload__input');
const uploadImg = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const bodyElement = document.body;

const openUpload = () => {
  uploadImg.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscDown);

  changeScale();
  changeEffect();
};

const closeUpload = () => {
  uploadImg.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadImgInput.value = '';
  document.removeEventListener('keydown', (onUploadEscDown));
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

export {showUploadImg};
