const crypto = require("crypto")
const { create } = require("domain")

const hasdRefreshToken = (token)=>{
    const hasdToken = crypto.createHash("sha256").update(token).digest("hex");
    return hasdToken ;
}


module.exports = hasdRefreshToken
