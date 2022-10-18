const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const popupClose = document.querySelector('.popup__close-button');
const nameInput = formElement.elements.popup__username;
const jobInput = formElement.elements.popup__description;
const userName = document.querySelector('.profile__username');
const userDescription = document.querySelector('.profile__about');
const elements = document.querySelectorAll('.element');

function changeVisibility() {
  if(!popup.classList.contains('popup_opened')) {
    nameInput.value = userName.textContent;
    jobInput.value = userDescription.textContent;
  }
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', changeVisibility);
popupClose.addEventListener('click', changeVisibility);


  function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userDescription.textContent = jobInput.value;
    changeVisibility();
}

formElement.addEventListener('submit', formSubmitHandler);
