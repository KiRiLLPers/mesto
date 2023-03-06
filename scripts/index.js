const popupElement = document.querySelector(".popup");
const profileBtnElement = document.querySelector(".profile__edit-button");
const popupCloseBtnElement = popupElement.querySelector(".popup__close-btn");
const inputTtileElement = popupElement.querySelector(".form__item_el_heading");
const inputSubtitleElement = popupElement.querySelector(".form__item_el_subheading");
const profileFullNameElement = document.querySelector(".profile__full-name");
const profileProfessionElement = document.querySelector(".profile__profession");
const formElement = popupElement.querySelector(".form");
const profileAddBtnElement = document.querySelector(".profile__add-button");

// Реализация функционала ПР4

const openPopupProfile = () => {
  popupElement.classList.add("popup_opened");
  inputTtileElement.value = profileFullNameElement.textContent;
  inputSubtitleElement.value = profileProfessionElement.textContent;
}

const closePopupProfile = () => {
  popupElement.classList.remove("popup_opened");
}

const handleFormSubmit = (e) => {
  e.preventDefault();

  profileFullNameElement.textContent = inputTtileElement.value;
  profileProfessionElement.textContent = inputSubtitleElement.value;

  closePopup();
}

profileBtnElement.addEventListener("click", openPopupProfile);
formElement.addEventListener("submit", handleFormSubmit);
popupCloseBtnElement.addEventListener("click", closePopupProfile);

//Реализация функционала ПР5


