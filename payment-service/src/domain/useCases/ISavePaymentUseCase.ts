import { IPaymentEntity } from "@/domain/entities/index";

export interface ISavePaymentUseCase {
  execute(data: any): Promise<IPaymentEntity | null>
}