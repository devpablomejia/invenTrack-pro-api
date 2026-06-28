import { Router } from "express";
import { registrarHistorialMovimiento, getPageMovimientos } from "../controllers/historialController.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import { createValidationMiddleware } from "../middlewares/createValidationMiddleware.js";
import { historialSchema } from "../utils/schemas/historialShemas.js";
import { paginationQuerySchema } from "../utils/schemas/paginationShemas.js";

const router = Router();

router.get("/movimientos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER', 'VIEWER'),
    createValidationMiddleware({ query: paginationQuerySchema }),
    getPageMovimientos
);
router.post("/movimientos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER'),
    createValidationMiddleware({ body: historialSchema }),
    registrarHistorialMovimiento
);

export default router;