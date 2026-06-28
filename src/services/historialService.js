import * as historialRepository from "../repositories/historialRepository.js";
import { findTipoByNombre } from "../repositories/tipoMovimientoRepository.js";
import { findUsuarioById } from "../repositories/usuarioRepository.js";
import { findProductoByNombre } from "../repositories/productosRepository.js";
import { ResourceNotFoundError, UsuarioNotFoundError } from "../infra/errors/CustomErrors.js";

export const getPageMovimientos = async (page, limit) => {
    return await historialRepository.findPageMovimienrtos(page, limit);
};

export const registrarHistorialMovimiento = async (producto, usuarioId, tipo, cantidad, motivo) => {
    const productoFormatt = producto.trim();
    const tipoFormatt = tipo.trim().toUpperCase();
    const productoResult = await findProductoByNombre(productoFormatt);
    const tipoResult = await findTipoByNombre(tipoFormatt);
    const usuarioResult = await findUsuarioById(usuarioId);

    if (!tipoResult || tipoResult.length === 0 || !tipoResult[0].id) {
        throw new ResourceNotFoundError('El tipo especificado no existe en el sistema');
    }
    if (!usuarioResult || usuarioResult.length === 0 || !usuarioResult[0].id) {
        throw new ResourceNotFoundError('El usuario no existe');
    }
    if (!productoResult || productoResult.length === 0 || !productoResult[0].id) {
        throw new ResourceNotFoundError('El producto especificado no existe en el sistema');
    }

    const tipoId = tipoResult[0].id;
    const usuarioIdDb = usuarioResult[0].id;
    const productoId = productoResult[0].id;

    return await historialRepository.saveMovimientoStock(productoId, usuarioIdDb, tipoId, cantidad, motivo);
};