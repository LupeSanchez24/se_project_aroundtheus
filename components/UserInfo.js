export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(cardData) {
    this._profileTitle.textContent = cardData.title;
    this._profileDescription.textContent = cardData.description;
  }
}
