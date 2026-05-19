const express = require('express'); 
const { loginMiddleware, registerMiddleware } = require('../middlewares/login.midlleware');
const RouterAdmin = express.Router();
const AuthAdmin = require("../admin/authController");
const CheckPermission = require('../middlewares/checkpermission');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/userController');
RouterAdmin.post("/api/admin/login",loginMiddleware,AuthAdmin.login)
RouterAdmin.get("/api/admin/pays",authMiddleware,CheckPermission("manage:payment"),AuthAdmin.getAllPays)
RouterAdmin.get("/api/admin/order",authMiddleware,CheckPermission("view:order"),AuthAdmin.getAllOrderAdmin)
RouterAdmin.get("/api/admin/users" ,authMiddleware,CheckPermission("view:user"),userController.getAllUser)
RouterAdmin.get("/api/admin/customers" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.getAllCustomers)
RouterAdmin.get("/api/admin/products" ,authMiddleware,CheckPermission("view:product"),AuthAdmin.getAllProductAdmin)
RouterAdmin.post("/api/admin/customerAdd" ,authMiddleware,registerMiddleware,CheckPermission("manage:user_account"),AuthAdmin.createCustomer)
RouterAdmin.get("/api/admin/roles" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.getAllRole)
RouterAdmin.get("/api/admin/customerOne/:id" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.getOneCustomer)
RouterAdmin.put("/api/admin/customerEdit/:id" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.editCustomer)





let initAdminRoutes = (app) => {
  app.use('/', RouterAdmin);
};

module.exports = initAdminRoutes