import { IDependencies } from "../interfaces/IDependencies"


export const findChatByUserIdUseCase=(dependancies:IDependencies)=>{
    const{
        repositories:{findChatByUserId}
    }=dependancies
    return{
        execute:async(userId:string)=>{
            return await findChatByUserId(userId)
        }
    }
}