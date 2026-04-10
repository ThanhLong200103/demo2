const db = require("../config/db");
class OrderModel {
    createOrder = async (data , connection = db)=>{
        const {user_id,total_price} = data;
        const [order] = await connection.query(
            "INSERT INTO orders (user_id, total_price) VALUES (?,?)",
            [user_id, total_price]
        );
        return order.insertId;
    }
    getOrder = async (id, connection = db)=>{
        const [order] = await connection.query(
            "SELECT * FROM orders WHERE id = ?",
            [id]
        );
        return order[0];
    }
    getAllOrder = async (user_id )=>{
        const [orders] = await db.execute(
            "SELECT * FROM orders WHERE user_id = ?",
            [user_id]
        );
        // console.log(orders , user_id)
        return orders;
    }
// cancle order
     getCancelAllOrder = async (userId ,connection = db )=>{
        const [orders] = await connection.execute(
            "SELECT * FROM orders WHERE user_id = ?",
            [userId]
        );
        // console.log(orders , user_id)
        return orders;
    }

   cancelOrder = async (id, connection = db) => {
        const [row] = await connection.execute(
          "UPDATE orders SET status = 'cancelled' WHERE id = ?",
          [id],
        );
        return row;
      }
// update order khi thanh toan thanh cong
    selectUpdateOrder = async (id, connection = db) => {
        const [rows] = await connection.execute(
          "SELECT * FROM orders WHERE id = ? FOR UPDATE",
          [id]
        );
        return rows[0];
      }

    updatestatusOrder = async (id ,status, connection = db) => {
        const [row] = await connection.execute(
          "UPDATE orders SET status = ? WHERE id = ?",
          [status, id],
        );
        return row;
      }

    
    
    
}
module.exports = new OrderModel();