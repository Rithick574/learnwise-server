import { Consumer, Kafka, Partitioners, Producer } from "kafkajs"

export const kafka =new Kafka({
    clientId:'chat-service',
    brokers:['localhost:29092']
})

export const producer:Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
export const consumer:Consumer=kafka.consumer({
    groupId:'chat-service-kafka-group'
})

