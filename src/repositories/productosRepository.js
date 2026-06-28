import { pool } from "../infra/config/db.js";

export const findPageProductos = async (page = 1, limit = 10) => {
    const numPage = parseInt(page);
    const numLimit = parseInt(limit);
    const offset = (numPage - 1) * numLimit;
    const dataQuery = `
        SELECT *
        FROM productos 
        ORDER BY id DESC 
        LIMIT ? OFFSET ?
    `;
    const countQuery = `SELECT COUNT(*) AS total FROM productos`;
    const [[rowsData], [rowsCount]] = await Promise.all([
        pool.query(dataQuery, [numLimit, offset]),
        pool.query(countQuery)
    ]);

    const totalItems = rowsCount[0].total;
    const totalPages = Math.ceil(totalItems / numLimit);
    return {
        productos: rowsData,
        totalItems,
        totalPages
    };
};

export const findProductoById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM  productos WHERE id = ?", [id]);
    return rows;
};

export const findProductoByNombre = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM  productos WHERE nombre = ?", [nombre]);
    return rows;
};

export const saveProducto = async (sku, nombre, descripcion, precio, stockActual, categoriaId) => {
    const [result] = await pool.query(
        "INSERT INTO productos (sku, nombre, descripcion, precio, stock_actual, categoria_id) VALUES (?, ?, ?, ?, ?, ?) ",
        [sku, nombre, descripcion, precio, stockActual, categoriaId]
    );
    return result;
};