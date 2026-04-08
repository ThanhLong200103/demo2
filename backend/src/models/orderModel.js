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
    
}
module.exports = new OrderModel();