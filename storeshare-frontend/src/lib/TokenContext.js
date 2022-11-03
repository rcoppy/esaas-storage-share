import { login, logout } from "../utils/ApiCaller";

export default class TokenContext {

    constructor(bearer=null) {
        this.bearer = bearer; 
    }

    getIsLoggedIn() {
        return !(!this.bearer); 
    }

    doLogin(email, password, successCallback = () => {}) {
        login(email, password, (token) => {
            this.bearer = token;
            successCallback();
        }); 
    }

    doLogout() {
        this.bearer = null; 
        logout(); 
    }
}