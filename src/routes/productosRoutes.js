import { Router } from "express";
import { getPageProductos, createProducto, getProductoById, updateProducto } from "../controllers/productosController.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import { createValidationMiddleware } from "../middlewares/createValidationMiddleware.js";
import { productoSchema, productoIdShema } from "../utils/schemas/productosSchemas.js";
import { paginationQuerySchema } from "../utils/schemas/paginationShemas.js";

const router = Router();

router.get("/productos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER', 'VIEWER'),
    createValidationMiddleware({ query: paginationQuerySchema }),
    getPageProductos
);
router.get("/productos/:productoId",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER', 'VIEWER'),
    createValidationMiddleware({ params: productoIdShema }),
    getProductoById
);
router.post("/productos",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER'),
    createValidationMiddleware({ body: productoSchema }),
    createProducto
);
router.patch("/productos/:productoId",
    verifyToken,
    authorizeRoles('ADMIN', 'MANAGER'),
    createValidationMiddleware({ params: productoIdShema }),
    createValidationMiddleware({ body: productoSchema }),
    updateProducto
);

export default router;