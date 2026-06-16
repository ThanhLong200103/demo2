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
  updatePaymentStatus = async (id ,status ,vnp_TransactionNo, response_code, bank_code, connection = db) => {
    const [row] = await connection.execute(
      "UPDATE payments SET status = ? ,transaction_no = ?, response_code = ?, bank_code = ? WHERE order_id = ?",
      [status, vnp_TransactionNo, response_code, bank_code, id],
    );
    return row;
  }



  // admin

  getAllPays = async()=>{
    const [rows] = await db.query("SELECT order_id , amount , status , method , created_by , created_at  FROM payments WHERE status = 'completed' ")
   
    return rows
  }
}

module.exports = new PaymentModel();
