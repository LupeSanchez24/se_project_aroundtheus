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
const profileEditForm = profileEditModal.querySelector(".modal__form");

//Add modal
const addNewCardButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const addCloseButton = document.querySelector("#add-close-button");
const addCardFormElement = document.querySelector("#add-form-modal");
const cardAddTitleInput = document.querySelector("#profile-add-title-input");
const cardAddUrlInput = document.querySelector("#profile-url-input");

//Image modal
const previewImageModal = document.querySelector("#preview-image-modal");
const imageCloseButton = document.querySelector("#image-close-button");

/*  Functions */
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //find delete button

  //add the event listener to the delete button
  //add cardElement.remove();when this button gets click
  deleteButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button_active");
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //add click listener to the cardImage element
  //openModal with previewImageModal "add previewImageModal to HTMl"
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    const imageModal = document.querySelector(".modal__image_preview");
    const imageTitleModal = document.querySelector(".modal__title_preview");
    imageModal.src = cardData.link;
    imageModal.alt = cardData.name;
    imageTitleModal.textContent = cardData.name;
  });

  imageCloseButton.addEventListener("click", () =>
    closeModal(previewImageModal)
  );

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*  Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardAddUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
}

/*  Event Listeners */

//Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleProfileAddSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
editCloseButton.addEventListener("click", () => closeModal(profileEditModal));

//add card button
addNewCardButton.addEventListener("click", () => openModal(profileAddModal));
addCloseButton.addEventListener("click", () => closeModal(profileAddModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
