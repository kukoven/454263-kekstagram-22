const getData = (onSuccess, onFailed) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Изображения не загрузились');
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((error) => {
      onFailed(error);
    });
};

const sendData = (onSuccess, onFailed, body, successMassage, clear) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagra',
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        successMassage();
        clear();
      } else {
        throw new Error('Не получилось отправить данные');
      }
    })
    .catch(() => {
      onFailed();
    });
};

export {getData, sendData};
