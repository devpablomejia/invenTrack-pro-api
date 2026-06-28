import * as historialService from "../services/historialService.js";
import { errorReturn } from "../infra/errors/errorReturn.js";

export const getPageMovimientos = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const { movimientos, totalItems, totalPages } = await historialService.getPageMovimientos(page, limit);
        return res.status(200).json({
            status: "success",
            data: movimientos,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: totalItems,
                totalPages: totalPages
            }
        });
    } catch (error) {
        errorReturn(error, res);
    }
};

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