import * as bycript from '../infra/security/bycript.js';
import * as usuarioRepository from '../repositories/usuarioRepository.js';
import { findRolByNombre } from '../repositories/rolRepository.js';
import { EmailAlreadyRegisteredError, ResourceNotFoundError, UnauthorizeError } from '../infra/Errors/CustomErrors.js';
import * as jwtService from '../infra/security/jwt.js';

export const createUsuario = async (nombre, email, password, rol) => {
    const isExistUsuario = await usuarioRepository.existUsuarioByEmail(email);
    if (isExistUsuario) {
        throw new EmailAlreadyRegisteredError('El email ya esta registrado');
    };
    const rolId = await extractRol(rol);
    const hashedPassword = await bycript.encodePassword(password);
    return await usuarioRepository.saveUsuario(nombre, email, hashedPassword, rolId);
};

export const authenticateUsuario = async (email, password) => {
    const usuario = await usuarioRepository.loadUsuarioByEmail(email);
    const isMatch = await bycript.isMatch(password, usuario[0].password);
    if (usuario === 0 || !usuario || !usuario[0].id) {
        throw new UnauthorizeError('El email no esta registrado');
    };
    if (!isMatch) {
        throw new UnauthorizeError('La contraseña es incorrecta');
    };
    const tokenGenerated = jwtService.generateToken(usuario[0]);
    return tokenGenerated;
}

const extractRol = async (rol) => {
    const roleResult = await findRolByNombre(rol);
    if (!roleResult || roleResult.length === 0 || !roleResult[0].id) {
        throw new ResourceNotFoundError('El rol especificado no existe en el sistema');
    }

    return roleResult[0].id;
};