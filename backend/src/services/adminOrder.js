const orderModel = require("../models/orderModel");

class AdminOrderService {

  getOrderByStatus = async (status ,page , pageSize) => {
  
    const result=  await orderModel.getOrderByStatus(status ,page , pageSize);
     
   
 
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