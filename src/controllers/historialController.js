import * as historialService from "../services/historialService.js";
import { errorReturn } from "../infra/errors/errorReturn.js";

export const registrarHistorialMovimiento = async (req, res) => {
    try {
        const { id } = req.user;
        const { producto, tipo, cantidad, motivo } = req.body;
        const [insertResult, updateResult] = await historialService.registrarHistorialMovimiento(producto, id, tipo, cantidad, motivo);
        return res.status(201).json({
            status: "success",
            message: "Movimiento registrado con éxito",
            data: {
                historialId: insertResult.insertId
            }
        });
    } catch (error) {
        return errorReturn(error, res);
    }
};