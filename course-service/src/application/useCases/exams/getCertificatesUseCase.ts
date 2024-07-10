import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getCertificatesUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getCertificates}} = dependencies;
    return {
        execute:async(userId:string)=>{
            return await getCertificates(userId)
        }
    }
}