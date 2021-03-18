import {onUploadEscDown} from './upload-file.js';
import {sendData} from './backend.js';
import {isEscEvent} from './util.js';
import {resetScale} from './scale.js';
import {resetEffectValue} from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentText = uploadForm.querySelector('.text__description');
const imageUploadInput = uploadForm.querySelector('.img-upload__input');
const regLettersAndNumbers = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const INDEX_OF_FIRST_SYMBOL = 0;
const INDEX_OF_SECOND_SYMBOL = 1;
const MIN_HASHTAG_SYMBOL = 2;
const MAX_HASHTAG_SYMBOL = 20
const HASHTAGS_AMOUNT = 5;
const COMMENT_AMOUNT = 140;
const BORDER_ERROR_STYLE = '4px solid red';

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
    } else if (hashtagsArray[i][INDEX_OF_FIRST_SYMBOL] !== '#' && hashtagsArray[i] !== '') {
      hashtagInput.setCustomValidity('Хэш-тег должен начинаться с решётки!');
    } else if (!regLettersAndNumbers.test(hashtagsArray[i][INDEX_OF_SECOND_SYMBOL])) {
      hashtagInput.setCustomValidity('После решётки должна быть написана буква или цифра!');
    } else if (hashtagsArray[i].length < MIN_HASHTAG_SYMBOL && hashtagsArray[i] !== '') {
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

const clearForm = () => {
  uploadForm.reset();
  resetScale();
  resetEffectValue();
  commentText.value = '';
  hashtagInput.value = '';
  imageUploadInput.value = '';
};

const formValidation = () => {
  hashtagsValidation();
  commentValidation();

  uploadForm.addEventListener('invalid', (evt) => {
    evt.target.style.border = BORDER_ERROR_STYLE;
  }, {capture: true});

  uploadForm.addEventListener('input', (evt) => {
    evt.target.style.border = '';
  });
};

const closeSuccessPostMessage = () => {
  successMessage.remove();

  document.removeEventListener('keydown', onSuccessPostMessageEsc);
}

const onSuccessPostMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessPostMessage();
  }
};

const SuccessPostMessage = () => {
  document.querySelector('main').appendChild(successMessage);

  document.addEventListener('keydown', onSuccessPostMessageEsc);
  document.querySelector('.success__button').addEventListener('click', closeSuccessPostMessage);
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      closeSuccessPostMessage();
    }
  });
};

const closeErrorPostMessage = () => {
  errorMessage.remove();

  document.removeEventListener('keydown', onErrorPostMessageEsc);
}

const onErrorPostMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    closeErrorPostMessage();
  }
};

const errorPostMessage = () => {
  document.querySelector('main').appendChild(errorMessage);
  errorMessage.style.zIndex = '2';

  document.addEventListener('keydown', onErrorPostMessageEsc);
  document.querySelector('.error__button').addEventListener('click', closeErrorPostMessage);
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      closeErrorPostMessage();
    }
  });
};

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(onSuccess, errorPostMessage, new FormData(evt.target), SuccessPostMessage, clearForm);
  });
};

export {formValidation, setUploadFormSubmit, clearForm};
