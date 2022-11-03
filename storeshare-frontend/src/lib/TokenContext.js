import { login, logout } from "../utils/ApiCaller";

export default class TokenContext {

    constructor(loginCallback=(data)=>{}, bearer=null) {
        this.bearer = bearer; 
        this.signInMetaData = {};
        this.loginCallback = loginCallback; 
    }

    getIsLoggedIn() {
        return !(!this.bearer); 
    }

    doLogin(email, password, successCallback = () => {}) {
        login(email, password, (token, body) => {
            this.bearer = token;
            this.signInMetaData = body; 
            successCallback();
            this.loginCallback(this.signInMetaData); 
            console.log(this.bearer);
            console.log(this.signInMetaData);
        }); 
    }

    doLogout() {
        this.bearer = null; 
        logout(); 
    }
}