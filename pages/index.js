import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

//import {initialCards,cardListEl} from "../utils/constants.js"

//import Popup from "../components/Popup.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/userInfo.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

/* Card.js*/

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

/*  Elements */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Edit modal
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const editCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Add modal
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile-add-modal");
const addModalCloseButton = document.querySelector("#add-close-button");
const addCardFormElement = document.querySelector("#add-form-modal");
const cardAddTitleInput = document.querySelector("#profile-add-title-input");
const cardAddUrlInput = document.querySelector("#profile-url-input");

//Image modal
//const previewImageModal = document.querySelector("#preview-image-modal");
const imageCloseButton = document.querySelector("#image-close-button");
//const imageModal = document.querySelector(".modal__image_preview");
//const imageTitleModal = document.querySelector(".modal__title_preview");

/*  Functions */
/*function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", closeModalOverlayClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("click", closeModalOverlayClick);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
} */

/*function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}*/

/*function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", handleDeleteCard);

  likeButton.addEventListener("click", handleLikeIcon);

  cardImageEl.addEventListener("click", handlePreviewImage);

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}*/

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

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

/* Popup.js*/

//const popupCard = new Popup({ popupSelector: ".modal" });

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
/*function handleProfileEditSubmit(cardData) {
  // evt.preventDefault();
  //profileTitle.textContent = profileTitleInput.value;
  //profileDescription.textContent = profileDescriptionInput.value;
  //editFormValidator.disableButton();
  userInfo.setUserInfo(cardData);
  editCardPopup.close();
  console.log(cardData);
}*/

function handleProfileEditSubmit(cardData) {
  userInfo.setUserInfo(cardData.title, cardData.description);
  profileTitle.textContent = cardData.title;
  profileDescription.textContent = cardData.description;
  editCardPopup.close();
  console.log(cardData);
}

function handleProfileAddSubmit() {
  // e.preventDefault();
  const name = cardData.title;
  const link = cardData.url;
  // const name = cardAddTitleInput.value;
  // const link = cardAddUrlInput.value;
  renderCard({ name, link }, cardListEl);
  newCardPopup.close();
  addCardFormElement.reset();
  addFormValidator.disableButton();
}

/*function handleLikeIcon(e) {
  e.target.classList.toggle("card__like-button_active");
}*/

/*function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}*/

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

/*  Event Listeners */

//Form Listeners
//editFormElement.addEventListener("submit", handleProfileEditSubmit);
//addCardFormElement.addEventListener("submit", handleProfileAddSubmit);

profileEditButton.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();
  profileTitleInput.value = cardData.title;
  profileDescriptionInput.value = cardData.description;

  //profileTitleInput.value = profileTitle.textContent;
  //profileDescriptionInput.value = profileDescription.textContent;
  editCardPopup.open();
});

editCloseButton.addEventListener("click", () => editCardPopup.close());

//imageCloseButton.addEventListener("click", () => closeModal(previewImageModal));
imageCloseButton.addEventListener("click", () => popupWithImage.close());

//add card button
addNewCardButton.addEventListener("click", () => newCardPopup.open());
addModalCloseButton.addEventListener("click", () => newCardPopup.close());

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
