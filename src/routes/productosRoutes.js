import { Router } from "express";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/productos", verifyToken, authorizeRoles('ADMIN'), (req, res) => {
    res.send("PRODUCTOS AQUI XD");
});

export default router;