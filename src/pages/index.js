import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

import Section from "../components/Section.js";

import initialCards from "../utils/constants.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

/* Card.js*/

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

/*  Elements */

//Edit modal
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
//const editCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Add modal
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile-add-modal");

const addCardFormElement = document.querySelector("#add-form-modal");

/*FormValidator.js*/

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addFormElement);
addFormValidator.enableValidation();

/* Section.js */

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();

/* PopupWithImage.js*/

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

/* PopupWithForm */
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleProfileAddSubmit
);
newCardPopup.setEventListeners();

const editCardPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editCardPopup.setEventListeners();

/* UserInfo.js */
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

/*  Event Handlers */

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  editCardPopup.close();
}

function handleProfileAddSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.Url });
  addCardFormElement.reset();
  addFormValidator.disableButton();
  newCardPopup.close();
}

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

/*  Event Listeners */

profileEditButton.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();
  profileTitleInput.value = cardData.title;
  profileDescriptionInput.value = cardData.description;

  //profileTitleInput.value = profileTitle.textContent;
  //profileDescriptionInput.value = profileDescription.textContent;
  editCardPopup.open();
});

//add card button
addNewCardButton.addEventListener("click", () => newCardPopup.open());
