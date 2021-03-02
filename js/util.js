// Функция возвращающая целое число [min, max]

const getInteger = (min, max) => {
  if (min < 0 || min > max) {
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Функция для проверки максимальной длины строки

const getMaxStringWidth = (string, maxWidth) => {
  return string.length <= maxWidth;
};

getMaxStringWidth('Функция для проверки максимальной длины строки', 140);

export {getInteger};
