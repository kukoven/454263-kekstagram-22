import {getInteger} from './util.js';

const PHOTOS_QUANTITY = 25;
const DESCRIPTIONS = [
  'Гуляем',
  'Не гуляем',
  'Сходим с ума, как матерь драконов',
  'Кушаем вдоволь, как Александр Градский',
  'Летаем как Барон Мюнхгаузен',
  'Вот это поворот',
  'Красота то какая',
];
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Василий',
  'Софокл',
  'Софья',
  'Ольг',
  'Капитон',
  'Клавдия',
  'Ходор',
];

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 7;

const getArrayElement = (array) => {
  return array[getInteger(0, array.length - 1)];
};

const createComments = () => {
  const messageQuantity = getInteger(1, 2);

  const comment = {
    id: getInteger(1, 200),
    avatar: 'img/avatar-' + getInteger(MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: getArrayElement(COMMENTS_TEXT),
    name: getArrayElement(NAMES),
  };

  if (messageQuantity > 1) {
    comment.message += getArrayElement(COMMENTS_TEXT);
  }

  return comment;
};

const createCommentsArray = () => {
  const commentsAmount = getInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];

  for (let i = 1; i <= commentsAmount; i++) {
    comments.push(createComments());
  }

  return comments;
};

const createPhotos = () => {
  const photos = [];

  for (let i = 1; i <= PHOTOS_QUANTITY; i++) {
    const newPhoto = {
      id: i,
      url: 'photos/' + i + '.jpg',
      description: getArrayElement(DESCRIPTIONS),
      likes: getInteger(MIN_LIKES, MAX_LIKES),
      comments: createCommentsArray(),
    };

    photos.push(newPhoto);
  }

  return photos;
};

export {createPhotos};
