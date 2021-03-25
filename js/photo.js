import {showPreview} from './preview.js';

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictures = document.querySelector('.pictures');

const clearPhotoGallery = () => {
  const picture = document.querySelectorAll('.picture');

  picture.forEach((currentValue) => {
    currentValue.remove();
  });
};

const createPhotoElement = (photo) => {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPreview(photo);
  });

  return photoElement;
};

const drawPhotos = (photos) => {
  clearPhotoGallery();

  const photosFragment = document.createDocumentFragment();

  photos.forEach((currentValue) => {
    photosFragment.appendChild(createPhotoElement(currentValue));
  });

  pictures.appendChild(photosFragment);
};

export {drawPhotos};
