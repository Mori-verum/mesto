export default class Card {
  constructor(data, templateSelector, selectors, popup, openPopupViewingPost) {
    this._name = data.name;
    this._link = data.link;
    this._popup = popup;
    this._templateSelector = templateSelector;
    this._popupImgSelector = selectors.popupImg;
    this._popupImgTitleSelector = selectors.popupImgTitle;
    this._btnLikeSelector = selectors.btnLike;
    this._btnDeleteSelector = selectors.btnDelete;
    this._elemDescriptionSelector = selectors.elemDescription;
    this._elemImageSelector = selectors.elemImage;
    this._btnLikeEnabledClass = selectors.btnLikeEnabledClass;
    this._openPopupViewingPost = openPopupViewingPost;
  }

  _getElem = () => {
    this._elem = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true)
    .children[0];
  }

  _handleLike = (btnLike) => {
    btnLike.classList.toggle(this._btnLikeEnabledClass);
  }

  _handleDelete = () => {
    this._elem.remove();
  }

  _handlePostViewing = () => {
    this._popupImage = this._popup.querySelector(this._popupImgSelector);
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popup.querySelector(this._popupImgTitleSelector).textContent = this._name;
    this._openPopupViewingPost();
  }

  _setCardEventListeners = () => {
    const btnLike = this._elem.querySelector(this._btnLikeSelector);
    btnLike.addEventListener('click', () => this._handleLike(btnLike));
    this._elem.querySelector(this._btnDeleteSelector).addEventListener('click', () => this._handleDelete());
    this._image.addEventListener('click', () => this._handlePostViewing())
  }

  render = (container) => {
    this._getElem();
    this._image = this._elem.querySelector(this._elemImageSelector);
    this._elem.querySelector(this._elemDescriptionSelector).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setCardEventListeners();
    container.prepend(this._elem);
  }
}
