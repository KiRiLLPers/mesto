export default class Card {
  constructor(data, cardTemplate, openPopupImage) {
    this._name = data.name
    this._link = data.link
    this._cardTemplate = cardTemplate
    this._openPopupImage = openPopupImage
  }

  _handleToggleLike(e) {
    if (e.target.classList.contains("card__like-image")) {
      e.target.classList.toggle("card__like-image_active")
    }
  }

  _handleDeleteTrashBtn(e) {
    const _deleteCard = e.target.closest(".card")
    _deleteCard.remove()
  }

  _setEventListenerForCard() {
    this._element.querySelector(".card__image").addEventListener("click", (e) => {
      this._openPopupImage(e)
    })
    this._element.querySelector(".card__trash-btn").addEventListener("click", (e) => {
      this._handleDeleteTrashBtn(e)
    })
    this._element.addEventListener("click", (e) => {
      this._handleToggleLike(e)
    })
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector(".card").cloneNode(true)

    return cardElement
  }

  createCard() {
    this._element = this._getTemplate()
    this._setEventListenerForCard()

    this._element.querySelector(".card__image").src = this._link
    this._element.querySelector(".card__image").alt = this._name
    this._element.querySelector(".card__title").textContent = this._name
    return this._element
  }
}
