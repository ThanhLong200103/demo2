const AppError = require("../utils/AppError");

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email) {
    errors.email = "Email không được để trống";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Email không đúng định dạng";
    }
  }

  if (!password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (Object.keys(errors).length > 0) {
    const error = new AppError("Dữ liệu nhập vào không hợp lệ", 422);
    error.fields = errors;
    return next(error);
  }

  next();
};


const registerMiddleware = async (req, res, next) => {
  const { email, password , name ,phone} = req.body;
  const errors = {};
  if (!email) {
    errors.email = "Email không được để trống";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
    if (!emailRegex.test(email)) {
      errors.email = "Email không đúng định dạng";
    }
  }

  if (!password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (!name) {
    errors.name = "Tên không được để trống";
  }

  if (!phone) {
    errors.phone = "Số điện thoại không được để trống";
  }

  if (Object.keys(errors).length > 0) {
    const error = new AppError("Dữ liệu nhập vào không hợp lệ", 422);
    error.fields = errors;
    return next(error);
  }

  next();
};

module.exports = { loginMiddleware, registerMiddleware };