import { pool } from "../infra/config/db.js";

export const findRolByNombre = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM roles WHERE nombre = ?", [nombre]);
    return rows;
};