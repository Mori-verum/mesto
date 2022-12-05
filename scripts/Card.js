export default class Card {
  constructor(data, templateSelector, popup, openPopupViewingPost) {
    this._name = data.name;
    this._link = data.link;
    this._popup = popup;
    this._openPopupViewingPost = openPopupViewingPost;
    this._templateId = templateSelector;
  }

  _getElem = () => {
    this._elem = document
    .querySelector('#post-card-template')
    .content
    .cloneNode(true)
    .children[0];
  }

  _handleLike = (evt) => {
    evt.target.classList.toggle('element__like-button_enabled');
  }

  _handleDelete = () => {
    this._elem.remove();
  }

  _handlePostViewing = () => {
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popup.querySelector('.popup__img-title').textContent = this._name;
    this._openPopupViewingPost();
  }

  _setCardEventListeners = () => {
    this._elem.querySelector('.element__like-button').addEventListener('click', this._handleLike);
    this._elem.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
    this._image.addEventListener('click', this._handlePostViewing)
  }

  render = (container) => {
    this._getElem();
    this._elem.querySelector('.element__description').textContent = this._name;
    this._image = this._elem.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setCardEventListeners();
    container.prepend(this._elem);


  }
}
