import { IDependencies } from "../../../application/interfaces/IDependencies";

export const createExamUseCase=(dependencies:IDependencies)=>{
    const {repositories:{createExam}} = dependencies;
    return {
        execute:async(courseId: string, questions: any)=>{
            return await createExam(courseId,questions)
        }
    }
}