const { getConnectionRabbitMQ } = require("./index");

 const ConSumerRabbitMQ = async ( queue = "tasks") => {
  const  conn = getConnectionRabbitMQ();
    const ch1 = await conn.createChannel();
  ch1.on("error", (err) => {
    console.error("Channel error:", err);
  });
  ch1.on("handler-error", (err, event) => {
    console.error(`Uncaught exception in channel ${event} listener:`, err);
  });
  await ch1.assertQueue(queue, { durable: true });

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Received:", msg.content.toString());
      ch1.ack(msg);

    } else {
      console.log("Consumer cancelled by server");
    }
  });
}

module.exports = {
    ConSumerRabbitMQ,
}