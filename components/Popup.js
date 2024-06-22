export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = document.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._closeModalOverlayClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "click",
      this._closeModalOverlayClick
    );
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closeModal(openedModal);
    }
  }

  _closeModalOverlayClick() {
    if (evt.target.classList.contains("modal")) {
      closeModal(evt.target);
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
