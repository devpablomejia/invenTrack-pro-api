import { Router } from "express";
import { registrarUsuario } from "../controllers/authController.js";

const router = Router();

router.post("/auth/registro", registrarUsuario);

export default router;