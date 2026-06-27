import { Router } from "express";
import { getPageProductos } from "../controllers/productosController.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/productos", verifyToken, authorizeRoles('ADMIN', 'MANAGER', 'VIEWER'), getPageProductos);

export default router;