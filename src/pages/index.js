import { validationSetting, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PicturePopup from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupDelete from "../components/PopupDelete.js";
import Api from "../components/Api.js";
import "./index.css";

const popupWithCardsOpenBtnElement = document.querySelector(".profile__add-button");
const profileBtnElement = document.querySelector(".profile__edit-button");
const cardTemplate = document.querySelector("#card-template").content;
const avatarBtn = document.querySelector(".profile__avatar");

const formValidators = {};

const enableValidation = (validationSetting) => {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  formList.forEach((formEl) => {
    const validator = new FormValidator(validationSetting, formEl);
    const formName = formEl.getAttribute("name");

    if (formName === "form-delete") {
      return;
    }
    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "cfeb8afe-571d-46bc-89d0-56d10d799eb5",
    "Content-Type": "application/json",
  },
});

const popupPicture = new PicturePopup(".popup-img");

const popupDelete = new PopupDelete(".popup-delete", (card, cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteCard(card);
      popupDelete.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupDelete.renderLoading(false));
});

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, cardTemplate, popupPicture.open, popupDelete.open, (cardId, cardLikeImg) => {
        if (cardLikeImg.classList.contains("card__like-image_active")) {
          api
            .deleteLikeCard(cardId)
            .then((res) => {
              card.toggleLikeImage(res.likes);
            })
            .catch((err) => console.error(err));
        } else {
          api
            .hendlerLikeCard(cardId)
            .then((res) => {
              card.toggleLikeImage(res.likes);
            })
            .catch((err) => console.error(err));
        }
      });
      return card.createCard();
    },
  },
  ".photos__wrap"
);

const userInfo = new UserInfo({ nameSelector: ".profile__full-name", professionSelector: ".profile__profession", avatarSelector: ".profile__avatar" });

const popupWithProfile = new PopupWithForm(".popup-profile", (values) => {
  api
    .setUSerInfo(values)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithProfile.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupWithProfile.renderLoading(false));
});

const popupWithCards = new PopupWithForm(".popup-cards", (values) => {
  Promise.all([api.addNewCard(values), api.getUserInfo()])
    .then(([card, user]) => {
      card.myProfileId = user._id;
      cardList.addItemPrepend(cardList.renderer(card));
      popupWithCards.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupWithCards.renderLoading(false));
});

const popupWithAvatar = new PopupWithForm(".popup-avatar", (userAvatar) => {
  api
    .setUserAvatar(userAvatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatar.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupWithAvatar.renderLoading(false));
});

popupWithProfile.setEventListeners();
popupWithCards.setEventListeners();
popupPicture.setEventListeners();
popupWithAvatar.setEventListeners();
popupDelete.setEventListeners();

profileBtnElement.addEventListener("click", () => {
  formValidators["form-profile"].resetFormErrorMessages();

  popupWithProfile.setInputValues(userInfo.getUserInfo());
  popupWithProfile.open();
});

popupWithCardsOpenBtnElement.addEventListener("click", () => {
  formValidators["form-cards"].resetFormErrorMessages();
  popupWithCards.open();
});

avatarBtn.addEventListener("click", () => {
  formValidators["form-avatar"].resetFormErrorMessages();
  popupWithAvatar.open();
});

enableValidation(validationSetting);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    cards.forEach((item) => {
      item.myProfileId = user._id;
    });
    cardList.renderItems(cards);
    userInfo.setUserInfo(user);
  })
  .catch((err) => console.error(err));
