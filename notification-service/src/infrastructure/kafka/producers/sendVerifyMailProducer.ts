import {producer} from "../index"

export default async (
    data: {
        email: string,
        otp: string
    }
) => {

    try {
        await producer.connect();

        const message = {
            topic: "auth-service-topic",
            messages: [{
                key: "sendVerificationMail",
                value: JSON.stringify(data)
            }]
        }
        
        await producer.send(message);

    } catch (error: any) {
        console.error('kafka produce error : ', error?.message);
    } finally {
        await producer.disconnect();
    }
}