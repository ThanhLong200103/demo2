const amqplib = require('amqplib');
let connection = null;

async function initConnection(url) {
  if (connection) return connection;
  connection = await amqplib.connect(url);
  connection.on('error', (err) => console.error('RabbitMQ connection error:', err));
  connection.on('close', () => console.warn('RabbitMQ connection closed'));
  return connection;
}

function getConnection() {
  if (!connection) throw new Error('RabbitMQ connection not initialized. Call initConnection(url) first.');
  return connection;
}

async function registerConsumer(queue, handler, options = { durable: true }) {
  const conn = getConnection();
  const ch = await conn.createChannel();
  ch.on('error', (err) => console.error('Consumer channel error:', err));
  await ch.assertQueue(queue, { durable: options.durable });
  await ch.consume(queue, (msg) => {
    if (!msg) return;
    let content;
    try {
      content = JSON.parse(msg.content.toString());
    } catch (e) {
      content = msg.content.toString();
    }
    Promise.resolve(handler(content, msg))
      .then(() => ch.ack(msg))
      .catch((err) => {
        console.error('Consumer handler error:', err);
        try { ch.nack(msg, false, false); } catch (e) { /* ignore */ }
      });
  });
}

async function sendToQueue(queue, payload, options = { persistent: true, durable: true }) {
  const conn = getConnection();
  const ch = await conn.createChannel();
  ch.on('error', (err) => console.error('Producer channel error:', err));
  await ch.assertQueue(queue, { durable: options.durable });
  const buffer = Buffer.isBuffer(payload) ? payload : Buffer.from(typeof payload === 'string' ? payload : JSON.stringify(payload));
  return ch.sendToQueue(queue, buffer, options);
}

module.exports = {
  initConnection,
  getConnection,
  registerConsumer,
  sendToQueue,
};
