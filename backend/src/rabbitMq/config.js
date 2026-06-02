require("dotenv").config();
module.exports = {
  rabbitMQ: {
    url: process.env.RABBITMQ_URL,
    prefetchCount: 1,
  },
};
