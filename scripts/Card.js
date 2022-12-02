class Card {
  constructor(text, link, templateId) {
    this._text = text;
    this._link = link;
    this._templateId = templateId;
  }

  _handleLike = (event) => {
    event.target.classList.toggle('element__like-button_enabled');
  }

  _handleDelete = () => {
    this._view.remove();
  }

  _handlePostViewing = () => {
    popupImg.setAttribute('src', this._link);
    popupImg.setAttribute('alt', this._text);
    popupImgTitle.textContent = this._text;
    openPopupViewingPost();
  }

  _setCardEventListeners = () => {
    this._view.querySelector('.element__like-button').addEventListener('click', this._handleLike);
    this._view.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
    this._image.addEventListener('click', this._handlePostViewing)
  }

  render = () => {
    this._view = document.getElementById(this._templateId).content.cloneNode(true).children[0];
    this._view.querySelector('.element__description').textContent = this._text;
    this._image = this._view.querySelector('.element__image');
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._text);
    this._setCardEventListeners();
    postsContainer.prepend(this._view);


  }
}
