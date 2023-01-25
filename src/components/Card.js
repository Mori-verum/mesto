export default class Card {
  constructor(data, templateSelector, selectors, handleImageClick, userId, handleDelete, handleLike) {
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardOwner = data.owner._id,
      this._userId = userId
    this._templateSelector = templateSelector;
    this._btnLikeSelector = selectors.btnLikeSelector;
    // this._btnLike = this._elem.querySelector(selectors.btnLike);
    this._btnDeleteSelector = selectors.btnDeleteSelector;
    this._elemDescriptionSelector = selectors.elemDescriptionSelector;
    this._elemImageSelector = selectors.elemImageSelector;
    this._btnLikeEnabledClass = selectors.btnLikeEnabledClass;
    this._handleImageClick = handleImageClick;
    this._elemLikeCounterSelector = selectors.elemLikeCounterSelector;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  _getElem = () => {
    this._elem = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  _changeLikeRender(btnLike) {
    if(this.isLiked()) {
      btnLike.classList.add(this._btnLikeEnabledClass);
    } else {
      btnLike.classList.remove(this._btnLikeEnabledClass);
    }
  }

  deletePost = () => {
      this._elem.remove();
      this._elem = null;
  }

  _setDeleteBtn() {
    if (this._cardOwner === this._userId) {
      this._btnDelete.addEventListener('click', () => this._handleDelete(this._id));
    } else {
      this._btnDelete.remove();
    }
  }

  _setCardEventListeners = () => {
    this._counter = this._elem.querySelector(this._elemLikeCounterSelector);
    this._btnLike = this._elem.querySelector(this._btnLikeSelector);
    this._btnDelete = this._elem.querySelector(this._btnDeleteSelector);
    this._btnLike.addEventListener('click', () => this._handleLike(this._id));
    this._setDeleteBtn();
    this._image.addEventListener('click', () => this._handleImageClick(this._name, this._link));
  }

  setLikesCounter(likes) {
    this._likes = likes;

    this._counter.textContent = likes.length || '';
    this._changeLikeRender(this._btnLike);
  }

  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }

  createCard = () => {
    this._getElem();
    this._image = this._elem.querySelector(this._elemImageSelector);
    this._elem.querySelector(this._elemDescriptionSelector).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setCardEventListeners();
    this.setLikesCounter(this._likes);
    return this._elem;
  }
}
