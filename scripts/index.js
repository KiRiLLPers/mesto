const popupElement = document.querySelectorAll(".popup");

const popupProfileElement = document.querySelector(".popup-profile");
const popupCardsElement = document.querySelector(".popup-cards");
const popupImgElement = document.querySelector(".popup-img");

const popupCardsOpenBtnElement = document.querySelector(".profile__add-button")
const profileBtnElement = document.querySelector(".profile__edit-button");

const popupCloseBtnElement = document.querySelectorAll(".popup__close-btn");

const profileFullNameElement = document.querySelector(".profile__full-name");
const profileProfessionElement = document.querySelector(".profile__profession");
const profileAddBtnElement = document.querySelector(".profile__add-button");

const formProfileElement = document.querySelector(".popup-form-profile");
const inputProfileTtileElement = formProfileElement.querySelector(".form__item_el_heading");
const inputProfileSubtitleElement = formProfileElement.querySelector(".form__item_el_subheading");

const formCardsElement = document.querySelector(".popup-form-cards");
const inputCardsTtileElement = formCardsElement.querySelector(".form__item_el_place-name");
const inputCardsSubTtileElement = formCardsElement.querySelector(".form__item_el_url");


const cardLikeElements = document.querySelectorAll(".card__like-image");



const openPopupProfile = (e) => {
  popupProfileElement.classList.add("popup_opened");

  inputProfileTtileElement.value = profileFullNameElement.textContent;
  inputProfileSubtitleElement.value = profileProfessionElement.textContent;
}

const openPopupCards = (e) => {
  popupCardsElement.classList.add("popup_opened");
}


const closePopup = () => { 
  popupElement.forEach((item) => {
    item.classList.remove("popup_opened");
  });
}

const closePopupClickOnOverlay = (e) => {
  if(e.target === e.currentTarget) {
    closePopup();
  }

}

const handleFormSubmitProfile = (e) => {
  e.preventDefault();

  profileFullNameElement.textContent = inputProfileTtileElement.value;
  profileProfessionElement.textContent = inputProfileSubtitleElement.value;

  closePopup();
}


popupElement.forEach((item) => {
  item.addEventListener("click", closePopupClickOnOverlay);
});

profileBtnElement.addEventListener("click", openPopupProfile);
formProfileElement.addEventListener("submit", handleFormSubmitProfile);

popupCloseBtnElement.forEach((item) => {
  item.addEventListener("click", closePopup);
})
popupCardsOpenBtnElement.addEventListener("click", openPopupCards);




