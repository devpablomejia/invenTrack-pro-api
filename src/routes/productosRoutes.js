import { Router } from "express";
import { getPageProductos, createProducto } from "../controllers/productosController.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import { createValidationMiddleware } from "../middlewares/createValidationMiddleware.js";
import { createProductoShema } from "../utils/schemas/productosSchemas.js";
import { paginationQuerySchema } from "../utils/schemas/paginationShemas.js";

const router = Router();

router.get("/productos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER', 'VIEWER'),
    createValidationMiddleware({ query: paginationQuerySchema }),
    getPageProductos
);
router.post("/productos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER'),
    createValidationMiddleware({ body: createProductoShema }),
    createProducto);

export default router;