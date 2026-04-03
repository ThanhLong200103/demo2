const db = require("../config/db");

class CartItem {
  getAllCartItem = async () => {
    const [row] = await db.query(
      "SELECT p.price , p.quantity as quantityProduct, p.img,p.name , c.quantity , c.id FROM products p  INNER JOIN  cartitem c on p.id = c.product_id WHERE c.status = 'active' ",
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
  checkproductID = async (productId, connection = db) => {
    const [existingItem] = await connection.execute(
      "SELECT * FROM  cartitem WHERE product_id = ? FOR UPDATE",
      [productId],
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
}
module.exports = new CartItem();
