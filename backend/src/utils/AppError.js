// utils/AppError.js
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Đánh dấu đây là lỗi do logic nghiệp vụ (không phải lỗi crash hệ thống)

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;