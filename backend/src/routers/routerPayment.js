const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const VnpayController = require('../controllers/vnpayController');
router.post("/api/payment/vnpay",authMiddleware,VnpayController.createPaymentUrl)
router.post("/api/payment/vnpaycreate",authMiddleware,VnpayController.createPaymensVnpay)
router.get("/api/payment/vnpay_return",VnpayController.vnpayReturn)
router.get("/api/payment/vnpay_ipn",VnpayController.vnpayIND)
let initPaymentRoutes = (app) => {
  app.use('/', router);
};

module.exports = initPaymentRoutes;