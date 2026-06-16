const AppError = require('../../utils/AppError');
const { verifyToken } = require('../../utils/jwt');

const socketAuth = (socket, req, next) => {

    try {
        const urlParams = new URL(req.url, `http://${req.headers.host}`);
        const token = urlParams.searchParams.get('token');

        if (!token) {
            return next(new AppError('Authentication error: Token missing'),401);
        }

        // Xác thực token bằng chìa khóa bí mật của bạn
        const decoded = verifyToken(token);
        
        // Gắn thông tin User đã giải mã vào đối tượng ws để dùng sau này
        socket.user = decoded; 
        
        next(); // Hợp lệ, cho phép đi tiếp
    } catch (err) {
        next(new AppError('Authentication error: Invalid token'),401);
    }
}

module.exports = {
    socketAuth,
};