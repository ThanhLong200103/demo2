const OrderModel = require("../models/orderModel");
const OrderItemModel = require("../models/orderItemModel");
const CartItemModel = require("../models/CartItem");
const db = require("../config/db");
class OrderService {
  createOrder = async (data) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const user_id = data.userId;
      const total_price = data.totalPrice;
      const orderId = await OrderModel.createOrder({ user_id, total_price }, conn);
      const cartItem = await CartItemModel.getCartItemsByIds(
        data.cartItemIds,
        conn,
      );
      for (const item of cartItem) {
        await OrderItemModel.createOrderItem(
          { order_id: orderId, product_id: item.product_id, quantity: item.quantity, price: item.price },
          conn,
        );
      }
      const updateCartItem = await CartItemModel.UpdateByIds(
        data.cartItemIds,
        conn,
      );
      await conn.commit();
      return [orderId, updateCartItem];
    } catch (error) {
      await conn.rollback();
    } finally {
      conn.release();
    }
  };
}
module.exports = new OrderService();



// [
//     {
//         "product_id": 1,
//         "quantity": 17,
//         "price": 10000
//     },
//     {
//         "product_id": 2,
//         "quantity": 4,
//         "price": 5000
//     }
// ]