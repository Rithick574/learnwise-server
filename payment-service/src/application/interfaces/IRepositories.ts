import { IPaymentEntity } from "@/domain/entities";

export interface IRepositories {
    savePayment: (data: any) => Promise <IPaymentEntity | null> 
}