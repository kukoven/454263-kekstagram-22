const uploadScaleImg = document.querySelector('.img-upload__scale');
const uploadScaleSmaller = uploadScaleImg.querySelector('.scale__control--smaller');
const uploadScaleBigger = uploadScaleImg.querySelector('.scale__control--bigger');
const uploadScaleInput = uploadScaleImg.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview');

const STEP = 25;
const DEFAULT_SCALE_VALUE = '100%';
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const trimLastLetter = (string) => {
  return string.slice(0, string.length - 1);
};

const decreaseScale = () => {
  const currentScale = +trimLastLetter(uploadScaleInput.value) - STEP;
  uploadScaleBigger.disabled = false;

  if (currentScale <= MIN_SCALE) {
    uploadScaleSmaller.disabled = true;
  }

  uploadScaleInput.value = `${currentScale} %`;
  uploadPreview.style.transform = `scale(${currentScale / 100})`;
};

const increaseScale = () => {
  const currentScale = +trimLastLetter(uploadScaleInput.value) + STEP;
  uploadScaleSmaller.disabled = false;

  if (currentScale >= MAX_SCALE) {
    uploadScaleBigger.disabled = true;
  }

  uploadScaleInput.value = `${currentScale} %`;
  uploadPreview.style.transform = `scale(${currentScale / 100})`;
};

const changeScale = () => {
  uploadScaleInput.value = DEFAULT_SCALE_VALUE;
  uploadScaleBigger.disabled = true;

  uploadScaleBigger.addEventListener('click', increaseScale);
  uploadScaleSmaller.addEventListener('click', decreaseScale)
};

export {changeScale};
