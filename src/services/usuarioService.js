import * as bycript from '../infra/security/bycript.js';
import * as usuarioRepository from '../repositories/usuarioRepository.js';
import { findRolByNombre } from '../repositories/rolRepository.js';
import { ResourceNotFoundError } from '../infra/Errors/CustomErrors.js';

export const createUsuario = async (nombre, email, password, rol) => {
    const rolId = await extractRol(rol);
    const hashedPassword = await bycript.encodePassword(password);
    return await usuarioRepository.saveUsuario(nombre, email, hashedPassword, rolId);
};

const extractRol = async (rol) => {
    const roleResult = await findRolByNombre(rol);

    if (!roleResult || roleResult.length === 0 || !roleResult[0].id) {
        throw new ResourceNotFoundError('El rol especificado no existe en el sistema');
    }

    return roleResult[0].id;
};