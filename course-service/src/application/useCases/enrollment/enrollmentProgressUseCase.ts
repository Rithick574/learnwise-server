import { IDependencies } from "@/application/interfaces/IDependencies";

export const enrollmentProgressUseCase=(dependencies:IDependencies)=>{
    const {repositories:{enrollmentProgress}} = dependencies;
    return{
        execute:async(progressData:any)=>{
            return await enrollmentProgress(progressData)
        }
    }
}
