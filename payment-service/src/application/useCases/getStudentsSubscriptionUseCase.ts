import { IDependencies } from "../interfaces/IDependencies";

export const getStudentsSubscriptionUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getStudentsSubscription}} =dependencies;
    return {
        execute:async(userEmail:string)=>{
            return await getStudentsSubscription(userEmail)
        }
    }
}