class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  }

  open() {
    this._popupSelector.classList.add("popup_opened")
    document.addEventListener("keydown", (e) => {
      this._handleEscClick();
    })
  }

  close() {}

  _handleEscClick(e) {
    if (e.key === "Escape") {
    }
  }

  setEventListeners() {}
}
