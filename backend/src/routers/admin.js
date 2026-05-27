const express = require('express'); 
const { loginMiddleware, registerMiddleware } = require('../middlewares/login.midlleware');
const RouterAdmin = express.Router();
const AuthAdmin = require("../admin/authController");
const CheckPermission = require('../middlewares/checkpermission');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/userController');
const OrderAdmin = require("../admin/orderComtroller");
const chatController = require('../admin/chatController');
RouterAdmin.post("/api/admin/login",loginMiddleware,AuthAdmin.login)
RouterAdmin.get("/api/admin/pays",authMiddleware,CheckPermission("manage:payment"),AuthAdmin.getAllPays)
RouterAdmin.get("/api/admin/order",authMiddleware,CheckPermission("view:order"),AuthAdmin.getAllOrderAdmin)
RouterAdmin.get("/api/admin/orders",authMiddleware,CheckPermission("view:order"),AuthAdmin.getAllOrderAdmins)
RouterAdmin.get("/api/admin/users" ,authMiddleware,CheckPermission("view:user"),userController.getAllUser)
RouterAdmin.get("/api/admin/userPages" ,authMiddleware,CheckPermission("view:user"),userController.getAllUserPage)
RouterAdmin.get("/api/admin/customers" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.getAllCustomers)
RouterAdmin.get("/api/admin/products" ,authMiddleware,CheckPermission("view:product"),AuthAdmin.getAllProductAdmin)
RouterAdmin.post("/api/admin/customerAdd" ,authMiddleware,registerMiddleware,CheckPermission("manage:user_account"),AuthAdmin.createCustomer)
RouterAdmin.get("/api/admin/roles" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.getAllRole)
RouterAdmin.get("/api/admin/customerOne/:id" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.getOneCustomer)
RouterAdmin.put("/api/admin/customerEdit" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.editCustomer)
RouterAdmin.patch("/api/admin/customerDelele/:id" ,authMiddleware,CheckPermission("manage:user_account"),AuthAdmin.deteleCustomer)
RouterAdmin.patch("/api/admin/updateStatusOrder" ,authMiddleware,CheckPermission("update:order_status"),OrderAdmin.updateStatusOrder)
RouterAdmin.patch("/api/admin/updatePriceOrder" ,authMiddleware,CheckPermission("update:order_status"),OrderAdmin.updateTotalPriceOrder)

RouterAdmin.get("/api/admin/orderByStatus" ,authMiddleware,CheckPermission("view:order"),OrderAdmin.getOrderByStatus)
RouterAdmin.get("/api/admin/oneOrder/:id" ,authMiddleware,CheckPermission("view:order"),OrderAdmin.getOneOrder)
RouterAdmin.get("/api/admin/getOneUser/:id" ,authMiddleware,CheckPermission("view:user"),AuthAdmin.getOneUser)
RouterAdmin.patch("/api/admin/deleteUser/:id" ,authMiddleware,CheckPermission("view:user"),AuthAdmin.deleteUser)
RouterAdmin.put("/api/admin/updateUser" ,authMiddleware,CheckPermission("view:user"),AuthAdmin.updateUser)



RouterAdmin.get("/api/admin/rooms" ,authMiddleware,chatController.getRooms)
RouterAdmin.get("/api/admin/room/:roomId/messages" ,authMiddleware,chatController.GetMessagesByRoom)











let initAdminRoutes = (app) => {
  app.use('/', RouterAdmin);
};

module.exports = initAdminRoutes