import {createPhotos} from './data.js';
import {drawPhotos} from './photo.js';
import {showPreview} from './preview.js';

const photos = createPhotos();

drawPhotos(photos);
showPreview(photos[13]);


