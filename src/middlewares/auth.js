import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Accesso denegado. se requiere token" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalido o Expirado" });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "No autorizado. Identidad desconocida." });
        }
        if (!allowedRoles.includes(req.user.role)) {
            console.log(req.user.role)
            return res.status(403).json({
                message: `Acceso denegado. Se requiere uno de los siguientes roles: [${allowedRoles.join(', ')}]`
            });
        }
        next();
    };
};