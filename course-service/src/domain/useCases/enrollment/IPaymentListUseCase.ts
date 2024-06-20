export interface IPaymentListUseCase{
    execute(status:string,search:string,page:number,limit:number):Promise<any | null>
}