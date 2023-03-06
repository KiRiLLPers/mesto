const popupElement = document.querySelector(".popup");
const profileBtnElement = document.querySelector(".profile__edit-button");
const popupCloseBtnElement = popupElement.querySelector(".popup__close-btn");
const inputTtileElement = popupElement.querySelector(".form__item_el_heading");
const inputSubtitleElement = popupElement.querySelector(".form__item_el_subheading");
const profileFullNameElement = document.querySelector(".profile__full-name");
const profileProfessionElement = document.querySelector(".profile__profession");
const formElement = popupElement.querySelector(".form");
const profileAddBtnElement = document.querySelector(".profile__add-button");
const formTitleElement = popupElement.querySelector(".form__heading");
const cardLikeElements = document.querySelectorAll(".card__like-image");

// Реализация функционала ПР4

const openPopup = () => {
  popupElement.classList.add("popup_opened");

  inputTtileElement.value = profileFullNameElement.textContent;
  inputSubtitleElement.value = profileProfessionElement.textContent;
}


const closePopup = () => { 
  popupElement.classList.remove("popup_opened");
}

const closePopupClickOnOverlay = (e) => {
  console.log(e.target, e.currentTarget)
  if(e.target === e.currentTarget) {
    closePopup();
  }

}

const handleFormSubmitProfile = (e) => {
  e.preventDefault();

  profileFullNameElement.textContent = inputTtileElement.value;
  profileProfessionElement.textContent = inputSubtitleElement.value;

  closePopup();
}

popupElement.addEventListener("click", closePopupClickOnOverlay)
profileBtnElement.addEventListener("click", openPopup);
formElement.addEventListener("submit", handleFormSubmitProfile);
popupCloseBtnElement.addEventListener("click", closePopup);


cardLikeElements.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.toggle("card__like-image_active");
  })
})




