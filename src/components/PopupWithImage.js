import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
    this._imgTitle = this._popup.querySelector('.popup__img-title');

  }


  open(name, link) {
    super.open();
    this._imgTitle.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
