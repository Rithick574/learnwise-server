import { model,Schema } from "mongoose";
import { IOtp } from "../../../../domain/entities"; 

const otpSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      expires: "5m",
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Otp =model<IOtp>("otp", otpSchema);

export interface IOtpDocument extends IOtp {
  createdAt: Date;
  updatedAt: Date;
}
