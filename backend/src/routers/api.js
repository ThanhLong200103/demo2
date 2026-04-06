const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/productController")
const CartItemController = require("../controllers/cartItemController")
const UserController = require("../controllers/userController");
const authMiddleware = require('../middlewares/auth.middleware');
const validateUser = require('../middlewares/validateUser');
router.get("/api/cartitem",CartItemController.getCartItemAll)
router.get("/api/cart",authMiddleware,CartItemController.getCart)
router.delete("/api/cartitem/delete/:id",CartItemController.deleteCartitem)
router.put("/api/cartitem/update/:id" ,CartItemController.editCartItem)
router.post("/api/cartitem/create" ,CartItemController.createCartItem)
router.get("/api/cartitem/:id" ,CartItemController.getCartItem)
//Product
router.get("/api/products",ProductController.getAllProduct)
router.post("/api/product/create",ProductController.createProduct)
router.get("/api/product/:id",ProductController.getProduct)
router.put("/api/product/edit/:id",ProductController.editProduct)
router.delete("/api/product/delete/:id",ProductController.deleteProduct)
// user
router.get("/api/users",UserController.getAllUser)
router.post("/api/login",UserController.login)
router.get("/api/profile",authMiddleware,UserController.proFile)
router.post("/api/register",validateUser,UserController.register)
router.post("/api/refresh",UserController.resetRefreshToken)
router.post("/api/logout",authMiddleware,UserController.userLogout)

let initApiRoutes = (app) => {
  app.use('/', router);
};

module.exports = initApiRoutes;