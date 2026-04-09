const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/productController")
const CartItemController = require("../controllers/cartItemController")
const UserController = require("../controllers/userController");
const authMiddleware = require('../middlewares/auth.middleware');
const validateUser = require('../middlewares/validateProduct');
const orderController = require('../controllers/orderController');
const validateProduct = require('../middlewares/validateProduct');
const VnpayController = require('../controllers/vnpayController');
router.get("/api/cartitem/:id",authMiddleware,CartItemController.getCartItemAll)
router.get("/api/cart",authMiddleware,CartItemController.getCart)
router.delete("/api/cartitem/delete/:id",authMiddleware,CartItemController.deleteCartitem)
router.put("/api/cartitem/update/:id",authMiddleware ,CartItemController.editCartItem)
router.post("/api/cartitem/create" ,authMiddleware,CartItemController.createCartItem)
router.get("/api/cartitem/:id",authMiddleware ,CartItemController.getCartItem)
//Product
router.get("/api/products",ProductController.getAllProduct)
router.post("/api/product/create",[authMiddleware,validateProduct],ProductController.createProduct)
router.get("/api/product/:id",authMiddleware,ProductController.getProduct)
router.put("/api/product/edit/:id",[authMiddleware,validateProduct],ProductController.editProduct)
router.delete("/api/product/delete/:id",authMiddleware,ProductController.deleteProduct)
// user
router.get("/api/users",UserController.getAllUser)
router.post("/api/login",UserController.login)
router.get("/api/profile",authMiddleware,UserController.proFile)
router.post("/api/register",UserController.register)
router.post("/api/refresh",UserController.resetRefreshToken)
router.post("/api/logout",authMiddleware,UserController.userLogout)
// router.get("/api/me",UserController.me)

// order
router.post("/api/order/create",authMiddleware,orderController.CreateOrder)
router.post("/api/order/getItemOrder",authMiddleware,orderController.getItemOrder)
router.get("/api/order",authMiddleware,orderController.getOrderDone)
router.post("/api/order/cancel",authMiddleware,orderController.cancelOrderItem)

// vnpay
router.post("/api/payment/vnpay",VnpayController.createPaymentUrl)
router.get("/api/payment/vnpay_return",VnpayController.vnpayReturn)
router.post("/api/payment/vnpay_ipn",VnpayController.vnpayIND)
let initApiRoutes = (app) => {
  app.use('/', router);
};

module.exports = initApiRoutes;