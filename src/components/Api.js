export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(endUrl, options) {
    return fetch(`${this._baseUrl}${endUrl}`, options).then(this._checkStatus)
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
  }

  addNewCard(data) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    })
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
  }

  setUSerInfo(data) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.heading,
        about: data.subheading,
      }),
    })
  }

  setUserAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    })
  }

  hendlerLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization,
      },
    })
  }

  deleteLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    })
  }
}
