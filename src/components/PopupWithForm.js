import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__item"));
  }

  _getInputValues() {
    this.inputValues = {};

    this._inputs.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;
  }

  setInputValues(userInfo) {
    this._inputs.forEach((input) => {
      input.value = userInfo[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
