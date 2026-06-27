import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (dataUsuario) => {
    const { id, email, role } = dataUsuario;
    const token = jwt.sign(
        { id: id, email: email, role: role },
        config.jwt_secret,
        {
            expiresIn: config.jwt_expires_in,
            algorithm: "HS256"
        },
    )
    return token;
};