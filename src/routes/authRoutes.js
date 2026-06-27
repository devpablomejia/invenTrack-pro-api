import { Router } from "express";
import { registrarUsuario, autenticarUsuario } from "../controllers/authController.js";

const router = Router();

router.post("/auth/registro", registrarUsuario);
router.post("/auth/autenticar", autenticarUsuario);

export default router;