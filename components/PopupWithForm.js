import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

// to insitatate a class you would do this in index.js
const newCardPopup = new PopupWithForm("#profile-add-modal", () => {});
newCardPopup.open();

newCardPopup.close();
