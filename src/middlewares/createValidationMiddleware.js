import { validate } from '../utils/validate.js';
import { errorReturn } from '../infra/errors/errorReturn.js';

export const createValidationMiddleware = (validationSchema) => {
    const [[payloadKey, joiSchema]] = Object.entries(validationSchema);
    if (payloadKey !== "body" && payloadKey !== "query" && payloadKey !== "params") {
        throw new Error("Invalid payload key. Must be 'body', 'query' or 'params'");
    }
    return function validationMiddleware(req, res, next) {
        const error = validate(joiSchema, req[payloadKey]);
        if (error) {
            error.statusCode = 400;
            return errorReturn(error, res);
        }
        next();
    };
};