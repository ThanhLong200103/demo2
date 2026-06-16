const AppError = require("../utils/AppError");

const validateProduct = (req, res, next) => {
  const { name, price, img, quantity, status } = req.body;
  const erorrs = {};
  if (!name || name.trim().length < 2) {
    erorrs.name = "Tên sản phẩm phải >= 2 ký tự";
  }

  if (price == null || isNaN(price) || price <= 0) {
    erorrs.price = "Giá phải là số > 0";
  }

  if (!img || img.trim() === "") {
    erorrs.img = "Ảnh không được để trống";
  }

  if (quantity == null || isNaN(quantity) || quantity < 0) {
    erorrs.quantity = "Số lượng phải >= 0";
  }

  if (Object.keys(erorrs).length > 0) {
  const erorr = new AppError("Dữ liệu không hợp lệ", 422)
  erorr.fields = erorrs
  return next(erorr)
  }

  next();
};

module.exports = validateProduct;
