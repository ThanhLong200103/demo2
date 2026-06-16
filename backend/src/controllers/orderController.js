
const OrderService = require("../services/order.service");
const runInTransaction = require("../utils/runTransaction");
const CacthAsync = require("../utils/cachAsync");
const appEventEmitter = require("../utils/appEventEmitter");

class OrderController {
  CreateOrder = CacthAsync(
    async (req, res) => {
   
      const { cartItemIds ,totalPrice ,productId ,quantityProduct ,priceProduct  ,attributeId 
        ,  homeNumber ,district ,province ,receiverName ,phoneNumber
      } = req.body ;
      const userId = req.user.id;
      const nameUser = req.user.role_name;

      const data = await runInTransaction (async (conn) => {
         return await OrderService.createOrder({cartItemIds ,totalPrice, userId ,productId ,quantityProduct ,priceProduct  ,attributeId ,  homeNumber ,district ,province ,receiverName ,phoneNumber , nameUser }, conn);
       });

      
      res.json(data );
   
  }
  );
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
