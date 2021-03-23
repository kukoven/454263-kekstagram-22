import {isEscEvent} from './util.js';

const COMMENTS_MAX_LENGTH = 5;
const bodyElement = document.body;
const preview = document.querySelector('.big-picture');
const previewCloseButton = preview.querySelector('.big-picture__cancel');
const commentsCount = preview.querySelector('.social__comment-count');
const commentLoaderButton = preview.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
let commentsShowed = null;

const commentsFragment = document.createDocumentFragment();
const closePreview = () => {
  preview.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPreviewEscDown);
  clearComments();
  commentLoaderButton.classList.remove('hidden');
  commentsShowed = null;
};
const fillPreview = (photo) => {
  preview.querySelector('img').src = photo.url;
  preview.querySelector('.likes-count').textContent = photo.likes;
  preview.querySelector('.comments-count').textContent = photo.comments.length;

  preview.querySelector('.social__caption').textContent = photo.description;
  drawComments(photo.comments);

};
const openPreview = (photo) => {
  clearComments();
  fillPreview(photo);
  preview.classList.remove('hidden');
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
  commentsList.innerHTML = '';

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

const showAnotherComments = (commentsLength, comments) => {
  commentsShowed += commentsLength;

  for (let i = commentsShowed; i < commentsShowed + COMMENTS_MAX_LENGTH; i++) {

    if (comments[i] === undefined) {
      commentLoaderButton.classList.add('hidden');

      break;
    }

    commentsFragment.appendChild(createComment(comments[i]));
  }

  commentsList.appendChild(commentsFragment);

  commentsCount.firstChild.textContent = `${commentsList.children.length} из `;
};

const drawComments = (comments) => {
  const commentsLength = comments.length > COMMENTS_MAX_LENGTH ? COMMENTS_MAX_LENGTH : comments.length;

  for (let i = 0; i < commentsLength; i++) {
    commentsFragment.appendChild(createComment(comments[i]));
  }

  commentsList.appendChild(commentsFragment)
  commentsCount.firstChild.textContent = `${commentsList.children.length} из `

  if (commentsLength < COMMENTS_MAX_LENGTH) {
    commentLoaderButton.classList.add('hidden');
  }

  commentLoaderButton.addEventListener('click', () => {
    showAnotherComments(commentsLength, comments);
  });
};

const showPreview = (photo) => {
  openPreview(photo);
};

export {showPreview};
