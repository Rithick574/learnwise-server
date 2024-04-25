import {producer} from ".."
import { UserEntity } from "@/domain/entities"
import {NOTIFICATION_SERVICE_TOPIC,USER_CREATED_MESSAGE} from "@/_lib/common"


export default async(data:UserEntity)=>{
    try {
        await producer.connect();
        const messages = [
            {
                topic: NOTIFICATION_SERVICE_TOPIC,
                messages: [{
                    key: USER_CREATED_MESSAGE,
                    value: JSON.stringify(data)
                }]
            },
        ]

        console.log("@@@@@@@",NOTIFICATION_SERVICE_TOPIC);
        console.log(USER_CREATED_MESSAGE,"-----------------");
        
        

        await producer.sendBatch({ topicMessages: messages });
        
    }catch (error:any) {
        console.error('kafka produce error:',error?.message)
    }finally{
        await producer.disconnect();
    }
}