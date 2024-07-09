import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getTotalCoursesForInstructorUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getTotalCoursesForInstructor}} = dependencies;
    return {
        execute:async(instructorRef:string)=>{
            return await getTotalCoursesForInstructor(instructorRef)
        }
    }
}