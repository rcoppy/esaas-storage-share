import axios from 'axios';

<<<<<<< HEAD
// const defaultHost = 'http://localhost:8080';
=======
const defaultHost = 'http://localhost:8080';
>>>>>>> 7b30c8069e996e847d3aa3e799fd76a65f0f9b2b

// const defaultHost = 'https://floating-plateau-15656.herokuapp.com:443'; // 'http://localhost:8080';


<<<<<<< HEAD

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
=======
const saveAuthData = (token, email, expirationDate) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email); 
>>>>>>> 7b30c8069e996e847d3aa3e799fd76a65f0f9b2b
    // TODO 
    //     storage.setItem('expiration',expirationDate.toISOString());  
}

const clearAuthData = () => {
<<<<<<< HEAD
    storage.removeItem("token");
    storage.removeItem("email");
    storage.removeItem("expiration");
=======
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expiration");
>>>>>>> 7b30c8069e996e847d3aa3e799fd76a65f0f9b2b
}

const getAuthData = () => {
    return {
<<<<<<< HEAD
        token: storage.getItem("token"),
        expiration: storage.getItem("expiration"),
        email: storage.getItem("email"),
=======
        token: localStorage.getItem("token"),
        expiration: localStorage.getItem("expiration"),
        email: localStorage.getItem("email"),
>>>>>>> 7b30c8069e996e847d3aa3e799fd76a65f0f9b2b
    }
}

export function logout() {
    clearAuthData();
}

<<<<<<< HEAD
export function tryLoginWithStoredToken(successCallback = () => { }, errorCallback = () => { }) {
    const storedAuthData = getAuthData();

    if (!storedAuthData.token || !storedAuthData.email) return null;

    fetchUserDataFromEmail(storedAuthData.token, storedAuthData.email, successCallback, errorCallback);

    return storedAuthData;
}

export function fetchUserDataFromEmail(token, email, successCallback = (body) => { }, errorCallback = (error) => { }, host = defaultHost) {
=======
export function tryLoginWithStoredToken(successCallback = () => {}, errorCallback = () => {}) {
    const storedAuthData = getAuthData(); 

    if (!storedAuthData.token || !storedAuthData.email) return null; 

    fetchUserDataFromEmail(storedAuthData.token, storedAuthData.email, successCallback, errorCallback); 

    return storedAuthData; 
}

export function fetchUserDataFromEmail(token, email, successCallback = (body) => {}, errorCallback = (error) => {}, host=defaultHost) {
>>>>>>> 7b30c8069e996e847d3aa3e799fd76a65f0f9b2b
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