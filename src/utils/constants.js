const selectorsForCard = {
  popup: '.popup_view-post',
  popupImg: '.popup__image',
  popupImgTitle: '.popup__img-title',
  btnLikeEnabledClass: 'element__like-button_enabled',
  btnLike: '.element__like-button',
  btnDelete: '.element__delete-button',
  elemDescription: '.element__description',
  elemImage: '.element__image',
  elemLikeCounter: '.element__like-counter'
}

const selectorsForValidation = {
  formSectionSelector: '.popup__form-section',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorSelector: '.popup__input-error',
  inputErrorActiveClass: 'popup__input-error_active',
  submitSelector: '.popup__submit',
  inactiveSubmitClass: 'popup__submit_inactive',
  invalidInputClass: 'popup__input_invalid'
}

const btnEditAvatar = document.querySelector('.profile__avatar-icon');
const btnOpenProfile = document.querySelector('.profile__edit-button');
const popupEditSelector = document.querySelector('.popup_edit');
const popupEditAvatarSelector = document.querySelector('.popup_edit-avatar');

const editAvatarForm = document.forms.editAvatarForm;
const avatarLinkInput = editAvatarForm.elements.link;

const profileForm = document.forms.settingProfileForm;

const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');
const userAvatar = document.querySelector('.profile__avatar-img');

const btnOpenAddPost = document.querySelector('.profile__add-button');
const popupAddPostSelector = document.querySelector('.popup_add-post');

const formAddPost = document.forms.addPostForm;

const postsContainer = document.querySelector('.elements');

const popupWithImageSelector = document.querySelector('.popup_view-post');

const popupDeleteSelector = document.querySelector('.popup_delete');


export {
  selectorsForCard,
  selectorsForValidation,
  btnEditAvatar,
  btnOpenProfile,
  popupEditSelector,
  popupEditAvatarSelector,
  editAvatarForm,
  avatarLinkInput,
  profileForm,
  nameInput,
  jobInput,
  userName,
  userDescription,
  userAvatar,
  btnOpenAddPost,
  popupAddPostSelector,
  formAddPost,
  postsContainer,
  popupWithImageSelector,
  popupDeleteSelector
};
