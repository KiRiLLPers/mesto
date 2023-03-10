const popupElement = document.querySelectorAll(".popup");

const popupProfileElement = document.querySelector(".popup-profile");
const popupCardsElement = document.querySelector(".popup-cards");
const popupImgElement = document.querySelector(".popup-img");

const popupCardsOpenBtnElement = document.querySelector(".profile__add-button")
const profileBtnElement = document.querySelector(".profile__edit-button");

const popupCloseBtnElement = document.querySelectorAll(".popup__close-btn");

const profileFullNameElement = document.querySelector(".profile__full-name");
const profileProfessionElement = document.querySelector(".profile__profession");

const formProfileElement = document.querySelector(".popup-form-profile");
const inputProfileTtileElement = formProfileElement.querySelector(".form__item_el_heading");
const inputProfileSubtitleElement = formProfileElement.querySelector(".form__item_el_subheading");

const formCardsElement = document.querySelector(".popup-form-cards");
const inputCardsTtileElement = formCardsElement.querySelector(".form__item_el_place-name");
const inputCardsSubTtileElement = formCardsElement.querySelector(".form__item_el_url");

const divPhotosElement = document.querySelector(".photos__wrap");

const popupBigImageElement = popupImgElement.querySelector(".popup__image");
const popupBigImageCaptionElement = popupImgElement.querySelector(".popup__caption");


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const openPopup = (popup) => { // функция открытия любого попапа
  popup.classList.add("popup_opened");
}

const closePopup = (popup) => { // функция закрытия любого попапа
  popup.classList.remove("popup_opened");
}

const closePopupClickOnOverlay = (e) => { // функция закрытия любого попапа кликом на оверлей
  if(e.target === e.currentTarget) {
    popupElement.forEach((item) => {
      closePopup(item);
    })
  }
}

const openPopupProfile = () => { // функция открытия попапа с редактированием профиля пользователя
  openPopup(popupProfileElement);

  inputProfileTtileElement.value = profileFullNameElement.textContent;
  inputProfileSubtitleElement.value = profileProfessionElement.textContent;
}

const handleFormSubmitProfile = (e) => { // обработчик введенных пользователей данных для редактирования профиля
  e.preventDefault();

  profileFullNameElement.textContent = inputProfileTtileElement.value;
  profileProfessionElement.textContent = inputProfileSubtitleElement.value;

  closePopup(popupProfileElement);
}

const openPopupCards = () => {
  openPopup(popupCardsElement);
}

const openPopupImage = (e) => { // функция открытия картинки

  popupBigImageElement.src = e.target.src;
  popupBigImageCaptionElement.textContent = e.target.closest(".card").querySelector(".card__title").textContent;
  popupBigImageElement.alt = popupBigImageCaptionElement.textContent;

  openPopup(popupImgElement)
}

const renderCards = (arrCards) => { // функция отрисовки карточек из исходного массива

  arrCards.forEach((item) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;

    divPhotosElement.append(cardElement);

    cardElement.querySelector(".card__image").addEventListener("click", openPopupImage);

    cardElement.querySelector(".card__like-image").addEventListener("click", (e) => {
      e.target.classList.toggle("card__like-image_active");
    })

    cardElement.querySelector(".card__trash-btn").addEventListener("click", (e) => {
      const deleteCard = e.target.closest(".card");
      deleteCard.remove();
    })
  })
}

const handleFormSubmitCards = (e) => { // обработчик сохранения новых карточек
  e.preventDefault();

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = inputCardsSubTtileElement.value;
  cardElement.querySelector(".card__image").alt = inputCardsTtileElement.value;;
  cardElement.querySelector(".card__title").textContent = inputCardsTtileElement.value;

  cardElement.querySelector(".card__image").addEventListener("click", openPopupImage); // открытие фотографии карточки

  cardElement.querySelector(".card__like-image").addEventListener("click", (e) => { // возможность ставить лайк карточке
    e.target.classList.toggle("card__like-image_active");
  })

  cardElement.querySelector(".card__trash-btn").addEventListener("click", (e) => { // удаление карточки
    const deleteCard = e.target.closest(".card");
    deleteCard.remove();
  })

  divPhotosElement.prepend(cardElement);

  closePopup(popupCardsElement);

  inputCardsTtileElement.value = '';
  inputCardsSubTtileElement.value = '';
}

renderCards(initialCards); // вызываем фукнцию, чтобы отрисовать все карточки при загрузке страницы






// слушатели

popupElement.forEach((item) => { // слушатель для закрытия любого попапа кликом на оверлей
  item.addEventListener("click", closePopupClickOnOverlay);
});

profileBtnElement.addEventListener("click", openPopupProfile); // слушатель для открытия редактирования профиля
formProfileElement.addEventListener("submit", handleFormSubmitProfile); // слушатель для обработки введенных пользователей данных и клика на "сохранить"
popupCardsOpenBtnElement.addEventListener("click", openPopupCards) // слушатель для открытия попапа добавления новых карточек
formCardsElement.addEventListener("submit", handleFormSubmitCards); // слушатель для обработки названия и ссылки картинки пользователя


popupCloseBtnElement.forEach((item) => { // закрываем любой попап нажатием на любой крестик закрытия попапа)
  item.addEventListener("click", () => {
    popupElement.forEach((popupEl) => {
      closePopup(popupEl);
    })
  })
})




