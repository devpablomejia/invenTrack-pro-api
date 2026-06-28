import joi from "joi";

export const historialSchema = {
    producto: joi.string()
        .required()
        .messages({
            'any.required': 'El producto es obligatorio.',
            'string.empty': 'El producto no puede estar vacío.'
        }),
    tipo: joi.string()
        .min(3)
        .required()
        .messages({
            'any.required': 'El tipo es obligatorio.',
            'string.empty': 'El tipo no puede estar vacío.',
            'string.min': 'El tipo debe tener al menos {#limit} caracteres.'
        }),
    cantidad: joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'any.required': 'La cantiadad es obligatoria.',
            'number.base': 'La cantidad debe ser un número válido.',
            'number.integer': 'La cantidad debe ser un número entero.',
            'number.min': 'La cantidad no puede ser un número negativo.'
        }),
    motivo: joi.string()
        .required()
        .messages({
            'any.required': 'El motivo es obligatorio.',
            'string.empty': 'El motivo no puede ir vacío.'
        }),
};