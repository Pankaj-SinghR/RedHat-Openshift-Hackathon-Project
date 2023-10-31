const KafkaConfig = require("./config.js");
const CalculatorService = require("./calculatorService.js");
const grpcClient = require("./grpc/client.js");
require('dotenv').config();
process.env.KAFKAJS_NO_PARTITIONER_WARNING = 1
const topic = process.env.KAFKA_TOPIC || "obu-topic"
const kafka = new KafkaConfig();

const cal = new CalculatorService();

kafka.consume(topic, (value) => {
    // console.log(value);
    // console.log(cal.calculateDistance(JSON.parse(value)));
    const distance = cal.calculateDistance(JSON.parse(value));
    const topicData = JSON.parse(value)
    const data = {
        "obuid": topicData["OBUId"],
        "lat": topicData["Lat"],
        "long": topicData["Long"],
        "distance": distance
    }

    grpcClient.storeDataInPostgres(data, (error, _) => {
        if (error) {
            console.error(error);
        }
    })
})
