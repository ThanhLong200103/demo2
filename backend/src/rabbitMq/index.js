const amqplib = require("amqplib");
const config = require("./config");
let connection = null;

const startRabbitMQ = async () => {
  const queue = "tasks";
  connection = await amqplib.connect(config.rabbitMQ.url);
  console.log("RabbitMQ Connected");
  connection.on("error", (err) => {
    console.error("Connection error:", err);
  });
  connection.on("handler-error", (err, event) => {
    console.error(`Uncaught exception in connection ${event} listener:`, err);
  });
  return connection;
 
};

const getConnectionRabbitMQ = () => {
  if (!connection) throw new Error('RabbitMQ connection not initialized. Call initConnection(url) first.');
  return connection;
}




module.exports =  {
  startRabbitMQ,
  getConnectionRabbitMQ
}

