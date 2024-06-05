import { IDependencies } from "@/application/interfaces/IDependencies";
import { IReview } from "@/domain/entities";


export const createReviewUseCase = (dependencies : IDependencies)=>{
    const {repositories:{createReview}} = dependencies;
    return {
        execute:async(data:IReview)=>{
            return await createReview(data)
        }
    }
}
