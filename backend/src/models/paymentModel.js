const db = require("../config/db");
class PaymentModel {
  createPayment = async (data, connection = db) => {
    const { orderId, amount, method } = data; 
    const [result] = await connection.execute(
      "INSERT INTO payments (order_id, amount, method) VALUES (?, ?, ?)",
      [orderId, amount, method],
    );
    return result;
  };
}

module.exports = new PaymentModel();