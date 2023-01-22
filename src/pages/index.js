import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
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
} from '../utils/constants.js'


import Api from '../components/api.js';
import Popup from '../components/Popup';

let userId;

const userInfo = new UserInfo;
const formValidatorEdit = new FormValidator(selectorsForValidation, profileForm);
const formValidatorAddPost = new FormValidator(selectorsForValidation, formAddPost);
const formValidatorEditAvatar = new FormValidator(selectorsForValidation, editAvatarForm);
const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupEdit = new PopupWithForm(popupEditSelector, submitDataProfile);
const popupAddPost = new PopupWithForm(popupAddPostSelector, submitDataCard);
const popupDelete = new Popup(popupDeleteSelector);
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, submitEditAvatar);

const cardsList = new Section(
  {
    items: [],
    renderer: (item) => {
      addCard(item)
    },
  },
  postsContainer, api
);

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-57/',
  headers: {
    "Content-Type": "application/json",
    Authorization: '0ac4516d-6064-4e3b-8a1c-df68a9219510'
  }
}, { popupEdit: popupEdit, popupAddPost: popupAddPost, popupEditAvatar: popupEditAvatar });

const user = api.getDataProfile();
const cards = api.getAllCards();

function createCard(data) {
  const card = new Card(data, '#post-card-template', selectorsForCard, openPopupViewingPost, userId, (id) => {
    popupDelete.open();
    const delBtn = document.querySelector('.popup_opened').querySelector('.popup__submit_delete');
    delBtn.addEventListener('click', () => api.deleteCard(id).then(res => {
      popupDelete.close();
      card.deletePost();
    })).catch((err) => {
      console.log(err);
    });
  }, (id) => {
    if (card.isLiked()) {
      api.deleteLike(id).then(res => {
        card.setLikesCounter(res.likes);
      });
    } else {
      api.addLike(id).then(res => {
        card.setLikesCounter(res.likes)
      });
    }
  });

  return card.createCard();
}

function addCard(data) {
  cardsList.addItem(createCard(data));
}

function openPopupAddPost() {
  formValidatorAddPost.resetValidation();
  popupAddPost.open();
}

function openPopupEdit() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.description;
  formValidatorEdit.resetValidation();
  popupEdit.open();
}

function openPopupAvatarEdit() {
  const data = userInfo.getUserInfo();
  avatarLinkInput.value = data.avatar;
  formValidatorEditAvatar.resetValidation();
  popupEditAvatar.open();
}

function openPopupViewingPost(name, link) {
  popupWithImage.open(name, link);
}

function submitDataCard(data) {
  api.addCard(data.name, data.link)
    .then(res => {
      addCard(res);
      popupAddPost.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitDataProfile(data) {
  api.patchUserInfo(data.name, data.description)
    // .finally(() => popupEdit.load())
    .then(data => {
      userInfo.setUserInfo(data);
      userName.textContent = data.name;
      userDescription.textContent = data.about;
      popupEdit.close()
    })
    .catch(err => console.log(err))
}

function submitEditAvatar(data) {
  api.patchUserAvatar(data.link)
    .then(data => {
      userInfo.setUserInfo(data);
      userAvatar.src = data.avatar;
      popupEditAvatar.close()
    }
    ).catch(err => {
      console.log(err);
    })
}

user
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.avatar);
    userName.textContent = data.name;
    userDescription.textContent = data.about;
    userAvatar.src = data.avatar;
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });


cards
  .then(data => {
    data.forEach(item => {
      addCard(item);
    })
  }).catch((err) => {
    console.log(err);
  });


btnEditAvatar.addEventListener('click', openPopupAvatarEdit);
btnOpenProfile.addEventListener('click', openPopupEdit);
btnOpenAddPost.addEventListener('click', openPopupAddPost);

formValidatorEdit.enableValidation();
formValidatorAddPost.enableValidation();
formValidatorEditAvatar.enableValidation();
