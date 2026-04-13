const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/orderController');
const CartItemController = require("../controllers/cartItemController")

router.post("/api/order/create",authMiddleware,orderController.CreateOrder)
router.post("/api/order/getItemOrder",authMiddleware,orderController.getItemOrder)
router.get("/api/order",authMiddleware,orderController.getOrderDone)
router.post("/api/order/cancel",authMiddleware,orderController.cancelOrderItem)

router.get("/api/cartitem/:id",authMiddleware,CartItemController.getCartItemAll)
router.get("/api/cart",authMiddleware,CartItemController.getCart)
router.delete("/api/cartitem/delete/:id",authMiddleware,CartItemController.deleteCartitem)
router.put("/api/cartitem/update/:id",authMiddleware ,CartItemController.editCartItem)
router.post("/api/cartitem/create" ,authMiddleware,CartItemController.createCartItem)
router.get("/api/cartitem/:id",authMiddleware ,CartItemController.getCartItem)

let initOrderRoutes = (app) => {
  app.use('/', router);
};

module.exports = initOrderRoutes;