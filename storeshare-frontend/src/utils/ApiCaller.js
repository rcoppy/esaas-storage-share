import axios from 'axios';

// const defaultHost = 'http://localhost:8080';

const defaultHost = 'https://floating-plateau-15656.herokuapp.com:443'; // 'http://localhost:8080';


const saveAuthData = (token, email, expirationDate) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email); 
    // TODO 
    //     localStorage.setItem('expiration',expirationDate.toISOString());  
}

const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expiration");
}

const getAuthData = () => {
    return {
        token: localStorage.getItem("token"),
        expiration: localStorage.getItem("expiration"),
        email: localStorage.getItem("email"),
    }
}

export function logout() {
    clearAuthData();
}

export function tryLoginWithStoredToken(successCallback = () => {}, errorCallback = () => {}) {
    const storedAuthData = getAuthData(); 

    if (!storedAuthData.token || !storedAuthData.email) return null; 

    fetchUserDataFromEmail(storedAuthData.token, storedAuthData.email, successCallback, errorCallback); 

    return storedAuthData; 
}

export function fetchUserDataFromEmail(token, email, successCallback = (body) => {}, errorCallback = (error) => {}, host=defaultHost) {
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

export function login(email, password, successCallback = (tokenSetter, bodySetter) => {}, errorCallback = (status) => {}) {
    fetchBearerToken(email, password, (body) =>
        successCallback(getAuthData().token, body), errorCallback
    );
}

export function fetchBearerToken(email, password, successCallback = (body) => {}, errorCallback = (status) => {}, host = defaultHost) {
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