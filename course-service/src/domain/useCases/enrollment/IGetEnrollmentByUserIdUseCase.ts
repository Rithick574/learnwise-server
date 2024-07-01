
export interface IGetEnrollmentByUserIdUseCase{
    execute(userId:string):Promise<any | null>
}