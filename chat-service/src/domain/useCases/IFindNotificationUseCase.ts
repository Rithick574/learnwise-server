export interface IFindNotificationUseCase{
    execute(userId:string):Promise<any>
}