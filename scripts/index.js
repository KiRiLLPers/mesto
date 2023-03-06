const popupElement = document.querySelector(".popup");
const profileBtnElement = document.querySelector(".profile__edit-button");
const popupCloseBtnElement = popupElement.querySelector(".popup__close-btn");
const inputTtileElement = popupElement.querySelector(".form__item_el_heading");
const inputSubtitleElement = popupElement.querySelector(".form__item_el_subheading");
const profileFullNameElement = document.querySelector(".profile__full-name");
const profileProfessionElement = document.querySelector(".profile__profession");
const formElement = popupElement.querySelector(".form");
const profileAddBtnElement = document.querySelector(".profile__add-button");
const formTitleElement = popupElement.querySelector(".form__heading")

// Реализация функционала ПР4

const openPopupProfile = () => {
  popupElement.classList.add("popup_opened");

  formTitleElement.textContent = "Редактировать профиль";
  inputTtileElement.value = profileFullNameElement.textContent;
  inputSubtitleElement.value = profileProfessionElement.textContent;

  inputTtileElement.placeholder = "Введите Ваше имя"
  inputSubtitleElement.placeholder = "Введите название вашей профессии"
}


const closePopupProfile = () => { // закрываем попап с формой профиля
  popupElement.classList.remove("popup_opened");
}

const closePopupProfileClickOnOverlay = (e) => { //закрываем попап нажатием на любое место кроме формы
  console.log(e.target, e.currentTarget)
  if(e.target === e.currentTarget) {
    closePopupProfile();
  }

}

const handleFormSubmitProfile = (e) => {
  e.preventDefault();

  profileFullNameElement.textContent = inputTtileElement.value;
  profileProfessionElement.textContent = inputSubtitleElement.value;

  closePopupProfile();
}

// слушатели событий
popupElement.addEventListener("click", closePopupProfileClickOnOverlay)
profileBtnElement.addEventListener("click", openPopupProfile);
formElement.addEventListener("submit", handleFormSubmitProfile);
popupCloseBtnElement.addEventListener("click", closePopupProfile);



