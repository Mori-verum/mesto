const selectors = {
  formSectionSelector: '.popup__form-section',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorSelector: '.popup__input-error',
  inputErrorActiveClass: 'popup__input-error_active',
  submitSelector: '.popup__submit',
  inactiveSubmitClass: 'popup__submit_inactive'
}

const checkInputValidity = (inputElem) => {
  const isValid = inputElem.validity.valid;
  const formSection = inputElem.closest(selectors.formSectionSelector);
  const errorElement = formSection.querySelector(selectors.inputErrorSelector);

  if (isValid) {
    hideInputError(errorElement);
  } else {
    showInputError(errorElement, inputElem.validationMessage);
  }
}

const showInputError = (errorElem, errorMessage) => {
  errorElem.textContent = errorMessage;
  errorElem.classList.add(selectors.inputErrorActiveClass);
}

const hideInputError = (errorElem) => {
  errorElem.textContent = '';
  errorElem.classList.remove(selectors.inputErrorActiveClass);
}

const toggleSubmitStatus = (inputList, submitBtn) => {
  const hasInvalidInput = inputList.some(inputElem => !inputElem.validity.valid);

  if (hasInvalidInput) {
    submitBtn.setAttribute('disabled', true);
    submitBtn.classList.add(selectors.inactiveSubmitClass);
  } else {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove(selectors.inactiveSubmitClass);
  }
}


const setInputListener = (formElem) => {
  const inputList = Array.from(formElem.querySelectorAll(selectors.inputSelector));
  const submitBtn = formElem.querySelector(selectors.submitSelector);

  toggleSubmitStatus(inputList, submitBtn);

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      checkInputValidity(inputElem);
      toggleSubmitStatus(inputList, submitBtn);
    })
  })
}


const enableValidation = (selectors) => {

  const formList = document.querySelectorAll(selectors.formSelector);

  formList.forEach((form) => {
    setInputListener(form);
  })
}

enableValidation(selectors);


