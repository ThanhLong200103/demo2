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
        
    }
}

module.exports = new OrderItemModel()