const showInputInvalidStatus = (input) => {
  input.classList.add('popup__input_invalid');
}

const hideInputInvalidStatus = (input) => {
  input.classList.remove('popup__input_invalid');
}

const checkInputValidity = (inputElem, selectors) => {
  const isValid = inputElem.validity.valid;
  const formSection = inputElem.closest(selectors.formSectionSelector);
  const errorElement = formSection.querySelector(selectors.inputErrorSelector);
  const input = formSection.querySelector(selectors.inputSelector);

  if (isValid) {
    hideInputError(errorElement, selectors);
    hideInputInvalidStatus(input);
  } else {
    showInputError(errorElement, inputElem.validationMessage, selectors);
    showInputInvalidStatus(input);
  }
}

const showInputError = (errorElem, errorMessage, selectors) => {
  errorElem.textContent = errorMessage;
  errorElem.classList.add(selectors.inputErrorActiveClass);
}

const hideInputError = (errorElem, selectors) => {
  errorElem.textContent = '';
  errorElem.classList.remove(selectors.inputErrorActiveClass);
}

const blockSubmit = (submitBtn, selectors) => {
  submitBtn.setAttribute('disabled', true);
  submitBtn.classList.add(selectors.inactiveSubmitClass);
}

const unlockSubmit = (submitBtn, selectors) => {
  submitBtn.removeAttribute('disabled');
  submitBtn.classList.remove(selectors.inactiveSubmitClass);
}

const toggleSubmitStatus = (inputList, submitBtn, selectors) => {
  const hasInvalidInput = inputList.some(inputElem => !inputElem.validity.valid);

  if (hasInvalidInput) {
    blockSubmit(submitBtn, selectors);
  } else {
    unlockSubmit(submitBtn, selectors);
  }
}

const setInputListener = (formElem, selectors) => {
  const inputList = Array.from(formElem.querySelectorAll(selectors.inputSelector));
  const submitBtn = formElem.querySelector(selectors.submitSelector);

  toggleSubmitStatus(inputList, submitBtn, selectors);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      checkInputValidity(inputElem, selectors);
      toggleSubmitStatus(inputList, submitBtn, selectors);
    })
  })
}


const enableValidation = (selectors) => {

  const formList = document.querySelectorAll(selectors.formSelector);

  formList.forEach((form) => {
    setInputListener(form, selectors);
  })
}

enableValidation(selectors);


