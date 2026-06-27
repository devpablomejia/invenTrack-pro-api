import * as productosRepository from "../repositories/productosRepository.js";

export const getPageProductos = async (page, limit) => {
    return await productosRepository.findPageProductos(page, limit);
};