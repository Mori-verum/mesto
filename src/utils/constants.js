const selectorsForCard = {
  popupSelector: '.popup_view-post',
  popupImgSelector: '.popup__image',
  popupImgTitleSelector: '.popup__img-title',
  btnLikeEnabledClass: 'element__like-button_enabled',
  btnLikeSelector: '.element__like-button',
  btnDeleteSelector: '.element__delete-button',
  elemDescriptionSelector: '.element__description',
  elemImageSelector: '.element__image',
  elemLikeCounterSelector: '.element__like-counter'
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

const editAvatarForm = document.forms.editAvatarForm;

const profileForm = document.forms.settingProfileForm;

const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');
const userAvatar = document.querySelector('.profile__avatar-img');

const btnOpenAddPost = document.querySelector('.profile__add-button');

const formAddPost = document.forms.addPostForm;

const postsContainer = document.querySelector('.elements');


export {
  selectorsForCard,
  selectorsForValidation,
  btnEditAvatar,
  btnOpenProfile,
  editAvatarForm,
  profileForm,
  nameInput,
  jobInput,
  userName,
  userDescription,
  userAvatar,
  btnOpenAddPost,
  formAddPost,
  postsContainer,
};
