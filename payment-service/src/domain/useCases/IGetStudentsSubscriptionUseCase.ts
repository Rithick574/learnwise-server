export interface IetStudentsSubscriptionUseCase{
    execute(userEmail:string):Promise<any | null>
}