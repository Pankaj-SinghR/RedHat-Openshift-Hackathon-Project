const WebSocketServer = require('ws').WebSocketServer;
const EventEmitter = require('events');
const KafkaConfig = require("./config.js");
require('dotenv').config();
process.env.KAFKAJS_NO_PARTITIONER_WARNING = 1

// const topic = process.env.KAFKA_TOPIC || "obu-topic"
// const PORT = process.env.PORT || 8080
const topic = process.env.KAFKA_TOPIC
const PORT = process.env.PORT
const wss = new WebSocketServer({ port: PORT });
const kafka = new KafkaConfig();
const emitter = new EventEmitter();
emitter.setMaxListeners(20);

wss.on('listening', () => {
  console.log(`OBU Server Running on Port ${PORT} 🚀`);
})

wss.on('connection', (ws) => {
  console.log(':: OBU Device Connected ::');

  ws.on('message', async (message) => {
    const data = [
      { key: "key1", value: message }
    ]
    kafka.produce(topic, data);
    console.log(`Message Produced to Kafka :: ${Buffer.from(`${message}`, 'utf-8')}`);
  });

  ws.on('close', async () => {
    console.log(':: OBU Device Disconnected ::');
  });

});

