import { producer } from "..";

export default async(data:{instructorId:string,amount:string})=>{
    try {
        await producer.connect();
        const message = {
            topic:"course-service-topic",
            messages:[
                {
                    key:"subscription",
                    value:JSON.stringify(data),
                }
            ]
        };
        await producer.send(message);
        console.log("🚀 ~ file: createSubscriptionProducer.ts:15 ~ async ~ message:", message)
    } catch (error) {
        console.error("Kafka produce error:", (error as Error).message);
    }finally{
        try {
            await producer.disconnect();
          } catch (disconnectError) {
            console.error(
              "Kafka disconnect error:",
              (disconnectError as Error).message
            );
          }
    }
}