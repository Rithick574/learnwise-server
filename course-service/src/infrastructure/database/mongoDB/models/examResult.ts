import { IExamResult } from "../../../../domain/entities";
import { Schema, model } from "mongoose";

const examResultSchema = new Schema({
  courseId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  result: {
    type: [String],
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

export const ExamResult = model<IExamResult>('ExamResult', examResultSchema);
