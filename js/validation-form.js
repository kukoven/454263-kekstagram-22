import {onUploadEscDown} from './upload-file.js';

const hashtagInput = document.querySelector('.text__hashtags');
const commentText = document.querySelector('.text__description');
const regLettersAndNumbers = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
const INDEX_OF_FIRST_SYMBOL = 0;
const INDEX_OF_SECOND_SYMBOL = 1;
const MIN_HASHTAG_SYMBOL = 2;
const MAX_HASHTAG_SYMBOL = 20
const HASHTAGS_AMOUNT = 5;
const COMMENT_AMOUNT = 140;

const isExistSameHashtag = (hashtags) => {
  const uniqueHashTag = [];

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (uniqueHashTag.includes(hashtag)) {
      return true;
    }

    uniqueHashTag.push(hashtag);
  }

  return false;
};

const onHashtagInput = () => {
  const hashtagsArray = hashtagInput.value.toLowerCase().split(' ');

  for (let i = 0; i < hashtagsArray.length; i++) {

    if (hashtagsArray.length > HASHTAGS_AMOUNT) {
      hashtagInput.setCustomValidity('Слишком много хэш-тэгов, нужно поумерить свой пыл!');
    } else if (hashtagsArray[i][INDEX_OF_FIRST_SYMBOL] !== '#') {
      hashtagInput.setCustomValidity('Хэш-тег должен начинаться с решётки!');
    } else if (!regLettersAndNumbers.test(hashtagsArray[i][INDEX_OF_SECOND_SYMBOL])) {
      hashtagInput.setCustomValidity('После решётки должна быть написана буква или цифра!');
    } else if (hashtagsArray[i].length < MIN_HASHTAG_SYMBOL) {
      hashtagInput.setCustomValidity('Нужно написать ещё что-нибудь!');
    } else if (hashtagsArray[i].length > MAX_HASHTAG_SYMBOL) {
      hashtagInput.setCustomValidity('Слишком длинный хэш-тэг!');
    } else if (isExistSameHashtag(hashtagsArray)) {
      hashtagInput.setCustomValidity('Есть повторяющееяся хэш-теги!');
    } else {
      hashtagInput.setCustomValidity('');
    }
  }

  hashtagInput.reportValidity();
}

const hashtagsValidation = () => {
  hashtagInput.addEventListener('input', onHashtagInput);

  hashtagInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onUploadEscDown);
  });

  hashtagInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onUploadEscDown);
  });
};

const onCommentInput = () => {

  if (commentText.value.length > COMMENT_AMOUNT) {
    commentText.setCustomValidity('Слишком длинный комментарий!')
  } else {
    commentText.setCustomValidity('');
  }

  commentText.reportValidity();
};

const commentValidation = () => {
  commentText.addEventListener('input', onCommentInput);

  commentText.addEventListener('blur', () => {
    document.addEventListener('keydown', onUploadEscDown);
  });

  commentText.addEventListener('focus', () => {
    document.removeEventListener('keydown', onUploadEscDown);
  });
};

const formValidation = () => {
  hashtagsValidation();
  commentValidation();
};

export {formValidation};
