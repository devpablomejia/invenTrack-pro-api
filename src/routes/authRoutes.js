import { Router } from "express";
import { createValidationMiddleware } from "../middlewares/createValidationMiddleware.js"
import { createUsuarioShema, authenticateUsuarioShema } from "../utils/schemas/usuariosShemas.js";
import { registrarUsuario, autenticarUsuario } from "../controllers/authController.js";

const router = Router();

router.post("/auth/registro",
    createValidationMiddleware({ body: createUsuarioShema }),
    registrarUsuario
);
router.post("/auth/autenticar",
    createValidationMiddleware({ body: authenticateUsuarioShema }),
    autenticarUsuario);

export default router;