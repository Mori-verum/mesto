let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupClose = document.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__username');
let jobInput = formElement.querySelector('.popup__description');
let userName = document.querySelector('.profile__username');
let userDescription = document.querySelector('.profile__about');

nameInput.value = userName.textContent;
jobInput.value = userDescription.textContent;

function changeVisibility() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', changeVisibility);
popupClose.addEventListener('click', changeVisibility);


  function formSubmitHandler (evt) {
    evt.preventDefault();
    let userName = document.querySelector('.profile__username');
    let userDescription = document.querySelector('.profile__about');
    userName.textContent = nameInput.value;
    userDescription.textContent = jobInput.value;
    changeVisibility();
}

formElement.addEventListener('submit', formSubmitHandler);
