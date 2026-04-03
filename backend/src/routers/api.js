const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/productController")
const CartItemController = require("../controllers/cartItemController")
router.get("/api/cartitem",CartItemController.getCartItemAll)
router.delete("/api/cartitem/delete/:id",CartItemController.deleteCartitem)
router.put("/api/cartitem/update/:id" ,CartItemController.editCartItem)
router.post("/api/cartitem/create" ,CartItemController.createCartItem)
router.get("/api/cartitem/:id" ,CartItemController.getCart)
//Product
router.get("/api/products",ProductController.getAllProduct)
router.post("/api/product/create",ProductController.createProduct)
router.get("/api/product/:id",ProductController.getProduct)
router.put("/api/product/edit/:id",ProductController.editProduct)
router.delete("/api/product/delete/:id",ProductController.deleteProduct)

let initApiRoutes = (app) => {
  app.use('/', router);
};

module.exports = initApiRoutes;