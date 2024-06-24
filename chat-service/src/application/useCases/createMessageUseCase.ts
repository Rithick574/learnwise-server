import { MessageEntity } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createMessageUseCase =(dependencies:IDependencies)=>{
    const{
        repositories:{createMessage}
    }=dependencies

    return {
        execute:async(messageData: MessageEntity, chatData: string)=>{
            return await createMessage(messageData,chatData)
        }
    }

}