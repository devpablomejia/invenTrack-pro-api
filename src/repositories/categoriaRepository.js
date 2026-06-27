import { pool } from "../infra/config/db.js";

export const findCategoriaByNombre = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM categorias WHERE nombre = ?", [nombre]);
    return rows;
};