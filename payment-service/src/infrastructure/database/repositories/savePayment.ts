import { IPaymentEntity } from "@/domain/entities";
import { Payment } from "../models/payment";

export const savePayment = async (data: any):Promise<IPaymentEntity | null > => {
  try {
    const filteredData = {};
    const savedPayment = await Payment.create(filteredData);

    return savedPayment.toObject() as IPaymentEntity;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
