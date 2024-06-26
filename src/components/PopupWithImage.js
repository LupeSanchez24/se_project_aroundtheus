import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".modal__image_preview"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__title_preview"
    );
  }

  open(name, link) {
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    this._previewImage.src = link;
    super.open();
  }
}
