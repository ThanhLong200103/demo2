const jwt = require('jsonwebtoken');
const config = require("../config/jwt.config")

const signToken = (payload)=>{
    const accessToken = jwt.sign(payload,config.secret,{expiresIn : config.expiresIn})
    return accessToken;
}

const verifyToken = (token) => {
  
    return jwt.verify(token, config.secret);
};
const signRefreshToken = (getToken)=>{
    const accessToken = jwt.sign(getToken,config.refreshSecret,{expiresIn : config.refreshExpiresIn})
    return accessToken;
}
const verifyRefreshToken = (token) => {
  
    return jwt.verify(token, config.refreshSecret);
};
module.exports  = {
    signToken ,
    verifyToken ,
    signRefreshToken,
    verifyRefreshToken
}