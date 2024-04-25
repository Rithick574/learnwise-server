import {producer} from "../index"
import {AUTH_SERVICE_TOPIC,SEND_VERIFICATION_MAIL_MESSAGE} from "@/_lib/common/index"

export default async (
    data: {
        email: string,
        otp: string
    }
) => {

    try {
        await producer.connect();

        const message = {
            topic: AUTH_SERVICE_TOPIC,
            messages: [{
                key: SEND_VERIFICATION_MAIL_MESSAGE,
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