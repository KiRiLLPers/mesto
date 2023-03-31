const openPopup = (popup) => {
  // функция открытия любого попапа
  popup.classList.add("popup_opened");
  // добавление слушателя для закрытия попапа кнопкой escape
  document.addEventListener("keydown", closePopupClickEsc);
};

const closePopup = (popup) => {
  // функция закрытия любого попапа
  popup.classList.remove("popup_opened");
  // удаление слушателя закрытия попапа нажатием на escape при закрытии попапа
  document.removeEventListener("keydown", closePopupClickEsc);
};

const closePopupClickOnOverlay = (e) => {
  // функция закрытия любого попапа кликом на оверлей
  if (e.target === e.currentTarget) {
    popupElements.forEach((popupEl) => {
      closePopup(popupEl);
    });
  }
};


const openPopupProfile = () => {
  // функция открытия попапа с редактированием профиля пользователя
  openPopup(popupProfileElement);

  const inputList = Array.from(popupProfileElement.querySelectorAll(".form__item"));
  const errorMessages = Array.from(popupProfileElement.querySelectorAll(".form__item-error"));
  const btnEl = popupProfileElement.querySelector(".form__btn");

  resetFormErrorMessages(inputList, errorMessages);
  toggleBtnState(inputList, btnEl, inactiveBtnClass = "form__btn_inactive")

  inputProfileTtileElement.value = profileFullNameElement.textContent;
  inputProfileSubtitleElement.value = profileProfessionElement.textContent;
};

const handleFormSubmitProfile = (e) => {
  // обработчик введенных пользователей данных для редактирования профиля
  const inputList = Array.from(popupProfileElement.querySelectorAll(".form__item"));

  if (!hasInvalidinput(inputList)) {
    closePopup(popupProfileElement);
  } else {
    return;
  }

  profileFullNameElement.textContent = inputProfileTtileElement.value;
  profileProfessionElement.textContent = inputProfileSubtitleElement.value;
};

const openPopupCards = () => {
  openPopup(popupCardsElement);

  const inputList = Array.from(popupCardsElement.querySelectorAll(".form__item"));
  const errorMessages = Array.from(popupCardsElement.querySelectorAll(".form__item-error"));
  const btnEl = popupCardsElement.querySelector(".form__btn");

  btnEl.classList.add("form__btn_inactive");

  resetFormErrorMessages(inputList, errorMessages);

};

const openPopupImage = (e) => {
  // функция открытия картинки

  popupBigImageElement.src = e.target.src;
  popupBigImageCaptionElement.textContent = e.target.closest(".card").querySelector(".card__title").textContent;
  popupBigImageElement.alt = popupBigImageCaptionElement.textContent;

  openPopup(popupImgElement);
};

const createCard = (item) => {
  // функция создания карточки

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement.querySelector(".card__image").addEventListener("click", openPopupImage);

  cardElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__like-image")) {
      e.target.classList.toggle("card__like-image_active");
    }
  });

  cardElement.querySelector(".card__trash-btn").addEventListener("click", (e) => {
    const deleteCard = e.target.closest(".card");
    deleteCard.remove();
  });

  return cardElement;
};

const renderCards = (arrCards) => {
  // функция отрисовки карточек из исходного массива
  arrCards.forEach((item) => {
    divPhotosElement.append(createCard(item));
  });
};

const handleFormSubmitCards = (e) => {
  // обработчик сохранения новых карточек
  const inputList = Array.from(popupCardsElement.querySelectorAll(".form__item"));

  if (!hasInvalidinput(inputList)) {
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

popupElements.forEach((item) => {
  // слушатель для закрытия любого попапа кликом на оверлей
  item.addEventListener("click", closePopupClickOnOverlay);
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
