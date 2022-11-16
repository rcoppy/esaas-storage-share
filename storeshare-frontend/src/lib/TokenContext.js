import { login, logout, tryLoginWithStoredToken, postListing } from "../utils/ApiCaller";

export default class TokenContext {

    constructor(loginCallback=(data)=>{}, logoutCallback=()=>{}, bearer=null) {
        this.bearer = bearer; 
        this.signInMetaData = {};
        this.loginCallback = loginCallback; 
        this.logoutCallback = logoutCallback; 
    }

    getIsLoggedIn() {
        return !(!this.bearer); 
    }

    doLogin(email, password, successCallback = () => {}, errorCallback = (status) => {}) {
        login(email, password, (token, body, status) => {
            this.bearer = token;
            this.signInMetaData = body; 
            successCallback();
            this.loginCallback(this.signInMetaData); 
            console.log(this.bearer);
            console.log(this.signInMetaData);
        }, errorCallback); 
    }

    doLogout() {
        this.bearer = null; 
        logout(); 
        this.logoutCallback(); 
    }

    doCreateListing(listingData, successCallback = () => {}, errorCallback = (status) => {}) {
        postListing(this.bearer, listingData, successCallback, errorCallback); 
    }

    tryAutoLogin(successCallback = () => {}) {
        const storedCredentials = tryLoginWithStoredToken((body) => {
            this.signInMetaData = body; 
            successCallback(); 
            this.loginCallback(body); 
        }, () => this.doLogout());

        if (storedCredentials) this.bearer = storedCredentials.token; 
    }

    
}