import { consumer } from "@/infrastructure/kafka";
import {INotificationSubscriber,createSubscriber} from "@/infrastructure/kafka"


export const runConsumer = async () => {
    try {

        await consumer.connect();

        await consumer.subscribe({
            topic: "notification-service-topic",
            fromBeginning: true
        });

        const subscriber = createSubscriber();

        await consumer.run({
            eachMessage: async ({ message }) => {

                const { key, value } = message;

                const subscriberMethod = String(key) as keyof INotificationSubscriber;
                const subscriberData = JSON.parse(String(value));

                try {
                    await subscriber[subscriberMethod](subscriberData);
                } catch (error: any) {
                    throw new Error(error?.message);
                }
            }
        });

    } catch (error: any) {
        throw new Error("Kafka Consume Error -> Notification : " + error?.message);
    }
}

export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}