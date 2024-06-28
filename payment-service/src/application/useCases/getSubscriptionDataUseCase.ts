import { IDependencies } from "../interfaces/IDependencies";

export const getSubscriptionDataUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getSubscriptionData}}= dependencies;
    return {
        execute:async(userId:string,instructorId:string)=>{
            return await getSubscriptionData(userId,instructorId)
        }
    }
}