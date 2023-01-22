export default class UserInfo {
  constructor(userName, userDescription, userAvatar) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName,
      description: this._userDescription,
      avatar: this._userAvatar
    }
  }

  setUserInfo(data) {
    this._userName = data.name;
    this._userDescription = data.about;
  }

  setAvatar(data) {
    this._userAvatar = data;
  }
}
