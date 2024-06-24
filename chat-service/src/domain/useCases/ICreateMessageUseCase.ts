import { MessageEntity } from "../entities";

export interface ICreateMessageUseCase{
    execute(messageData: MessageEntity, chatData: string):Promise<MessageEntity|null>
}