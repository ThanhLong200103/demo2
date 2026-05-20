const orderModel = require("../models/orderModel");

class AdminOrderService {

  getOrderByStatus = async (status) => {
   let result = [];

  for (const s of status) {
    const data =
      await orderModel.getOrderByStatus(s);
     
    result.push(...data);
  }
 
  return result;
  };

  updateStatusOrder = async (id, status) => {
    const res = await orderModel.updateStatusOrder(id, status);
    return res;
  };


  updateTotalPriceOrder = async (id, total_price) => {
    const res = await orderModel.updateTotalPriceOrder(id, total_price);
    return res;
  };


  getOneOrder = async (id) => {
    const res = await orderModel.getOneOrder(id);
    return res;
  };
}

module.exports = new AdminOrderService();