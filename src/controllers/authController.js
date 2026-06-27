import * as usuarioService from '../services/usuarioService.js';
import { errorReturn } from "../infra/errors/errorReturn.js";

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
        errorReturn(error, res);
    }
};

export const autenticarUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const tokenGenerated = await usuarioService.authenticateUsuario(email, password);

        return res.status(200).json({
            status: 'success',
            message: 'Usuario autenticado Exitosamente',
            token: `Bearer ${tokenGenerated}`
        });
    } catch (error) {
        errorReturn(error, res);
    }
};