import joi from "joi";


export const productoIdShema = {
    productoId: joi.number().required().messages({
        'any.required': 'El id del usuario es obligatorio'
    })
};

export const createProductoSchema = {
    sku: joi.string()
        .required()
        .messages({
            'any.required': 'El campo SKU es obligatorio.',
            'string.empty': 'El SKU no puede estar vacío.'
        }),
    nombre: joi.string()
        .min(3)
        .required()
        .messages({
            'any.required': 'El nombre del producto es obligatorio.',
            'string.empty': 'El nombre no puede estar vacío.',
            'string.min': 'El nombre debe tener al menos {#limit} caracteres.'
        }),
    descripcion: joi.string()
        .required()
        .messages({
            'any.required': 'La descripción es obligatoria.',
            'string.empty': 'La descripción no puede ir vacía.'
        }),
    precio: joi.number()
        .positive()
        .required()
        .messages({
            'any.required': 'El precio es obligatorio.',
            'number.base': 'El precio debe ser un número válido.',
            'number.positive': 'El precio debe ser un número mayor a cero.'
        }),
    stockActual: joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'any.required': 'El stock actual es obligatorio.',
            'number.base': 'El stock debe ser un número válido.',
            'number.integer': 'El stock debe ser un número entero.',
            'number.min': 'El stock no puede ser un número negativo.'
        }),
    categoria: joi.string()
        .required()
        .messages({
            'any.required': 'La categoría es obligatoria.',
            'string.empty': 'La categoría no puede ir vacía.'
        })
};