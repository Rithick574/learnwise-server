import { ChatEntity } from "../entities";

export interface ICreateChatUseCase{
    execute(data:ChatEntity):Promise<ChatEntity | null>
}