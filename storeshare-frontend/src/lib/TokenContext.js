import { login, logout, tryLoginWithStoredToken, postListing, registerNewSubletter, getAllListings, getListingById } from "../utils/ApiCaller";

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

    doLogin(email, password, successCallback = () => {}, errorCallback = (message) => {}) {
        login(email, password, (token, body) => {
            this.bearer = token;
            this.signInMetaData = body; 
            successCallback();
            this.loginCallback(this.signInMetaData); 
            console.log(this.bearer);
            console.log(this.signInMetaData);
        }, (message) => errorCallback(message)); 
    }

    doLogout() {
        this.bearer = null; 
        logout(); 
        this.logoutCallback(); 
    }

    doGetAllListings(successCallback = (data) => {}, errorCallback = (status) => {}) {
        getAllListings(this.bearer, successCallback, errorCallback); 
    }

    doGetListingById(id, successCallback = (data) => {}, errorCallback = (status) => {}) {
        getListingById(id, this.bearer, successCallback, errorCallback); 
    }

    doCreateListing(listingData, successCallback = (data) => {}, errorCallback = (status) => {}) {
        postListing(this.bearer, listingData, successCallback, errorCallback); 
    }

    doSublettingOptIn(userId, successCallback = (data) => {}, errorCallback = (status) => {}) {
        registerNewSubletter(this.bearer, userId, successCallback, errorCallback); 
    }

    tryAutoLogin(successCallback = () => {}) {
        console.log("attempting to login using stored token");
        const storedCredentials = tryLoginWithStoredToken((body) => {
            this.signInMetaData = body; 
            successCallback(); 
            this.loginCallback(body); 
        }, () => this.doLogout());

        if (storedCredentials) this.bearer = storedCredentials.token; 
    }

    
}