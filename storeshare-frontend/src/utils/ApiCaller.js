import axios from 'axios';

// const defaultHost = 'http://localhost:8080';

const defaultHost = window.location.hostname === 'localhost' ?
    'http://localhost:8080' : 'https://floating-plateau-15656.herokuapp.com:443'; // 'http://localhost:8080';


// a really primitive psuedo-dependency injection
class StorageWrapper {
    constructor() {
        this.store = new Map();
    }

    getItem(key) {
        let val = null;
        try {
            console.log("trying to get " + key);
            val = window.localStorage.getItem(key);
            console.log("retrieved value " + val);
        } catch {
            val = this.store[key];
        }
        return val;
    }

    setItem(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            this.store[key] = value;
        }
    }

    removeItem(key) {
        try {
            window.localStorage.removeItem(key);
        } catch {
            this.store.delete(key);
        }
    }
}

const storage = new StorageWrapper();

const saveAuthData = (token, email, expirationDate) => {

    storage.setItem('token', token);
    storage.setItem('email', email);
    // TODO 
    //     storage.setItem('expiration',expirationDate.toISOString());  
}

const clearAuthData = () => {
    console.log("clearing data");
    storage.removeItem("token");
    storage.removeItem("email");
    storage.removeItem("expiration");
}

const getAuthData = () => {

    return {
        token: storage.getItem("token"),
        expiration: storage.getItem("expiration"),
        email: storage.getItem("email"),
    }
}

export function logout() {
    clearAuthData();
}

export function tryLoginWithStoredToken(successCallback = () => { }, errorCallback = () => { }) {
    const storedAuthData = getAuthData();

    if (!storedAuthData.token || !storedAuthData.email) return null;

    fetchUserDataFromEmail(storedAuthData.token, storedAuthData.email, successCallback, errorCallback);

    return storedAuthData;
}

export function fetchUserDataFromEmail(token, email, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.post(host + '/users/email', {
        user: {
            email: email,
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);

            errorCallback();
        });
}

export function login(email, password, successCallback = (tokenSetter, bodySetter) => { }, errorCallback = (status) => { }) {
    fetchBearerToken(email, password,
        (body) => successCallback(getAuthData().token, body),
        errorCallback
    );
}

export function fetchBearerToken(email, password, successCallback = (body) => { }, errorCallback = (status) => { }, host = defaultHost) {
    axios.post(host + '/users/sign_in', {
        user: {
            email: email,
            password: password
        }
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            console.log(response);
            console.log("success; raw auth token: " + response.headers.authorization);

            saveAuthData(response.headers.authorization, email, null);
            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error.response.status);
            errorCallback(error.response.status);
        });
}

export function registerAccount(email, password, name, successCallback = () => { }, host = defaultHost) {
    axios.post(host + '/users', {
        user: {
            email: email,
            password: password,
            name: name
        }
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            console.log(response);

            saveAuthData(response.headers.authorization, email, null);
            successCallback();
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function registerNewSubletter(token, userId, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.post(host + '/subletters', {
        subletter: {
            user_id: userId,
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);
            console.log("userId: " + userId);
            errorCallback();
        });
}

export function getAllListings(token, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.get(host + '/listings', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);

            errorCallback();
        });
}

export function getUserById(id, token, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.get(host + `/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);

            errorCallback();
        });
}

export function getSubletterById(id, token, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.get(host + `/subletters/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);

            errorCallback();
        });
}

export function getListingById(id, token, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.get(host + `/listings/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);

            errorCallback();
        });
}

export function postListing(token, listingData, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
    axios.post(host + '/listings', {
        listing: listingData
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(function (response) {
            console.log(response);

            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);

            errorCallback();
        });
}