import {validationSetting, initialCards} from "./constants.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const popupElements = document.querySelectorAll(".popup")

const popupProfileElement = document.querySelector(".popup-profile")
const popupCardsElement = document.querySelector(".popup-cards")
const popupImgElement = document.querySelector(".popup-img")

const popupCardsOpenBtnElement = document.querySelector(".profile__add-button")
const profileBtnElement = document.querySelector(".profile__edit-button")

const popupCloseBtnElements = document.querySelectorAll(".popup__close-btn")

const profileFullNameElement = document.querySelector(".profile__full-name")
const profileProfessionElement = document.querySelector(".profile__profession")

const formProfileElement = document.querySelector(".popup-form-profile")
const inputProfileTtileElement = formProfileElement.querySelector(".form__item_el_heading")
const inputProfileSubtitleElement = formProfileElement.querySelector(".form__item_el_subheading")

const formCardsElement = document.querySelector(".popup-form-cards")
const inputCardsTtileElement = formCardsElement.querySelector(".form__item_el_place-name")
const inputCardsSubTtileElement = formCardsElement.querySelector(".form__item_el_url")

const divPhotosElement = document.querySelector(".photos__wrap")

const popupBigImageElement = popupImgElement.querySelector(".popup__image")
const popupBigImageCaptionElement = popupImgElement.querySelector(".popup__caption")

const cardTemplate = document.querySelector("#card-template").content

const profileFormValidation = new FormValidator(validationSetting, popupProfileElement)
const cardsFormValidation = new FormValidator(validationSetting, popupCardsElement)

// функция открытия любого попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened")
  // добавление слушателя для закрытия попапа кнопкой escape
  document.addEventListener("keydown", closePopupClickEsc)
}

// функция закрытия любого попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened")
  // удаление слушателя закрытия попапа нажатием на escape при закрытии попапа
  document.removeEventListener("keydown", closePopupClickEsc)
}

const closePopupClickEsc = (e) => {
  if (e.key === "Escape") {
    popupElements.forEach((popupEl) => {
      closePopup(popupEl)
    })
  }
}
// функция закрытия любого попапа кликом на оверлей
const closePopupClickOnOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e.target)
  }
}

// функция открытия попапа с редактированием профиля пользователя
const openPopupProfile = () => {
  openPopup(popupProfileElement)

  const errorMessages = Array.from(popupProfileElement.querySelectorAll(".form__item-error"))

  profileFormValidation.resetFormErrorMessages(errorMessages)

  inputProfileTtileElement.value = profileFullNameElement.textContent
  inputProfileSubtitleElement.value = profileProfessionElement.textContent
}

// обработчик введенных пользователей данных для редактирования профиля
const handleFormSubmitProfile = (e) => {
  closePopup(popupProfileElement)

  profileFullNameElement.textContent = inputProfileTtileElement.value
  profileProfessionElement.textContent = inputProfileSubtitleElement.value
}

const openPopupCards = () => {
  openPopup(popupCardsElement)

  const errorMessages = Array.from(popupCardsElement.querySelectorAll(".form__item-error"))

  cardsFormValidation.resetFormErrorMessages(errorMessages)
}

// функция открытия картинки
const openPopupImage = (e) => {
  popupBigImageElement.src = e.target.src
  popupBigImageCaptionElement.textContent = e.target.closest(".card").querySelector(".card__title").textContent
  popupBigImageElement.alt = popupBigImageCaptionElement.textContent

  openPopup(popupImgElement)
}

// функция создания карточки
const createCard = (item) => {
  const card = new Card(item, cardTemplate, openPopupImage)
  const cardElement = card.createCard()

  return cardElement
}

// функция отрисовки карточек из исходного массива
const renderCards = (arrCards) => {
  arrCards.forEach((item) => {
    divPhotosElement.append(createCard(item))
  })
}

// обработчик сохранения новых карточек
const handleFormSubmitCards = (e) => {
  closePopup(popupCardsElement)

  const newCard = {}
  newCard.name = inputCardsTtileElement.value
  newCard.link = inputCardsSubTtileElement.value

  divPhotosElement.prepend(createCard(newCard))

  e.target.reset()
}

renderCards(initialCards) // вызываем фукнцию, чтобы отрисовать все карточки при загрузке страницы

// слушатели

popupElements.forEach((popupEl) => {
  // слушатель для закрытия любого попапа кликом на оверлей
  popupEl.addEventListener("click", closePopupClickOnOverlay)
})

profileBtnElement.addEventListener("click", openPopupProfile) // слушатель для открытия редактирования профиля
formProfileElement.addEventListener("submit", handleFormSubmitProfile) // слушатель для обработки введенных пользователей данных и клика на "сохранить"
popupCardsOpenBtnElement.addEventListener("click", openPopupCards) // слушатель для открытия попапа добавления новых карточек
formCardsElement.addEventListener("submit", handleFormSubmitCards) // слушатель для обработки названия и ссылки картинки пользователя

popupCloseBtnElements.forEach((item) => {
  // закрываем любой попап нажатием на любой крестик закрытия попапа)
  item.addEventListener("click", () => {
    popupElements.forEach((popupEl) => {
      closePopup(popupEl)
    })
  })
})

cardsFormValidation.enableValidation()
profileFormValidation.enableValidation()
