export class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    addNewCard(name, link) {
        return this._send('cards', 'POST', { name: name, link: link });
    }

    getCards() {
        return this._send('cards');
    }

    getUserInfo() {
        return this._send('users/me');
    }

    editProfile(obj) {
        return this._send('users/me', 'PATCH', obj);
    }

    requestDeleteCard(cardId) {
        return this._send(`cards/${cardId}`, 'DELETE');
    }

    requestLikeAction(like, cardId) {
        return this._send(`cards/${cardId}/likes`, like ? 'DELETE' : 'PUT');
    }

    editAvatar(link) {
        return this._send('users/me/avatar', 'PATCH', { avatar: link });
    }

    login(body) {
        return this._send('signin', 'POST', body);
    }

    register(body) {
        return this._send('signup', 'POST', body);
    }

    _send(path, method, body, headers) {
        const options = {
            method: method ? method : "GET",
            credentials: 'include'
        };
        if (body) {
            options.headers = {}
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        };
        if (headers) {
            options.headers = options.headers || {}
            for (const key in headers) {
                options.headers[key] = headers[key];
            };
        };
        return fetch(`${this._baseUrl}/${path}`, options)
            .then(res => res.ok ? res.json() : Promise.reject(res))
    }
};

export const api = new Api({
    baseUrl: 'https://api.buanva.students.nomoredomains.rocks'
});
