import { ChatEntity } from "../entities";

export interface IfindChatByUserIdUseCase{
    execute(userId:string):Promise<ChatEntity[]|null>
}