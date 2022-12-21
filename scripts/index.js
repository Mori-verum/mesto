import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  initialPosts,
  selectorsForCard,
  selectorsForValidation,
  btnOpenProfile,
  popupEditSelector,
  profileForm,
  nameInput,
  jobInput,
  userName,
  userDescription,
  btnOpenAddPost,
  popupAddPostSelector,
  formAddPost,
  postsContainer,
  popupWithImageSelector
} from '../utils/constants.js'

const cardSection = new Section({ items: initialPosts, renderer: addCard }, postsContainer);
const formValidatorEdit = new FormValidator(selectorsForValidation, profileForm);
const formValidatorAddPost = new FormValidator(selectorsForValidation, formAddPost);
const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupEdit = new PopupWithForm(popupEditSelector, submitDataProfile);
const popupAddPost = new PopupWithForm(popupAddPostSelector, addCard);
const userInfo = new UserInfo(userName, userDescription);


function createCard(data) {
  const card = new Card(data, '#post-card-template', selectorsForCard, openPopupViewingPost);
  return card.createCard();
}

function addCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

function openPopupEdit() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.description;
  formValidatorEdit.resetValidation();
  popupEdit.open();
}

function openPopupViewingPost(name, link) {
  popupWithImage.open(name, link);
}

function submitDataProfile(data) {
  userInfo.setUserInfo(data);
}


btnOpenProfile.addEventListener('click', openPopupEdit);
btnOpenAddPost.addEventListener('click', () => popupAddPost.open());

cardSection.renderItems();

formValidatorEdit.enableValidation();
formValidatorAddPost.enableValidation();
