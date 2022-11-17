export default class ListingModel {
    constructor({
        id = 0,
        subletterId = 0,
        title = "Default title",
        description = "Default description",
        price = "100.00",
        address = "34 Wallaby Rd",
        city = "Topeka",
        state = "Kansas",
        zipCode = '02112',
        squareFeet = 70,
        createdAt = "00-00-00",
        updatedAt = "00-00-00",
    } = {}) {
        this.id = id;
        this.subletterId = subletterId;
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