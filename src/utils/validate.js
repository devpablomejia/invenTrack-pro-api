import joi from "joi";

export const validate = (schema, data) => {
    const { error } = joi.object(schema).validate(data);
    return error;
};