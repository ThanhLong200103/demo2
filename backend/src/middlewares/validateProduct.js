const validateProduct = (req, res, next) =>{
  const { name, price, img, quantity, status } = req.body;

  // name
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Tên sản phẩm phải >= 2 ký tự" });
  }

  // price
  if (price == null || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Giá phải là số > 0" });
  }

  // img
  if (!img || img.trim() === "") {
    return res.status(400).json({ error: "Ảnh không được để trống" });
  }

  // quantity
  if (quantity == null || isNaN(quantity) || quantity < 0) {
    return res.status(400).json({ error: "Số lượng phải >= 0" });
  }

  // status
  const validStatus = ["active", "inactive"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: "Status phải là active hoặc inactive" });
  }

  next();
}

module.exports = validateProduct;
