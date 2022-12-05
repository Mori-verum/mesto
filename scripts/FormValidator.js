export default class FormValidator {
  constructor (selectors, popup) {
    this._popup = popup;
    this._formSelector = selectors.formSelector;
    this._formSectionSelector = selectors.formSectionSelector;
    this._inputSelector = selectors.inputSelector;
    this._inputErrorSelector = selectors.inputErrorSelector;
    this._inputErrorActiveClass = selectors.inputErrorActiveClass;
    this._submitSelector = selectors.submitSelector;
    this._inactiveSubmitClass = selectors.inactiveSubmitClass;
    this._invalidinputClass = selectors.invalidinputClass;
  }

  enableValidation = () => {
    this._formList = document.querySelectorAll(this._formSelector);

    this._formList.forEach((form) => {
      this._setInputListener(form);
    })
  }

  _showInputInvalidStatus = (errorElement, inputElem, input) => {
    this._showInputError(errorElement, inputElem.validationMessage);
    input.classList.add(this._invalidinputClass);
  }

  _hideInputInvalidStatus = (errorElement, input) => {
    this._hideInputError(errorElement);
    input.classList.remove(this._invalidinputClass);
  }

  checkInputValidity = (inputElem) => {
    const isValid = inputElem.validity.valid;
    const formSection = inputElem.closest(this._formSectionSelector);
    const errorElement = formSection.querySelector(this._inputErrorSelector);
    const input = formSection.querySelector(this._inputSelector);

    if (isValid) {
      this._hideInputInvalidStatus(errorElement, input);
    } else {
      this._showInputInvalidStatus(errorElement, inputElem, input);
    }
  }

  _showInputError = (errorElem, errorMessage) => {
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._inputErrorActiveClass);
  }

  _hideInputError = (errorElem) => {
    errorElem.textContent = '';
    errorElem.classList.remove(this._inputErrorActiveClass);
  }

  blockSubmit = (submitBtn) => {
    submitBtn.setAttribute('disabled', true);
    submitBtn.classList.add(this._inactiveSubmitClass);
  }

  _unlockSubmit = (submitBtn) => {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove(this._inactiveSubmitClass);
  }

  _toggleSubmitStatus = (inputList, submitBtn) => {
    const hasInvalidInput = inputList.some(inputElem => !inputElem.validity.valid);

    if (hasInvalidInput) {
      this.blockSubmit(submitBtn);
    } else {
      this._unlockSubmit(submitBtn);
    }
  }

  _setInputListener = (formElem) => {
    const inputList = Array.from(formElem.querySelectorAll(this._inputSelector));
    const submitBtn = formElem.querySelector(this._submitSelector);

    this._toggleSubmitStatus(inputList, submitBtn);

    inputList.forEach((inputElem) => {
      inputElem.addEventListener('input', () => {
        this.checkInputValidity(inputElem);
        this._toggleSubmitStatus(inputList, submitBtn);
      })
    })
  }

}
