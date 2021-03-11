import {createPhotos} from './data.js';
import {drawPhotos} from './photo.js';
import {showUploadImg} from './upload-file.js';

const photos = createPhotos();

drawPhotos(photos);
showUploadImg();



