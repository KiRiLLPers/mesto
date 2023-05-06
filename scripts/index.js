import {validationSetting, initialCards} from "./constants.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import Section from "./Section.js"
import PopupWithImage from "./PopupWithImage.js"
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js"

const popupWithCardsOpenBtnElement = document.querySelector(".profile__add-button")
const profileBtnElement = document.querySelector(".profile__edit-button")
const cardTemplate = document.querySelector("#card-template").content

const formValidators = {}

const enableValidation = (validationSetting) => {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector))
  formList.forEach((formEl) => {
    const validator = new FormValidator(validationSetting, formEl)
    const formName = formEl.getAttribute("name")

    formValidators[formName] = validator
    validator.enableValidation()
  })
}

const openpopupWithImage = new PopupWithImage(".popup-img")

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, openpopupWithImage.open)
      return card.createCard()
    },
  },
  ".photos__wrap"
)

cardList.renderItems()

const userInfo = new UserInfo({nameSelector: ".profile__full-name", professionSelector: ".profile__profession"})

const popupWithProfile = new PopupWithForm(".popup-profile", (e) => {
  e.preventDefault()
  userInfo.setUserInfo(popupWithProfile.getInputValues())
  popupWithProfile.close()
})
const popupWithCards = new PopupWithForm(".popup-cards", (e) => {
  e.preventDefault()
  cardList.addItem(cardList.renderer(popupWithCards.getInputValues()))
  popupWithCards.close()
})
const popupWithImage = new PopupWithImage(".popup-img")

popupWithProfile.setEventListeners()
popupWithCards.setEventListeners()
popupWithImage.setEventListeners()

profileBtnElement.addEventListener("click", () => {
  formValidators["form-profile"].resetFormErrorMessages()

  popupWithProfile.setInputValues(userInfo.getUserInfo())
  popupWithProfile.open()
})

popupWithCardsOpenBtnElement.addEventListener("click", () => {
  formValidators["form-cards"].resetFormErrorMessages()
  popupWithCards.open()
})

enableValidation(validationSetting)
