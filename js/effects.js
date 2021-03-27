/* global noUiSlider:readonly */
import {resetScale} from './scale.js';

const DEFAULT_CLASS = 'effects__preview--none';

const effect = document.querySelector('.effects');
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

const resetEffectValue = () => {
  slider.style.display = 'none';
  uploadPreviewImg.style.filter = '';
  uploadPreviewImg.classList.remove(currentClass);
  uploadPreviewImg.classList.add(DEFAULT_CLASS);
};

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
      break;
  }
};

const changeEffect = () => {
  uploadPreviewImg.classList.add(DEFAULT_CLASS);
  slider.style.display = 'none';

  effect.addEventListener('click', (evt) => {

    if (evt.target.matches('.effects__radio')) {
      resetScale();

      uploadPreviewImg.classList.remove(currentClass);
      currentClass = 'effects__preview--' + evt.target.value;
      uploadPreviewImg.classList.add(currentClass);

      changeEffectValue();
    }

    slider.noUiSlider.on('update', (value, handle) => {
      const effectsValue = {
        'effects__preview--chrome': `grayscale(${sliderValue.value})`,
        'effects__preview--sepia': `sepia(${sliderValue.value})`,
        'effects__preview--marvin': `invert(${sliderValue.value}%)`,
        'effects__preview--phobos': `blur(${sliderValue.value}px)`,
        'effects__preview--heat': `brightness(${sliderValue.value})`,
      };

      sliderValue.value = value[handle];
      uploadPreviewImg.style.filter = effectsValue[currentClass];
    });

  });
};

export {changeEffect, resetEffectValue};
