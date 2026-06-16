const { getConnectionRabbitMQ } = require("./index");
const NotificationService = require ("../services/notification")
const ConSumerRabbitMQ = async (queue = "tasks") => {
  const conn = getConnectionRabbitMQ();
  const ch1 = await conn.createChannel();
  ch1.on("error", (err) => {
    console.error("Channel error:", err);
  });
  ch1.on("handler-error", (err, event) => {
    console.error(`Uncaught exception in channel ${event} listener:`, err);
  });
  await ch1.assertQueue(queue, { durable: true  });
  await ch1.prefetch(1);
  // Listener
  ch1.consume(
    queue,
    async (msg) => {
      if (!msg) return;
      const data = JSON.parse(msg.content.toString());
      try {
        switch (queue) {
          case "notificationOrder":
            await NotificationService.createNotification(data);
            break;
          default:
            console.log("Unknown queue:", queue);
            break;
        }
        ch1.ack(msg);
      } catch (err) {
        console.error("Notification consumer failed:", err);
        ch1.nack(msg, false, true);
      }
    },
    { noAck: false },
  );
};

module.exports = {
  ConSumerRabbitMQ,
};
