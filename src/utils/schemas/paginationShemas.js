import joi from "joi";

export const paginationQuerySchema = {
    page: joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'La página debe ser un número.',
            'number.integer': 'La página debe ser un número entero.',
            'number.min': 'La página mínima permitida es {#limit}.'
        }),
    limit: joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10)
        .messages({
            'number.base': 'El límite debe ser un número.',
            'number.integer': 'El límite debe ser un número entero.',
            'number.min': 'El límite mínimo permitido es {#limit}.',
            'number.max': 'No puedes solicitar más de {#limit} productos por página.'
        })

};