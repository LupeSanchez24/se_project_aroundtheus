import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._buttonElement = this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  modalLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Saving...";
    } else {
      this._buttonElement.textContent = "Save";
    }
  }
}
