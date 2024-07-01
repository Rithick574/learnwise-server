import { IDependencies } from "../interfaces/IDependencies"

export const findNotificationUseCase=(dependencies:IDependencies)=>{
    const{
        repositories:{findNotification}
    }=dependencies
    return{
        execute:async(userId:string)=>{
            return await findNotification(userId)
        }
    }
}