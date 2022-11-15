
const checkInputValidity = (inputElem) => {
  const isValid = inputElem.validity.valid;
  const formSection = inputElem.closest('.popup__form-section');
  const errorElement = formSection.querySelector('.popup__input-error');

  if (isValid) {
    hideInputError(errorElement);
  } else {
    showInputError(errorElement, inputElem.validationMessage);
  }
}

const showInputError = (errorElem, errorMessage) => {
  errorElem.textContent = errorMessage;
  errorElem.classList.add('popup__input-error_active');
}

const hideInputError = (errorElem) => {
  errorElem.textContent = '';
  errorElem.classList.remove('popup__input-error_active');
}

const toggleSubmitStatus = (inputList, submitBtn) => {
  const hasInvalidInput = inputList.some(inputElem => !inputElem.validity.valid);

  if (hasInvalidInput) {
    submitBtn.setAttribute('disabled', true);
    submitBtn.classList.add('popup__submit_inactive');
  } else {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove('popup__submit_inactive');
  }
}


const form = document.querySelector('.popup__form');

const inputList = Array.from(form.querySelectorAll('.popup__input'));
const submitBtn = form.querySelector('.popup__submit');

toggleSubmitStatus(inputList, submitBtn);

inputList.forEach((inputElem) => {
  inputElem.addEventListener('input', () => {
    checkInputValidity(inputElem);
    toggleSubmitStatus(inputList, submitBtn);
  })
})


