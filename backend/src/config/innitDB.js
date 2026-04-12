const db = require("./db");

const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        img VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active'
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL UNIQUE,
        refresh_token VARCHAR(255),
        time_refresh_token TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        CONSTRAINT FK_Cart_User 
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);

    await db.query(`
     CREATE TABLE IF NOT EXISTS cartItem (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  status ENUM('active', 'ordered', 'removed') DEFAULT 'active',

  CONSTRAINT FK_CartItem_Cart
    FOREIGN KEY (cart_id) REFERENCES carts(id)
    ON DELETE CASCADE,

  CONSTRAINT FK_CartItem_Product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
)
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_price INT NOT NULL,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',

        CONSTRAINT FK_Order_User
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price INT NOT NULL,
        status ENUM('pending', 'shipped', 'delivered', 'cancelled', 'returned') DEFAULT 'pending',

        CONSTRAINT FK_OrderItem_Order
          FOREIGN KEY (order_id) REFERENCES orders(id)
          ON DELETE CASCADE,

        CONSTRAINT FK_OrderItem_Product
          FOREIGN KEY (product_id) REFERENCES products(id)
          ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        amount INT NOT NULL,
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        method ENUM('COD', 'VNPay', 'MOMO') NOT NULL DEFAULT 'COD',

        CONSTRAINT FK_Payment_Order
          FOREIGN KEY (order_id) REFERENCES orders(id)
          ON DELETE CASCADE
      )
    `);
    await db.query(`
        ALTER TABLE payments
ADD COLUMN IF NOT EXISTS transaction_no VARCHAR(50) NULL,
ADD COLUMN IF NOT EXISTS response_code VARCHAR(10) NULL,
ADD COLUMN IF NOT EXISTS bank_code VARCHAR(20) NULL
    `).catch(err => console.log("Columns might already exist:", err.message));
    console.log(" All tables created successfully");
  } catch (err) {
    console.error(" Init DB error:", err.message);
  }
};

module.exports = initDB;
