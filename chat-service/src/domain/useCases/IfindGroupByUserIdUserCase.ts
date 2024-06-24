import { ChatEntity } from "../entities";

export interface IfindGroupByUserUseCase{
    execute(userId:string):Promise<ChatEntity[]|null>
}