import { pool } from "../infra/config/db.js";
import { ResourceNotFoundError } from "../infra/errors/CustomErrors.js"

export const saveMovimientoStock = async (productoId, usuarioId, tipoId, cantidad, motivo) => {
    const connection = await pool.getConnection();
    try {
        await connection.query("START TRANSACTION");
        const historialQuery = `
            INSERT INTO historial_movimiento (producto_id, usuario_id, tipo_movimiento_id, cantidad, motivo) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [insertResult] = await connection.query(historialQuery, [productoId, usuarioId, tipoId, cantidad, motivo])
        const factor = tipoId === 1 ? cantidad : cantidad * -1;
        const updateProductoQuery = `
            UPDATE productos 
            SET stock_actual = stock_actual + ? 
            WHERE id = ? 
        `;
        const [updateResult] = await connection.query(updateProductoQuery, [factor, productoId]);
        if (updateResult.affectedRows === 0) {
            throw new ResourceNotFoundError('El producto especificado no existe en el inventario');
        }
        await connection.query("COMMIT");
        return [insertResult, updateResult];
    } catch (error) {
        console.error("Error detectado. Aplicando ROLLBACK para proteger los datos:", error.message)
        await connection.query("ROLLBACK");
        throw error;
    } finally {
        connection.release();
    }
};