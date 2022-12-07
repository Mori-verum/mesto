import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialPosts } from './data.js';


const selectors = {
  popup: '.popup_view-post',
  popupImg: '.popup__image',
  popupImgTitle: '.popup__img-title',
  btnLikeEnabledClass: 'element__like-button_enabled',
  btnLike: '.element__like-button',
  btnDelete: '.element__delete-button',
  elemDescription: '.element__description',
  elemImage: '.element__image',


  formSectionSelector: '.popup__form-section',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorSelector: '.popup__input-error',
  inputErrorActiveClass: 'popup__input-error_active',
  submitSelector: '.popup__submit',
  inactiveSubmitClass: 'popup__submit_inactive',
  invalidInputClass: 'popup__input_invalid'
}

const btnsPopupClose = document.querySelectorAll('.popup__close-button');

const popupList = document.querySelectorAll('.popup');

const btnOpenProfile = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');

const profileForm = document.forms.settingProfileForm;


const nameInput = profileForm.elements.popupUsername;
const jobInput = profileForm.elements.popupDescription;

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');

const btnOpenAddPost = document.querySelector('.profile__add-button');
const popupAddPost = document.querySelector('.popup_add-post');
const btnSubmitDataPost = document.querySelector('.popup__submit_add-post')

const formAddPost = document.forms.addPostForm;

const postsContainer = document.querySelector('.elements');

const popupViewingPost = document.querySelector('.popup_view-post');
const popupImage = popupViewingPost.querySelector('.popup__image');
const popupImageTitle = popupViewingPost.querySelector('.popup__img-title');

const formValidatorEdit = new FormValidator(selectors, profileForm);
const formValidatorAddPost = new FormValidator(selectors, formAddPost);

/* Открытие и закрытие попапов (универсальное) */
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

/* Открытие и закрытие попапов - Профиль */
function openPopupEdit() {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  formValidatorEdit.resetValidation();

  openPopup(popupEdit);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

/* Открытие и закрытие попапов - Добавление поста */
function openPopupAddPost() {
  openPopup(popupAddPost);
}

function closePopupAddPost() {
  closePopup(popupAddPost);
}

/* Открытие и закрытие попапов - Просмотр поста */
function openPopupViewingPost(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupViewingPost);
}

/* Заполнение профиля */
function handleProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closePopupEdit();
}

/* Добавление поста */
function addPost(data, container) {
  const card = new Card(data, '#post-card-template', selectors, openPopupViewingPost).createCard();
  container.prepend(card);
}
/* Слушатели */
btnOpenProfile.addEventListener('click', openPopupEdit);
btnOpenAddPost.addEventListener('click', openPopupAddPost);


profileForm.addEventListener('submit', handleProfileSubmit);
formAddPost.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const dataPost = {
    name: formAddPost.elements.popupPostText.value,
    link: formAddPost.elements.popupUrlImg.value
  };
  addPost(dataPost, postsContainer);
  closePopupAddPost();
  evt.target.reset();
  formValidatorAddPost.blockSubmit(btnSubmitDataPost, selectors);
});

/* Вызов функций и запуск циклов*/
formValidatorEdit.enableValidation();
formValidatorAddPost.enableValidation();

btnsPopupClose.forEach((closeButton) => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => closePopup(popup));
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}
);

initialPosts.forEach(post => {
  addPost(post, postsContainer);
});


