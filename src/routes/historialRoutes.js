import { Router } from "express";
import { registrarHistorialMovimiento } from "../controllers/historialController.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import { createValidationMiddleware } from "../middlewares/createValidationMiddleware.js";
import { historialSchema } from "../utils/schemas/historialShemas.js";
import { paginationQuerySchema } from "../utils/schemas/paginationShemas.js";

const router = Router();

router.post("/movimientos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER'),
    createValidationMiddleware({ body: historialSchema }),
    registrarHistorialMovimiento
);

export default router;