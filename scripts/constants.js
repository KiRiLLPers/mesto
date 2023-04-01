const popupElements = document.querySelectorAll(".popup");

const popupProfileElement = document.querySelector(".popup-profile");
const popupCardsElement = document.querySelector(".popup-cards");
const popupImgElement = document.querySelector(".popup-img");

const popupCardsOpenBtnElement = document.querySelector(".profile__add-button");
const profileBtnElement = document.querySelector(".profile__edit-button");

const popupCloseBtnElements = document.querySelectorAll(".popup__close-btn");

const profileFullNameElement = document.querySelector(".profile__full-name");
const profileProfessionElement = document.querySelector(".profile__profession");

const formProfileElement = document.querySelector(".popup-form-profile");
const inputProfileTtileElement = formProfileElement.querySelector(".form__item_el_heading");
const inputProfileSubtitleElement = formProfileElement.querySelector(".form__item_el_subheading");
const inputProfileList = Array.from(popupProfileElement.querySelectorAll(".form__item"));

const formCardsElement = document.querySelector(".popup-form-cards");
const inputCardsTtileElement = formCardsElement.querySelector(".form__item_el_place-name");
const inputCardsSubTtileElement = formCardsElement.querySelector(".form__item_el_url");
const inputCardsList = Array.from(popupCardsElement.querySelectorAll(".form__item"));

const divPhotosElement = document.querySelector(".photos__wrap");

const popupBigImageElement = popupImgElement.querySelector(".popup__image");
const popupBigImageCaptionElement = popupImgElement.querySelector(".popup__caption");

const cardTemplate = document.querySelector("#card-template").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationSetting = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitBtnSelector: ".form__btn",
  inactiveBtnClass: "form__btn_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};
