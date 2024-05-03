import {producer} from ".."
import { UserEntity } from "@/domain/entities"


export default async(data:UserEntity,topic?: string)=>{
    try {
        const targetTopic = topic || 'default-topic';
        console.log("🚀 ~ file: userCreatedProducer.ts:8 ~ async ~ targetTopic:", targetTopic)
        
        await producer.connect();
        const messages = [
            {
                topic: targetTopic,
                messages: [{
                    key: "userCreated",
                    value: JSON.stringify(data)
                }]
            }
        ]

        await producer.sendBatch({ topicMessages: messages });
        
    }catch (error:any) {
        console.error('kafka produce error:',error?.message)
    }finally{
        await producer.disconnect();
    }
}