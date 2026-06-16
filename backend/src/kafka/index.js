const { Kafka, Partitioners } = require('kafkajs');
const config = require("./config");
const createTopics = require('./admin');

const kafka = new Kafka({
  clientId: config.kafka.name,
  brokers: [config.kafka.url]
});
// 1. Khởi tạo Producer (nhưng chưa kết nối)
const producer = kafka.producer({ 
  createPartitioner: Partitioners.LegacyPartitioner 
});

// 2. Hàm dùng để bật kết nối khi khởi động Server
const connectProducerKafka = async () => {
  try {
    await createTopics()
    await producer.connect();
    console.log('Kafka Producer đã kết nối và DUY TRÌ liên tục!');
  } catch (error) {
    console.error(' Lỗi kết nối Kafka Producer:', error.message);
    process.exit(1); // Nếu lỗi nghiêm trọng có thể dừng app để kiểm tra
  }
};

// 3. Hàm disconnect khi server shutdown (quan trọng!)
const disconnectProducerKafka = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka Producer đã disconnect');
  } catch (error) {
    console.error('Lỗi disconnect Kafka Producer:', error.message);
  }
};

// 4. Helper function để send message - tránh lỗi nếu forgot await
const sendMessage = async (topic, messages) => {
  try {
    return await producer.send({
      topic,
      messages: Array.isArray(messages) ? messages : [messages]
    });
  } catch (error) {
    console.error(`Lỗi send message tới topic ${topic}:`, error.message);
    throw error;
  }
};

// 5. Xuất hàm kết nối và chính thực thể producer ra ngoài
module.exports = {
  connectProducerKafka,
  disconnectProducerKafka,
  sendMessage, // Helper function tiện lợi
  producer // Nếu cần access trực tiếp
};