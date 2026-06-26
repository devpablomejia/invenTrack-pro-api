export class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}