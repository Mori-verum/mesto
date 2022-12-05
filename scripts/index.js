import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialPosts = [
  {
    name: 'Кто-то прекрасный',
    link: 'https://images.unsplash.com/photo-1666933000057-bd414f5e214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Коровки домой пошлёпали',
    link: 'https://images.unsplash.com/photo-1667116233639-66cd95894b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80'
  },
  {
    name: 'Покатушки',
    link: 'https://images.unsplash.com/photo-1666858094442-6b2a6592bdf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Холодный парень',
    link: 'https://images.unsplash.com/photo-1667115199649-645cfe0dcd87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Что-то на уютном',
    link: 'https://images.unsplash.com/photo-1667114790658-0afc31212d8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: '#Ошки',
    link: 'https://images.unsplash.com/photo-1666934209832-2c3cd4356740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  }
];

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
  invalidinputClass: 'popup__input_invalid'
}

const btnsPopupClose = document.querySelectorAll('.popup__close-button');

const popupList = document.querySelectorAll('.popup');

const btnOpenProfile = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const BtnSubmitDataProfile = document.querySelector('.popup__submit_edit');

const profileForm = document.forms.settingProfileForm;


const nameInput = profileForm.elements.popupUsername;
const jobInput = profileForm.elements.popupDescription;

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');

const btnOpenAddPost = document.querySelector('.profile__add-button');
const popupAddPost = document.querySelector('.popup_add-post');
const BtnSubmitDataPost = document.querySelector('.popup__submit_add-post')

const formAddPost = document.forms.addPostForm;

const postsContainer = document.querySelector('.elements');

const popupViewingPost = document.querySelector('.popup_view-post');

const formValidatorEdit = new FormValidator(selectors, popupEdit);
const formValidatorAddPost = new FormValidator(selectors, popupAddPost);

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

btnsPopupClose.forEach((closeButton) => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => closePopup(popup));
});

/* Открытие и закрытие попапов - Профиль */
function openPopupEdit() {
  if (!popupEdit.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userDescription.textContent;
  }


   const inputList = profileForm.querySelectorAll('.popup__input');
   inputList.forEach((inputElem) => {
    formValidatorEdit.checkInputValidity(inputElem, selectors);
   })

   formValidatorEdit.blockSubmit(BtnSubmitDataProfile, selectors);

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
function openPopupViewingPost() {
  openPopup(popupViewingPost);
}

/* Заполнение профиля */
function changeProfileData(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closePopupEdit();
}

/* Слушатели */
btnOpenProfile.addEventListener('click', openPopupEdit);
btnOpenAddPost.addEventListener('click', openPopupAddPost);


profileForm.addEventListener('submit', changeProfileData);
formAddPost.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const dataPost = {
    name: formAddPost.elements.popupPostText.value,
    link: formAddPost.elements.popupUrlImg.value
  };
  new Card(dataPost, '#post-card-template', selectors, popupViewingPost, openPopupViewingPost).render(postsContainer);
  closePopupAddPost();
  evt.target.reset();
  formValidatorAddPost.blockSubmit(BtnSubmitDataPost, selectors);
});

/* Вызов функций и запуск циклов*/
formValidatorEdit.enableValidation();
formValidatorAddPost.enableValidation();

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}
);


initialPosts.forEach(post => {
  new Card(post, '#post-card-template', selectors, popupViewingPost, openPopupViewingPost).render(postsContainer);
});


