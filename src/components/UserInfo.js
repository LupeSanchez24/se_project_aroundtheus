export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatar }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }

  updateProfileImage(avatar) {
    this._avatar.src = avatar;
  }
}
