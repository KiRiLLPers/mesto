export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
    this._handleEscClick = this._handleEscClick.bind(this);
    this._handleClickOnOverlay = this._handleClickOnOverlay.bind(this);
    this._form = this._popup.querySelector(".form");
  }

  _handleEscClick(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClick);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClick);
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", this._handleClickOnOverlay);
  }
}
