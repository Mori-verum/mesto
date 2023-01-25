import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._submitBtn = this._popup.querySelector('.popup__submit');
    this._submitTextDefault = this._submitBtn.textContent;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitTextDefault;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputData = {};
    this._inputs.forEach(({name, value}) => {
      this._inputData[name] = value;
    })
    return this._inputData;
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    const inputData = this._getInputValues();
    this._handleSubmit(inputData);
  }

  overrideHandleSubmitForm(newSubmitFormHandler) {
    this._handleSubmit= newSubmitFormHandler;
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
