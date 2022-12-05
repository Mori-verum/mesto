import Card from './Card.js';

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
    checkInputValidity(inputElem, selectors);
   })

  blockSubmit(BtnSubmitDataProfile, selectors);

  openPopup(popupEdit);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

/* Открытие и закрытие попапов - Добавление поста */
function openPopupAddPost() {
  blockSubmit(BtnSubmitDataPost, selectors);
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
  new Card(dataPost, 'post-card-template', popupViewingPost, openPopupViewingPost).render(postsContainer);
  closePopupAddPost();
  evt.target.reset();
});

/* Вызов функций и запуск циклов*/
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}
);


initialPosts.forEach(post => {
  new Card(post, 'post-card-template', popupViewingPost, openPopupViewingPost).render(postsContainer);
});


