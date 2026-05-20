const db = require("./db");

const initDB = async () => {
  try {
    // 1. BẢNG DANH MỤC (Tạo trước vì các bảng sau cần tham chiếu)
    await db.query(`
      CREATE TABLE IF NOT EXISTS category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id INT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES category(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS category_translations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        language_code VARCHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
        UNIQUE(category_id, language_code)
      );
    `);

    // 2. BẢNG SẢN PHẨM & CÁC THÀNH PHẦN LIÊN QUAN
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        img VARCHAR(255) NOT NULL,
        status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
        category_id INT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_Product_Category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS product_translations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        language_code VARCHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE(product_id, language_code)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS attributes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        color VARCHAR(255) NOT NULL,
        size VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_Attributes_Product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        status ENUM('active','delete') DEFAULT 'active',
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_Images_Product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    // 3. VAI TRÒ & QUYỀN HẠN (RBAC)
    await db.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description VARCHAR(255),
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description VARCHAR(255),
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Bảng trung gian Nhiều - Nhiều giữa Roles và Permissions (Không thêm cột bổ trợ)
    await db.query(`
      CREATE TABLE IF NOT EXISTS role_permissions (
        role_id INT,
        permission_id INT,
        PRIMARY KEY (role_id, permission_id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
      );
    `);

    // Bảng cây kế thừa giữa các Roles (Không thêm cột bổ trợ)
    await db.query(`
      CREATE TABLE IF NOT EXISTS role_hierarchy (
        parent_role_id INT,
        child_role_id INT,
        PRIMARY KEY (parent_role_id, child_role_id),
        FOREIGN KEY (parent_role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (child_role_id) REFERENCES roles(id) ON DELETE CASCADE
      );
    `);

    // 4. NGƯỜI DÙNG & TÀI KHOẢN
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL UNIQUE,
        refresh_token VARCHAR(255),
        time_refresh_token TIMESTAMP NULL,
        status ENUM('active', 'deleted') DEFAULT 'active',
        role_id INT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS user_addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        home_number VARCHAR(255) NOT NULL, 
        district VARCHAR(255) NOT NULL,
        province VARCHAR(255) NOT NULL,
        is_default BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT 'active',
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_UserAddress_User FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // 5. GIỎ HÀNG & ĐƠN HÀNG
    await db.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_Cart_User FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Bảng trung gian Nhiều - Nhiều lưu sản phẩm trong giỏ (Không thêm cột bổ trợ)
    await db.query(`
      CREATE TABLE IF NOT EXISTS cartItem (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cart_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        status ENUM('active', 'ordered', 'removed') DEFAULT 'active',
        attributes_id INT NOT NULL,
        CONSTRAINT FK_CartItem_Attributes FOREIGN KEY (attributes_id) REFERENCES attributes(id) ON DELETE CASCADE,
        CONSTRAINT FK_CartItem_Cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        CONSTRAINT FK_CartItem_Product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_price INT NOT NULL,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_Order_User FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        attribute_id INT NOT NULL,
        quantity INT NOT NULL,
        price INT NOT NULL,
        status ENUM('pending', 'shipped', 'delivered', 'cancelled', 'returned') DEFAULT 'pending',
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_OrderItem_Order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT FK_OrderItem_Product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        CONSTRAINT FK_OrderItem_Attribute FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        amount INT NOT NULL,
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        method ENUM('COD', 'VNPay', 'MOMO') NOT NULL DEFAULT 'COD',
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_Payment_Order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        home_number VARCHAR(255) NOT NULL, 
        district VARCHAR(255) NOT NULL,
        province VARCHAR(255) NOT NULL,
        receiver_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        created_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_OrderAddress_Order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
  CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    product_id INT NULL,

    action VARCHAR(255) NOT NULL,

    description TEXT NULL,

    created_by INT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),

    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

    console.log(
      "Database initialized successfully with RBAC and audit columns!",
    );
  } catch (err) {
    console.error("Init DB error:", err.message);
  }
};

module.exports = initDB;
