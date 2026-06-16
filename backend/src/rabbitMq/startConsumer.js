const { ConSumerRabbitMQ } = require("./consumer");

const list = [
     { queue: "notificationOrder"}
]
const startConsumers = async () => {
  for (const { queue } of list) {
    await ConSumerRabbitMQ(queue);
  }
};

module.exports = startConsumers