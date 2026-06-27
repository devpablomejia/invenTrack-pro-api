import * as productosService from "../services/productosService.js";
import { errorReturn } from "../infra/errors/errorReturn.js";

export const getPageProductos = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const { productos, totalItems, totalPages } = await productosService.getPageProductos(page, limit);
        return res.status(200).json({
            status: "success",
            data: productos,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: totalItems,
                totalPages: totalPages
            }
        });
    } catch (error) {
        errorReturn(error, res);
    }
};

export const createProducto = async (req, res) => {
    try {
        const { sku, nombre, descripcion, precio, stockActual, categoria } = req.body;
        const nuevoProducto = await productosService.createProducto(sku, nombre, descripcion, precio, stockActual, categoria);
        return res.status(201).json({
            status: 'success',
            message: 'Producto creado exitosamente',
            data: { id: nuevoProducto.insertId, sku, nombre, descripcion, precio, stockActual, categoria }
        });
    } catch (error) {
        errorReturn(error, res);
    }
}