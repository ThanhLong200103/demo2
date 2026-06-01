const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const UserController = require("../controllers/userController");
const AddressUserController = require("../controllers/addressUserController");
const {loginMiddleware, registerMiddleware} = require('../middlewares/login.midlleware');
const CheckPermission = require('../middlewares/checkpermission');
const chatController = require('../admin/chatController');
const routerUser = express.Router();


routerUser.post("/api/login",loginMiddleware,UserController.login)
routerUser.get("/api/profile",authMiddleware,CheckPermission("update:own_profile") ,UserController.proFile)
routerUser.post("/api/register",registerMiddleware,UserController.register)
routerUser.post("/api/refresh",UserController.resetRefreshToken)
routerUser.post("/api/logout",authMiddleware,UserController.userLogout)

//address
routerUser.post("/api/Createaddress",authMiddleware,AddressUserController.createAddressUser)
routerUser.put("/api/Editaddress",authMiddleware,AddressUserController.editAddressUser)
routerUser.get("/api/getAllAddress",authMiddleware,AddressUserController.getAllAddressUser)
routerUser.get("/api/getOneAddress/:id",authMiddleware,AddressUserController.getOneAddressUser)
routerUser.put("/api/DeleteAddress/:id",authMiddleware,AddressUserController.deleteAddressUser)


// admin

//chat
routerUser.post("/api/chat/messages",authMiddleware,chatController.addChatUserSupport)

let initUserRoutes = (app) => {
  app.use('/', routerUser);
};

module.exports = initUserRoutes;