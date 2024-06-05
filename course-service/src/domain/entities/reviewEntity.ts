import { Document } from "mongoose";

export interface IReview extends Document {
    userId: string;
    courseId: string;
    rating?: number;
    text?: string;
    date?: Date;
  }