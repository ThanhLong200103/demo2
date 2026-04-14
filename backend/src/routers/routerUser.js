const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const UserController = require("../controllers/userController");
const {loginMiddleware, registerMiddleware} = require('../middlewares/login.midlleware');
const routerUser = express.Router();
routerUser.get("/api/users",UserController.getAllUser)
routerUser.post("/api/login",loginMiddleware,UserController.login)
routerUser.get("/api/profile",authMiddleware,UserController.proFile)
routerUser.post("/api/register",registerMiddleware,UserController.register)
routerUser.post("/api/refresh",UserController.resetRefreshToken)
routerUser.post("/api/logout",authMiddleware,UserController.userLogout)

let initUserRoutes = (app) => {
  app.use('/', routerUser);
};

module.exports = initUserRoutes;