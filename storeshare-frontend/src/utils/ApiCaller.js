import axios from 'axios';

const defaultHost = 'http://localhost:8080';

// const defaultHost = 'https://floating-plateau-15656.herokuapp.com:443'; // 'http://localhost:8080';



// a really primitive psuedo-dependency injection
class StorageMock {
    constructor() {
        this.store = new Map();
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key, value) {
        this.store[key] = value;
    }
}

let storage;

try {
    storage = localStorage;
} catch {
    storage = new StorageMock(); // prefer local storage, but use the mock if its not available
}

const saveAuthData = (token, email, expirationDate) => {
    storage.setItem('token', token);
    storage.setItem('email', email);
    // TODO 
    //     storage.setItem('expiration',expirationDate.toISOString());  
}

const clearAuthData = () => {
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
    fetchBearerToken(email, password, (body) =>
        successCallback(getAuthData().token, body), errorCallback
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

            saveAuthData(response.headers.authorization, response.data.email, null);
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