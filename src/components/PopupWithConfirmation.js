import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super({ popupSelector });
    /*this._deletebutton = this._popupElement.querySelector(
      ".card__delete-button"
    );*/
    this._deleteform = this._popupElement.querySelector("#modal-delete-card");
    this._handleFormSubmit = handleFormSubmit;
  }

  confirmDelete(apiCheck) {
    this._handleFormSubmit = apiCheck;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".modal__button_delete")
      .addEventListener("submit", () => {
        this._handleFormSubmit();
      });
  }
}
