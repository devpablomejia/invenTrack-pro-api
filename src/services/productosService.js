import * as productosRepository from "../repositories/productosRepository.js";
import { findCategoriaByNombre } from "../repositories/categoriaRepository.js";

export const getPageProductos = async (page, limit) => {
    return await productosRepository.findPageProductos(page, limit);
};

export const createProducto = async (sku, nombre, descripcion, precio, stockActual, categoria) => {
    const catgResult = await findCategoriaByNombre(categoria);
    if (!catgResult || catgResult.length === 0 || !catgResult[0].id) {
        throw new ResourceNotFoundError('La categoria especificada no existe en el sistema');
    }
    const categoriaId = catgResult[0].id;
    return await productosRepository.saveProducto(sku, nombre, descripcion, precio, stockActual, categoriaId);
}; 