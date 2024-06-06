import { Document } from "mongoose";

export interface IReview extends Document {
    userId: string;
    courseId: string;
    rating?: number;
    comment?: string;
    date?: Date;
  }