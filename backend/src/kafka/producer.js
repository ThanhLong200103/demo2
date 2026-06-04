const { sendMessage } = require('./index');

const ProducerKafka = async () => {
  await sendMessage('test', {
    value: JSON.stringify({
      id: 123,
      type: 'demo',
      message: 'Hello from producer'
    })
  });

  console.log('✅ Message sent to Kafka');
};

module.exports = ProducerKafka;