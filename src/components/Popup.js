export default class Popup {
  constructor(selector) {
    this._popup = selector;
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this.close =  this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOuterClick = this._handleOuterClick.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOuterClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOuterClick);
  }

  removeEventListeners() {
    this._closeBtn.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOuterClick);
  }
}




