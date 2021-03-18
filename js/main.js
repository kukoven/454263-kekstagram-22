import {drawPhotos} from './photo.js';
import {closeUpload, showUploadImg} from './upload-file.js';
import {getData} from './backend.js';
import {errorAlert} from './util.js';
import {setUploadFormSubmit} from './validation-form.js';

getData(drawPhotos, errorAlert);
showUploadImg();
setUploadFormSubmit(closeUpload);
