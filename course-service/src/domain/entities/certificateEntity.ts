import { Document } from "mongoose";

export interface ICertificate extends Document {
  userId: string;
  courseName: string;
  url: string;
  date: Date;
}
