import joi from "joi";


export const usuarioIdShema = {
    usuarioId: joi.number().required().messages({
        'any.required': 'El id del usuario es obligatorio'
    })
};

export const createUsuarioShema = {
    nombre: joi.string().required().required().messages({
        'any.required': 'El nombre es obligatorio.',
        'string.empty': 'El nombre no puede ir vacío.',
    }),
    email: joi.string().max(100).required().messages({
        'any.required': 'El email es obligatorio.',
        'string.empty': 'El email no puede ir vacío.',
        'string.max': 'El email no puede superar los {#limit} caracteres.'
    }),
    password: joi.string().min(8).required().messages({
        'any.required': 'La contraseña es obligatoria.',
        'string.empty': 'La contraseña no puede ir vacía.',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
        'string.max': 'La contraseña no puede superar los {#limit} caracteres.'
    }),
    rol: joi.string().required().messages({
        'any.required': 'El rol es obligatorio.',
        'string.empty': 'El rol no puede ir vacío.',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
        'string.max': 'El nombre no puede superar los {#limit} caracteres.'
    }),
};

export const authenticateUsuarioShema = {
    email: joi.string().max(100).required().messages({
        'any.required': 'El email es obligatorio.',
        'string.empty': 'El email no puede ir vacío.',
        'string.max': 'El email no puede superar los {#limit} caracteres.'
    }),
    password: joi.string().min(8).required().messages({
        'any.required': 'La contraseña es obligatoria.',
        'string.empty': 'La contraseña no puede ir vacía.',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
        'string.max': 'La contraseña no puede superar los {#limit} caracteres.'
    }),
};