const openEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const closeEditBtn = popupEdit.querySelector('.popup__close-button');

const editFormElem = document.forms.settingProfileForm;


const nameInput = editFormElem.elements.popupUsername;
const jobInput = editFormElem.elements.popupDescription;

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');

const openAddPostBtn = document.querySelector('.profile__add-button');
const popupAddPost = document.querySelector('.popup_add-post');
const closeAddPostBtn = popupAddPost.querySelector('.popup__close-button');

const addPostFormElem = document.forms.addPostForm;

const PostTextInput = addPostFormElem.elements.popupPostText;
const PostUrlInput = addPostFormElem.elements.popupUrlImg;

const cardsContainer = document.querySelector('.elements');
const cardForm = document.forms.addPostForm;

const postTemplate = document.getElementById('post-template');
const initialCards = [
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

/* Открытие и закрытие попапов - Профиль */
function editChangeVisibility() {
  if (!popupEdit.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userDescription.textContent;
  }
  popupEdit.classList.toggle('popup_opened');
}

openEditBtn.addEventListener('click', editChangeVisibility);
closeEditBtn.addEventListener('click', editChangeVisibility);

/* Открытие и закрытие попапов - Добавление поста */
function addPostchangeVisibility() {
  if (!popupAddPost.classList.contains('popup_opened')) {
    PostTextInput.value = '';
    PostUrlInput.value = '';
  }
  popupAddPost.classList.toggle('popup_opened');
}

openAddPostBtn.addEventListener('click', addPostchangeVisibility);
closeAddPostBtn.addEventListener('click', addPostchangeVisibility);

/* Заполнение профиля */
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  editChangeVisibility();
}

editFormElem.addEventListener('submit', formSubmitHandler);

/*Логика добавления поста */
const getPostElem = (nameCard, linkCard) => {
  const elem = postTemplate.content.cloneNode(true).children[0];

const cardDescription = elem.querySelector('.element__description');
cardDescription.textContent = nameCard;
const cardImg = elem.querySelector('.element__image');
cardImg.setAttribute('src', linkCard);

return elem;
}

/* Обработчики на карточке */
const likeHandler = (event) => {
 event.target.classList.toggle('element__like-button_enabled');
}

const deleteHandler = (event) => {
  const currentCardElem = event.target.closest('.element');

  currentCardElem.remove();
}

 const setEventListeners = (elem) => {
    const elemLikeBtn = elem.querySelector('.element__like-button');
    elemLikeBtn.addEventListener('click', likeHandler);
    const elemDeleteBtn = elem.querySelector('.element__delete-button');
    elemDeleteBtn.addEventListener('click', deleteHandler);
  }

const renderPostElem = (card) => {
  const elem = getPostElem(card.name, card.link);

  setEventListeners(elem);

  cardsContainer.prepend(elem);
}

initialCards.forEach(renderPostElem);

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const dataPost = {
    name: cardForm.elements.popupPostText.value,
    link: cardForm.elements.popupUrlImg.value
  };
  initialCards.push(dataPost);
  renderPostElem(dataPost);
  addPostchangeVisibility()
});

