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
}

module.exports = new PaymentModel();
