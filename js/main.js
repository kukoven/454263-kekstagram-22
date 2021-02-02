// Функция возвращающая целое число [min, max]

const getInteger = function (min, max) {
  if (min < 0) {
    min = 0;
  }

  return Math.floor(Math.random() * (max + 1) + min);
};

getInteger(0, 10);


//Функция для проверки максимальной длины строки

const getMaxStringWidth = function(string, maxWidth) {
  return string.length <= maxWidth;
};

getMaxStringWidth('Функция для проверки максимальной длины строки', 140);

