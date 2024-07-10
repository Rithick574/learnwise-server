import { ICertificate } from "../../../domain/entities";

export interface ICreateCertificateUseCase{
    execute(userId:string, courseName:string, url:string):Promise<ICertificate | null>
}