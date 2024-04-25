import { Kafka,Producer,Consumer } from "kafkajs";


export const kafka = new Kafka({
    clientId: 'cart-service',
    brokers: ["localhost:29092"]
  })

export const producer:Producer = kafka.producer();
export const consumer:Consumer = kafka.consumer({
  groupId: 'cart-service-kafka-group'
})

export * from "./subscriber";