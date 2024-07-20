import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._deleteConfirm = this._popupElement.querySelector(
      ".card__delete-button"
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  confirmDelete(apiCheck) {
    this._handleFormSubmit = apiCheck;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
