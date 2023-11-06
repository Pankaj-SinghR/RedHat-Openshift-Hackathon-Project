const { Kafka } = require('kafkajs');

class KafkaConfig {
    constructor() {
        this.Kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || 'obu-client',
            brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
            // clientId: process.env.KAFKA_CLIENT_ID,
            // brokers: (process.env.KAFKA_BROKERS).split(','),
        });

        this.producer = this.Kafka.producer();
        this.consumer = this.Kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'obu-group' });
    }

    async produce(topic, messages) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: messages,
            });
            // console.log("Data Inserted In Kafka");
        } catch (error) {
            console.error(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic, callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({
                topic: topic,
                fromBeginning: true,
            });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value.toString();
                    callback(value);
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = KafkaConfig;
