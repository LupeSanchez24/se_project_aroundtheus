export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = document.querySelector(".modal__close");
    this._addModalCloseButton = document.querySelector("#add-close-button");
    this._imageModalCloseButton = document.querySelector("#image-close-button");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      this.close(openedModal);
    }
  }

  _closeModalOverlayClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close(evt.target);
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._addModalCloseButton.addEventListener("click", () => {
      this.close();
    });
    this._imageModalCloseButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", this._closeModalOverlayClick);
  }
}
