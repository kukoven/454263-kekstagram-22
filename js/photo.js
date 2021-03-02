import {createPhotos} from './data.js';

const photos = createPhotos();
const randomPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictures = document.querySelector('.pictures');


const createPhotoElement = (photosArray) => {
  let photoElement = randomPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photosArray.url;
  photoElement.querySelector('.picture__likes').textContent = photosArray.likes;
  photoElement.querySelector('.picture__comments').textContent = photosArray.comments.length;

  return photoElement;
};

const drawPhotos = (photosArray) => {
  let photosFragment = document.createDocumentFragment();

  photosArray.forEach((value, i) => {
    photosFragment = createPhotoElement(photosArray[i]);
    pictures.appendChild(photosFragment);
  });
};

export {drawPhotos, photos};
