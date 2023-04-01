
  // функция открытия любого попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  // добавление слушателя для закрытия попапа кнопкой escape
  document.addEventListener("keydown", closePopupClickEsc);
};

  // функция закрытия любого попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  // удаление слушателя закрытия попапа нажатием на escape при закрытии попапа
  document.removeEventListener("keydown", closePopupClickEsc);
};

  // функция закрытия любого попапа кликом на оверлей
const closePopupClickOnOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e.target);
  }
};

  // функция открытия попапа с редактированием профиля пользователя
const openPopupProfile = () => {
  
  openPopup(popupProfileElement);

  const errorMessages = Array.from(popupProfileElement.querySelectorAll(".form__item-error"));
  const btnEl = popupProfileElement.querySelector(validationSetting.submitBtnSelector);
  
  btnEl.classList.remove(validationSetting.inactiveBtnClass);

  resetFormErrorMessages(inputProfileList, errorMessages);

  inputProfileTtileElement.value = profileFullNameElement.textContent;
  inputProfileSubtitleElement.value = profileProfessionElement.textContent;
};

  // обработчик введенных пользователей данных для редактирования профиля
const handleFormSubmitProfile = (e) => {
  

  if (!hasInvalidinput(inputProfileList)) {
    closePopup(popupProfileElement);
  } else {
    return;
  }

  profileFullNameElement.textContent = inputProfileTtileElement.value;
  profileProfessionElement.textContent = inputProfileSubtitleElement.value;
};

const openPopupCards = () => {
  openPopup(popupCardsElement);

  const errorMessages = Array.from(popupCardsElement.querySelectorAll(".form__item-error"));
  const btnEl = popupCardsElement.querySelector(validationSetting.submitBtnSelector);

  btnEl.classList.add(validationSetting.inactiveBtnClass);

  resetFormErrorMessages(inputCardsList, errorMessages);
};

  // функция открытия картинки
const openPopupImage = (e) => {

  popupBigImageElement.src = e.target.src;
  popupBigImageCaptionElement.textContent = e.target.closest(".card").querySelector(".card__title").textContent;
  popupBigImageElement.alt = popupBigImageCaptionElement.textContent;

  openPopup(popupImgElement);
};

  // функция создания карточки
const createCard = (item) => {

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  setEventListenerForCards(cardElement);

  return cardElement;
};

const setEventListenerForCards = (card) => {
  card.querySelector(".card__image").addEventListener("click", openPopupImage);
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__like-image")) {
      e.target.classList.toggle("card__like-image_active");
    }
    card.querySelector(".card__trash-btn").addEventListener("click", (e) => {
    const deleteCard = e.target.closest(".card");
    deleteCard.remove();
  });
  });
}

  // функция отрисовки карточек из исходного массива
const renderCards = (arrCards) => {
  arrCards.forEach((item) => {
    divPhotosElement.append(createCard(item));
  });
};

  // обработчик сохранения новых карточек
const handleFormSubmitCards = (e) => {

  if (!hasInvalidinput(inputCardsList)) {
    closePopup(popupCardsElement);
  } else {
    return;
  }

  const newCard = {};
  newCard.name = inputCardsTtileElement.value;
  newCard.link = inputCardsSubTtileElement.value;

  divPhotosElement.prepend(createCard(newCard));

  e.target.reset();
};

renderCards(initialCards); // вызываем фукнцию, чтобы отрисовать все карточки при загрузке страницы

const closePopupClickEsc = (e) => {
  if (e.key === "Escape") {
    popupElements.forEach((popupEl) => {
      closePopup(popupEl);
    });
  }
};
// слушатели

popupElements.forEach((popupEl) => {
  // слушатель для закрытия любого попапа кликом на оверлей
  popupEl.addEventListener("click", closePopupClickOnOverlay);
});

profileBtnElement.addEventListener("click", openPopupProfile); // слушатель для открытия редактирования профиля
formProfileElement.addEventListener("submit", handleFormSubmitProfile); // слушатель для обработки введенных пользователей данных и клика на "сохранить"
popupCardsOpenBtnElement.addEventListener("click", openPopupCards); // слушатель для открытия попапа добавления новых карточек
formCardsElement.addEventListener("submit", handleFormSubmitCards); // слушатель для обработки названия и ссылки картинки пользователя

popupCloseBtnElements.forEach((item) => {
  // закрываем любой попап нажатием на любой крестик закрытия попапа)
  item.addEventListener("click", () => {
    popupElements.forEach((popupEl) => {
      closePopup(popupEl);
    });
  });
});
