import * as usuarioService from '../services/usuarioService.js';

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const nuevoUsuario = await usuarioService.createUsuario(nombre, email, password, rol);

        return res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente',
            data: { id: nuevoUsuario.insertId, nombre, email, rol }
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.statusCode ? error.message : 'Error interno del servidor';

        if (statusCode === 500) {
            console.error('Error no controlado:', error);
        }

        return res.status(statusCode).json({
            status: 'error',
            message: message
        });
    }
};