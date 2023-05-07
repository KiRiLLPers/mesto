export default class FormValidator {
  constructor(validationConfig, popupForm) {
    this._formSelector = validationConfig.formSelector
    this._inputSelector = validationConfig.inputSelector
    this._submitBtnSelector = validationConfig.submitBtnSelector
    this._inactiveBtnClass = validationConfig.inactiveBtnClass
    this._inputErrorClass = validationConfig.inputErrorClass
    this._errorClass = validationConfig.errorClass
    this._popupForm = popupForm
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector))
    this._btnEl = this._popupForm.querySelector(this._submitBtnSelector)
    this._errorMessages = Array.from(this._popupForm.querySelectorAll(".form__item-error"))
  }

  _setListener(form) {
    this._disableBtn(this._btnEl)

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(form, inputEl)
        if (this._hasInvalidinput(this._inputList)) {
          this._disableBtn(this._btnEl)
        } else this._activeBtn(this._btnEl)
      })
    })
  }

  _disableBtn(btnEl) {
    btnEl.classList.add(this._inactiveBtnClass)
    btnEl.setAttribute("disabled", true)
  }

  _activeBtn(btnEl) {
    btnEl.classList.remove(this._inactiveBtnClass)
    btnEl.removeAttribute("disabled")
  }

  _checkInputValidity(form, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(form, inputEl, inputEl.validationMessage, this._inputErrorClass, this._errorClass)
    } else {
      this._hideInputError(form, inputEl, this._inputErrorClass, this._errorClass)
    }
  }

  _showInputError(form, inputEl, errorMessage, inputErrorClass, errorClass) {
    const errorEl = form.querySelector(`.${inputEl.id}-error`)
    inputEl.classList.add(inputErrorClass)
    errorEl.textContent = errorMessage
    errorEl.classList.add(errorClass)
  }

  _hideInputError(form, inputEl, inputErrorClass, errorClass) {
    const errorEl = form.querySelector(`.${inputEl.id}-error`)
    inputEl.classList.remove(inputErrorClass)
    errorEl.classList.remove(errorClass)
    errorEl.textContent = ""
  }

  _hasInvalidinput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid
    })
  }

  enableValidation() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault()
    })

    this._setListener(this._popupForm)
  }

  resetFormErrorMessages() {
    this._disableBtn(this._btnEl)

    this._inputList.forEach((input) => {
      input.classList.remove("form__item_type_error")
    })
    this._errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = ""
    })
  }
}
