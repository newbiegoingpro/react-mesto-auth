
export class Auth {

    constructor(options) {
        this.baseUrl = options.baseUrl;

    }

    onLogin({ email, password }) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`err : ${res.status}`)
        })
    }

    onRegister({ email, password }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((res) => {
            if (res.ok) {
                return res.json();

            }
            return Promise.reject(`err : ${res.status}`)
        })
    }

    tokenCheck(token) {
        
           return fetch(`${this.baseUrl}/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`err : ${res.status}`)
            })
        
    }
}



const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',

});
export default auth;