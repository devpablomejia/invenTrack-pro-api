import { pool } from "../infra/config/db.js";

export const saveUsuario = async (nombre, email, password, rolId) => {
    const [result] = await pool.query(
        "INSERT INTO usuarios (nombre, email, password, role_id) VALUES (?, ?, ?, ?)",
        [nombre, email, password, rolId]
    );
    return result;
};

export const updateUsuario = async (nombre, email, password, rolId, id) => {
    const [result] = await pool.query(
        "UPDATE usuarios SET nombre = IFNULL (?, nombre), email = IFNULL (?, email), password = IFNULL (?, password), role_id = IFNULL (?, role_id) WHERE id = ? )",
        [nombre, email, password, rolId, id]
    );
    return result;
};

export const findUsuarioById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows;
};

export const findUsuarioByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows;
};

export const existUsuarioByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows > 0) {
        return true;
    }
    return false;
};

export const loadUsuarioByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT u.id, u.email, u.password, r.nombre FROM usuarios u INNER JOIN roles r ON r.id = u.role_id WHERE u.email = ?",
        [email]
    );
    return rows;
};