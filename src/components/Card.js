export default class Card {
  constructor(card, cardTemplate, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._cardTemplate = cardTemplate;
    this._openPopupImage = handleCardClick;
  }

  _handleDeleteTrashBtn() {
    this._element.remove();
  }

  _handleToggleLike() {
    this._element.querySelector(".card__like-image").classList.toggle("card__like-image_active");
  }

  _setEventListenerForCard() {
    this._element.querySelector(".card__image").addEventListener("click", (e) => {
      this._openPopupImage(this._link, this._name);
    });
    this._element.querySelector(".card__like-image").addEventListener("click", (e) => {
      this._handleToggleLike();
    });
    this._element.querySelector(".card__trash-btn").addEventListener("click", (e) => {
      this._handleDeleteTrashBtn();
    });
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListenerForCard();

    this.cardImg = this._element.querySelector(".card__image");
    this.cardImg.src = this._link;
    this.cardImg.alt = this._name;

    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
