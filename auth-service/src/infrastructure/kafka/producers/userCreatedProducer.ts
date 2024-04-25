import {producer} from ".."
import { UserEntity } from "@/domain/entities"


export default async(data:UserEntity)=>{
    try {
        await producer.connect();
        const messages = [
            {
                topic: "notification-service-topic",
                messages: [{
                    key: "userCreated",
                    value: JSON.stringify(data)
                }]
            },
        ]

        await producer.sendBatch({ topicMessages: messages });
        
    }catch (error:any) {
        console.error('kafka produce error:',error?.message)
    }finally{
        await producer.disconnect();
    }
}