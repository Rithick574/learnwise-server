import { IDependencies } from "../../../application/interfaces/IDependencies";


export const paymentListUseCase = (dependencies : IDependencies)=>{
    const {repositories:{paymentListForAdmin}} = dependencies;
    return {
        execute:async(status:string,search: string, page: number, limit: number)=>{
            return await paymentListForAdmin(status,search, page, limit)
        }
    }
}
