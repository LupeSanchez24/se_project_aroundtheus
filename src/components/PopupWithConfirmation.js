import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popSelector = document.querySelector(popupSelector);
    this._deletebutton = this._popupElement.querySelector(
      ".card__delete-button"
    );
    // this._deleteform = this._popupElement.querySelector("#modal-delete-card");
    this._handleFormSubmit = handleFormSubmit;
    this._isSubmitted = false;
    this._currentCard = null;
    this._cardId = null;
  }

  open(currentCard, cardId) {
    this._currentCard = currentCard;
    this._cardId = cardId;
    super.open();
  }

  close() {
    super.close();
  }

  getIsSubmitted() {
    return this._isSubmitted;
  }

  confirmDelete(apiCheck) {
    this._handleFormSubmit = apiCheck;
  }

  setEventListeners() {
    super.setEventListeners();
    /*this._popupElement
      .querySelector(".modal__button_delete")
      .addEventListener("submit", () => {
        this._handleFormSubmit();
      });*/
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._isSubmitted = true;
      this._handleFormSubmit(this._currentCard, this._cardId);
      this.close();
    });
  }
}
