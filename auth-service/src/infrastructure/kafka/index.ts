import { Kafka, Producer, Partitioners, Consumer } from "kafkajs";

// const kafka = new Kafka({
//   clientId: 'auth-service',
//   brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
//   ssl: true,
//   sasl: {
//     mechanism: 'plain',
//     username: 'AH3AIXDBMRITWY2S',
//     password:'PTTwXBptxZjyOa3DLtmSIjgC3mg8AZG8o1MB0pShQvbNX7bTC07O8HcgLAi+sqUj',
//   },
// });

export const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ["localhost:29092"]
})

export const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer: Consumer = kafka.consumer({
  groupId: "auth-service-kafka-group",
});
