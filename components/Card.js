//Image modal
const previewImageModal = document.querySelector("#preview-image-modal");
const imageCloseButton = document.querySelector("#image-close-button");

/*  Functions */
function closeModal(modal) {
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
}

imageCloseButton.addEventListener("click", () => closeModal(previewImageModal));

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    console.log(this);
    //.card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //.card__delete-button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //.handImageClick

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleImageClick(cardData) {
    this._imageModal = this._cardElement.querySelector(".modal__image_preview");
    this._imageTitleModal = this._cardElement.querySelector(
      ".modal__title_preview"
    );
    this._imageModal.src = cardData.link;
    this._imageModal.alt = cardData.name;
    this._imageTitleModal.textContent = cardData.name;
    openModal(previewImageModal);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    //get the card view
    // set evenet listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
