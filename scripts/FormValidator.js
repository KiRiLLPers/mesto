export default class FormValidator {
  constructor(data, popupForm) {
    this._formSelector = data.formSelector
    this._inputSelector = data.inputSelector
    this._submitBtnSelector = data.submitBtnSelector
    this._inactiveBtnClass = data.inactiveBtnClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._popupForm = popupForm
  }

  _setListener(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector))
    const btnEl = form.querySelector(this._submitBtnSelector)
    this._disableBtn(btnEl)

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(form, inputEl)
        if (this.hasInvalidinput(inputList)) {
          this._disableBtn(btnEl)
        } else this._activeBtn(btnEl)
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

  hasInvalidinput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid
    })
  }

  enableValidation() {
    const form = this._popupForm.querySelector(this._formSelector)

    form.addEventListener("submit", (e) => {
      e.preventDefault()
    })

    this._setListener(form)
  }

  resetFormErrorMessages(errorMessages) {
    const btnEl = this._popupForm.querySelector(this._formSelector).querySelector(this._submitBtnSelector);
    this._disableBtn(btnEl);

    const inputListFromForm = Array.from(this._popupForm.querySelector(this._formSelector).querySelectorAll(this._inputSelector))
    inputListFromForm.forEach((input) => {
      input.value = ""
      input.classList.remove("form__item_type_error")
    })
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = ""
    })
  }
}
