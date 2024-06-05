import { IDependencies } from "@/application/interfaces/IDependencies";


export const getReviewUseCase = (dependencies : IDependencies)=>{
    const {repositories:{getReview}} = dependencies;
    return {
        execute:async(courseId:string)=>{
            return await getReview(courseId)
        }
    }
}
