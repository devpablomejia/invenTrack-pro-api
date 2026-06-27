export const errorReturn = (error, res) => {
    const statusCode = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'Error interno del servidor';

    if (statusCode === 500) {
        console.error('Error no controlado:', error);
    }

    return res.status(statusCode).json({
        status: 'error',
        message: message
    });
}