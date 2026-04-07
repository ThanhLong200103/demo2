const OrderService = require("../services/order.service");

class OrderController {
  CreateOrder = async (req, res) => {
    try {
      const { cartItemIds ,totalPrice } = req.body ;
      const userId = req.user.id;
      const data = await OrderService.createOrder({cartItemIds ,totalPrice, userId });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new OrderController();
