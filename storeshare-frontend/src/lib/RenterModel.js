export default class RenterModel {
    constructor({createdAt, updatedAt, id, userId} = {}) {
        this.userId = userId; 
        this.id = id;
        this.createdAt = createdAt; 
        this.updatedAt = updatedAt;
    }
}