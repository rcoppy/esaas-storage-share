import axios from 'axios';

const defaultHost = 'http://localhost:8080';

const saveAuthData = (token, expirationDate) => {
    localStorage.setItem('token', token);
    // TODO 
    //     localStorage.setItem('expiration',expirationDate.toISOString());  
}

const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
}

const getAuthData = () => {
    return {
        token: localStorage.getItem("token"),
        expiration: localStorage.getItem("expiration")
    }
}

export function logout() {
    clearAuthData();
}

export function login(email, password, successCallback = (tokenSetter, bodySetter) => { }) {
    fetchBearerToken(email, password, (body) =>
        successCallback(getAuthData().token, body)
    );
}

export function fetchBearerToken(email, password, successCallback = (body) => { }, host = defaultHost) {
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

            saveAuthData(response.headers.authorization, null);
            successCallback(response.data);
        })
        .catch(function (error) {
            console.log(error);
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

            saveAuthData(response.headers.authorization, null);
            successCallback();
        })
        .catch(function (error) {
            console.log(error);
        });
}