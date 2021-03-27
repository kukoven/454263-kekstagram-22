import {drawPhotos} from './photo.js';
import {showUploadImg, showSuccessPostMessage} from './upload-file.js';
import {getData} from './backend.js';
import {showErrorAlert} from './util.js';
import {setUploadFormSubmit} from './validation-form.js';
import {showFilteredPhotos} from './filter.js';

getData((photos) => {
  drawPhotos(photos);
  showFilteredPhotos(photos);}, showErrorAlert());
showUploadImg();
setUploadFormSubmit(showSuccessPostMessage);
