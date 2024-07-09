import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getTopCoursesForInstructorUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getTopCoursesForInstructor}} = dependencies;
    return {
        execute:async(instructorRef:string)=>{
            return await getTopCoursesForInstructor(instructorRef)
        }
    }
}