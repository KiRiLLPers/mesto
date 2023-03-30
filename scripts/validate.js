// функция валидации всех форм
function enableValidation({ formSelector, inputSelector, submitBtnSelector, inactiveBtnClass, inputErrorClass, errorClass }) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setListener(form, inputSelector, submitBtnSelector, inactiveBtnClass, inputErrorClass, errorClass);
  });
}

// функция добавления слушателя на каждый импут для проверки валидности
function setListener(form, inputSelector, submitBtnSelector, inactiveBtnClass, inputErrorClass, errorClass) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const btnEl = form.querySelector(submitBtnSelector);

  toggleBtnState(inputList, btnEl, inactiveBtnClass);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(form, inputEl, inputErrorClass, errorClass);
      toggleBtnState(inputList, btnEl, inactiveBtnClass);
    });
  });
}

// функция проверки валидности каждого инпута
function checkInputValidity(form, inputEl, inputErrorClass, errorClass) {
  if (!inputEl.validity.valid) {
    showInputError(form, inputEl, inputEl.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, inputEl, inputErrorClass, errorClass);
  }
}


function showInputError(form, inputEl, errorMessage, inputErrorClass, errorClass) {
  const errorEl = form.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(errorClass);
}

function hideInputError(form, inputEl, inputErrorClass, errorClass) {
  const errorEl = form.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = "";
}

function hasInvalidinput(inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

function toggleBtnState(inputList, btnEl, inactiveBtnClass) {
  if (hasInvalidinput(inputList)) {
    btnEl.classList.add(inactiveBtnClass);
  } else {
    btnEl.classList.remove(inactiveBtnClass);
  }
}

function resetFormErrorMessages(inputs, errorMessages) {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("form__item_type_error");
  });

  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = "";
  });
}

enableValidation(validationSetting);
