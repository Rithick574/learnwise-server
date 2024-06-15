import { Date, Schema } from "mongoose";

export interface IPaymentEntity {
  _id?: Schema.Types.ObjectId;
  userId?: Schema.Types.ObjectId;
  courseId?: Schema.Types.ObjectId;
  instructorRef?:Schema.Types.ObjectId;
  method: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  createdAt?:Date;
  updatedAt?:Date;
}
