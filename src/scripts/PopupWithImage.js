import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open(name, link) {
    super.open();
    this._image = this._popup.querySelector('.popup__image');
    this._popup.querySelector('.popup__img-title').textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
