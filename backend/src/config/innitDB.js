const db = require("./db");

const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL ,
        price INT NOT NULL,
        img VARCHAR(255) NOT NULL,
        quantity INT NOT NULL
      )
    `);
    await db.query(
      `CREATE TABLE IF NOT EXISTS cartItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT, 
    quantity INT NOT NULL,
    CONSTRAINT FK_CartItem_Product FOREIGN KEY (product_id) REFERENCES products(id)
  )`,
    );
    await db.query(`
  ALTER TABLE products 
  ADD COLUMN status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active'
`);

    await db.query(`
  ALTER TABLE cartItem 
  ADD COLUMN status ENUM('active', 'ordered', 'removed') DEFAULT 'active'
`);
    console.log("Table ready");
  } catch (err) {
    console.error("Init DB error:", err.message);
  }
};

module.exports = initDB;
