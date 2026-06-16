const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/productController")
const validateProduct = require('../middlewares/validateProduct');
const authMiddleware = require('../middlewares/auth.middleware');
router.get("/api/products",ProductController.getAllProduct)
router.post("/api/product/create",[authMiddleware,validateProduct],ProductController.createProduct)
router.get("/api/product/:id",ProductController.getProduct)
router.put("/api/product/edit/:id",[authMiddleware,validateProduct],ProductController.editProduct)
router.delete("/api/product/delete/:id",authMiddleware,ProductController.deleteProduct)
router.get("/api/attributes" ,ProductController.getAttributes)
router.get("/api/attribute" ,ProductController.getOneAttributes)
router.get("/api/searchProduct" ,ProductController.searchProduct)

let initProductRoutes = (app) => {
  app.use('/', router);
};

module.exports = initProductRoutes;