import * as productosService from "../services/productosService.js";
import { errorReturn } from "../infra/errors/errorReturn.js";

export const getPageProductos = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const { productos, totalItems, totalPages } = await productosService.getPageProductos(page, limit);
        return res.status(200).json({
            status: "success",
            data: productos,
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