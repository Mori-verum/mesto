import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
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
} from '../utils/constants.js'

const userInfo = new UserInfo(userName, userDescription, userAvatar);
const popupWithImage = new PopupWithImage('.popup_view-post');
const popupEdit = new PopupWithForm('.popup_edit', submitDataProfile);
const popupAddPost = new PopupWithForm('.popup_add-post', submitDataCard);
const popupDelete = new PopupWithForm('.popup_delete');
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', submitEditAvatar);
let userId;

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

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
});

Promise.all([api.getDataProfile(), api.getAllCards()])
.then(([userData, cards]) => {
  console.log(userData)
  userInfo.setUserInfo(userData);
  userId = userData._id;
  cards.forEach(item => {
          addCard(item);
        })
})
.catch((err) => {
  console.log(err);
})

function createCard(data) {
  const card = new Card(data, '#post-card-template', selectorsForCard, openPopupViewingPost, userId, (id) => {
    popupDelete.open();
    popupDelete.overrideHandleSubmitForm(() => {
      api.deleteCard(id).then(res => {
        popupDelete.close();
        card.deletePost();
      })
        .catch((err) => {
          console.log(err);
        })
    })
  }, (id) => {
    if (card.isLiked()) {
      api.deleteLike(id).then(res => {
        card.setLikesCounter(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      api.addLike(id).then(res => {
        card.setLikesCounter(res.likes)
      });
    }
  })

  return card.createCard();
}

function addCard(data) {
  cardsList.addItem(createCard(data));
}

function openPopupAddPost() {
  formValidators[ formAddPost.getAttribute('name') ].resetValidation();
  popupAddPost.open();
}

function openPopupEdit() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.description;
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
  popupEdit.open();
}

function openPopupAvatarEdit() {
  formValidators[ editAvatarForm.getAttribute('name') ].resetValidation();
  popupEditAvatar.open();
}

function openPopupViewingPost(name, link) {
  popupWithImage.open(name, link);
}

function submitDataCard(data) {
  popupAddPost.renderLoading(true);
  api.addCard(data.name, data.link)
    .then(res => {
      addCard(res);
      popupAddPost.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAddPost.renderLoading(false))
}

function submitDataProfile(data) {
  popupEdit.renderLoading(true);
  api.patchUserInfo(data.name, data.description)
    .then(data => {
      console.log(data)
      userInfo.setUserInfo(data);
      popupEdit.close()
    })
    .catch(err => console.log(err))
    .finally(() => popupEdit.renderLoading(false))
}

function submitEditAvatar(data) {
  popupEditAvatar.renderLoading(true);
  api.patchUserAvatar(data.link)
    .then(data => {
      userInfo.setUserInfo(data);
      popupEditAvatar.close()
    }
    )
    .catch(err => {
      console.log(err);
    })
    .finally(() => popupEditAvatar.renderLoading(false))
}

btnEditAvatar.addEventListener('click', openPopupAvatarEdit);
btnOpenProfile.addEventListener('click', openPopupEdit);
btnOpenAddPost.addEventListener('click', openPopupAddPost);

enableValidation(selectorsForValidation);
formValidators[ profileForm.getAttribute('name') ].resetValidation();
formValidators[ formAddPost.getAttribute('name') ].resetValidation();
formValidators[ editAvatarForm.getAttribute('name') ].resetValidation();
