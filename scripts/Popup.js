export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  }

  open() {
    this._popupSelector.classList.add("popup_opened")
    document.addEventListener("keydown", (e) => {
      this._handleEscClick(); 
    })
  }

  close() {
    this._popupSelector.classList.remove("popup_opened")
    document.removeEventListener("keydown", (e) => {
      this._handleEscClick()
    })
  }

  _handleEscClick(e) {
    const popupIsOpened = document.querySelector(".popup_opened")
    if (e.key === "Escape") {
      this.close(popupIsOpened)
    }
  }

  setEventListeners() {}
}
