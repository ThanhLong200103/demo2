const OrderModel = require("../models/orderModel");
const OrderItemModel = require("../models/orderItemModel");
const CartItemModel = require("../models/CartItem");
const db = require("../config/db");
const paymentModel = require("../models/paymentModel");
class OrderService {
  createOrder = async (data) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const user_id = data.userId;
      const total_price = data.totalPrice;
      const orderId = await OrderModel.createOrder(
        { user_id, total_price },
        conn,
      );
      const cartItem = await CartItemModel.getCartItemsByIds(
        data.cartItemIds,
        conn,
      );
      for (const item of cartItem) {
        await OrderItemModel.createOrderItem(
          {
            order_id: orderId,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          },
          conn,
        );
      }
      const updateCartItem = await CartItemModel.UpdateByIds(
        data.cartItemIds,
        conn,
      );
      const payment = await paymentModel.createPayment(
        { order_id: orderId, amount: total_price, method: "COD" },
        conn,
      );
      await conn.commit();
      return [orderId, cartItem, payment];
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  };

  getItemOrder = async (ids) => {
    const data = await CartItemModel.getCartItemsOfSelectOrder(ids);
    return data;
  };
  getOrderDone = async (id) => {
    const user_id = id;
    const data = await OrderModel.getAllOrder(user_id);
    // console.log(data.length);
    const orderItem = [];
    for(const d of data){
      const item = await OrderItemModel.getOrderItem(d.id)
      orderItem.push(item)
    }
    return orderItem;
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
