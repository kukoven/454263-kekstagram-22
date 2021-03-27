const ALERT_SHOW_TIME = 2000;
let lastTimeout = null;

// Функция возвращающая целое число [min, max]

const getInteger = (min, max) => {
  if (min < 0 || min > max) {
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getInteger(0, 1);

// Функция для проверки максимальной длины строки

const getMaxStringWidth = (string, maxWidth) => {
  return string.length <= maxWidth;
};

getMaxStringWidth('Функция для проверки максимальной длины строки', 140);

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';

  alertContainer.style.display = 'flex';
  alertContainer.style.justifyContent = 'center';
  alertContainer.style.alignItems = 'center';
  alertContainer.style.height = '100vh';

  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (cb, debounceInterval) => {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(cb, debounceInterval);
};

export {getInteger, isEscEvent, showErrorAlert, debounce};
