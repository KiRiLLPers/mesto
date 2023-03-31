// функция валидации всех форм
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector))

  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
    })

    setListener(form, rest)
  })
}

// функция добавления слушателя на каждый импут для проверки валидности
const setListener = (form, {inputSelector, submitBtnSelector, ...rest}) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector))
  const btnEl = form.querySelector(submitBtnSelector)

  toggleBtnState(inputList, btnEl, rest)

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(form, inputEl, rest)
      toggleBtnState(inputList, btnEl, rest)
    })
  })
}

// функция проверки валидности каждого инпута
 const checkInputValidity = (form, inputEl, {inputErrorClass, errorClass}) => {
  if (!inputEl.validity.valid) {
    showInputError(form, inputEl, inputEl.validationMessage, inputErrorClass, errorClass)
  } else {
    hideInputError(form, inputEl, inputErrorClass, errorClass)
  }
}

// функция показа текста ошибки
const showInputError = (form, inputEl, errorMessage, inputErrorClass, errorClass) => {
  const errorEl = form.querySelector(`.${inputEl.id}-error`)
  inputEl.classList.add(inputErrorClass)
  errorEl.textContent = errorMessage
  errorEl.classList.add(errorClass)
}

// функция скрытия текста ошибки
const hideInputError = (form, inputEl, {inputErrorClass, errorClass}) => {
  const errorEl = form.querySelector(`.${inputEl.id}-error`)
  inputEl.classList.remove(inputErrorClass)
  errorEl.classList.remove(errorClass)
  errorEl.textContent = ""
}

// проверка, есть ли хотя бы один невалидный инпут
const hasInvalidinput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid
  })
}

// функция переключения состояния кнопки
const toggleBtnState = (inputList, btnEl, {inactiveBtnClass}) => {
  if (hasInvalidinput(inputList)) {
    btnEl.classList.add(inactiveBtnClass)
    btnEl.setAttribute("disabled", true)
  } else {
    btnEl.classList.remove(inactiveBtnClass)
    btnEl.removeAttribute("disabled")
  }
}

// функция сброса значений после предыдущего открытия формы
const resetFormErrorMessages = (inputs, errorMessages) => {
  inputs.forEach((input) => {
    input.value = ""
    input.classList.remove("form__item_type_error")
  })

  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = ""
  })
}

enableValidation(validationSetting)
