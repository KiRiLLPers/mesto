import Popup from "./Popup.js"

export default class PicturePopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupBigImageElement = this._popup.querySelector(".popup__image")
    this._popupBigImageCaptionElement = this._popup.querySelector(".popup__caption")
  }

  open = (link, name) => {
    this._popupBigImageElement.src = link
    this._popupBigImageCaptionElement.textContent = name
    this._popupBigImageElement.alt = name
    super.open()
  }
}
