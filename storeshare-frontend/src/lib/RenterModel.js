export default class RenterModel {
    constructor({createdAt, updatedAt, id} = {}) {
        this.id = id;
        this.createdAt = createdAt; 
        this.updatedAt = updatedAt;
    }
}