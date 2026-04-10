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
          `SELECT o.id, o.quantity, o.price, p.name, p.img ,o.status
           FROM order_items o
           INNER JOIN products p ON o.product_id = p.id
           WHERE order_id = ? AND o.status !='cancelled'`,
          [id],
        );
        return rows;
    }

    getOrderItemHistory = async (id)=>{
        const [rows] = await db.execute(
          `SELECT o.id, o.quantity, o.price, p.name, p.img ,o.status
           FROM order_items o
           INNER JOIN products p ON o.product_id = p.id
           WHERE order_id = ?`,
          [id],
        );
        return rows;
    }


    //cancle order item
    cancelOrderItem = async (id, connection = db) => {
        const [row] = await connection.execute(
          "UPDATE order_items SET status = 'cancelled' WHERE id = ?",
          [id],
        );
        return row;
    }
     getCancelOrderItem = async (id , orderId ,connection = db )=>{
        const [rows] = await connection.execute(
          `SELECT o.id, o.quantity, o.price, p.name, p.img ,o.product_id ,o.order_id
           FROM order_items o
           INNER JOIN products p ON o.product_id = p.id
           WHERE o.id = ? AND o.order_id = ? FOR UPDATE`,
          [id, orderId],
        );
        return rows[0];
    }

     checkOrder = async (id ,connection = db)=>{
        const [rows] = await connection.execute(
          `SELECT o.id, o.quantity, o.price, p.name, p.img
           FROM order_items o
           INNER JOIN products p ON o.product_id = p.id
           WHERE order_id = ? AND o.status !='cancelled' `,
          [id],
        );
        return rows;
    }

// update khi order đc upate thành công
    selectUpdateOrderItem = async (id ,connection = db)=>{
      const [rows] = await connection.execute('SELECT * FROM order_items WHERE order_id = ? FOR UPDATE', [id]);
        return rows;
    }
    updateStatusOrderItem = async (id,statusOrderItem, connection = db) => {
        const [row] = await connection.execute(
          "UPDATE order_items SET status = ? WHERE order_id = ?",
          [statusOrderItem, id],
        );
        return row;
      }

}

module.exports = new OrderItemModel()