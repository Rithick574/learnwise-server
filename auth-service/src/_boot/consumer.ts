import { consumer } from "@/infrastructure/kafka/index";
import { createSubscriber,IAuthSubscriber } from "@/infrastructure/kafka/subscriber";



export const runConsumer = async () => {
    try {
        await consumer.connect();

        await consumer.subscribe({
            topic: "auth-service-topic",
            fromBeginning: true
        });

        await consumer.subscribe({
            topic:'user-service-topic',
            fromBeginning:true
        })

        const subscriber = createSubscriber();
        console.log("here... in consumer.ts..!");

        await consumer.run({
            eachMessage: async ({ message }) => {

                const { key, value } = message;

                const subscriberMethod = String(key) as keyof IAuthSubscriber;
                const subscriberData = JSON.parse(String(value));

                try {
                    await subscriber[subscriberMethod](subscriberData);
                } catch (error: any) {
                    console.error(`Error processing message from topic: ${error.message}`);
                    throw new Error(error?.message);
                }
            }
        })

    } catch (error:any) {
        throw new Error("Kafka Consume Error : " + error?.message);
    }
}


export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}