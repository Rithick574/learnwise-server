import { Document, ObjectId } from "mongoose";

export interface IOtp extends Document {
    _id: ObjectId;
    email: String;
    otp: String;
    createdOn: Date;
  }