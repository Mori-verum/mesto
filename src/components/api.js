export default class Api {
  constructor(config, popup) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._popup = popup;
  }

  _returnJson(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject("Ошибка: " + res.status);
  }

  getDataProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(res => this._returnJson(res));
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .finally(this._popup.popupEdit.load())
    .then(res => this._returnJson(res));
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .finally(this._popup.popupEditAvatar.load())
    .then(res => this._returnJson(res));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .finally(this._popup.popupAddPost.load())
    .then(res => this._returnJson(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => this._returnJson(res));
  }

  getAllCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(res => this._returnJson(res));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(res => this._returnJson(res));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => this._returnJson(res));
  }
}
