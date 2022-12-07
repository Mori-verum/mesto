export default class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._formSelector = selectors.formSelector;
    this._formSectionSelector = selectors.formSectionSelector;
    this._inputSelector = selectors.inputSelector;
    this._inputErrorSelector = selectors.inputErrorSelector;
    this._inputErrorActiveClass = selectors.inputErrorActiveClass;
    this._submitSelector = selectors.submitSelector;
    this._inactiveSubmitClass = selectors.inactiveSubmitClass;
    this._invalidInputClass = selectors.invalidInputClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitBtn = this._form.querySelector(this._submitSelector);
  }

  enableValidation = () => {
    this._setInputListener();
  }

  resetValidation = () => {
    this.blockSubmit(this._submitBtn);
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
    })

  }

  _showInputInvalidStatus = (errorElement, input) => {
    this._showInputError(errorElement, input.validationMessage);
    input.classList.add(this._invalidInputClass);
  }

  _hideInputInvalidStatus = (errorElement, input) => {
    this._hideInputError(errorElement);
    input.classList.remove(this._invalidInputClass);
  }

  _checkInputValidity = (input) => {
    const isValid = input.validity.valid;
    const formSection = input.closest(this._formSectionSelector);
    const errorElement = formSection.querySelector(this._inputErrorSelector);

    if (isValid) {
      this._hideInputInvalidStatus(errorElement, input);
    } else {
      this._showInputInvalidStatus(errorElement, input);
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

  blockSubmit = () => {
    this._submitBtn.disabled = true;
    this._submitBtn.classList.add(this._inactiveSubmitClass);
  }

  _unlockSubmit = () => {
    this._submitBtn.removeAttribute('disabled');
    this._submitBtn.classList.remove(this._inactiveSubmitClass);
  }

  _toggleSubmitStatus = () => {
    const hasInvalidInput = this._inputList.some(inputElem => !inputElem.validity.valid);

    if (hasInvalidInput) {
      this.blockSubmit();
    } else {
      this._unlockSubmit();
    }
  }

  _setInputListener = () => {

    this._toggleSubmitStatus();

    this._inputList.forEach((inputElem) => {
      inputElem.addEventListener('input', () => {
        this._checkInputValidity(inputElem);
        this._toggleSubmitStatus();
      })
    })
  }

}
