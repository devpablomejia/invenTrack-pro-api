export class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
};

export class EmailAlreadyRegisteredError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
};

export class BadCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
};

export class UnauthorizeError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}; 