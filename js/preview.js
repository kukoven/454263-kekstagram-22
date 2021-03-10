import {isEscEvent} from './util.js';

const bodyElement = document.body;
const preview = document.querySelector('.big-picture');
const previewCloseButton = preview.querySelector('.big-picture__cancel');
const commentsCount = preview.querySelector('.social__comment-count');
const commentLoaderButton = preview.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');

const closePreview = () => {
  preview.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPreviewEscDown);
};

const fillPreview = (photo) => {
  preview.querySelector('img').src = photo.url;
  preview.querySelector('.likes-count').textContent = photo.likes;
  preview.querySelector('.comments-count').textContent = photo.comments.length;
  preview.querySelector('.social__caption').textContent = photo.description;

  drawComments(photo.comments);
};

const openPreview = (photo) => {
  fillPreview(photo);

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

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((_, index) => {
    commentsFragment.appendChild(createComment(comments[index]));
  });

  commentsList.appendChild(commentsFragment);
};

const showPreview = (photo) => {
  openPreview(photo);
};

export {showPreview};
