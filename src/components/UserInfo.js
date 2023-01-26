export default class UserInfo {
  constructor(userName, userDescription, userAvatar) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
  }

  setUserInfo( { name, about, avatar, _id } ) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar;
    this._id = _id;
  }
}
