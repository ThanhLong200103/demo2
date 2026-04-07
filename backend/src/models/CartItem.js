const db = require("../config/db");
const cart = require("./cart");

class CartItem {
  getAllCartItem = async (cart_id) => {
    const [row] = await db.execute(
      "SELECT p.price , p.quantity as quantityProduct, p.img,p.name , c.quantity , c.id FROM products p  INNER JOIN  cartitem c on p.id = c.product_id  WHERE c.status = 'active' AND  c.cart_id = ?",
      [cart_id],
    );
    console.log("ROW:", row);
    return row;
  };
  createCartItem = async (data, connection = db) => {
    const { productId, quantity } = data;
    const [result] = await connection.execute(
      "INSERT INTO  cartitem (product_id, quantity) VALUES (?,?)",
      [productId, quantity],
    );
    return result;
  };
  editCartItem = async (data, connection = db) => {
    const { id, quantity } = data;
    const [row] = await connection.execute(
      "UPDATE cartitem SET quantity=? WHERE id=?",
      [quantity, id],
    );
    return row;
  };
  deleteCartItem = async (id, connection = db) => {
    const [row] = await connection.execute(
      "UPDATE cartitem  SET status = 'removed'  WHERE id = ?",
      [id],
    );
    return row;
  };
  checkproductID = async (productId, cartId, connection = db) => {
    const [existingItem] = await connection.execute(
      "SELECT * FROM  cartitem WHERE product_id = ? AND cart_id = ? AND status = 'active' FOR UPDATE",
      [productId, cartId],
    );
    return existingItem;
  };
  getProductForUpdate = async (productId, connection = db) => {
    const [rows] = await connection.execute(
      "SELECT quantity FROM products WHERE id = ? FOR UPDATE",
      [productId],
    );
    return rows[0];
  };
  updownQuanTiTyProduct = async (data, connection = db) => {
    const product = await this.getProductForUpdate(data.productId, connection);
    const quantityProduct = product.quantity - data.quantity;
    console.log(product);
    if (quantityProduct < 0) {
      throw new Error("Out of stock");
    }
    const productId = data.productId;
    const [existingItem] = await connection.execute(
      "UPDATE products SET quantity = ? WHERE id=?",
      [quantityProduct, productId],
    );
    return existingItem;
  };
  getcart = async (id, connection = db) => {
    const [rows] = await connection.execute(
      "SELECT quantity , product_id FROM cartitem  WHERE id=? FOR UPDATE",
      [id],
    );
    return rows[0];
  };


  // Lấy thông tin cartitem theo danh sách id ,để dùng cho  orderItem sau khi đặt hàng thành công
  getCartItemsByIds = async (ids, connection = db) => {
    if (!ids || ids.length === 0) return [];
    const placeholders = ids.map(() => "?").join(",");
    const query = `SELECT c.product_id ,c.quantity ,p.price FROM cartitem  c INNER JOIN   products p on p.id = c.product_id   WHERE c.id IN (${placeholders}) FOR UPDATE`;
    const [rows] = await connection.execute(query, ids);
    return rows;
  };
  UpdateByIds = async (ids, connection = db) => {
    if (!ids || ids.length === 0) return [];
    const placeholders = ids.map(() => "?").join(",");
    const query = `UPDATE cartitem SET status = 'ordered' WHERE id IN (${placeholders})`;
    const [rows] = await connection.execute(query, ids);
    return rows;
  };
}
module.exports = new CartItem();
