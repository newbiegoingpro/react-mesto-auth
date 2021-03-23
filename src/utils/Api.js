export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }

  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: data
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: data
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      }
      )
  }

  updateUserPhoto(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: data
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }

  removeCard(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
      method: (isLiked ? 'PUT' : 'DELETE'),
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }

  removeLike(_id) {
    return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`err : ${res.status}`)
      })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "5eba1b30-a022-4f10-bfa8-56b458d9d188"
  }
});

export default api