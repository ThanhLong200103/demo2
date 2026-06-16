const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/categoryController")
router.get("/api/categorys",CategoryController.getCategory)
router.get("/api/categorys/:idCategory",CategoryController.getCategoryProduct)
let initCategoryRoutes = (app) => {
  app.use('/', router);
};

module.exports = initCategoryRoutes;