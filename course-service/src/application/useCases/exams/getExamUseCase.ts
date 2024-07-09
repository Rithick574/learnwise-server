import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getExamUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getExam}} = dependencies;
    return {
        execute:async(courseId: string)=>{
            return await getExam(courseId)
        }
    }
}