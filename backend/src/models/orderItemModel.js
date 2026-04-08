const db = require("../config/db");
class OrderItemModel {
    createOrderItem = async (data ,connection = db)=>{
            const {order_id, product_id, quantity, price} = data;
            const [orderItem] = await connection.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
                [order_id, product_id, quantity, price]
            );
            return orderItem;
      
    }
    getOrderItem = async (id)=>{
        const [rows] = await db.execute(
          `SELECT o.id, o.quantity, o.price, p.name, p.img
           FROM order_items o
           INNER JOIN products p ON o.product_id = p.id
           WHERE order_id = ?`,
          [id],
        );
        return rows;
    }
}

module.exports = new OrderItemModel()