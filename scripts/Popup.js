export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn")
  }

  open() {
    this._popup.classList.add("popup_opened")
    document.addEventListener("keydown", (e) => {
      this._handleEscClick(e)
    })
  }

  close() {
    this._popup.classList.remove("popup_opened")
    document.removeEventListener("keydown", (e) => {
      this._handleEscClick()
    })
  }

  _handleEscClick(e) {
    if (e.key === "Escape") {
      this.close()
    }
  }

  _handleClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close()
    })
    this._popup.addEventListener("click", (e) => {
      this._handleClickOnOverlay(e)
    })
  }
}
