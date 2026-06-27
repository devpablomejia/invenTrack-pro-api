import { Router } from "express";
import { getPageProductos, createProducto } from "../controllers/productosController.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/productos", verifyToken, authorizeRoles('ADMIN', 'MANAGER', 'VIEWER'), getPageProductos);
router.post("/productos", verifyToken, authorizeRoles('ADMIN', 'MANAGER'), createProducto);

export default router;