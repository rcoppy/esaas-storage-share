export default class ContractModel {
    constructor({
        id = 0,
        startDate = 'a date', 
        endDate = 'another date', 
        price = 17,
        renterId = 1, 
        subletterId = 1, 
        listingId = 1
    } = {}) {
        this.id = id;
        this.startDate = startDate; 
        this.endDate = endDate; 
        this.price = price; 
        this.renterId = renterId; 
        this.subletterId = subletterId; 
        this.listingId = listingId; 
    }
}