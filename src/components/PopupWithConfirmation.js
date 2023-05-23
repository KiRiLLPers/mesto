import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._popup.querySelector(".form__btn");
    this._submitStartText = this._submitBtn.textContent;
    this._form = this._popup.querySelector(".form");
  }

  open = (el, cardId) => {
    super.open();
    this._el = el;
    this._cardId = cardId;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderLoading(true)
      this._handleFormSubmit(this._el, this._cardId);
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent += "...";
    } else {
      this._submitBtn.textContent = this._submitStartText;
    }
  }
}
