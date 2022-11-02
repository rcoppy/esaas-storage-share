export default class ListingModel {
    constructor({
        id = 0,
        userId = 0,
        title = "Default title",
        description = "Default description",
        price = "100.00",
        address = "34 Wallaby Rd",
        city = "Topeka",
        state = "Kansas",
        zipCode = 021123,
        squareFeet = 70,
        createdAt = "00-00-00",
        updatedAt = "00-00-00",
    } = {}) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.squareFeet = squareFeet;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}