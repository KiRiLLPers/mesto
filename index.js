let profileBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".close-btn");
let popup = document.querySelector(".popup");
let inputTtile = document.querySelector(".form__item_el_heading");
let inputSubtitle = document.querySelector(".form__item_el_subheading");
let fullName = document.querySelector(".profile__full-name");
let profession = document.querySelector(".profile__profession");
let formBtn = document.querySelector(".form__btn");

function openPopup() {
  popup.classList.add("popup_opened");
  inputTtile.value = fullName.textContent;
  inputSubtitle.value = profession.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

formBtn.addEventListener("click", function (e) {
  e.preventDefault();

  fullName.textContent = inputTtile.value;
  profession.textContent = inputSubtitle.value;
  popupClose();
});

profileBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", popupClose);
