import {createPhotos} from './data.js';
import {drawPhotos} from './photo.js';
import {isEscEvent} from './util.js';

const photos = createPhotos();
const bodyElement = document.querySelector('body');
const preview = document.querySelector('.big-picture');
const previewCloseButton = preview.querySelector('.big-picture__cancel');
const commentsCount = preview.querySelector('.social__comment-count');
const commentLoaderButton = preview.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentsArray = photos.map((currentValue) => {
  return currentValue.comments;
});

drawPhotos(photos);

const closePreview = () => {
  preview.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPreviewEscDown);
}

const openPreview = () => {
  preview.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentLoaderButton.classList.add('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onPreviewEscDown);
  previewCloseButton.addEventListener('click', closePreview);
};

const onPreviewEscDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePreview();
  }
};

const clearComments = () => {
  preview.querySelector('.social__comments').innerHTML = '';
};

const createComment = (comments) => {
  const commentItem = document.createElement('li');
  const commentPicture = document.createElement('img');
  const commentText = document.createElement('p');

  commentItem.classList.add('social__comment');
  commentPicture.classList.add('social__picture');
  commentText.classList.add('social__text');

  commentPicture.src = comments.avatar;
  commentPicture.alt = comments.name;
  commentText.textContent = comments.message;

  commentItem.append(commentPicture, commentText);

  return commentItem;
};

const drawComments = (comments) => {
  clearComments();

  let commentsFragment = document.createDocumentFragment();
  comments.forEach((currentValue, index) => {
    commentsFragment = createComment(comments[index]);
    commentsList.appendChild(commentsFragment);
  });
};

const fillPreview = (photo) => {
  preview.querySelector('img').src = photo.url;
  preview.querySelector('.likes-count').textContent = photo.likes;
  preview.querySelector('.comments-count').textContent = photo.comments.length;
  preview.querySelector('.social__caption').textContent = photo.description;
};

const showPreview = () => {
  const photosElement = document.querySelectorAll('.picture');
  photosElement.forEach((currentValue, index) => {
    currentValue.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPreview();
      fillPreview(photos[index]);
      drawComments(commentsArray[index]);
    });
  });
};

showPreview();
