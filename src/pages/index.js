import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

import Section from "../components/Section.js";

import { initialCards, settings } from "../utils/constants.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";

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

//const profileTitle = document.querySelector(".profile__title");
//const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Add modal
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile-add-modal");

/*FormValidator.js*/

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addFormElement);
addFormValidator.enableValidation();

/* Section.js */

/*const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();*/

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
  avatar: ".profile__image",
});

/*  Event Handlers */

/*function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  editCardPopup.close();
}*/

function handleProfileEditSubmit(data) {
  console.log("User Data Submitted:", data);

  api
    .updateProfile(data.title, data.about)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.title,
        description: res.description,
      });
    })
    .catch((err) => {
      console.error(err);
    });

  editCardPopup.close();
}

function handleProfileAddSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.Url });
  addFormElement.reset();
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

  editCardPopup.open();
});

//add card button
addNewCardButton.addEventListener("click", () => newCardPopup.open());

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "822d6207-f743-4e11-ba27-e254a062d9f1",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    //userInfo.updateProfileImage(userData);
    userInfo.setUserInfo({
      name: data.title,
      about: data.description,
    });
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((data) => {
    const section = new Section(
      {
        items: data,
        renderer: (cardData) => {
          const card = new Card(cardData, "#card-template", handleImageClick);
          const cardElement = card.getView();
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((profile) => {
    console.log("Current Profile:", profile);
  })
  .catch((error) => {
    console.error("Error fetching profile:", error);
  });

api
  .updateProfile()
  .then((updatedProfile) => {
    console.log("Profile updated successfully:", updatedProfile);
  })
  .catch((error) => {
    console.error("Error patching profile:", error);
  });
