import {drawPhotos} from './photo.js';
import {getInteger, debounce} from './util.js';

const DEBOUNCE = 500;
const RANDOM_PHOTO_QUANTITY = 10;
const filters = document.querySelector('.img-filters');
const filterForm = filters.querySelector('.img-filters__form');
const filterButtons = filters.querySelectorAll('.img-filters__button');

const removeActiveClass = () => {
  filterButtons.forEach((currentValue) => {
    currentValue.classList.remove('img-filters__button--active');
  });
};

const clearPhotoGallery = () => {
  const picture = document.querySelectorAll('.picture');

  picture.forEach((currentValue) => {
    currentValue.remove();
  });
};

const sortByComments = (photos) => {
  return photos.slice().sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

const sortRandom = (photos) => {
  const photoArray = photos.slice();
  const randomPhotoArray = [];

  for (let i = 0; i < RANDOM_PHOTO_QUANTITY; i++) {
    const photoRandomIndex = getInteger(0, photoArray.length - 1);

    randomPhotoArray.push(photoArray[photoRandomIndex]);
    photoArray.splice(photoRandomIndex, 1);
  }

  return randomPhotoArray;
};

const showFilteredPhotos = (photos) => {
  filters.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    removeActiveClass();

    evt.target.classList.add('img-filters__button--active');
    clearPhotoGallery();

    if (evt.target.id === 'filter-discussed') {
      const discussedPhoto = sortByComments(photos);
      debounce(() => drawPhotos(discussedPhoto), DEBOUNCE);
    } else if (evt.target.id === 'filter-random') {
      const randomPhoto = sortRandom(photos);
      debounce(() => drawPhotos(randomPhoto), DEBOUNCE);
    } else {
      debounce(() => drawPhotos(photos), DEBOUNCE);
    }
  });
};

export {showFilteredPhotos};
