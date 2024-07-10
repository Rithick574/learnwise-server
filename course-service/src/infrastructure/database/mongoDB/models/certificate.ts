import { ICertificate } from "../../../../domain/entities";
import { Schema, model } from "mongoose";

const certificateSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Certificate = model<ICertificate>("Certificate", certificateSchema);
