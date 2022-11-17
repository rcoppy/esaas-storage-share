import { v4 as uuidv4 } from 'uuid';

export default class UserProfileModel {
    constructor({firstName="Dave", lastName="Danielson", email="dave@dave.com", 
                createdAt, updatedAt, id, renterData, subletterData} = {}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id; 

        this.createdAt = createdAt; 
        this.updatedAt = updatedAt;

        this.contactInfo = {
            email: email,
            phone: "(203) 755-4321",
        };

        this.renterData = renterData; 
        this.subletterData = subletterData; 
    }
}

export const MockUsers = [
    new UserProfileModel({ firstName: "Jane" }),
    new UserProfileModel({ firstName: "Akash" }),
    new UserProfileModel({ firstName: "Henderson" }),
    new UserProfileModel({ firstName: "Jacob" }),
    new UserProfileModel({ firstName: "Jeffrey" }),
    new UserProfileModel({ firstName: "Palmer" }),
    new UserProfileModel({ firstName: "Genevieve" }),
]