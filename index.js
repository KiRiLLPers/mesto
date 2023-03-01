let profileBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".close-btn");
let popup = document.querySelector(".popup");
let inputTtile = document.querySelector(".form__item_el_heading");
let inputSubtitle = document.querySelector(".form__item_el_subheading");
let fullName = document.querySelector(".profile__full-name");
let profession = document.querySelector(".profile__profession");
let form = document.querySelector(".form");

function openPopup() {
  popup.classList.add("popup_opened");
  inputTtile.value = fullName.textContent;
  inputSubtitle.value = profession.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(e) {
  e.preventDefault();

  fullName.textContent = inputTtile.value;
  profession.textContent = inputSubtitle.value;
  closePopup();
}

profileBtn.addEventListener("click", openPopup);
form.addEventListener("submit", handleFormSubmit);
closeBtn.addEventListener("click", closePopup);
