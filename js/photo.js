const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictures = document.querySelector('.pictures');


const createPhotoElement = (photo) => {
  let photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

const drawPhotos = (photos) => {
  let photosFragment = document.createDocumentFragment();

  photos.forEach((currentValue) => {
    photosFragment = createPhotoElement(currentValue);
    pictures.appendChild(photosFragment);
  });
};

export {drawPhotos};
