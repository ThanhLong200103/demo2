const { getConnectionRabbitMQ } = require("./index");


 const ProducerRabbitMQ = async ( queue = "tasks" , msg = "HELLO WORLD") => {
  const  conn = getConnectionRabbitMQ();

  
    const ch2 = await conn.createChannel();
  ch2.on("error", (err) => {
    console.error("Channel error:", err);
  });
   ch2.on("handler-error", (err, event) => {
    console.error(`Uncaught exception in channel ${event} listener:`, err);
  });
  await ch2.assertQueue(queue, { durable: true });

  await ch2.sendToQueue(queue, Buffer.from(msg),{
    persistent: true,

  });
}

module.exports = {
    ProducerRabbitMQ,
}