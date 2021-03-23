import {drawPhotos} from './photo.js';
import {getInteger, debounce} from './util.js';

const DEBOUNCE_INTERVAL = 500;
const RANDOM_PHOTO_QUANTITY = 10;
const filters = document.querySelector('.img-filters');
const filterForm = filters.querySelector('.img-filters__form');
const filterButtons = filters.querySelectorAll('.img-filters__button');

const removeActiveClass = () => {
  filterButtons.forEach((currentValue) => {
    currentValue.classList.remove('img-filters__button--active');
  });
};

const sortByComments = (photos) => {
  return photos.slice().sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

const sortRandom = (photos) => {
  const photosTemporary = photos.slice();

  for (let i = photosTemporary.length - 1; i > 0; i--) {
    let j = getInteger(0, i);

    [photosTemporary[i], photosTemporary[j]] = [photosTemporary[j], photosTemporary[i]];
  }

  return photosTemporary.slice(0, RANDOM_PHOTO_QUANTITY);
};

const showFilteredPhotos = (photos) => {
  filters.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    removeActiveClass();

    evt.target.classList.add('img-filters__button--active');

    if (evt.target.id === 'filter-discussed') {
      const discussedPhoto = sortByComments(photos);
      debounce(() => drawPhotos(discussedPhoto), DEBOUNCE_INTERVAL);
    } else if (evt.target.id === 'filter-random') {
      const randomPhoto = sortRandom(photos);
      debounce(() => drawPhotos(randomPhoto), DEBOUNCE_INTERVAL);
    } else {
      debounce(() => drawPhotos(photos), DEBOUNCE_INTERVAL);
    }
  });

};

export {showFilteredPhotos};
