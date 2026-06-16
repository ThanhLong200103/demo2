const { Kafka } = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
  clientId: config.kafka.name,
  brokers: [config.kafka.url]
});



const StartConsumerKafka = async (id) => {
  const consumer = kafka.consumer({ groupId: `demo-group_${id}`});
  await consumer.connect();
  await consumer.subscribe({ topic: 'test', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = message.value.toString();
      const data = JSON.parse(payload);

      console.log('✅ Received message from Kafka:', {
        topic,
        partition,
        offset: message.offset,
        data
      });

      // Xử lý dữ liệu ở đây
      // Ví dụ: NotificationService.createNotification(data);
    }
  });
};

module.exports =  StartConsumerKafka ;