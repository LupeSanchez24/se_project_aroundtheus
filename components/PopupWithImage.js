import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = document.querySelector("#modal__image_preview");
    this._previewImageTitle = document.querySelector(".modal__title_preview");
  }

  open({ name, link }) {
    this._previewImage.alt = name;
    this._previewImageTitle.textcontext = name;
    this._previewImage.src = link;
    super.open();
  }
}
