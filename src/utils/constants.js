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

const selectorsForCard = {
  popup: '.popup_view-post',
  popupImg: '.popup__image',
  popupImgTitle: '.popup__img-title',
  btnLikeEnabledClass: 'element__like-button_enabled',
  btnLike: '.element__like-button',
  btnDelete: '.element__delete-button',
  elemDescription: '.element__description',
  elemImage: '.element__image',
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

const btnOpenProfile = document.querySelector('.profile__edit-button');
const popupEditSelector = document.querySelector('.popup_edit');

const profileForm = document.forms.settingProfileForm;


const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');

const btnOpenAddPost = document.querySelector('.profile__add-button');
const popupAddPostSelector = document.querySelector('.popup_add-post');

const formAddPost = document.forms.addPostForm;

const postsContainer = document.querySelector('.elements');

const popupWithImageSelector = document.querySelector('.popup_view-post');

export {
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
};
