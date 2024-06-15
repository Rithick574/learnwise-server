import { IDependencies } from "@/application/interfaces/IDependencies";

export const getEnrollmentsForInstructorOverTimeUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getEnrollmentsForInstructorOverTime}} = dependencies;
    return {
        execute:async(instructorRef:string)=>{
            return await getEnrollmentsForInstructorOverTime(instructorRef)
        }
    }
}