import { IDependencies } from "../../../application/interfaces/IDependencies";

export const createCertificateUseCase=(dependencies:IDependencies)=>{
    const {repositories:{createCertificate}} = dependencies;
    return {
        execute:async(userId:string, courseName:string, url:string)=>{
            return await createCertificate(userId,courseName,url)
        }
    }
}