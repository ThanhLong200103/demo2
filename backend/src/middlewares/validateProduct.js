const validateProduct = (req, res, next) => {
  const { name, price, img, quantity, status } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(422).json({ error: "Tên sản phẩm phải >= 2 ký tự" });
  }

  if (price == null || isNaN(price) || price <= 0) {
    return res.status(422).json({ error: "Giá phải là số > 0" });
  }

  if (!img || img.trim() === "") {
    return res.status(422).json({ error: "Ảnh không được để trống" });
  }

  if (quantity == null || isNaN(quantity) || quantity < 0) {
    return res.status(422).json({ error: "Số lượng phải >= 0" });
  }

  next();
};

module.exports = validateProduct;
