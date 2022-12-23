import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = selector.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputData = {};
    this._inputs.forEach(input => {
      const name = input.name;
      const value = input.value;
      this._inputData[name] = value;
    })
    return this._inputData;
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    const inputData = this._getInputValues();
    this._handleSubmit(inputData);
    this.close();
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmitForm);
  }

}
