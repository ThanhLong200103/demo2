const { Kafka, Partitioners } = require("kafkajs");
const config = require("./config");

const kafka = new Kafka({
  clientId: config.kafka.name,
  brokers: [config.kafka.url]
});
const admin = kafka.admin();

const createTopics = async () => {
  try {
    await admin.connect();
    const existingTopics = await admin.listTopics();

    const desiredTopics = [
      {
        topic: 'test',
        numPartitions: 3,
        replicationFactor: 1
      }
    ];

    const topicsToCreate = desiredTopics.filter(
      ({ topic }) => !existingTopics.includes(topic)
    );

    if (topicsToCreate.length === 0) {
      console.log('All topics already exist, skipping createTopics.');
      return;
    }

    await admin.createTopics({
      topics: topicsToCreate,
      validateOnly: false,
      timeout: 30000
    });
    console.log('Topics created successfully:', topicsToCreate.map(t => t.topic).join(', '));
  } catch (error) {
    console.error('Error creating topics:', error);
  } finally {
    try {
      await admin.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting admin:', disconnectError);
    }
  }
};

module.exports = createTopics;
