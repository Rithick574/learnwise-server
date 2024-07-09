import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getTotalStudentsForInstructorUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getTotalStudentsForInstructor}} = dependencies;
    return {
        execute:async(instructorRef:string)=>{
            return await getTotalStudentsForInstructor(instructorRef)
        }
    }
}