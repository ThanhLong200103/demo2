const db = require("../config/db");
class PaymentModel {
  createPayment = async (data, connection = db) => {
    const { order_id, orderId, amount, method } = data;
    const paymentOrderId = order_id || orderId;
    const [result] = await connection.query(
      "INSERT INTO payments (order_id, amount, method) VALUES (?, ?, ?)",
      [paymentOrderId, amount, method],
    );
    return result;
  };

  // update khi thanh toan thanh cong
  selectUpatePayment = async (id, connection = db) => {
    const [rows] = await connection.execute(
      "SELECT * FROM payments WHERE order_id = ? FOR UPDATE",
      [id],
    );
    return rows[0];
  }
  updatePaymentStatus = async (id, connection = db) => {
    const [row] = await connection.execute(
      "UPDATE payments SET status = 'completed' WHERE order_id = ?",
      [ id],
    );
    return row;
  }
}

module.exports = new PaymentModel();
