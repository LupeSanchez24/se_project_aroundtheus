import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

import Section from "../components/Section.js";

import { initialCards, settings } from "../utils/constants.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";

import PopupWithConfirmation from "../components/popupwithconfirmation.js";

/* Card.js*/

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  const cardElement = card.getView();
  //section.addItem(cardElement);
  return cardElement;
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

//Delete Modal
//const cardDeleteModal = document.querySelector("#modal-delete-card");
//const cardDeleteButton = document.querySelector(".card__delete-button");

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

/*Delete card confirmation*/

const deleteConfirmPopup = new PopupWithConfirmation("#modal-delete-card", {
  handleFormSubmit: () => {},
});
deleteConfirmPopup.setEventListeners();

/*  Event Handlers */

function handleDeleteCard(card) {
  console.log("Delete button clicked");
  deleteConfirmPopup.open();
  deleteConfirmPopup.confirmDelete(() => {
    console.log("Deletion confirmed");
    api
      .deleteCard(card.id)
      .then(() => {
        console.log("Card deletion API succeeded");
        card.removeCard();
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.error("Card deletion API failed:", err);
      });
  });
}

/*function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  editCardPopup.close();
}*/

function handleProfileEditSubmit(userData) {
  console.log("User Data Submitted:", userData);

  api
    .updateProfile(userData)
    .then((res) => {
      userInfo.setUserInfo({
        title: res.name,
        description: res.about,
      });
    })
    .catch((err) => {
      console.error(err);
    });

  editCardPopup.close();
}

/*function handleProfileAddSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.Url });
  addFormElement.reset();
  addFormValidator.disableButton();
  newCardPopup.close();
}*/

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

function handleProfileAddSubmit(data) {
  //const { name, link } = data;
  //const cardData = { name: name, link: link };
  //debugger;
  api
    .addNewCard({ name: data.title, link: data.Url, _id: data._id })
    .then((cardData) => {
      //const cardElement = renderCard(cardData);
      section.addItem(cardData);
      newCardPopup.close();
      addFormElement.reset();
      addFormValidator.disableButton();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
      // Handle the error (e.g., show message to the user)
    });
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
  .then((userInf) => {
    //userInfo.updateProfileImage(userData);
    userInfo.setUserInfo({
      title: userInf.name,
      description: userInf.about,
    });
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((data) => {
    section = new Section(
      {
        items: data,
        renderer: renderCard,
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

let section;
