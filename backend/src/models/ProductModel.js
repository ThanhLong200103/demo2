const db = require("../config/db");

class ProductModel {
  getAllProduct = async () => {
    const [row] = await db.query(
      "SELECT * FROM  products  WHERE status = 'active'",
    );
    return row;
  };
  getProduct = async (id) => {
    const [existingItem] = await db.execute(
      "SELECT * FROM  products WHERE id = ? AND status = 'active' FOR UPDATE",
      [id],
    );
    return existingItem;
  };
  createProduct = async (data) => {
    const { name, price, img, quantity } = data;
    const [existingItem] = await db.query(
      "INSERT INTO products (name, price, img, quantity) VALUES (?,?,?,?)",
      [name, price, img, quantity],
    );
    return existingItem;
  };
  editProduct = async (data) => {
    const { name, price, img, quantity, id } = data;
    const [existingItem] = await db.query(
      "UPDATE products SET name=?,price =?,img=?,quantity= ? WHERE id = ?",
      [name, price, img, quantity, id],
    );
    return existingItem;
  };
  deleteProduct = async (id) => {
    const [existingItem] = await db.query(
      "UPDATE products SET status = 'inactive' WHERE id = ?",
      [id],
    );
    return existingItem;
  };
  getProducUpdateCartAttributes = async (id ,connection = db) => {
    const [existingItem] = await connection.execute(
      "SELECT * FROM  attributes WHERE id = ? FOR UPDATE",
      [id],
    );
    return existingItem[0];
  };
  editQuantityProductAttributes = async (attributesId, quantity, connection = db) => {
    const [row] = await connection.execute(
      "UPDATE attributes SET quantity= quantity +?  WHERE id = ?",
      [quantity, attributesId],
    );
    return row[0];
  };
searchProduct = async (name) => {
  const [rows] = await db.execute(
    "SELECT * FROM products WHERE name LIKE ? AND status = 'active'",
    [`%${name}%`]
  );
  return rows;
};


}
module.exports = new ProductModel();
