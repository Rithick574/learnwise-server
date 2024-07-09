import { IPaymentEntity, ISubscription } from "../../domain/entities";

export interface IRepositories {
    savePayment: (data: any) => Promise <IPaymentEntity | null> 
    getSubscriptionData:(userId:string,instructorId:string) => Promise<ISubscription | null>
}