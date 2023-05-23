export default class FormValidator {
  constructor(validationConfig, popupForm) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitBtnSelector = validationConfig.submitBtnSelector;
    this._inactiveBtnClass = validationConfig.inactiveBtnClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._popupForm = popupForm;
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._btnEl = this._popupForm.querySelector(this._submitBtnSelector);
  }

  _setListener() {
    this._disableBtn(this._btnEl);

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        if (this._hasInvalidinput()) {
          this._disableBtn();
        } else this._activeBtn();
      });
    });
  }

  _disableBtn() {
    this._btnEl.classList.add(this._inactiveBtnClass);
    this._btnEl.setAttribute("disabled", true);
  }

  _activeBtn() {
    this._btnEl.classList.remove(this._inactiveBtnClass);
    this._btnEl.removeAttribute("disabled");
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _showInputError(inputEl, errorMessage) {
    const errorEl = this._popupForm.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._popupForm.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.classList.remove(this._errorClass);
    errorEl.textContent = "";
  }

  _hasInvalidinput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  enableValidation() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setListener();
  }

  resetFormErrorMessages() {
    this._disableBtn();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
