export interface IGetCertificates{
    execute(userId:string):Promise<any | null>
}