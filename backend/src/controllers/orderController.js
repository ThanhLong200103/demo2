
const OrderService = require("../services/order.service");
const runInTransaction = require("../utils/runTransaction");

class OrderController {
  CreateOrder = async (req, res) => {
    try {
      const { cartItemIds ,totalPrice ,productId ,quantityProduct ,priceProduct  ,attributeId} = req.body ;
      const userId = req.user.id;

      const data = await runInTransaction (async (conn) => {
         return await OrderService.createOrder({cartItemIds ,totalPrice, userId ,productId ,quantityProduct ,priceProduct  ,attributeId }, conn);
       });
      res.json(data );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  getItemOrder = async (req, res) => {
    try {
      const { ids } = req.body;
    
      console.log("ids:", ids);
      const data = await OrderService.getItemOrder(ids);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getOrderDone = async (req , res)=>{
    try {
      const {id} = req.user
      console.log(id)
      const data = await OrderService.getOrderDone(id)
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
      
    }
  }
  cancelOrderItem = async (req, res) => {
    try {
      const { id } = req.user;
      const idOrderItem = req.body.idOrderItem;
      const data = await runInTransaction(async (conn) => {
        return await OrderService.cancelOrderItem(id , idOrderItem, conn);
      });
      res.json(data); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
}

module.exports = new OrderController();
