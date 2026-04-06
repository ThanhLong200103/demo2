require('dotenv').config();
module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshSecret :process.env.REFRESH_SECRET,
  refreshExpiresIn :process.env.REFRESH_SECRET_TIME
};