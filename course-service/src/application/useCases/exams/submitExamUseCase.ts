import { IDependencies } from "@/application/interfaces/IDependencies";

export const submitExamUseCase=(dependencies:IDependencies)=>{
    const {repositories:{submitExam}} = dependencies;
    return {
        execute:async(userId:string,courseId:string,result:any)=>{
            return await submitExam(userId,courseId,result)
        }
    }
}