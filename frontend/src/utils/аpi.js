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
    
    postNewCard(item) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(item)
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
    
    addLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }
    
    removeLike(cardId) {
        console.log(cardId)
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    }

    changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: this.headers,
        })
        .then((res) => this._getResponseData(res))
    } else {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
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
        return Promise.reject(new Error(`Ошибка: ${res.status}`)) 
    }

}



const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
    headers: {
        authorization: '9a81d1c5-933e-4e22-94e1-436b8f8accda',
        'Content-Type': 'application/json'
    }
})

export default api
