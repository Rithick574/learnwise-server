import { consumer } from "@/infrastructure/kafka/index";
import { IChatSubscriber, createSubscriber } from "@/infrastructure/kafka/subscribe";
import { EachMessagePayload } from "kafkajs";

export const runConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "user-service-topic",
      fromBeginning: true,
    });

    await consumer.subscribe({
      topic: "user-status-update",
      fromBeginning: true,
    });

    await consumer.subscribe({
      topic: "user-profile-update",
      fromBeginning: true,
    });
    const subscriber = createSubscriber();
    await consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
          const { key, value } = message;
  
          const subscriberMethod = String(key) as keyof IChatSubscriber;
          const subscriberData = JSON.parse(String(value));
  
          try {
            await subscriber[subscriberMethod](subscriberData);
          } catch (error: any) {
            throw new Error(error?.message);
          }
        },
      });
  } catch (error) {
    throw new Error("Kafka Consume Error : " + (error as Error).message);
  }
};

export const stopConsumer = async () => {
  await consumer.stop();
  await consumer.disconnect();
};
