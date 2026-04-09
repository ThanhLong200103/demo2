require('dotenv').config();
module.exports = {
    vnp_TmnCode: process.env.VNP_TMN_CODE,
    vnp_hashSecret: process.env.VNP_HASH_SECRET,
    vnp_url: process.env.VNP_URL,
    vnp_returnUrl: process.env.VNP_RETURN_URL,
    vnp_ipnUrl: process.env.VNP_IPN_URL 
}