import { consumer } from "../infrastructure/kafka";
import { INotificationSubscriber, createSubscriber } from "../infrastructure/kafka";

export const runConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: "notification-service-topic", fromBeginning: true });
        
        const subscriber = createSubscriber();

        await consumer.run({
            eachMessage: async ({ message }) => {
                const { key, value } = message;

                if (!key) {
                    console.error("Message key is missing.");
                    return;
                }
                if (!value) {
                    console.error("Message value is missing.");
                    return;
                }

                const subscriberMethod = convertKeyToMethodName(String(key));;

                if (typeof subscriber[subscriberMethod] !== 'function') {
                    console.error(`Method ${subscriberMethod} is not defined on subscriber.`);
                    return;
                }

                try {
                    const subscriberData = JSON.parse(String(value));
                    await subscriber[subscriberMethod](subscriberData);
                } catch (error: any) {
                    console.error(`Error processing message with key ${key}: ${error.message}`);
                }
            }
        });

    } catch (error: any) {
        console.error("Kafka Consume Error -> Notification : ", error.message);
    }
}

function convertKeyToMethodName(key: string): keyof INotificationSubscriber {
    const keyMap: { [key: string]: keyof INotificationSubscriber } = {
        USER_CREATED_MESSAGE: 'userCreated',
        REQUEST_FORGOT_PASSWORD_MESSAGE: 'requestForgotPassword'
    };
    return keyMap[key] || key;
}

export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}
