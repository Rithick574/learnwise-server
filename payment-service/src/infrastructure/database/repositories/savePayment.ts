import { IPaymentEntity } from "@/domain/entities";
import { Payment } from "../models/payment";

export const savePayment = async (data: any):Promise<IPaymentEntity | null > => {
  try {
    const savedPayment = await Payment.create(data);
    return savedPayment.toObject() as IPaymentEntity;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
