class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl
        this.headers = options.headers
    }

    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }
    
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }

    
    sendUserInfo(item) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                about: item.about,
            }),
        })
        .then((res) => this._getResponseData(res))
    }
    
    sendUserAvatar(item) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
            avatar: item.avatar,
            }),
        })
        .then((res) => this._getResponseData(res))
    }
    
    postNewCard(cardName, cardLink) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink,
              })
        })
        .then((res) => this._getResponseData(res))
    }
    
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }
    
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }
    
    dislikeCard(cardId) {
        console.log(cardId)
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }

    changeLikeCardStatus(cardId, isLiked) {
        console.log(cardId)
    if (isLiked) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    } else {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }}

    /* выводим ошибку */
    _getResponseData(res) { 
        if (res.ok) { 
        return res.json() 
        } 
        return Promise.reject(`Ошибка: ${res.status}`)
    }

}

const api = new Api({
    baseUrl: "https://api.dmitryrag.students.nomoredomains.icu",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
})

export default api
