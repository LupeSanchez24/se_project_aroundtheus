export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatar }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatar);
    //this._EditAvatarBtn = document.querySelector(".profile__avatar-button");
    this._AvatarSubmitBtn = document.querySelector(".modal__button_avatar");
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
