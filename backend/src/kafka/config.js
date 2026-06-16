require("dotenv").config();
module.exports = {
  kafka: {
    url: process.env.KAFKA_URL,
    name: process.env.KAFKA_NAME,
  },
};
