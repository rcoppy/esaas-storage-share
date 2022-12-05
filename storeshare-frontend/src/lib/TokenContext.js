import { getUserById, login, logout, tryLoginWithStoredToken, postListing, registerNewSubletter, getAllListings, getListingById, getSubletterById } from "../utils/ApiCaller";
import SubletterModel from "./SubletterModel";
import UserProfileModel from "./UserProfileModel.mjs";

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

    doGetSubletterRecord(id, successCallback = (data) => {}, errorCallback = (status) => {}) {
        getSubletterById(id, this.bearer, (record) => {
            const subletter = new SubletterModel({
                userId: record.user_id, 
                id: record.id,
                createdAt: record.created_at, 
                updatedAt: record.updated_at, 
            });

            getUserById(subletter.userId, this.bearer, (item) => {
                const data = item.user; 
                const user = new UserProfileModel({
                    firstName: data.name,
                    lastName: data.name,
                    id: data.id, 
            
                    createdAt: data.created_at, 
                    updatedAt: data.updated_at,
            
                    contactInfo: {
                        email: data.email,
                        phone: data.phone_number,
                    },
            
                    renterData: null, 
                    subletterData: subletter, 
                });

                successCallback(user); 
            }, errorCallback);
        }, errorCallback); 
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