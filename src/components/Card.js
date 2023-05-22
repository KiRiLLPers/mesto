export default class Card {
  constructor(card, cardTemplate, handleCardClick, openDeletePopup, handleLikeClick) {
    this._name = card.name;
    this._link = card.link;
    this._myProfileId = card.myProfileId;
    this._likes = card.likes;
    this._likesLength = card.likes.length;
    this._owner = card.owner._id;
    this._cardId = card._id;
    this._cardTemplate = cardTemplate;
    this._openPopupImage = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector(".card__image");
    this._cardLikeImg = this._element.querySelector(".card__like-image");
    this._cardTrashBtn = this._element.querySelector(".card__trash-btn");
    this._likeCounter = this._element.querySelector(".card__like-current");
  }

  _handleDeleteTrashBtn() {
    this._openDeletePopup(this, this._cardId);
  }

  deleteCard() {
    this._element.remove();
  }

  _checkuplike() {
    this._likes.forEach((item) => {
      if (item._id === this._myProfileId) this._cardLikeImg.classList.add("card__like-image_active");
      return;
    });
    this._changeLikesCounter(this._likes);
  }

  _changeLikesCounter(likes) {
    this._likeCounter.textContent = likes.length;
  }

  toggleLikeImage(likes) {
    this._cardLikeImg.classList.toggle("card__like-image_active");
    this._changeLikesCounter(likes);
  }

  _setEventListenerForCard() {
    this._cardImg.addEventListener("click", (e) => {
      this._openPopupImage(this._link, this._name);
    });
    this._cardLikeImg.addEventListener("click", (e) => {
      this._handleLikeClick(this._cardId, this._cardLikeImg);
    });
    this._cardTrashBtn.addEventListener("click", (e) => {
      this._handleDeleteTrashBtn();
    });
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  createCard() {
    if (this._owner !== this._myProfileId) {
      this._cardTrashBtn.remove();
    }
    this._setEventListenerForCard();
    this._checkuplike();

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
