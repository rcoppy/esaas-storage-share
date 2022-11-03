export default class SubletterModel {
    constructor({createdAt, updatedAt, id} = {}) {
        this.id = id;
        this.createdAt = createdAt; 
        this.updatedAt = updatedAt;
    }
}