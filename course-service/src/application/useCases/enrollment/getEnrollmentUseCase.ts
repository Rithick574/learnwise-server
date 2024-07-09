import { IDependencies } from "../../../application/interfaces/IDependencies";


export const getEnrollmentUseCase = (dependencies : IDependencies)=>{
    const {repositories:{getEnrollment}} = dependencies;
    return {
        execute:async(courseId:string,userId:string)=>{
            return await getEnrollment(courseId,userId)
        }
    }
}
