const crypto = require("crypto");
const qs = require("qs");

/**
 * Sắp xếp các key của object theo thứ tự alphabet
 */
const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

/**
 * Tạo chữ ký Secure Hash
 */
const generateSignature = (params, secretKey) => {
  const signData = qs.stringify(params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  return hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
};
const generateSignatureIPN = (params, secretKey) => {
  const signData = qs.stringify(params, { encode: true });
  const hmac = crypto.createHmac("sha512", secretKey);
  return hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
};

module.exports = { sortObject, generateSignature, generateSignatureIPN };
