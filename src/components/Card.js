export default class Card {
  constructor(data, templateSelector, selectors, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._btnLikeSelector = selectors.btnLike;
    this._btnDeleteSelector = selectors.btnDelete;
    this._elemDescriptionSelector = selectors.elemDescription;
    this._elemImageSelector = selectors.elemImage;
    this._btnLikeEnabledClass = selectors.btnLikeEnabledClass;
    this._handleImageClick = handleImageClick;
  }

  _getElem = () => {
    this._elem = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  _handleLike = (btnLike) => {
    btnLike.classList.toggle(this._btnLikeEnabledClass);
  }

  _handleDelete = () => {
    this._elem.remove();
    this._elem = null;
  }

  _setCardEventListeners = () => {
    const btnLike = this._elem.querySelector(this._btnLikeSelector);
    btnLike.addEventListener('click', () => this._handleLike(btnLike));
    this._elem.querySelector(this._btnDeleteSelector).addEventListener('click', () => this._handleDelete());
    this._image.addEventListener('click', () => this._handleImageClick(this._name, this._link));
  }

  createCard = () => {
    this._getElem();
    this._image = this._elem.querySelector(this._elemImageSelector);
    this._elem.querySelector(this._elemDescriptionSelector).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setCardEventListeners();
    return this._elem;
  }
}
