/* global noUiSlider:readonly */
const effects = document.querySelector('.effects');
const uploadPreviewImg = document.querySelector('.img-upload__preview > img')
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
let currentClass = 'effects__preview--none';
const effectsMap = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


const changeEffectValue = () => {
  switch (currentClass) {
    case effectsMap.none:
      slider.style.display = 'none';
      uploadPreviewImg.style.filter = '';
      break;

    case effectsMap.chrome:
      slider.style.display = 'block';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });

      slider.noUiSlider.on('update', (value, handle) => {
        sliderValue.value = value[handle];
        uploadPreviewImg.style.filter = `grayscale(${sliderValue.value})`;
      });
      break;

    case effectsMap.sepia:
      slider.style.display = 'block';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });

      slider.noUiSlider.on('update', (value, handle) => {
        sliderValue.value = value[handle];
        uploadPreviewImg.style.filter = `sepia(${sliderValue.value})`;
      });
      break;

    case effectsMap.marvin:
      slider.style.display = 'block';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });

      slider.noUiSlider.on('update', (value, handle) => {
        sliderValue.value = value[handle];
        uploadPreviewImg.style.filter = `invert(${sliderValue.value}%)`;
      });
      break;

    case effectsMap.phobos:
      slider.style.display = 'block';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });

      slider.noUiSlider.on('update', (value, handle) => {
        sliderValue.value = value[handle];
        uploadPreviewImg.style.filter = `blur(${sliderValue.value}px)`;
      });
      break;

    case effectsMap.heat:
      slider.style.display = 'block';
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });

      slider.noUiSlider.on('update', (value, handle) => {
        sliderValue.value = value[handle];
        uploadPreviewImg.style.filter = `brightness(${sliderValue.value})`;
      });
      break;
  }
};

const changeEffect = () => {
  uploadPreviewImg.classList.add(currentClass);
  slider.style.display = 'none';

  effects.addEventListener('click', (evt) => {

    if (evt.target.matches('.effects__radio')) {
      uploadPreviewImg.classList.remove(currentClass);
      currentClass = 'effects__preview--' + evt.target.value;
      uploadPreviewImg.classList.add(currentClass);

      changeEffectValue();
    }

  });
};

export {changeEffect};
