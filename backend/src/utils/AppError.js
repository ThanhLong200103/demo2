class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Đánh dấu đây là lỗi do logic mình kiểm soát
    }
}
module.exports = AppError;