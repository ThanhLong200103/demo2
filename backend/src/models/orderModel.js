const db = require("../config/db");
class OrderModel {
  createOrder = async (data, connection = db) => {
    const { user_id, total_price } = data;
    const [order] = await connection.query(
      "INSERT INTO orders (user_id, total_price) VALUES (?,?)",
      [user_id, total_price],
    );
    return order.insertId;
  };
  getOrder = async (id, connection = db) => {
    const [order] = await connection.query(
      "SELECT * FROM orders WHERE id = ?",
      [id],
    );
    return order[0];
  };
  getAllOrder = async (user_id) => {
    const [orders] = await db.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [user_id],
    );
    // console.log(orders , user_id)
    return orders;
  };
  // cancle order
  getCancelAllOrder = async (userId, connection = db) => {
    const [orders] = await connection.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [userId],
    );
    // console.log(orders , user_id)
    return orders;
  };

  cancelOrder = async (id, connection = db) => {
    const [row] = await connection.execute(
      "UPDATE orders SET status = 'cancelled' WHERE id = ?",
      [id],
    );
    return row;
  };
  // update order khi thanh toan thanh cong
  selectUpdateOrder = async (id, connection = db) => {
    const [rows] = await connection.execute(
      "SELECT * FROM orders WHERE id = ? FOR UPDATE",
      [id],
    );
    return rows[0];
  };

  updatestatusOrder = async (id, status, connection = db) => {
    const [row] = await connection.execute(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id],
    );
    return row;
  };

  /// add địa chỉ của order

  createOrderAddress = async (data, connection = db) => {
    const {
      orderId,
      homeNumber,
      district,
      province,
      receiverName,
      phoneNumber,
    } = data;
    const [orderAddress] = await connection.execute(
      "INSERT INTO order_addresses ( order_id, home_number , district, province , receiver_name, phone_number) VALUES (?,?,?,?,?,?)",
      [orderId, homeNumber, district, province, receiverName, phoneNumber],
    );
    return orderAddress;
  };

  //admin

  getAllOrderAdmin = async (page, pageSize) => {
    const offset = (page - 1) * pageSize;

    // data query
    const [rows] = await db.query(
      `
    SELECT 
      o.id,
      o.user_id,
      o.total_price,
      o.status,
      u.name AS nameUser,
      o.created_by,
      o.created_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?
    `,
      [pageSize, offset],
    );
    const [countRows] = await db.query(
      `
    SELECT COUNT(*) as total
    FROM orders
    `,
    );

    return {
      data: rows,
      total: countRows[0].total,
      page,
      pageSize,
    };
  };

  getAllOrderAdmins = async () => {
    const [rows] = await db.query(
      "SELECT o.id,o.user_id,o.total_price,o.status,u.name AS nameUser,o.created_by,o.created_at FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC",
    );
    return rows;
  };

  getOrderByStatus = async (
  status,
  page,
  pageSize
) => {

  const limit = Number(pageSize);

  const offset =
    (Number(page) - 1) * limit;

  const placeholders = status
    .map(() => "?")
    .join(",");

  // query data
  const [rows] = await db.query(
    `
    SELECT 
      o.id,
      o.user_id,
      o.total_price,
      o.status,
      u.name AS nameUser,
      o.created_by,
      o.created_at
    FROM orders o
    JOIN users u 
      ON o.user_id = u.id
    WHERE o.status IN (${placeholders})
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...status, limit, offset]
  );

  // query total
  const [countRows] = await db.query(
    `
    SELECT COUNT(*) as total
    FROM orders o
    WHERE o.status IN (${placeholders})
    `,
    [...status]
  );

  return {
    data: rows,
    total: countRows[0].total,
    page: Number(page),
    pageSize: limit,
  };
};
  updateStatusOrder = async (id, status) => {
    const [result] = await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id],
    );

    return result;
  };
  updateTotalPriceOrder = async (id, total_price) => {
    const [result] = await db.query(
      "UPDATE orders SET total_price = ? WHERE id = ?",
      [total_price, id],
    );

    return result;
  };
  getOneOrder = async (id) => {
    const [rows] = await db.query(
      "SELECT o.id,o.user_id,o.total_price,o.status,u.name AS nameUser,o.created_by,o.created_at FROM orders o JOIN users u ON o.user_id = u.id WHERE o.id = ?",
      [id],
    );
    return rows[0];
  };
}
module.exports = new OrderModel();
