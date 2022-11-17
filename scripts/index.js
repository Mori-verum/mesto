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

const postTextInput = formAddPost.elements.popupPostText;
const postUrlInput = formAddPost.elements.popupUrlImg;

const postsContainer = document.querySelector('.elements');

const postTemplate = document.getElementById('post-template');

const popupViewingPost = document.querySelector('.popup_view-post');
const popupImg = popupViewingPost.querySelector('.popup__image');
const popupImgTitle = popupViewingPost.querySelector('.popup__img-title');

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

  const inputElems = profileForm.querySelectorAll('.popup__input-error');
  inputElems.forEach((inputErrorElem) => {
    hideInputError(inputErrorElem, selectors);
  });

  const inputList = profileForm.querySelectorAll('.popup__input');
  inputList.forEach((input) => {
    hideInputInvalidStatus(input);
  });

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

/* Обработчики на карточке */
const handleLike = (event) => {
  event.target.classList.toggle('element__like-button_enabled');
};

const handleDelete = (event) => {
  const currentPostElem = event.target.closest('.element');

  currentPostElem.remove();
};

const handlePostViewing = (event) => {
  const imageSource = event.target.getAttribute('src');
  const imageAlt = event.target.getAttribute('alt');
  popupImg.setAttribute('src', imageSource);
  popupImg.setAttribute('alt', imageAlt);
  popupImgTitle.textContent = imageAlt;
  openPopupViewingPost();
};

const setCardEventListeners = (elem) => {
  const elemLikeBtn = elem.querySelector('.element__like-button');
  elemLikeBtn.addEventListener('click', handleLike);
  const elemDeleteBtn = elem.querySelector('.element__delete-button');
  elemDeleteBtn.addEventListener('click', handleDelete);
  const elemViewImgBtn = elem.querySelector('.element__image');
  elemViewImgBtn.addEventListener('click', handlePostViewing)
};

/*Логика добавления поста */
const getPostElem = (postName, postLink) => {
  const elem = postTemplate.content.cloneNode(true).children[0];
  const postDescription = elem.querySelector('.element__description');
  postDescription.textContent = postName;
  const postImg = elem.querySelector('.element__image');
  postImg.setAttribute('src', postLink);
  postImg.setAttribute('alt', postName);
  setCardEventListeners(elem);
  return elem;
};

/* Рендеринг карточки */
const renderPostElem = (post) => {
  const elem = getPostElem(post.name, post.link);
  postsContainer.prepend(elem);
};

/* Слушатели */
btnOpenProfile.addEventListener('click', openPopupEdit);

btnOpenAddPost.addEventListener('click', openPopupAddPost);

profileForm.addEventListener('submit', changeProfileData);

formAddPost.addEventListener('submit', (event) => {
  event.preventDefault();

  const dataPost = {
    name: formAddPost.elements.popupPostText.value,
    link: formAddPost.elements.popupUrlImg.value
  };
  renderPostElem(dataPost);
  closePopupAddPost();
  event.target.reset();
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

initialPosts.forEach(renderPostElem);
