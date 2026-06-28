import { pool } from "../infra/config/db.js";

export const findTipoByNombre = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM tipo_movimiento WHERE nombre = ?", [nombre]);
    return rows;
};