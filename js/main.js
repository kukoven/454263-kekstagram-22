import {drawPhotos} from './photo.js';
import {showUploadImg, successPostMessage} from './upload-file.js';
import {getData} from './backend.js';
import {errorAlert} from './util.js';
import {setUploadFormSubmit} from './validation-form.js';
import {showFilteredPhotos} from './filter.js';

getData((photos) => {
  drawPhotos(photos);
  showFilteredPhotos(photos);}, errorAlert);
showUploadImg();
setUploadFormSubmit(successPostMessage);
