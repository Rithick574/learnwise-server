import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "chat-service",
  brokers: ["pkc-4j8dq.southeastasia.azure.confluent.cloud:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: "IGI4TMEEZDD5XDZG",
    password: "KYygx3UkksOGC9+Iur1t5EPU3MlyQfY2qBgJ1zHfxW3leYtYefDoikTYcR8EjsPk",
  },
  connectionTimeout: 30000,
  authenticationTimeout: 30000,
});

// export const kafka =new Kafka({
//     clientId:'chat-service',
//     brokers:['34.93.145.38:29092']
// })

export const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer: Consumer = kafka.consumer({
  groupId: "chat-service-kafka-group",
});
