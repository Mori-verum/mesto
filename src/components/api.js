export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _returnJson(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject("Ошибка: " + res.status);
  }
  _request(url, options) {
    return fetch(url, options).then(this._returnJson)
  }

  getDataProfile() {
    return this._request(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    })
  }

  patchUserInfo(name, about) {
    return this._request(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  patchUserAvatar(avatar) {
    return this._request(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  addCard(name, link) {
    return this._request(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  getAllCards() {
    return this._request(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    })
  }

  addLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  deleteLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
  }
}
