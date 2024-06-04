import { consumer } from "@/infrastructure/kafka/index";
import { createSubscriber,ICourseSubscriber } from "@/infrastructure/kafka/subscriber";

export const runConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "course-service-topic",
      fromBeginning: true,
    });
    const subscriber = createSubscriber();
    await consumer.run({
      eachMessage: async ({ message }) => {
        const { key, value } = message;

        const subscriberMethod = String(key) as keyof ICourseSubscriber;
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
