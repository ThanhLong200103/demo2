const OrderModel = require("../models/orderModel");
const OrderItemModel = require("../models/orderItemModel");
const CartItemModel = require("../models/CartItem");
const ProductModel = require("../models/ProductModel");
const db = require("../config/db");
const paymentModel = require("../models/paymentModel");
const CartItem = require("../models/CartItem");
const AppError = require("../utils/AppError");
const { ProducerRabbitMQ } = require("../rabbitMq/producer");
class OrderService {
  createOrder = async (data , conn) => {
     const user_id = data.userId;
     const nameUser = data.nameUser
      const total_price = data.totalPrice;
      console.log("data dat hang :",data)
      const orderId = await OrderModel.createOrder(
        { user_id, total_price },
        conn,
      );
      const cartItem = await CartItemModel.getCartItemsByIds(
        data.cartItemIds,
        conn,
      );

      if(orderId){
        const homeNumber = data.homeNumber
        const district = data.district
        const province = data.province
        const receiverName = data.receiverName
        const phoneNumber = data.phoneNumber
        const CreateAddressOrder = await OrderModel.createOrderAddress({orderId ,homeNumber ,district ,province ,receiverName ,phoneNumber},conn)
      }

    if(cartItem && cartItem.length > 0){
        for (const item of cartItem) {
        await OrderItemModel.createOrderItem(
          {
            order_id: orderId,
            product_id: item.product_id,
            attribute_id:item.attributes_id,
            quantity: item.quantity,
            price: item.price,

          },
          conn,
        );
        const up = await CartItem.updownQuanTiTyProduct({ attributesId: item.attributes_id, quantity: item.quantity }, conn);
      }
      const updateCartItem = await CartItemModel.UpdateByIds(
        data.cartItemIds,
        conn,
      );
    }
    else{
      await OrderItemModel.createOrderItem(
        {
           order_id: orderId,
            product_id: data.productId,
            attribute_id:data.attributeId,
            quantity: data.quantityProduct,
            price: data.priceProduct,
        },conn,
      );

       const quantityAttribute = await ProductModel.getProducUpdateCartAttributes(data.attributeId , conn);
       if(quantityAttribute){
        const quantity = -data.quantityProduct
        if(quantityAttribute.quantity + quantity < 0){
           throw new AppError("Số lượng sản phẩm không đủ" ,422);
        }
        await ProductModel.editQuantityProductAttributes(data.attributeId ,quantity , conn )
       }
    }
      const payment = await paymentModel.createPayment(
        { order_id: orderId, amount: total_price, method: "COD" },
        conn,
      );

   
      // await conn.commit();
      await ProducerRabbitMQ("notificationOrder",{user_id ,nameUser ,orderId})
      return [orderId, cartItem, payment ];
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
      const item = await OrderItemModel.getOrderItemHistory(d.id)
      orderItem.push(item)
    }
    return orderItem;
  };

  cancelOrderItem = async (id ,idOrderItem, conn)  => {
    const getOrderCancel = await OrderModel.getCancelAllOrder(id, conn);
      console.log("GET ORDER CANCEL:", getOrderCancel);
      if (!getOrderCancel) {
        throw new Error("Order not found");
      }
      const allCancelOrderItems = [];
      for (const order of getOrderCancel) {
        const orderId = order.id;
      const getCancelOrderItem = await OrderItemModel.getCancelOrderItem(idOrderItem, orderId, conn);
      allCancelOrderItems.push(getCancelOrderItem);
      }
      const orderItems = allCancelOrderItems.flat().filter(Boolean);

      console.log("ALL CANCEL ORDER ITEMS:", orderItems[0].id ,orderItems[0].quantity , orderItems[0].attribute_id , orderItems[0].order_id);
      const cancelOrderItem = await OrderItemModel.cancelOrderItem(orderItems[0].id, conn);
      const updateQuantityProduct = await ProductModel.editQuantityProductAttributes(orderItems[0].attribute_id, orderItems[0].quantity, conn);
      const checkOrder = await OrderItemModel.checkOrder(orderItems[0].order_id , conn);
      console.log("CHECK ORDER:", checkOrder.length);
      if(checkOrder.length ==0){
       await OrderModel.cancelOrder(orderItems[0].order_id, conn);
      }

        // await conn.commit();
      return [cancelOrderItem, updateQuantityProduct];
  }

  updateOrder = async (data) => {
    const conn = await db.getConnection();
  }



  
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
