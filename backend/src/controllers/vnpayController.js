const VnPayService = require("../services/vnpay.service");

class VnpayController {
  createPaymentUrl = (req, res) => {
    try {
     const ipAddr =
  (req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip)
    .replace("::ffff:", "");
      const order = req.body;
      const paymentUrl =  VnPayService.createPaymentUrl(order, ipAddr);
      res.json({ paymentUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createPaymensVnpay = async (req, res) => {
    try {
         const { cartItemIds ,totalPrice } = req.body ;
      const userId = req.user.id;
        const data = await VnPayService.createPaymentVnpay({cartItemIds ,totalPrice, userId });
        return res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

    vnpayReturn = (req, res) => {
        try {
            const vnp_Params = req.query;
            console.log("vnp_Params_return:", vnp_Params);
            const result = VnPayService.vnpayReturn(vnp_Params);
            console.log(result)
            const orderId = result.vnp_TxnRef;
            const responseCode = result.vnp_ResponseCode;
            if(result.vnp_ResponseCode === "00"){
                res.redirect(`http://localhost:5173/payment-success?orderId=${orderId}`);
            }else{
                res.redirect(`http://localhost:5173/payment-failed?code=${responseCode}`);
            } 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    vnpayIND = async (req, res) => {
        try {
            const vnp_Params = req.query;
            console.log("vnp_Params_IPN:", vnp_Params);
            const result = await VnPayService.vnpayIND(vnp_Params);
            console.log(result)
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

}
}

module.exports = new VnpayController();
