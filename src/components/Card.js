export default class Card {
  constructor(
    { name, link, id },
    cardSelector,
    handleImageClick,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = id;
    this._handleDeleteCard = handleDeleteCard;

    //this.isLiked = isliked;
  }

  _setEventListeners() {
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
        this._handleDeleteCard(this._id);
      });

    //.handleImageClick

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
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

  removeCard() {
    console.log("Card removed from the DOM");
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    return this._id;
  }
}
