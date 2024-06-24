import { ChatEntity } from "../entities";

export interface IfindChatByUseCase{
    execute(chatId:string):Promise<ChatEntity|null>
}