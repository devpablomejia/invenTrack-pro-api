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

export const getProductoById = async (req, res) => {
    try {
        const { productoId } = req.params;
        const producto = await productosService.getProductoById(productoId);
        if (producto.length === 0 || !producto) {
            res.status(404).json({ message: `El Producto con el id: ${productoId} no existe` });
        };
        res.status(200).json(producto[0]);
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
};

export const updateProducto = async (req, res) => {
    try {
        const { productoId } = req.params;
        const { sku, nombre, descripcion, precio, stockActual, categoria } = req.body;
        const producto = await productosService.updateProducto(sku, nombre, descripcion, precio, stockActual, categoria, productoId);
        if (producto.affectedRows <= 0) {
            return res.status(404).json({ message: `El Producto con el id: ${productoId} no existe` });
        }
        const productoUpd = await productosService.getProductoById(productoId);
        const data = productoUpd[0];
        return res.status(201).json({
            status: 'success',
            message: 'Producto actualizado exitosamente',
            data: { data }
        });
    } catch (error) {
        errorReturn(error, res);
    }
};