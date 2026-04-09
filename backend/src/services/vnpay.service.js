const moment = require("moment");
const qs = require("qs");
const { sortObject, generateSignature } = require("../utils/vnpay.util");
const config = require("../config/vnpay.config");
const db = require("../config/innitDB");
const orderModel = require("../models/orderModel");
const CartItemModel = require("../models/CartItem");
const orderItemModel = require("../models/orderItemModel");
const paymentModel = require("../models/paymentModel");

class VnPayService {
    createPaymentUrl = (order, ipAddr) => {
    const vnpParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: config.vnp_TmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: order.id, // ID duy nhất của bạn
        vnp_OrderInfo: `Thanh toan don hang ${order.id}`,
        vnp_OrderType: 'other',
        vnp_Amount: order.total_price * 100, // Quan trọng: Nhân 100
        vnp_ReturnUrl: config.vnp_returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        vnp_IpnUrl: config.vnp_ipnUrl,
    }; 

    const sortedParams = sortObject(vnpParams);
    const signed = generateSignature(sortedParams, config.vnp_hashSecret);

    sortedParams['vnp_SecureHash'] = signed;
    return `${config.vnp_url}?${qs.stringify(sortedParams, { encode: false })}`;
};

vnpayReturn = (queryFromVnpay) => {
    // 1. Tạo một bản sao để tránh làm hỏng dữ liệu gốc của req.query
    const vnp_Params = { ...queryFromVnpay };

    // 2. Lấy SecureHash ra
    const secureHash = vnp_Params['vnp_SecureHash'];

    // 3. Xóa các field không dùng để hash
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // 4. SẮP XẾP params trước khi tạo lại chữ ký (QUAN TRỌNG!)
    const sortedParams = sortObject(vnp_Params);

    // 5. Tạo lại chữ ký 
    const signed = generateSignature(sortedParams, config.vnp_hashSecret);

    // 6. So sánh
    if (secureHash !== signed) {
        console.log("Mã băm VNPAY gửi về:", secureHash);
        console.log("Mã băm hệ thống tạo lại:", signed);
        throw new Error("Thanh toán lỗi: Invalid signature");
    }

    // Trả về params đã verify thành công để controller xử lý tiếp (update DB...)
    return vnp_Params;
}

vnpayIND = async (queryFromVnpay) => {

     const vnp_Params = { ...queryFromVnpay };

    // 2. Lấy SecureHash ra
    const secureHash = vnp_Params['vnp_SecureHash'];

    // 3. Xóa các field không dùng để hash
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // 4. SẮP XẾP params trước khi tạo lại chữ ký (QUAN TRỌNG!)
    const sortedParams = sortObject(vnp_Params);

    // 5. Tạo lại chữ ký 
    const signed = generateSignature(sortedParams, config.vnp_hashSecret);

    // 6. So sánh
    if (secureHash !== signed) {
        console.log("Mã băm VNPAY gửi về:", secureHash);
        console.log("Mã băm hệ thống tạo lại:", signed);
        throw new Error("Thanh toán lỗi: Invalid signature");
    }

    console.log( "1", vnp_Params);

    const orderId = vnp_Params['vnp_TxnRef'];
    const selectPaymentUpdate = await paymentModel.selectUpatePayment(orderId);
    if (!selectPaymentUpdate) {
        throw new Error("Không tìm thấy đơn hàng để cập nhật trạng thái thanh toán");
    }
    const updatepayment = await paymentModel.updatePaymentStatus(orderId);
    const order = await orderModel.selectUpdateOrder(orderId);
    if (!order) {
        throw new Error("Không tìm thấy đơn hàng");
    }
    await orderModel.updatestatusOrder(orderId);
    const orderItems = await orderItemModel.selectUpdateOrderItem(orderId);
    await orderItemModel.updateStatusOrderItem(orderId);
    // Trả về params đã verify thành công để controller xử lý tiếp (update DB...)
    return [vnp_Params, updatepayment, order, orderItems];

}


// Tạo đơn hàng và thanh toán qua VNPay
createPaymentVnpay = async (data) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const user_id = data.userId;
      const total_price = data.totalPrice;
      const orderId = await orderModel.createOrder(
        { user_id, total_price },
        conn,
      );
      const cartItem = await CartItemModel.getCartItemsByIds(
        data.cartItemIds,
        conn,
      );
      for (const item of cartItem) {
        await orderItemModel.createOrderItem(
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
        { order_id: orderId, amount: total_price, method: "VNPay" },
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
}

}

module.exports = new VnPayService();